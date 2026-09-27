#!/usr/bin/env node
// ai-fill.mjs / ai:new — high-quality prompt generation via .env provider
//
// Always loads catalog.json (domains, brands, tags, niches) to avoid overlaps.
// Steer each run with --mood / --lane / --seed / --avoid / --brief.
//
//   npm run ai:new -- -c landing-pages -n 3
//   npm run ai:new -- -c animations -n 3 --mood "brutal kinetic type"
//   npm run ai:new -- -c concepts -n 2 --lane arid-minimal --seed 42
//   npm run ai:new -- --all -n 2 --avoid "fintech,ocean,parallax"
//   npm run ai:lanes
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  CATEGORIES,
  PROVIDER_BASES,
  loadEnvFile,
  parseArgs,
  writeEntry,
  today,
} from "./lib/helpers.mjs";
import {
  buildCatalog,
  writeCatalog,
  maxSimilarity,
  pickLane,
  listLanes,
  seedToInt,
  LANES,
} from "./lib/catalog.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function die(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

function resolveConfig() {
  loadEnvFile(path.join(ROOT, ".env"));
  const provider = (process.env.AI_PROVIDER || "openrouter").toLowerCase();
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  const model = process.env.AI_MODEL;
  const modelApi = process.env.AI_MODEL_API || model;
  let baseUrl = process.env.AI_BASE_URL || PROVIDER_BASES[provider];

  if (!apiKey) {
    die("Missing AI_API_KEY in .env (copy .env.example → .env)");
  }
  if (!model) die("Missing AI_MODEL in .env");
  if (!baseUrl) {
    die(
      `Unknown AI_PROVIDER="${provider}". Use openai|openrouter|groq|custom + AI_BASE_URL`
    );
  }
  return {
    provider,
    apiKey,
    model,
    modelApi,
    baseUrl: baseUrl.replace(/\/$/, ""),
  };
}

function ensureCatalog() {
  const catalogPath = path.join(ROOT, "catalog.json");
  if (!fs.existsSync(catalogPath) || !fs.existsSync(path.join(ROOT, "index.json"))) {
    console.log("Building catalog…");
    const build = spawnSync("npm", ["run", "generate"], {
      cwd: ROOT,
      encoding: "utf8",
      shell: process.platform === "win32",
    });
    if (build.status !== 0) {
      if (build.stderr) process.stderr.write(build.stderr);
      die("Failed to generate catalog");
    }
  }
  return buildCatalog(ROOT);
}

function extractJson(text) {
  const trimmed = text.trim();
  const tryParse = (s) => JSON.parse(s);
  try {
    return tryParse(trimmed);
  } catch {
    /* continue */
  }
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return tryParse(fence[1].trim());
  const objStart = trimmed.indexOf("{");
  const objEnd = trimmed.lastIndexOf("}");
  if (objStart !== -1 && objEnd > objStart) {
    return tryParse(trimmed.slice(objStart, objEnd + 1));
  }
  const start = trimmed.indexOf("[");
  const end = trimmed.lastIndexOf("]");
  if (start !== -1 && end > start) return tryParse(trimmed.slice(start, end + 1));
  throw new Error("Model response was not valid JSON");
}

function catalogBrief(catalog, category) {
  const catEntries = catalog.by_category?.[category] || [];
  const otherNiches = catalog.niches.filter((n) => !n.startsWith(`${category}:`));
  const lines = [
    `## Occupied niches in ${category} (${catEntries.length})`,
    ...catEntries.map(
      (e) =>
        `- [${e.id}] ${e.title} | tags: ${(e.tags || []).join(", ")} | brands: ${(e.brands || []).join(", ") || "—"} | ${e.summary}`
    ),
    "",
    `## Other categories (avoid cross-copying the same idea)`,
    ...otherNiches.slice(0, 40).map((n) => `- ${n}`),
    "",
    `## Used ids (never reuse): ${catalog.ids.join(", ") || "(none)"}`,
    `## Used brands (invent new ones): ${catalog.brands.join(", ") || "(none)"}`,
    `## Hot tags (do not just reshuffle these): ${Object.keys(catalog.tag_frequency || {})
      .slice(0, 40)
      .join(", ") || "(none)"}`,
  ];
  return lines.join("\n");
}

