#!/usr/bin/env node
// review.mjs — vision SCORE of runs/<model>/preview.png vs brief → meta + README
// Does NOT gate commits. Hard validate is build/shots (assertDemoHtmlOk / broken-page).
//
//   npm run review
//   npm run review -- --id vector-harbor-magnetic-nav
//   npm run review -- --missing   # only runs without a score yet
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  modelSlug,
  listRuns,
  readRunMeta,
  writeRunMeta,
  migrateLegacyRun,
  rebuildBelowScore,
  rejectRunForRebuild,
  syncEntryPointers,
} from "./lib/runs.mjs";
import {
  resolveAiConfig,
  chatCompletions,
  walkEntries,
  updateMetaFields,
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
    limit: Infinity,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--missing") out.missing = true;
    else if (a === "--force") out.force = true;
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
  const floor = rebuildBelowScore();

  if (score < floor) {
    const rej = rejectRunForRebuild(run.dir, {
      reason: `score_${score}_below_${floor}`,
      model: run.model,
      model_slug: run.slug,
      provider: run.provider || cfg.provider,
      review_score: score,
      review_summary: summary,
      review_issues: issues,
    });
    syncEntryPointers(entry.dir, entry.rel, entry.metaPath, updateMetaFields);
    console.log(
      `  ✗ score=${score}/10 < ${floor} → ${rej.status} attempt ${rej.attempts}/${rej.max}` +
        (summary ? ` — ${summary}` : "")
    );
    if (issues.length) console.log(`    issues: ${issues.join("; ")}`);
    return { score, summary, issues, rebuilt: true, abandoned: rej.abandoned };
  }

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

function collectJobs(args, onlySlug) {
  let entries = walkEntries(ROOT).filter((e) => e.status !== "archived");
  if (args.category) entries = entries.filter((e) => e.category === args.category);
  if (args.id) entries = entries.filter((e) => e.id === args.id);
  const jobs = [];
  for (const entry of entries) {
    migrateLegacyRun(entry.dir, "legacy");
    let runs = listRuns(entry.dir, entry.rel).filter((r) => r.has_demo && r.has_preview);
    if (onlySlug) runs = runs.filter((r) => r.slug === onlySlug);
    for (const run of runs) {
      if (!args.force) {
        if (args.missing && !needsScore(run)) continue;
        if (!args.missing && !needsScore(run)) continue;
      }
      jobs.push({ entry, run });
    }
  }
  return jobs.slice(0, args.limit);
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
  const filtered = args.id ? collectJobs(args, null) : collectJobs(args, slug);

  if (!filtered.length) {
    console.log("Nothing to score (need demo+preview; use --missing or --force).");
    return;
  }

  console.log(
    `Scoring ${filtered.length} run(s) via api=${cfg.modelApi} (rebuild if score < ${rebuildBelowScore()})`
  );
  let ok = 0;
  let rebuilt = 0;
  let fail = 0;
  for (const { entry, run } of filtered) {
    try {
      const r = await reviewRun(cfg, entry, run);
      if (r.rebuilt) rebuilt += 1;
      else ok += 1;
    } catch (err) {
      fail += 1;
      console.error(`  FAIL ${entry.rel}/${run.slug}: ${err.message}`);
    }
  }
  console.log(`Score done: ok=${ok} rebuild=${rebuilt} fail=${fail}`);
  if (fail) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
