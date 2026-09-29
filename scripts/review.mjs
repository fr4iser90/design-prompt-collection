#!/usr/bin/env node
// review.mjs — vision SCORE of runs/<model>/preview.png vs brief → meta + README
// One-shot: never deletes demos or triggers rebuild based on score.
// Broken-page rejects stay in shots.mjs only.
//
//   npm run review
//   npm run review -- --id vector-harbor-magnetic-nav
//   npm run review -- --missing        # only runs without a score yet
//   npm run review -- --force          # re-score all (uses existing previews)
//   npm run review -- --force --ensure-shots
//       # if preview missing → run shots first, then score (default ON)
//   npm run review -- --no-shots       # never call shots; skip runs without preview
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  modelSlug,
  listRuns,
  readRunMeta,
  writeRunMeta,
} from "./lib/runs.mjs";
import {
  resolveAiConfig,
  chatCompletions,
  walkEntries,
  ONE_HOUR_MS,
} from "./lib/provider.mjs";
import { CATEGORIES } from "./lib/helpers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function die(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

function parseCli(argv) {
  const out = {
    category: null,
    id: null,
    missing: false,
    force: false,
    ensureShots: true,
    limit: Infinity,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--missing") out.missing = true;
    else if (a === "--force") out.force = true;
    else if (a === "--ensure-shots") out.ensureShots = true;
    else if (a === "--no-shots") out.ensureShots = false;
    else if (a === "--category" || a === "-c") out.category = argv[++i];
    else if (a === "--id" || a === "-i") out.id = argv[++i];
    else if (a === "--limit" || a === "-n") out.limit = Number(argv[++i]);
  }
  return out;
}

function extractJsonObject(text) {
  const trimmed = String(text || "").trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fence ? fence[1].trim() : trimmed;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object in review response");
  return JSON.parse(raw.slice(start, end + 1));
}

function buildReviewMessages({ entry, prompt, previewPath }) {
  const b64 = fs.readFileSync(previewPath).toString("base64");
  const dataUrl = `data:image/png;base64,${b64}`;
  const animNote =
    entry.category === "animations"
      ? `
ANIMATION CATEGORY (static screenshot):
- Do NOT deduct for motion/entrance/ambient/magnetic effects that cannot appear in a still frame
- Do NOT list "motion not visible", "no stagger", "no magnetic field" as issues
- Score composition, brand, type, palette, layout, and UI fidelity as frozen in the shot`
      : "";
  const system = `You score design screenshots honestly for a prompt collection benchmark.

Rate 1–10 against the brief + these rules (low if violated):
- Brand/product name is a hero-level signal (not only nav) — hard fail if missing from first viewport
- First viewport is one composition (not a dashboard dump)
- No hero cards / floating badges / promo chips on hero media
- Expressive type (not Inter/Roboto/Arial/system as display)
- Atmospheric background (not flat single color)
- Landing/promo: full-bleed hero visual, not inset card collage
- Avoid purple-glow SaaS and cream+terracotta clichés unless brief asks
- Blank, broken, white, or thinking/prose-as-page → very low (1–3)
${animNote}

Do NOT inflate. Garbage looks like garbage. Mediocre stays mid. Strong work earns 7+.

Return ONLY JSON:
{
  "score": <number 1-10>,
  "summary": "<one honest line>",
  "issues": ["<short>", "..."]
}`;

  const userText = `Category: ${entry.category}
Title: ${entry.title}
Id: ${entry.id}
Tags: ${(entry.tags || []).join(", ")}

# Brief (prompt.md)
${prompt.slice(0, 6000)}

Score the attached screenshot. JSON only.`;

  return [
    { role: "system", content: system },
    {
      role: "user",
      content: [
        { type: "text", text: userText },
        { type: "image_url", image_url: { url: dataUrl } },
      ],
    },
  ];
}

