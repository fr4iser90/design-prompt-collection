#!/usr/bin/env node
// worker.mjs — multi-day autonomous loop
//
// Flow per cycle:
//   1. Build all missing demos for AI_MODEL (alias) — slot-gated, ≤max-parallel
//   2. Shots → pages → build (index/catalog/README)
//   3. When build queue empty: catalog-aware fill of N new prompts → back to 1
//   4. Optional git commit after a productive cycle
//
//   npm run worker -- --fill --fill-n 10 --fill-when-below 1 --max-parallel 2 --commit
//   Stop: Ctrl+C  OR  touch STOP
//
// Env: WORKER_MAX_PARALLEL WORKER_FILL WORKER_FILL_N WORKER_FILL_WHEN_BELOW
//      WORKER_COMMIT WORKER_IDLE_MS WAIT_FOR_SLOT SLOT_POLL_MS
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolveAiConfig, walkEntries } from "./lib/provider.mjs";
import { modelSlug, hasRunDemo, listRuns, migrateLegacyRun } from "./lib/runs.mjs";
import { fetchModelSlots, waitForIdleSlot } from "./lib/slots.mjs";
import { envFlag } from "./lib/helpers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const STOP_FILE = path.join(ROOT, "STOP");
const WORKER_DIR = path.join(ROOT, ".worker");
const STATE_FILE = path.join(WORKER_DIR, "state.json");

function parseCli(argv) {
  const out = {
    maxParallel: Number(process.env.WORKER_MAX_PARALLEL || 2),
    fill: envFlag("WORKER_FILL", false),
    fillN: Number(process.env.WORKER_FILL_N || 10),
    fillWhenBelow: Number(process.env.WORKER_FILL_WHEN_BELOW || 1),
    commit: envFlag("WORKER_COMMIT", false),
    category: null,
    sleepMs: Number(process.env.WORKER_IDLE_MS || 20000),
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--fill") out.fill = true;
    else if (a === "--commit") out.commit = true;
    else if (a === "--max-parallel") out.maxParallel = Number(argv[++i]);
    else if (a === "--category" || a === "-c") out.category = argv[++i];
    else if (a === "--fill-n") out.fillN = Number(argv[++i]);
    else if (a === "--fill-when-below") out.fillWhenBelow = Number(argv[++i]);
  }
  if (!Number.isFinite(out.maxParallel) || out.maxParallel < 1) out.maxParallel = 1;
  if (!Number.isFinite(out.fillN) || out.fillN < 1) out.fillN = 10;
  if (!Number.isFinite(out.fillWhenBelow) || out.fillWhenBelow < 0) {
    out.fillWhenBelow = 1;
  }
  return out;
}

function shouldStop() {
  return fs.existsSync(STOP_FILE);
}

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  } catch {
    return {
      started_at: new Date().toISOString(),
      built: [],
      failed: [],
      filled: 0,
      commits: 0,
      cycles: 0,
    };
  }
}

function saveState(state) {
  fs.mkdirSync(WORKER_DIR, { recursive: true });
  state.updated_at = new Date().toISOString();
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
}

function runNpm(script, args = []) {
  return new Promise((resolve) => {
    console.log(`\n▶ npm run ${script} ${args.join(" ")}`);
    const child = spawn("npm", ["run", script, "--", ...args], {
      cwd: ROOT,
      stdio: "inherit",
      shell: process.platform === "win32",
      env: process.env,
    });
    child.on("exit", (code) => resolve(code ?? 1));
    child.on("error", () => resolve(1));
  });
}

function pendingBuilds(cfg, opts) {
  const slug = modelSlug(cfg.model);
  let entries = walkEntries(ROOT).filter((e) => e.status !== "archived");
  if (opts.category) entries = entries.filter((e) => e.category === opts.category);
  entries = entries.filter((e) => e.category !== "experiments");
  const out = [];
  for (const e of entries) {
    migrateLegacyRun(e.dir, "legacy");
    if (!hasRunDemo(e.dir, slug)) out.push(e);
  }
  return out;
}

