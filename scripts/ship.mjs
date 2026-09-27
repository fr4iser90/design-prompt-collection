#!/usr/bin/env node
// ship.mjs — one-shot: build missing demos → shots → pages → index → completeness gate
//
//   npm run ship
//   npm run ship -- -c landing-pages
//   npm run ship -- --id tidal-studio-hero
//   npm run ship -- --skip-build
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
    console.error(`Ship stopped: ${script} failed`);
    process.exit(r.status || 1);
  }
}

const argv = process.argv.slice(2);
const skipBuild = argv.includes("--skip-build");
const passthrough = argv.filter((a) => a !== "--skip-build");

console.log("🚢 ship — full automate: demos → screenshots → pages → checks");

if (!skipBuild) run("ai:build", passthrough);
run("shots", passthrough.filter((a) => a !== "--force"));
run("pages");
run("build");
run("check", passthrough);

console.log("\nShip complete — safe to commit finished entries.");
console.log("  git add prompts README.md index.json catalog.json");
console.log("  git commit -m \"…\"");
