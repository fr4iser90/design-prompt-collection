// Shared helpers for CLI scripts (zero deps).
import fs from "node:fs";
import path from "node:path";

export const CATEGORIES = ["landing-pages", "animations", "concepts", "experiments"];

export const PROVIDER_BASES = {
  openai: "https://api.openai.com/v1",
  openrouter: "https://openrouter.ai/api/v1",
  groq: "https://api.groq.com/openai/v1",
  custom: null,
};

/** Load KEY=VALUE from a .env file into process.env (does not override existing). */
export function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) return false;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    // Strip inline comments for unquoted values: true   # foo
    if (
      !(val.startsWith('"') || val.startsWith("'")) &&
      val.includes("#")
    ) {
      val = val.replace(/\s+#.*$/, "").trim();
    }
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
  return true;
}

export function parseArgs(argv) {
  const out = {
    category: null,
    count: 3,
    themes: null,
    status: "polished",
    dryRun: false,
    force: false,
    all: false,
    mood: null,
    lane: null,
    avoid: null,
    seed: null,
    brief: null,
    temperature: null,
    listLanes: false,
    maxSimilarity: 0.42,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") out.dryRun = true;
    else if (a === "--force") out.force = true;
    else if (a === "--all") out.all = true;
    else if (a === "--list-lanes") out.listLanes = true;
    else if (a === "--category" || a === "-c") out.category = argv[++i];
    else if (a === "--count" || a === "-n") out.count = Number(argv[++i]);
    else if (a === "--themes" || a === "-t") out.themes = argv[++i];
    else if (a === "--status") out.status = argv[++i];
    else if (a === "--mood" || a === "-m") out.mood = argv[++i];
    else if (a === "--lane" || a === "-l") out.lane = argv[++i];
    else if (a === "--avoid" || a === "-x") out.avoid = argv[++i];
    else if (a === "--seed" || a === "-s") out.seed = argv[++i];
    else if (a === "--brief" || a === "-b") out.brief = argv[++i];
    else if (a === "--temperature") out.temperature = Number(argv[++i]);
    else if (a === "--max-similarity") out.maxSimilarity = Number(argv[++i]);
  }
  return out;
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function readExistingIds(root) {
  const indexPath = path.join(root, "index.json");
  const ids = new Set();
  if (fs.existsSync(indexPath)) {
    const data = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    for (const e of data.entries || []) ids.add(e.id);
  }
  const prompts = path.join(root, "prompts");
  if (!fs.existsSync(prompts)) return ids;
  for (const cat of CATEGORIES) {
    const dir = path.join(prompts, cat);
    if (!fs.existsSync(dir)) continue;
    for (const id of fs.readdirSync(dir)) {
      if (fs.statSync(path.join(dir, id)).isDirectory()) ids.add(id);
    }
  }
  return ids;
}

export function previewSvg({ category, title, c1, c2, accent }) {
  const esc = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${esc(title)}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${esc(c1)}"/>
      <stop offset="100%" stop-color="${esc(c2)}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="980" cy="140" r="180" fill="${esc(accent)}" fill-opacity="0.18"/>
  <circle cx="1080" cy="420" r="220" fill="${esc(accent)}" fill-opacity="0.12"/>
  <text x="64" y="250" fill="${esc(accent)}" font-family="ui-monospace, monospace" font-size="20" letter-spacing="4">${esc(category.toUpperCase())}</text>
  <text x="64" y="340" fill="#f7f3ea" font-family="Georgia, serif" font-size="52" font-weight="700">${esc(title)}</text>
  <rect x="64" y="380" width="120" height="4" fill="${esc(accent)}"/>
</svg>
`;
}

export function writeEntry(root, entry, { force = false } = {}) {
  const dir = path.join(root, "prompts", entry.category, entry.id);
  if (fs.existsSync(dir) && !force) {
    throw new Error(`Entry exists: ${entry.category}/${entry.id} (use --force)`);
  }
  fs.mkdirSync(dir, { recursive: true });
  const date = entry.created || today();
  const meta = `id: ${entry.id}
title: "${entry.title.replaceAll('"', '\\"')}"
category: ${entry.category}
tags:
${entry.tags.map((t) => `  - ${t}`).join("\n")}
status: ${entry.status}
summary: "${entry.summary.replaceAll('"', '\\"')}"
preview: preview.svg
prompt: prompt.md
extended: prompt.full.md
demo: null
default_run: null
source_model: ${entry.source_model ? `"${entry.source_model.replaceAll('"', '\\"')}"` : "null"}
source_provider: ${entry.source_provider ? `"${entry.source_provider.replaceAll('"', '\\"')}"` : "null"}
created: "${date}"
updated: "${date}"
model_hints:
  - cursor
  - chatgpt
  - claude
`;
  const [c1, c2, accent] = entry.colors?.length >= 3
    ? entry.colors
    : ["#1a1f2e", "#0d1117", "#58a6ff"];

  fs.writeFileSync(path.join(dir, "meta.yaml"), meta);
  fs.writeFileSync(path.join(dir, "prompt.md"), entry.prompt_md.trim() + "\n");
  fs.writeFileSync(path.join(dir, "prompt.full.md"), entry.prompt_full_md.trim() + "\n");
  fs.writeFileSync(
    path.join(dir, "preview.svg"),
    previewSvg({
      category: entry.category,
      title: entry.title,
      c1,
      c2,
      accent,
    })
  );
  return path.posix.join("prompts", entry.category, entry.id);
}