async function reviewRun(cfg, entry, run) {
  if (!run.preview_abs || !fs.existsSync(run.preview_abs)) {
    throw new Error("missing preview.png");
  }
  const promptPath = path.join(entry.dir, entry.prompt || "prompt.md");
  const prompt = fs.existsSync(promptPath)
    ? fs.readFileSync(promptPath, "utf8")
    : "";

  console.log(`Scoring ${entry.rel}/runs/${run.slug}…`);
  // Gufo/onprem does not implement response_format — JSON via prompt + parse
  const result = await chatCompletions({
    ...cfg,
    messages: buildReviewMessages({
      entry,
      prompt,
      previewPath: run.preview_abs,
    }),
    temperature: 0.2,
    jsonMode: false,
    stream: false,
    thinkingEnabled: Boolean(cfg.thinkingEnabled),
    timeoutMs: Math.min(ONE_HOUR_MS, 10 * 60 * 1000),
    queueRetries: 6,
  });

  const parsed = extractJsonObject(result.content);
  let score = Number(parsed.score);
  if (!Number.isFinite(score)) throw new Error("review missing numeric score");
  score = Math.max(1, Math.min(10, Math.round(score * 10) / 10));
  const summary = String(parsed.summary || "").trim().slice(0, 220);
  const issues = Array.isArray(parsed.issues)
    ? parsed.issues.map((x) => String(x).trim()).filter(Boolean).slice(0, 8)
    : [];

  const prev = readRunMeta(run.dir) || {};

  // One-shot: never delete/rebuild demos based on vision score.
  writeRunMeta(run.dir, {
    ...prev,
    model: run.model,
    model_slug: run.slug,
    model_api: result.model_api || cfg.modelApi || prev.model_api,
    provider: run.provider || cfg.provider,
    engine: run.engine || cfg.engine || prev.engine || null,
    engine_link: run.engine_link || cfg.engineLink || prev.engine_link || null,
    demo: run.demo_name || "demo/index.html",
    preview: run.preview_name || "preview.png",
    status: "ok",
    // Keep build benchmarks — do not overwrite with review-call timings/tokens
    thinking_enabled: prev.thinking_enabled ?? result.thinking_enabled ?? null,
    context_tokens: prev.context_tokens ?? null,
    duration_ms: prev.duration_ms ?? null,
    gen_ms: prev.gen_ms ?? prev.duration_ms ?? null,
    ttft_ms: prev.ttft_ms ?? null,
    queue_wait_ms: prev.queue_wait_ms ?? null,
    wall_ms: prev.wall_ms ?? null,
    prompt_tokens: prev.prompt_tokens ?? null,
    completion_tokens: prev.completion_tokens ?? null,
    total_tokens: prev.total_tokens ?? null,
    review_score: score,
    review_summary: summary,
    review_issues: issues,
    reviewed_at: new Date().toISOString(),
    reject_reason: null,
  });

  console.log(
    `  ✓ score=${score}/10` + (summary ? ` — ${summary}` : "")
  );
  if (issues.length) console.log(`    issues: ${issues.join("; ")}`);
  return { score, summary, issues, rebuilt: false, abandoned: false };
}

function needsScore(run) {
  return run.review_score == null || !Number.isFinite(Number(run.review_score));
}

/** Runs that should be considered for scoring (demo required; preview optional until ensure). */
function collectCandidates(args, onlySlug) {
  let entries = walkEntries(ROOT).filter((e) => e.status !== "archived");
  if (args.category) entries = entries.filter((e) => e.category === args.category);
  if (args.id) entries = entries.filter((e) => e.id === args.id);
  const jobs = [];
  for (const entry of entries) {
    let runs = listRuns(entry.dir, entry.rel).filter((r) => r.has_demo);
    if (onlySlug) runs = runs.filter((r) => r.slug === onlySlug);
    for (const run of runs) {
      if (!args.force) {
        if (!needsScore(run)) continue;
      }
      jobs.push({ entry, run });
    }
  }
  return jobs.slice(0, args.limit);
}

function ensureMissingShots(jobs) {
  const missing = jobs.filter((j) => !j.run.has_preview);
  if (!missing.length) return;

  console.log(
    `Missing preview for ${missing.length} run(s) — running shots first…`
  );
  // Prefer per-id when few/unique; otherwise --missing for the whole tree.
  const ids = [...new Set(missing.map((j) => j.entry.id))];
  const args =
    ids.length === 1
      ? ["--id", ids[0], "--missing"]
      : ["--missing"];

  const r = spawnSync(
    process.execPath,
    [path.join(ROOT, "scripts", "shots.mjs"), ...args],
    {
      cwd: ROOT,
      encoding: "utf8",
      stdio: "inherit",
      env: process.env,
      shell: process.platform === "win32",
    }
  );
  if (r.status !== 0) {
    console.warn(
      `  shots exited ${r.status} — continuing with whatever previews exist`
    );
  }

  // Refresh has_preview flags from disk
  for (const job of missing) {
    const preview = path.join(job.run.dir, "preview.png");
    job.run.has_preview = fs.existsSync(preview);
    job.run.preview_abs = job.run.has_preview ? preview : null;
    job.run.preview_name = job.run.has_preview ? "preview.png" : null;
  }
}

async function main() {
  const args = parseCli(process.argv.slice(2));
  if (args.category && !CATEGORIES.includes(args.category)) die("bad --category");

  let cfg;
  try {
    cfg = resolveAiConfig(ROOT);
  } catch (e) {
    die(e.message);
  }
  if (process.env.REVIEW_MODEL) cfg = { ...cfg, modelApi: process.env.REVIEW_MODEL };
  if (process.env.REVIEW_MODEL_API) {
    cfg = { ...cfg, modelApi: process.env.REVIEW_MODEL_API };
  }

  const slug = modelSlug(cfg.model);
  let filtered = args.id ? collectCandidates(args, null) : collectCandidates(args, slug);

  if (!filtered.length) {
    console.log(
      "Nothing to score (need demos; use --missing / --force, or build first)."
    );
    return;
  }

  if (args.ensureShots) {
    ensureMissingShots(filtered);
  }

  filtered = filtered.filter((j) => j.run.has_preview);
  if (!filtered.length) {
    console.log(
      "Nothing to score — no preview.png (run shots, or drop --no-shots)."
    );
    return;
  }

  console.log(
    `Scoring ${filtered.length} run(s) via api=${cfg.modelApi} (one-shot — no score rebuild)` +
      (args.force ? " [force]" : "")
  );
  let ok = 0;
  let fail = 0;
  for (const { entry, run } of filtered) {
    try {
      await reviewRun(cfg, entry, run);
      ok += 1;
    } catch (err) {
      fail += 1;
      console.error(`  FAIL ${entry.rel}/${run.slug}: ${err.message}`);
    }
  }
  console.log(`Score done: ok=${ok} fail=${fail}`);
  if (fail) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