function buildSystemPrompt() {
  const agents = fs.readFileSync(path.join(ROOT, "AGENTS.md"), "utf8");
  return `You generate high-refined design prompt entries for a curated collection.

Return ONLY JSON:
{ "entries": [ /* items */ ] }

Item shape:
{
  "id": "kebab-case-unique",
  "title": "Human Title",
  "tags": ["kebab", "tags"],
  "summary": "20-220 char teaser",
  "colors": ["#111111", "#222222", "#aabbcc"],
  "prompt_md": "short executable prompt markdown starting with # Title",
  "prompt_full_md": "extended brief markdown starting with # Title — Extended"
}

ANTI-OVERLAP (critical):
- Read the catalog of existing niches/brands/tags in the user message.
- Do NOT produce near-duplicates (same industry + same visual gag + same motion trope).
- New brand names required when a brand is used. Never reuse catalog brands.
- Prefer orthogonal domains (new industry, material, culture, or motion language).

Rules from AGENTS.md:
${agents}

Quality:
- prompt_md substantial; prompt_full_md deep art direction
- tags: 3–8 fresh kebab-case (avoid only reshuffling hot tags)
- colors: 3 hex matching mood
- No Inter/Roboto/Arial/system; no purple-glow SaaS / cream-terracotta clichés unless steered there
- No {{placeholders}}`;
}

function buildUserPrompt({
  category,
  count,
  themes,
  catalog,
  lane,
  mood,
  avoid,
  brief,
  seed,
}) {
  const themeLine = themes
    ? `Forced themes (one entry each):\n${themes
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t, i) => `${i + 1}. ${t}`)
        .join("\n")}`
    : `Invent ${count} DISTINCT high-quality concepts for this category.`;

  const parts = [
    `Category: ${category}`,
    `Count: ${
      themes
        ? themes.split(",").map((s) => s.trim()).filter(Boolean).length
        : count
    }`,
    `Run seed: ${seed}`,
    `Creative lane: ${lane.id} — ${lane.brief}`,
    mood ? `Extra mood / direction: ${mood}` : null,
    avoid
      ? `Explicitly avoid (topics, tropes, industries): ${avoid}`
      : null,
    brief ? `Operator brief:\n${brief}` : null,
    "",
    themeLine,
    "",
    catalogBrief(catalog, category),
    "",
    `Return JSON { "entries": [...] } only.`,
  ];
  return parts.filter((p) => p !== null).join("\n");
}

async function chatCompletions({
  baseUrl,
  apiKey,
  model,
  modelApi,
  provider,
  messages,
  temperature,
  jsonMode = true,
}) {
  const url = `${baseUrl}/chat/completions`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  if (provider === "openrouter") {
    headers["HTTP-Referer"] = "https://github.com/local/design-prompt-collection";
    headers["X-Title"] = "design-prompt-collection";
  }

  const body = {
    model: modelApi || model,
    temperature: temperature ?? 0.9,
    messages,
  };
  if (jsonMode) body.response_format = { type: "json_object" };

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const raw = await res.text();
  if (!res.ok) {
    const err = new Error(`Provider HTTP ${res.status}: ${raw.slice(0, 800)}`);
    err.status = res.status;
    err.body = raw;
    throw err;
  }
  const data = JSON.parse(raw);
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error(`Empty model content: ${raw.slice(0, 400)}`);
  return content;
}

function normalizePayload(content) {
  let parsed = extractJson(content);
  if (!Array.isArray(parsed) && parsed && typeof parsed === "object") {
    parsed =
      parsed.entries ||
      parsed.items ||
      parsed.prompts ||
      Object.values(parsed).find(Array.isArray);
  }
  if (!Array.isArray(parsed)) throw new Error("Expected entries array in JSON");
  return parsed;
}

