#!/usr/bin/env node
// ai-build.mjs — implement prompt as runs/<model-slug>/demo/index.html
//
//   npm run ai:build
//   npm run ai:build -- --id tidal-studio-hero
//   npm run ai:build -- --force          # rebuild THIS model run only
//   npm run ai:build -- --model other-id # override .env model for this run
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  resolveAiConfig,
  chatCompletions,
  walkEntries,
  updateMetaFields,
  extractHtmlDocument,
  ONE_HOUR_MS,
} from "./lib/provider.mjs";
import { CATEGORIES } from "./lib/helpers.mjs";
import {
  modelSlug,
  runDir,
  writeRunMeta,
  hasRunDemo,
  migrateLegacyRun,
  recordBuildFailure,
  syncEntryPointers,
  isAbandonedRun,
} from "./lib/runs.mjs";

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
    force: false,
    limit: Infinity,
    dryRun: false,
    model: null,
    apiModel: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--force") out.force = true;
    else if (a === "--dry-run") out.dryRun = true;
    else if (a === "--category" || a === "-c") out.category = argv[++i];
    else if (a === "--id" || a === "-i") out.id = argv[++i];
    else if (a === "--limit" || a === "-n") out.limit = Number(argv[++i]);
    else if (a === "--model") out.model = argv[++i];
    else if (a === "--api-model") out.apiModel = argv[++i];
  }
  return out;
}

function buildMessages(entry, model) {
  const prompt = fs.readFileSync(path.join(entry.dir, "prompt.md"), "utf8");
  const full = fs.readFileSync(path.join(entry.dir, "prompt.full.md"), "utf8");

  const system = `You are an elite front-end designer-engineer.
Build a single self-contained HTML file that executes the design prompt.

HARD OUTPUT RULES:
- Return ONLY one full HTML5 document starting with <!DOCTYPE html>
- No markdown fences, no commentary
- Inline <style> and <script> only — no external JS frameworks, no build step
- Google Fonts <link> is allowed (max 2 families)
- Must look production-ready in a 1200×630 viewport AND on mobile
- BRAND: the exact brand/product name from the brief must appear as a hero-level signal in the first viewport (large type or dominant wordmark — not only tiny nav text). If the brief names a brand, render that string visibly.
- Follow the prompt art direction precisely (no hero cards/badges, expressive type, atmospheric background, 2–3 motions, prefers-reduced-motion)
- Avoid purple-glow SaaS and cream+terracotta clichés unless the brief asks for them
- Output is stored under runs/<model>/demo/index.html and screenshotted for README`;

  const user = `Category: ${entry.category}
Title: ${entry.title}
Id: ${entry.id}
Builder model: ${model}
Tags: ${(entry.tags || []).join(", ")}

# prompt.md
${prompt}

# prompt.full.md
${full}

Produce the complete index.html now.`;

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}

