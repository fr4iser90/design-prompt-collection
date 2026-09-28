#!/usr/bin/env node
// worker.mjs — multi-day autonomous loop
//
// Flow per cycle:
//   1. Build all missing demos for AI_MODEL (alias) — slot-gated, ≤max-parallel
//   2. Shots → pages → build (index/catalog/README)
//   3. When build queue empty: catalog-aware fill of N new prompts → back to 1
//   4. Optional git commit / push after a productive cycle (separate flags)
//
//   npm run worker -- --fill --fill-n 10 --max-parallel 2 --commit --push --stop-after-push
//   Stop: Ctrl+C  OR  touch STOP  OR  --stop-after-push (after first successful push)
//
// Env: WORKER_MAX_PARALLEL WORKER_FILL WORKER_FILL_N WORKER_FILL_WHEN_BELOW
//      WORKER_COMMIT WORKER_PUSH WORKER_GH_PAGES WORKER_STOP_AFTER_PUSH WORKER_IDLE_MS WAIT_FOR_SLOT
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { modelSlug, hasRunDemo, listRuns, migrateLegacyRun, isAbandonedRun, repairStaleEntryPointers } from "./lib/runs.mjs";
import { fetchModelSlots, waitForIdleSlot } from "./lib/slots.mjs";
import { envFlag } from "./lib/helpers.mjs";
import { resolveAiConfig, walkEntries, updateMetaFields } from "./lib/provider.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const STOP_FILE = path.join(ROOT, "STOP");
const WORKER_DIR = path.join(ROOT, ".worker");
const STATE_FILE = path.join(WORKER_DIR, "state.json");
const STATUS_FILE = path.join(WORKER_DIR, "status.txt");

function parseCli(argv) {
  const out = {
    maxParallel: Number(process.env.WORKER_MAX_PARALLEL || 2),
    fill: envFlag("WORKER_FILL", false),
    fillN: Number(process.env.WORKER_FILL_N || 10),
    fillWhenBelow: Number(process.env.WORKER_FILL_WHEN_BELOW || 1),
    commit: envFlag("WORKER_COMMIT", false),
    push: envFlag("WORKER_PUSH", false),
    ghPages: envFlag("WORKER_GH_PAGES", false),
    stopAfterPush: envFlag("WORKER_STOP_AFTER_PUSH", false),
    statusOnly: false,
    category: null,
    sleepMs: Number(process.env.WORKER_IDLE_MS || 20000),
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--fill") out.fill = true;
    else if (a === "--commit") out.commit = true;
    else if (a === "--push") out.push = true;
    else if (a === "--gh-pages") out.ghPages = true;
    else if (a === "--stop-after-push") out.stopAfterPush = true;
    else if (a === "--status") out.statusOnly = true;
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
      pushes: 0,
      gh_pages: 0,
      cycles: 0,
    };
  }
}

function saveState(state) {
  fs.mkdirSync(WORKER_DIR, { recursive: true });
  state.updated_at = new Date().toISOString();
  // Cap failure log so status doesn't show absurd counts from retries
  if (Array.isArray(state.failed) && state.failed.length > 40) {
    state.failed = state.failed.slice(-40);
  }
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
}

function recordFailure(state, entry) {
  const key = `${entry.type}:${entry.id || entry.category || "?"}`;
  state.failed = (state.failed || []).filter(
    (f) => `${f.type}:${f.id || f.category || "?"}` !== key
  );
  state.failed.push(entry);
  saveState(state);
}

/** Track live children so STOP/SIGINT can SIGTERM them → stream holder aborts. */
const liveChildren = new Set();
let workerShutdownHooked = false;

function killAllChildren(sig = "SIGTERM") {
  for (const child of [...liveChildren]) {
    try {
      if (child.pid && !child.killed) {
        // Kill process group when detached; else the node child itself
        try {
          process.kill(-child.pid, sig);
        } catch {
          child.kill(sig);
        }
      }
    } catch {
      /* ignore */
    }
  }
}

function ensureWorkerShutdownHook() {
  if (workerShutdownHooked) return;
  workerShutdownHooked = true;
  const halt = (sig) => {
    console.error(`\n  ${sig} — killing child builds (close streams)…`);
    try {
      fs.writeFileSync(STOP_FILE, "1\n");
    } catch {
      /* ignore */
    }
    killAllChildren("SIGTERM");
    setTimeout(() => {
      killAllChildren("SIGKILL");
      process.exit(130);
    }, 500);
  };
  process.on("SIGINT", () => halt("SIGINT"));
  process.on("SIGTERM", () => halt("SIGTERM"));
}

