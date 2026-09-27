#!/usr/bin/env node
// pipeline.mjs — ai:build (missing demos) → shots → pages → validate/generate
//
//   npm run pipeline
//   npm run pipeline -- -c landing-pages
//   npm run pipeline -- --id tidal-studio-hero
//   npm run pipeline -- --skip-build   # shots+pages only (demos already exist)
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function run(script, extraArgs = []) {
  console.log(`\n══ ${script} ${extraArgs.join(" ")} ══`);
  const r = spawnSync("npm", ["run", script, "--", ...extraArgs], {
    cwd: ROOT,
    encoding: "utf8",
    shell: process.platform === "win32",
    stdio: "inherit",
  });
  if (r.status !== 0) {
    console.error(`Pipeline stopped: ${script} failed`);
    process.exit(r.status || 1);
  }
}

const argv = process.argv.slice(2);
const skipBuild = argv.includes("--skip-build");
const passthrough = argv.filter((a) => a !== "--skip-build");

if (!skipBuild) run("ai:build", passthrough);
run("shots", passthrough.filter((a) => a !== "--force")); // force means rebuild demos; shots always refresh
run("pages");
run("build");

console.log("\nPipeline complete.");
