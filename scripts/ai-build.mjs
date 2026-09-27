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
- Follow the prompt art direction precisely (brand first, no hero cards/badges, expressive type, atmospheric background, 2–3 motions, prefers-reduced-motion)
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
  console.log(`Building ${entry.rel} → runs/${slug}/ (${cfg.model}) [timeout 1h, no mid-job retry]`);
  const content = await chatCompletions({
    ...cfg,
    messages: buildMessages(entry, cfg.model),
    temperature: 0.65,
    jsonMode: false,
    timeoutMs: ONE_HOUR_MS,
    queueRetries: 10,
    heartbeatMs: 30_000,
  });
  const html = extractHtmlDocument(content);
  if (dryRun) {
    console.log(`  dry-run OK (${html.length} chars)`);
    return;
  }
  const dest = runDir(entry.dir, slug);
  const demoFile = path.join(dest, "demo", "index.html");
  fs.mkdirSync(path.dirname(demoFile), { recursive: true });
  fs.writeFileSync(demoFile, html);
  writeRunMeta(dest, {
    model: cfg.model,
    model_slug: slug,
    provider: cfg.provider,
    demo: "demo/index.html",
    preview: null,
  });
  // Point entry defaults at this latest run (shots will set preview.png)
  updateMetaFields(entry.metaPath, {
    default_run: slug,
    demo: path.posix.join("runs", slug, "demo/index.html"),
  });
  console.log(`  wrote ${entry.rel}/runs/${slug}/demo/index.html`);
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
    entries = entries.filter((e) => !hasRunDemo(e.dir, slug));
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
    }
  }
  console.log(`\nDone. ok=${ok} fail=${fail}`);
  if (fail) process.exit(1);
}

main().catch((e) => die(e.stack || e.message));