function pendingShots(opts) {
  let entries = walkEntries(ROOT).filter((e) => e.status !== "archived");
  if (opts.category) entries = entries.filter((e) => e.category === opts.category);
  const out = [];
  for (const e of entries) {
    migrateLegacyRun(e.dir, "legacy");
    const runs = listRuns(e.dir, e.rel).filter((r) => r.has_demo && !r.has_preview);
    if (runs.length) out.push(e);
  }
  return out;
}

/** Split N across landing-pages / animations / concepts (catalog-aware per call). */
function fillPlan(total) {
  const cats = ["landing-pages", "animations", "concepts"];
  const base = Math.floor(total / cats.length);
  let rem = total - base * cats.length;
  return cats.map((c) => {
    const n = base + (rem > 0 ? 1 : 0);
    if (rem > 0) rem -= 1;
    return { category: c, n };
  }).filter((x) => x.n > 0);
}

async function runFill(cfg, fillN, state) {
  console.log(`\n📝 fill batch n=${fillN} (uses catalog.json anti-overlap)`);
  // Refresh catalog/index view before inventing niches
  await runNpm("build", []);
  let filled = 0;
  for (const { category, n } of fillPlan(fillN)) {
    if (shouldStop()) break;
    try {
      await waitForIdleSlot(cfg, { need: 1, signal: null, label: `fill:${category}` });
      const code = await runNpm("ai:new", ["-c", category, "-n", String(n)]);
      if (code === 0) {
        filled += n;
        state.filled += n;
      } else {
        state.failed.push({
          type: "fill",
          category,
          n,
          at: new Date().toISOString(),
        });
      }
      saveState(state);
    } catch (err) {
      console.warn(`  fill skipped (${category}): ${err.message}`);
    }
  }
  return filled;
}

function tryCommit(state, opts, summary) {
  if (!opts.commit) return false;
  const status = spawnSync("git", ["status", "--porcelain"], {
    cwd: ROOT,
    encoding: "utf8",
  });
  if (status.status !== 0) {
    console.warn("  commit skipped: git status failed");
    return false;
  }
  const dirty = (status.stdout || "").trim();
  if (!dirty) {
    console.log("  commit: nothing to commit");
    return false;
  }
  // Never stage secrets
  if (/\.env$|\.env\./m.test(dirty) && !/\.env\.example/.test(dirty)) {
    const lines = dirty.split("\n").filter((l) => /\.env/.test(l) && !/\.env\.example/.test(l));
    if (lines.length) {
      console.warn("  commit skipped: unstaged/changed .env — leave secrets out");
      return false;
    }
  }

  spawnSync(
    "git",
    [
      "add",
      "prompts",
      "README.md",
      "index.json",
      "catalog.json",
      "site",
      "automation",
      "scripts",
      "AGENTS.md",
      "package.json",
      ".env.example",
      ".gitignore",
    ],
    { cwd: ROOT, stdio: "inherit" }
  );

  const commit = spawnSync(
    "git",
    ["commit", "-m", `worker: cycle ${state.cycles} — ${summary}`],
    {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
    }
  );
  if (commit.status === 0) {
    state.commits += 1;
    saveState(state);
    console.log("  ✓ committed");
    return true;
  }
  console.warn("  commit failed (hooks?). Fix or SKIP_COMPLETE_CHECK=1 once.");
  return false;
}