async function buildOne(cfg, entry, { dryRun, slug }) {
  const mode = [
    cfg.stream ? "stream" : "oneshot",
    cfg.thinkingEnabled ? "thinking=on" : "thinking=off",
    "timeout=1h",
  ].join(", ");
  console.log(`Building ${entry.rel} → runs/${slug}/ (${cfg.model}) [${mode}]`);
  const result = await chatCompletions({
    ...cfg,
    messages: buildMessages(entry, cfg.model),
    temperature: 0.65,
    jsonMode: false,
    stream: cfg.stream !== false,
    thinkingEnabled: Boolean(cfg.thinkingEnabled),
    timeoutMs: ONE_HOUR_MS,
    queueRetries: 10,
    heartbeatMs: 30_000,
  });
  const content = result.content;
  const html = extractHtmlDocument(content);
  if (dryRun) {
    console.log(
      `  dry-run OK (${html.length} chars, ${Math.round(result.duration_ms / 1000)}s)`
    );
    return;
  }
  const dest = runDir(entry.dir, slug);
  const demoFile = path.join(dest, "demo", "index.html");
  fs.mkdirSync(path.dirname(demoFile), { recursive: true });
  fs.writeFileSync(demoFile, html);
  writeRunMeta(dest, {
    model: cfg.model,
    model_slug: slug,
    model_api: result.model_api || cfg.modelApi || cfg.model,
    provider: cfg.provider,
    engine: cfg.engine || null,
    engine_link: cfg.engineLink || null,
    demo: "demo/index.html",
    preview: null,
    status: "built",
    reject_reason: null,
    thinking_enabled: result.thinking_enabled,
    stream: result.stream,
    temperature: result.temperature,
    context_tokens: result.context_tokens,
    duration_ms: result.duration_ms,
    prompt_tokens: result.prompt_tokens,
    completion_tokens: result.completion_tokens,
    // fresh build — clear live score so review runs again
    review_score: null,
    review_summary: null,
    review_issues: [],
    reviewed_at: null,
  });
  // drop stale live preview if any (rejected evidence kept as preview.rejected.png)
  const stalePreview = path.join(dest, "preview.png");
  if (fs.existsSync(stalePreview)) {
    try {
      fs.unlinkSync(stalePreview);
    } catch {
      /* ignore */
    }
  }
  // Point entry defaults at this latest run (shots will set preview.png)
  updateMetaFields(entry.metaPath, {
    default_run: slug,
    demo: path.posix.join("runs", slug, "demo/index.html"),
    preview: null,
  });
  const secs = Math.round(result.duration_ms / 1000);
  const think = result.thinking_enabled ? "on" : "off";
  console.log(
    `  wrote ${entry.rel}/runs/${slug}/demo/index.html (${secs}s, thinking=${think}` +
      (result.context_tokens != null ? `, ctx=${result.context_tokens}` : "") +
      ")"
  );
}

async function main() {
  const args = parseCli(process.argv.slice(2));
  if (args.category && !CATEGORIES.includes(args.category)) {
    die(`--category must be one of: ${CATEGORIES.join(", ")}`);
  }

  let cfg;
  try {
    cfg = resolveAiConfig(ROOT);
  } catch (e) {
    die(e.message);
  }
  if (args.model) cfg = { ...cfg, model: args.model };
  if (args.apiModel) cfg = { ...cfg, modelApi: args.apiModel };
  const slug = modelSlug(cfg.model);

  let entries = walkEntries(ROOT);
  if (args.category) entries = entries.filter((e) => e.category === args.category);
  if (args.id) entries = entries.filter((e) => e.id === args.id);
  entries = entries.filter((e) => e.status !== "archived");

  for (const e of entries) migrateLegacyRun(e.dir, "legacy");

  if (!args.force) {
    entries = entries.filter(
      (e) => !hasRunDemo(e.dir, slug) && !isAbandonedRun(e.dir, slug)
    );
  }
  entries = entries.slice(0, args.limit);

  if (!entries.length) {
    console.log(
      `Nothing to build for model "${cfg.model}" (slug=${slug}). Use --force to rebuild this model run.`
    );
    return;
  }

  console.log(
    `Provider=${cfg.provider} label=${cfg.model} api=${cfg.modelApi || cfg.model} slug=${slug} building ${entries.length}`
  );

  let ok = 0;
  let fail = 0;
  for (const entry of entries) {
    try {
      await buildOne(cfg, entry, { dryRun: args.dryRun, slug });
      ok++;
    } catch (err) {
      fail++;
      console.error(`  FAIL ${entry.rel}: ${err.message}`);
      if (!args.dryRun) {
        const dest = runDir(entry.dir, slug);
        const rej = recordBuildFailure(dest, {
          reason: `build_fail:${String(err.message).slice(0, 120)}`,
          model: cfg.model,
          model_slug: slug,
          provider: cfg.provider,
        });
        syncEntryPointers(entry.dir, entry.rel, entry.metaPath, updateMetaFields);
        console.warn(
          `  → ${rej.status} attempt ${rej.attempts}/${rej.max}` +
            (rej.abandoned ? " (give up)" : "")
        );
      }
    }
  }
  console.log(`\nDone. ok=${ok} fail=${fail}`);
  if (fail) process.exit(1);
}

main().catch((e) => die(e.stack || e.message));
