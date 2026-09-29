#!/usr/bin/env node
// deploy-pages.mjs — build site/dist, then trigger GitHub Pages deploy
//
//   npm run pages:deploy
//
// Prefers: gh workflow run pages.yml (Actions → GitHub Pages)
// Fallback: POST /repos/{owner}/{repo}/pages/builds
// Exit 0 only when a deploy was actually triggered. Local site/dist alone ≠ success.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvFile } from "./lib/helpers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WORKFLOW = "pages.yml";

loadEnvFile(path.join(ROOT, ".env"));
// gh prefers GH_TOKEN; reuse GITHUB_TOKEN from .env when unset
if (!process.env.GH_TOKEN && process.env.GITHUB_TOKEN) {
  process.env.GH_TOKEN = process.env.GITHUB_TOKEN;
}

function run(cmd, args, opts = {}) {
  return spawnSync(cmd, args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: opts.silent ? "pipe" : "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });
}

function hasGh() {
  const r = spawnSync("gh", ["--version"], { encoding: "utf8" });
  return r.status === 0;
}

function main() {
  console.log("▶ build site/dist…");
  const pages = run("node", ["scripts/pages.mjs"]);
  if (pages.status !== 0) {
    console.error("pages build failed");
    process.exit(1);
  }
  if (!fs.existsSync(path.join(ROOT, "site", "dist", "index.html"))) {
    console.error("site/dist/index.html missing after build");
    process.exit(1);
  }

  if (!hasGh()) {
    console.error(
      "✗ gh CLI not found — cannot trigger Pages workflow.\n" +
        "  nix-shell includes `gh` (re-enter shell), or: https://cli.github.com/\n" +
        "  site/dist was built locally only (not deployed)."
    );
    process.exit(1);
  }

  console.log(`▶ trigger workflow ${WORKFLOW}…`);
  const trigger = run("gh", ["workflow", "run", WORKFLOW], { silent: false });
  if (trigger.status === 0) {
    console.log("  ✓ Pages workflow dispatched");
    const url = run(
      "gh",
      ["api", "repos/{owner}/{repo}/pages", "--jq", ".html_url"],
      { silent: true }
    );
    if (url.status === 0 && (url.stdout || "").trim()) {
      console.log(`  site: ${(url.stdout || "").trim()}`);
    } else {
      console.log("  (enable Pages → Source: GitHub Actions if URL missing)");
    }
    process.exit(0);
  }

  console.warn(
    "  workflow run failed — trying Pages rebuild API…\n" +
      "  (is .github/workflows/pages.yml on the default branch?\n" +
      "   Repo → Settings → Pages → Source: GitHub Actions)"
  );
  const rebuild = run(
    "gh",
    ["api", "-X", "POST", "repos/{owner}/{repo}/pages/builds"],
    { silent: true }
  );
  if (rebuild.status === 0) {
    console.log("  ✓ requested Pages rebuild via API");
    process.exit(0);
  }

  console.error(
    "✗ gh-pages not triggered (workflow + API failed).\n" +
      `  gh stderr: ${(rebuild.stderr || trigger.stderr || "").slice(0, 400)}`
  );
  process.exit(1);
}

main();