/**
 * Spawn node script directly (not npm) so SIGTERM hits the process holding the fetch.
 * Uses a new process group on Unix so we can kill the whole tree.
 */
function runNodeScript(scriptRel, args = []) {
  ensureWorkerShutdownHook();
  return new Promise((resolve) => {
    const scriptPath = path.join(ROOT, "scripts", scriptRel);
    console.log(`\n▶ node scripts/${scriptRel} ${args.join(" ")}`);
    const child = spawn(process.execPath, [scriptPath, ...args], {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
      detached: process.platform !== "win32",
    });
    liveChildren.add(child);
    const clear = () => liveChildren.delete(child);
    child.on("exit", (code) => {
      clear();
      resolve(code ?? 1);
    });
    child.on("error", () => {
      clear();
      resolve(1);
    });
  });
}

function runNpm(script, args = []) {
  // LLM paths: go through node directly so abort reaches the stream holder
  if (script === "ai:build") {
    return runNodeScript("ai-build.mjs", args);
  }
  if (script === "ai:new" || script === "ai:fill") {
    return runNodeScript("ai-fill.mjs", args);
  }
  ensureWorkerShutdownHook();
  return new Promise((resolve) => {
    console.log(`\n▶ npm run ${script} ${args.join(" ")}`);
    const child = spawn("npm", ["run", script, "--", ...args], {
      cwd: ROOT,
      stdio: "inherit",
      shell: process.platform === "win32",
      env: process.env,
      detached: process.platform !== "win32",
    });
    liveChildren.add(child);
    const clear = () => liveChildren.delete(child);
    child.on("exit", (code) => {
      clear();
      resolve(code ?? 1);
    });
    child.on("error", () => {
      clear();
      resolve(1);
    });
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
    if (isAbandonedRun(e.dir, slug)) continue;
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

function pendingReviews(cfg, opts) {
  const slug = modelSlug(cfg.model);
  let entries = walkEntries(ROOT).filter((e) => e.status !== "archived");
  if (opts.category) entries = entries.filter((e) => e.category === opts.category);
  const out = [];
  for (const e of entries) {
    migrateLegacyRun(e.dir, "legacy");
    const runs = listRuns(e.dir, e.rel).filter(
      (r) =>
        r.slug === slug &&
        r.has_demo &&
        r.has_preview &&
        (r.review_score == null || !Number.isFinite(Number(r.review_score)))
    );
    if (runs.length) out.push(e);
  }
  return out;
}

/** Eligible entries + done/remaining for current model slug. */
function inventory(cfg, opts) {
  const slug = modelSlug(cfg.model);
  let entries = walkEntries(ROOT).filter((e) => e.status !== "archived");
  if (opts.category) entries = entries.filter((e) => e.category === opts.category);
  entries = entries.filter((e) => e.category !== "experiments");
  const builds = [];
  const done = [];
  for (const e of entries) {
    migrateLegacyRun(e.dir, "legacy");
    if (isAbandonedRun(e.dir, slug)) {
      done.push(e); // gave up — not in build queue
      continue;
    }
    if (hasRunDemo(e.dir, slug)) done.push(e);
    else builds.push(e);
  }
  const shots = pendingShots(opts);
  return {
    slug,
    total: entries.length,
    done: done.length,
    remaining: builds.length,
    shotQueue: shots.length,
    reviewQueue: pendingReviews(cfg, opts).length,
    builds,
    shots,
    nextBuild: builds.slice(0, 5).map((e) => e.id),
    nextShot: shots.slice(0, 5).map((e) => e.id),
    pct: entries.length
      ? Math.round((done.length / entries.length) * 100)
      : 100,
  };
}

function phaseFor(inv, opts) {
  if (inv.remaining > 0) return `BUILD next=${inv.nextBuild[0] || "—"}`;
  if (inv.shotQueue > 0) return `SHOTS next=${inv.nextShot[0] || "—"}`;
  if (inv.reviewQueue > 0) return `REVIEW ${inv.reviewQueue} pending`;
  if (opts.fill) return `FILL +${opts.fillN} prompts (catalog), then build again`;
  return "IDLE (no --fill)";
}

function formatStatus({ cfg, opts, state, inv, cycle }) {
  const lines = [
    `══ WORKER STATUS ${new Date().toISOString()} ══`,
    `model     ${cfg.model}  (api=${cfg.modelApi}  slug=${inv.slug})`,
    `progress  ${inv.done}/${inv.total} demos fertig  (${inv.pct}%)`,
    `queue     build=${inv.remaining}  shots=${inv.shotQueue}  review=${inv.reviewQueue}`,
    `next      ${phaseFor(inv, opts)}`,
    inv.nextBuild.length
      ? `upcoming  ${inv.nextBuild.join(", ")}`
      : inv.nextShot.length
        ? `upcoming  shots: ${inv.nextShot.join(", ")}`
        : `upcoming  —`,
    `session   cycles=${state.cycles || cycle || 0}  built=${(state.built || []).length}  filled=${state.filled || 0}  commits=${state.commits || 0}  pushes=${state.pushes || 0}  pages=${state.gh_pages || 0}  failed=${(state.failed || []).length}`,
    `stop      npm run stop`,
    `══════════════════════════════════════`,
  ];
  return lines.join("\n");
}

function reportProgress(cfg, opts, state, cycle) {
  const inv = inventory(cfg, opts);
  const text = formatStatus({ cfg, opts, state, inv, cycle });
  console.log("\n" + text);
  fs.mkdirSync(WORKER_DIR, { recursive: true });
  fs.writeFileSync(STATUS_FILE, text + "\n");
  return inv;
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
        recordFailure(state, {
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
      ".github",
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
  if (commit.status !== 0) {
    console.warn("  commit failed (hooks?). Fix or SKIP_COMPLETE_CHECK=1 once.");
    return false;
  }
  state.commits += 1;
  saveState(state);
  console.log("  ✓ committed");
  return true;
}

function tryPush(state, opts) {
  if (!opts.push) return false;
  const push = spawnSync("git", ["push"], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });
  if (push.status === 0) {
    state.pushes = (state.pushes || 0) + 1;
    saveState(state);
    console.log("  ✓ pushed");
    return true;
  }
  console.warn("  push failed — fix remote/auth and push manually");
  return false;
}

/** After push: rebuild site locally + trigger GitHub Pages workflow. */
function tryGhPages(state, opts, { pushed }) {
  if (!opts.ghPages) return false;
  if (opts.push && !pushed) {
    console.warn("  gh-pages skipped — need a successful --push first");
    return false;
  }
  console.log("\n▶ gh-pages deploy…");
  const code = spawnSync(
    process.execPath,
    [path.join(ROOT, "scripts", "deploy-pages.mjs")],
    { cwd: ROOT, stdio: "inherit", env: process.env }
  );
  if (code.status === 0) {
    state.gh_pages = (state.gh_pages || 0) + 1;
    saveState(state);
    console.log("  ✓ gh-pages triggered");
    return true;
  }
  console.warn("  gh-pages deploy failed (workflow / Pages settings?)");
  return false;
}

async function main() {
  const opts = parseCli(process.argv.slice(2));
  const cfg = resolveAiConfig(ROOT, { requireKey: !opts.statusOnly });
  const state = loadState();
  const slug = modelSlug(cfg.model);

  if (opts.statusOnly) {
    reportProgress(cfg, opts, state, state.cycles);
    process.exit(0);
  }

  if (!cfg.apiKey) {
    console.error("Missing AI_API_KEY in .env — refuse to start worker");
    process.exit(1);
  }

  console.log("🤖 worker — multi-day loop");
  console.log(`   model=${cfg.model} api=${cfg.modelApi} slug=${slug}`);
  console.log(
    `   parallel≤${opts.maxParallel} fill=${opts.fill} fill-n=${opts.fillN} ` +
      `when-below=${opts.fillWhenBelow} commit=${opts.commit} push=${opts.push}` +
      ` gh-pages=${opts.ghPages} stop-after-push=${opts.stopAfterPush}`
  );
  console.log(
    `   stop: touch STOP  or Ctrl+C` +
      (opts.stopAfterPush ? "  or after first successful push" : "")
  );
  console.log(`   status: npm run worker:status   OR   cat .worker/status.txt`);
  console.log(`   state: ${path.relative(ROOT, STATE_FILE)}`);

  // Preflight for shots (builds continue if no browser yet)
  try {
    const { ensurePlaywrightSoft } = await import("./lib/playwright-ensure.mjs");
    const browser = await ensurePlaywrightSoft();
    if (browser.ok) {
      console.log(`   playwright: ok (${browser.mode})`);
    } else {
      console.warn(
        "   playwright: no browser yet — builds continue, shots deferred"
      );
    }
  } catch (err) {
    console.warn(`   playwright: ${err.message} — builds continue, shots deferred`);
  }

  {
    const n = repairStaleEntryPointers(walkEntries(ROOT), updateMetaFields);
    if (n) console.log(`   repaired ${n} stale entry meta pointer(s)`);
  }

  if (fs.existsSync(STOP_FILE)) {
    fs.unlinkSync(STOP_FILE);
    console.log("   cleared existing STOP file");
  }

  // Poll STOP → kill children so the in-flight stream closes immediately
  const stopWatch = setInterval(() => {
    if (!fs.existsSync(STOP_FILE)) return;
    if (liveChildren.size === 0) return;
    console.error("\n  STOP — killing in-flight builds (close streams)…");
    killAllChildren("SIGTERM");
  }, 1000);
  stopWatch.unref?.();

  while (!shouldStop()) {
    state.cycles += 1;
    saveState(state);

    repairStaleEntryPointers(walkEntries(ROOT), updateMetaFields);

    let builds = pendingBuilds(cfg, opts);
    let shots = pendingShots(opts);
    let didWork = false;
    let filledThis = 0;

    const inv = reportProgress(cfg, opts, state, state.cycles);
    builds = inv.builds;
    shots = inv.shots;

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
          recordFailure(state, {
            type: "build",
            id: e.id,
            at: new Date().toISOString(),
          });
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
          recordFailure(state, {
            type: "shots",
            id: e.id,
            at: new Date().toISOString(),
          });
        }
      }
      await runNpm("pages", []);
      repairStaleEntryPointers(walkEntries(ROOT), updateMetaFields);
      await runNpm("build", []);
      didWork = true;
    }

    // 2b) Vision score → run meta → README (not a pass/fail gate)
    let reviews = pendingReviews(cfg, opts);
    let reviewFailed = false;
    if (reviews.length && !shouldStop()) {
      const code = await runNpm("review", ["--missing"]);
      repairStaleEntryPointers(walkEntries(ROOT), updateMetaFields);
      await runNpm("build", []);
      didWork = true;
      if (code !== 0) {
        reviewFailed = true;
        recordFailure(state, {
          type: "review",
          id: "batch",
          at: new Date().toISOString(),
        });
      }
      reviews = pendingReviews(cfg, opts);
    }

    builds = pendingBuilds(cfg, opts);
    shots = pendingShots(opts);

    // 3) Only invent new prompts when this model's backlog is drained
    if (
      opts.fill &&
      builds.length < opts.fillWhenBelow &&
      shots.length === 0 &&
      reviews.length === 0 &&
      !shouldStop()
    ) {
      filledThis = await runFill(cfg, opts.fillN, state);
      if (filledThis > 0) didWork = true;
      builds = pendingBuilds(cfg, opts);
    }

    // 4) Commit when completed work is stable (shots+scores done).
    // Remaining builds may continue; abandoned are not in the build queue.
    if (didWork && !shouldStop()) {
      builds = pendingBuilds(cfg, opts);
      shots = pendingShots(opts);
      const stillUnscored = pendingReviews(cfg, opts);
      if (shots.length || stillUnscored.length || reviewFailed) {
        console.warn(
          `  commit/push skipped — shots=${shots.length} unscored=${stillUnscored.length}` +
            (builds.length ? ` build=${builds.length}` : "") +
            (reviewFailed ? " (review errors)" : "")
        );
      } else {
        const summary = [
          filledThis ? `+${filledThis} prompts` : null,
          state.built.length ? `builds ok` : null,
          builds.length ? `${builds.length} builds left` : "queue clear",
          `model ${cfg.model}`,
        ]
          .filter(Boolean)
          .join(", ");
        tryCommit(state, opts, summary || "progress");
        const pushed = tryPush(state, opts);
        tryGhPages(state, opts, { pushed });
        if (opts.stopAfterPush && pushed) {
          fs.writeFileSync(STOP_FILE, "stop-after-push\n");
          console.log("  stop-after-push: STOP written — exiting after this cycle");
        }
      }
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

  clearInterval(stopWatch);
  killAllChildren("SIGTERM");
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