function sanitizeEntry(raw, { category, status, existingIds }) {
  const id = String(raw.id || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!id) throw new Error("Entry missing id");
  if (existingIds.has(id)) throw new Error(`Duplicate id from model: ${id}`);

  const tags = (raw.tags || [])
    .map((t) =>
      String(t)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    )
    .filter(Boolean)
    .slice(0, 12);
  if (!tags.length) tags.push(category.split("-")[0]);

  const summary = String(raw.summary || "").trim();
  if (summary.length < 20 || summary.length > 220) {
    throw new Error(`Bad summary length for ${id}: ${summary.length}`);
  }

  const prompt_md = String(raw.prompt_md || "").trim();
  const prompt_full_md = String(raw.prompt_full_md || "").trim();
  if (prompt_md.length < 80) throw new Error(`prompt_md too short: ${id}`);
  if (prompt_full_md.length < 200) {
    throw new Error(`prompt_full_md too short: ${id}`);
  }
  if (prompt_md.includes("{{") || prompt_full_md.includes("{{")) {
    throw new Error(`Unresolved placeholders in ${id}`);
  }

  const colors = (raw.colors || []).filter((c) => /^#[0-9a-fA-F]{6}$/.test(c));
  return {
    id,
    title: String(raw.title || id).trim(),
    category,
    tags,
    status,
    summary,
    colors,
    prompt_md,
    prompt_full_md,
    created: today(),
  };
}

async function generateForCategory(cfg, args, catalog, category) {
  const seedKey =
    args.seed !== null && args.seed !== undefined && args.seed !== ""
      ? `${args.seed}:${category}`
      : `${Date.now()}-${category}-${Math.random()}`;
  const seed = seedToInt(seedKey);
  const lane = pickLane(args.lane, seed);

  let brief = null;
  if (args.brief) {
    const bp = path.isAbsolute(args.brief)
      ? args.brief
      : path.join(ROOT, args.brief);
    if (!fs.existsSync(bp)) die(`Brief not found: ${args.brief}`);
    brief = fs.readFileSync(bp, "utf8").trim();
  }

  const count = args.themes
    ? args.themes.split(",").map((s) => s.trim()).filter(Boolean).length
    : args.count;

  console.log(
    `\n→ ${category} n=${count} lane=${lane.id} seed=${seed}` +
      (args.mood ? ` mood="${args.mood}"` : "") +
      (args.avoid ? ` avoid="${args.avoid}"` : "")
  );

  const messages = [
    { role: "system", content: buildSystemPrompt() },
    {
      role: "user",
      content: buildUserPrompt({
        category,
        count: args.count,
        themes: args.themes,
        catalog,
        lane,
        mood: args.mood,
        avoid: args.avoid,
        brief,
        seed,
      }),
    },
  ];

  const temperature =
    args.temperature ??
    (process.env.AI_TEMPERATURE
      ? Number(process.env.AI_TEMPERATURE)
      : 0.9);

  let content;
  try {
    content = await chatCompletions({
      ...cfg,
      messages,
      temperature,
      jsonMode: true,
    });
  } catch (err) {
    const maybeFormat =
      err.status === 400 &&
      /response_format|json_object|unsupported/i.test(err.body || err.message);
    if (!maybeFormat) throw err;
    console.warn("  json_object unsupported — retrying plain…");
    content = await chatCompletions({
      ...cfg,
      messages,
      temperature,
      jsonMode: false,
    });
  }

  const rawEntries = normalizePayload(content);
  const used = new Set(catalog.ids);
  // also reserve ids from this batch progressively
  const accepted = [];
  const rejected = [];

  for (const raw of rawEntries) {
    let entry;
    try {
      entry = sanitizeEntry(raw, {
        category,
        status: args.status,
        existingIds: used,
      });
    } catch (e) {
      rejected.push({ id: raw?.id, reason: e.message });
      continue;
    }

    const sim = maxSimilarity(entry, catalog.entries);
    if (sim.score >= args.maxSimilarity && !args.force) {
      rejected.push({
        id: entry.id,
        reason: `too similar to ${sim.against} (score ${sim.score.toFixed(2)} ≥ ${args.maxSimilarity})`,
      });
      continue;
    }

    used.add(entry.id);
    // so later items in same batch compare against earlier accepts
    catalog.entries.push({
      id: entry.id,
      title: entry.title,
      summary: entry.summary,
      tags: entry.tags,
      fingerprint: [entry.title, entry.summary, ...entry.tags].join(" "),
      tokens: undefined,
    });
    catalog.ids.push(entry.id);
    accepted.push(entry);
  }

  if (rejected.length) {
    console.warn(
      `  rejected ${rejected.length}:`,
      rejected.map((r) => `${r.id || "?"} (${r.reason})`).join("; ")
    );
  }
  return accepted;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.listLanes) {
    console.log("Creative lanes (use --lane <id> or let seed pick):\n");
    for (const { id, brief } of listLanes()) {
      console.log(`  ${id}\n    ${brief}\n`);
    }
    return;
  }

  if (!args.all && (!args.category || !CATEGORIES.includes(args.category))) {
    die(
      `--category one of: ${CATEGORIES.join(", ")}  (or pass --all)\n` +
        `Examples:\n` +
        `  npm run ai:new -- -c landing-pages -n 3\n` +
        `  npm run ai:new -- -c animations --lane kinetic-type -n 2\n` +
        `  npm run ai:new -- --all -n 2 --mood "unexpected luxury"`
    );
  }
  if (args.category && args.all) die("Use either -c <category> or --all, not both");
  if (!args.themes && (!Number.isFinite(args.count) || args.count < 1 || args.count > 20)) {
    die("--count must be 1–20 (or pass --themes)");
  }
  if (!["draft", "polished"].includes(args.status)) {
    die("--status must be draft|polished");
  }
  if (args.lane && !LANES[args.lane]) {
    die(`Unknown lane "${args.lane}". Run: npm run ai:lanes`);
  }

  const cfg = resolveConfig();
  let catalog = ensureCatalog();
  const targets = args.all
    ? CATEGORIES.filter((c) => c !== "experiments")
    : [args.category];

  console.log(
    `Provider=${cfg.provider} label=${cfg.model} api=${cfg.modelApi || cfg.model} catalog=${catalog.count} entries`
  );

  const allAccepted = [];
  for (const category of targets) {
    // refresh catalog snapshot ids between categories
    catalog = buildCatalog(ROOT);
    // include already-accepted this run
    for (const e of allAccepted) {
      if (!catalog.ids.includes(e.id)) {
        catalog.ids.push(e.id);
        catalog.entries.push({
          id: e.id,
          title: e.title,
          summary: e.summary,
          tags: e.tags,
          fingerprint: [e.title, e.summary, ...e.tags].join(" "),
        });
        catalog.niches.push(`${e.category}: ${e.title} — ${e.summary}`);
      }
    }

    const accepted = await generateForCategory(cfg, args, catalog, category);
    allAccepted.push(...accepted);
  }

  if (!allAccepted.length) {
    die(
      "No entries accepted (all rejected as duplicates/invalid). Steer with --mood/--lane/--avoid and retry."
    );
  }

  if (args.dryRun) {
    console.log(JSON.stringify(allAccepted, null, 2));
    console.log(`\nDry run — ${allAccepted.length} entries not written.`);
    return;
  }

  for (const entry of allAccepted) {
    entry.source_model = cfg.model;
    entry.source_provider = cfg.provider;
    const rel = writeEntry(ROOT, entry, { force: args.force });
    console.log(`Wrote ${rel}`);
  }

  const build = spawnSync("npm", ["run", "build"], {
    cwd: ROOT,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (build.stdout) process.stdout.write(build.stdout);
  if (build.stderr) process.stderr.write(build.stderr);
  if (build.status !== 0) {
    die("Entries written but npm run build failed — fix and re-run build");
  }

  // refresh catalog file after build
  writeCatalog(ROOT, buildCatalog(ROOT));
  console.log(`\nDone. Created ${allAccepted.length} entries.`);
}

main().catch((err) => die(err.stack || err.message));
