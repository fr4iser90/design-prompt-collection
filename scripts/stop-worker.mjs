#!/usr/bin/env node
// stop-worker.mjs — graceful + hard stop for the autonomous worker
//
//   npm run stop          # touch STOP + SIGTERM worker/build/fill (closes streams)
//   npm run stop -- --force  # SIGKILL if still alive
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const STOP_FILE = path.join(ROOT, "STOP");
const force = process.argv.includes("--force") || process.argv.includes("-f");

const PATTERNS = [
  "scripts/worker.mjs",
  "scripts/ai-build.mjs",
  "scripts/ai-fill.mjs",
  "scripts/review.mjs",
];

function pgrepList() {
  const out = [];
  for (const pat of PATTERNS) {
    const r = spawnSync("pgrep", ["-af", pat], { encoding: "utf8" });
    if (r.status === 0 && r.stdout.trim()) {
      for (const line of r.stdout.trim().split("\n")) out.push(line);
    }
  }
  return out;
}

function pkill(sig) {
  for (const pat of PATTERNS) {
    spawnSync("pkill", [`-${sig}`, "-f", pat], { encoding: "utf8" });
  }
}

fs.writeFileSync(STOP_FILE, `${new Date().toISOString()} stop\n`);
console.log(`wrote ${path.relative(ROOT, STOP_FILE)}`);

const before = pgrepList();
if (!before.length) {
  console.log("no worker/build/fill process running");
  process.exit(0);
}

console.log("signaling SIGTERM (close in-flight streams)…");
for (const line of before) console.log(`  ${line}`);
pkill("TERM");

const waitMs = force ? 800 : 1500;
spawnSync("sleep", [String(waitMs / 1000)]);

let left = pgrepList();
if (left.length && force) {
  console.log("still alive — SIGKILL…");
  pkill("KILL");
  spawnSync("sleep", ["0.3"]);
  left = pgrepList();
}

if (left.length) {
  console.warn("still running (use: npm run stop -- --force):");
  for (const line of left) console.warn(`  ${line}`);
  process.exit(1);
}

console.log("stopped");
