#!/usr/bin/env node
// check-complete.mjs — gate: only "finished" prompt entries may be committed
//
// Finished = status polished (or archived), ≥1 model run with demo + preview.png
//
//   npm run check                 # all non-experiment entries
//   npm run check -- --staged     # only entries touched by staged git files
//   npm run check -- --id foo
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { walkEntries } from "./lib/provider.mjs";
import { listRuns, migrateLegacyRun } from "./lib/runs.mjs";
import { CATEGORIES } from "./lib/helpers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function die(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

function parseCli(argv) {
  const out = { staged: false, id: null, category: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--staged") out.staged = true;
    else if (a === "--json") out.json = true;
    else if (a === "--id" || a === "-i") out.id = argv[++i];
    else if (a === "--category" || a === "-c") out.category = argv[++i];
  }
  return out;
}

function stagedEntryKeys() {
  const r = spawnSync(
    "git",
    ["diff", "--cached", "--name-only", "--", "prompts/"],
    { cwd: ROOT, encoding: "utf8" }
  );
  if (r.status !== 0) return new Set();
  const keys = new Set();
  for (const line of r.stdout.split(/\r?\n/).filter(Boolean)) {
    const parts = line.split("/");
    // prompts/<category>/<id>/...
    if (parts[0] !== "prompts" || parts.length < 3) continue;
    const category = parts[1];
    const id = parts[2];
    if (!CATEGORIES.includes(category)) continue;
    keys.add(`${category}/${id}`);
  }
  return keys;
}

function blockedSecretsStaged() {
  const r = spawnSync("git", ["diff", "--cached", "--name-only"], {
    cwd: ROOT,
    encoding: "utf8",
  });
  if (r.status !== 0) return [];
  return r.stdout
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((f) => {
      if (/(^|\/)\.env\.example$/.test(f)) return false;
      return /(^|\/)\.env(\.|$)/.test(f) || f.endsWith("credentials.json");
    });
}

function inspect(entry) {
  migrateLegacyRun(entry.dir, "legacy");
  const runs = listRuns(entry.dir, entry.rel);
  const completeRuns = runs.filter((r) => r.has_demo && r.has_preview);
  const problems = [];

  if (entry.status === "draft") {
    problems.push("status is draft (only polished/archived may ship)");
  }
  if (entry.status === "archived" && !completeRuns.length) {
    // archived without runs is ok
  } else if (entry.status !== "archived" && entry.status !== "draft") {
    if (!completeRuns.length) {
      problems.push("no complete model run (need runs/<model>/demo + preview.png)");
    }
  }

  const prompt = fs.readFileSync(path.join(entry.dir, "prompt.md"), "utf8");
  const full = fs.readFileSync(path.join(entry.dir, "prompt.full.md"), "utf8");
  if (prompt.includes("{{") || full.includes("{{")) {
    problems.push("unresolved {{placeholders}}");
  }
  if (prompt.trim().length < 80) problems.push("prompt.md too short");
  if (full.trim().length < 200) problems.push("prompt.full.md too short");

  return {
    key: `${entry.category}/${entry.id}`,
    status: entry.status,
    runs: runs.length,
    complete_runs: completeRuns.map((r) => r.slug),
    ok: problems.length === 0,
    problems,
  };
}

function main() {
  const args = parseCli(process.argv.slice(2));

  const secrets = blockedSecretsStaged();
  if (args.staged && secrets.length) {
    die(`Refusing to commit secrets: ${secrets.join(", ")}`);
  }

  let entries = walkEntries(ROOT).filter((e) => e.category !== "experiments");
  if (args.category) entries = entries.filter((e) => e.category === args.category);
  if (args.id) entries = entries.filter((e) => e.id === args.id);

  if (args.staged) {
    const keys = stagedEntryKeys();
    if (!keys.size) {
      console.log("check-complete: no staged prompt entries (ok)");
      return;
    }
    entries = entries.filter((e) => keys.has(`${e.category}/${e.id}`));
    console.log(`check-complete: ${entries.length} staged entr${entries.length === 1 ? "y" : "ies"}`);
  }

  const reports = entries.map(inspect);
  const failed = reports.filter((r) => !r.ok);

  if (args.json) {
    console.log(JSON.stringify({ ok: failed.length === 0, reports }, null, 2));
  } else {
    for (const r of reports) {
      if (r.ok) {
        console.log(
          `✓ ${r.key}  [${r.status}]  runs=${r.complete_runs.join(",") || "—"}`
        );
      } else {
        console.error(`✗ ${r.key}  [${r.status}]`);
        for (const p of r.problems) console.error(`    - ${p}`);
      }
    }
  }

  if (failed.length) {
    console.error(
      `\n${failed.length} incomplete entr${failed.length === 1 ? "y" : "ies"}.` +
        `\nFix with:  npm run ship` +
        `\nOr keep drafts unstaged / under prompts/experiments/`
    );
    process.exit(1);
  }
  console.log("\nAll checked entries are ship-ready.");
}

main();
