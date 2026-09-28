#!/usr/bin/env node
// deploy-pages.mjs — build site/dist, then trigger GitHub Pages deploy
//
//   npm run pages:deploy
//
// Prefers: gh workflow run pages.yml (Actions → GitHub Pages)
// Fallback: POST /repos/{owner}/{repo}/pages/builds
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WORKFLOW = "pages.yml";

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
    console.warn(
      "gh CLI not found — site built locally. Push to main/master so Actions can deploy,\n" +
        "  or install GitHub CLI: https://cli.github.com/"
    );
    process.exit(0);
  }

  console.log(`▶ trigger workflow ${WORKFLOW}…`);
  const trigger = run("gh", ["workflow", "run", WORKFLOW], { silent: false });
  if (trigger.status !== 0) {
    console.warn(
      "  workflow run failed — is .github/workflows/pages.yml on the default branch?\n" +
        "  Repo → Settings → Pages → Source: GitHub Actions"
    );
    // last-ditch: request a pages rebuild if Pages already configured
    const rebuild = run(
      "gh",
      ["api", "-X", "POST", "repos/{owner}/{repo}/pages/builds"],
      { silent: true }
    );
    if (rebuild.status === 0) {
      console.log("  ✓ requested Pages rebuild via API");
      process.exit(0);
    }
    process.exit(1);
  }

  console.log("  ✓ Pages workflow dispatched");
  const url = run("gh", ["api", "repos/{owner}/{repo}/pages", "--jq", ".html_url"], {
    silent: true,
  });
  if (url.status === 0 && (url.stdout || "").trim()) {
    console.log(`  site: ${(url.stdout || "").trim()}`);
  } else {
    console.log("  (enable Pages → Source: GitHub Actions if URL missing)");
  }
}

main();