async function main() {
  const opts = parseCli(process.argv.slice(2));
  const cfg = resolveAiConfig(ROOT);
  const state = loadState();
  const slug = modelSlug(cfg.model);

  console.log("🤖 worker — multi-day loop");
  console.log(`   model=${cfg.model} api=${cfg.modelApi} slug=${slug}`);
  console.log(
    `   parallel≤${opts.maxParallel} fill=${opts.fill} fill-n=${opts.fillN} ` +
      `when-below=${opts.fillWhenBelow} commit=${opts.commit}`
  );
  console.log(`   stop: touch STOP  or Ctrl+C`);
  console.log(`   state: ${path.relative(ROOT, STATE_FILE)}`);

  if (fs.existsSync(STOP_FILE)) {
    fs.unlinkSync(STOP_FILE);
    console.log("   cleared existing STOP file");
  }

  while (!shouldStop()) {
    state.cycles += 1;
    saveState(state);

    let builds = pendingBuilds(cfg, opts);
    let shots = pendingShots(opts);
    let didWork = false;
    let filledThis = 0;

    console.log(
      `\n── cycle ${state.cycles}  build_queue=${builds.length} shot_queue=${shots.length} ──`
    );

    // 1) Drain build backlog for this model/alias first
    if (builds.length && !shouldStop()) {
      let idle = 1;
      try {
        const info = await fetchModelSlots({
          baseUrl: cfg.baseUrl,
          apiKey: cfg.apiKey,
          modelApi: cfg.modelApi,
        });
        if (info.found && info.slots_idle != null) idle = Math.max(0, info.slots_idle);
        console.log(
          `  slots idle=${info.slots_idle} busy=${info.slots_busy} total=${info.slots_total}`
        );
      } catch (err) {
        console.warn(`  slot poll: ${err.message}`);
      }

      const batch = Math.min(opts.maxParallel, idle || 1, builds.length);
      if (batch < 1) {
        console.log("  no idle slots — sleeping");
        await new Promise((r) => setTimeout(r, opts.sleepMs));
        continue;
      }

      const slice = builds.slice(0, batch);
      console.log(`  launching ${slice.length} build(s) in parallel…`);
      const results = await Promise.all(
        slice.map((e) =>
          runNpm("ai:build", ["--id", e.id]).then((code) => ({ e, code }))
        )
      );
      for (const { e, code } of results) {
        if (code === 0) {
          state.built.push(e.id);
          didWork = true;
        } else {
          state.failed.push({ type: "build", id: e.id, at: new Date().toISOString() });
        }
      }
      saveState(state);
    }

    // 2) Screenshots + regenerate site/index (no GPU slot)
    shots = pendingShots(opts);
    if (shots.length && !shouldStop()) {
      for (const e of shots.slice(0, 10)) {
        if (shouldStop()) break;
        const code = await runNpm("shots", ["--id", e.id]);
        if (code === 0) didWork = true;
        else {
          state.failed.push({ type: "shots", id: e.id, at: new Date().toISOString() });
          saveState(state);
        }
      }
      await runNpm("pages", []);
      await runNpm("build", []);
      didWork = true;
    }

    builds = pendingBuilds(cfg, opts);
    shots = pendingShots(opts);

    // 3) Only invent new prompts when this model's backlog is drained
    if (
      opts.fill &&
      builds.length < opts.fillWhenBelow &&
      shots.length === 0 &&
      !shouldStop()
    ) {
      filledThis = await runFill(cfg, opts.fillN, state);
      if (filledThis > 0) didWork = true;
      builds = pendingBuilds(cfg, opts);
    }

    // 4) Commit after a productive cycle (hooks run check on prompts/)
    if (didWork && !shouldStop()) {
      const summary = [
        filledThis ? `+${filledThis} prompts` : null,
        state.built.length ? `builds ok` : null,
        `model ${cfg.model}`,
      ]
        .filter(Boolean)
        .join(", ");
      tryCommit(state, opts, summary || "progress");
    }

    if (!builds.length && !shots.length && !opts.fill) {
      console.log("Nothing to do (no --fill). Idle — touch STOP to exit");
      await new Promise((r) => setTimeout(r, opts.sleepMs));
      continue;
    }

    if (!didWork) {
      await new Promise((r) => setTimeout(r, opts.sleepMs));
    }
  }

  console.log("\n🛑 STOP detected — worker exiting cleanly.");
  if (fs.existsSync(STOP_FILE)) {
    try {
      fs.unlinkSync(STOP_FILE);
    } catch {
      /* ignore */
    }
  }
  saveState(state);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
