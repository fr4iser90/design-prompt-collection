#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildCatalog, writeCatalog } from "./lib/catalog.mjs";
import { listRuns, migrateLegacyRun, pickDefaultRun } from "./lib/runs.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROMPTS = path.join(ROOT, "prompts");
const CATEGORY_ORDER = ["landing-pages", "animations", "concepts", "experiments"];

// generate.mjs — build README.md + index.json + catalog.json from all prompt meta.yaml files.

/** Minimal YAML subset parser for our meta.yaml shape (no deps). */
function parseMeta(text, filePath) {
  const lines = text.split(/\r?\n/);
  const obj = {};
  let currentList = null;
  let currentKey = null;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (!raw.trim() || raw.trim().startsWith("#")) continue;

    const listMatch = raw.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentList) {
      let v = listMatch[1].trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      currentList.push(v === "null" ? null : v);
      continue;
    }

    const kv = raw.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) {
      throw new Error(`Cannot parse ${filePath}:${i + 1}: ${raw}`);
    }
    const [, key, rest] = kv;
    currentList = null;
    currentKey = key;

    if (rest === "" || rest === "|" || rest === ">") {
      obj[key] = [];
      currentList = obj[key];
      continue;
    }

    let val = rest.trim();
    if (val === "null") val = null;
    else if (val === "true") val = true;
    else if (val === "false") val = false;
    else if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    obj[key] = val;
  }

  // tags / model_hints may be empty arrays from `tags:` with following `-`
  for (const listKey of ["tags", "model_hints"]) {
    if (!Array.isArray(obj[listKey])) obj[listKey] = obj[listKey] ? [obj[listKey]] : [];
  }
  return obj;
}

function walkEntries() {
  const entries = [];
  for (const category of CATEGORY_ORDER) {
    const catDir = path.join(PROMPTS, category);
    if (!fs.existsSync(catDir)) continue;
    for (const id of fs.readdirSync(catDir).sort()) {
      const dir = path.join(catDir, id);
      if (!fs.statSync(dir).isDirectory()) continue;
      const metaPath = path.join(dir, "meta.yaml");
      if (!fs.existsSync(metaPath)) continue;
      const meta = parseMeta(fs.readFileSync(metaPath, "utf8"), metaPath);
      const entryPath = path.posix.join("prompts", category, id);
      migrateLegacyRun(dir, "legacy");
      const runs = listRuns(dir, entryPath);
      entries.push({
        ...meta,
        path: entryPath,
        dir,
        meta_path: path.posix.join("prompts", category, id, "meta.yaml"),
        runs,
        default_run_obj: pickDefaultRun(runs, meta.default_run),
      });
    }
  }
  return entries;
}

function teaserFromPrompt(entryPath) {
  const promptFile = path.join(ROOT, entryPath, "prompt.md");
  if (!fs.existsSync(promptFile)) return "";
  const text = fs.readFileSync(promptFile, "utf8");
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#") && !l.startsWith("##") && !l.startsWith("-") && !l.startsWith("|"));
  const body = lines[0] || "";
  return body.length > 180 ? body.slice(0, 177) + "…" : body;
}

function groupByCategory(entries) {
  const map = Object.fromEntries(CATEGORY_ORDER.map((c) => [c, []]));
  for (const e of entries) {
    if (!map[e.category]) map[e.category] = [];
    map[e.category].push(e);
  }
  return map;
}

function renderReadme(entries) {
  const byCat = groupByCategory(entries);
  const polished = entries.filter((e) => e.status === "polished").length;
  const draft = entries.filter((e) => e.status === "draft").length;
  const runCount = entries.reduce((n, e) => n + (e.runs?.length || 0), 0);

  let md = `# Design Prompt Collection

High-refined prompts for **landing pages**, **animations**, and **design concepts**.

Each entry has a shared prompt brief; **model runs** live under \`runs/<model-slug>/\` (demo + screenshot) so models never overwrite each other.

| Entries | Model runs | Polished | Draft |
|--------:|-----------:|---------:|------:|
| ${entries.length} | ${runCount} | ${polished} | ${draft} |

## Quick start

\`\`\`bash
npm run ai:new -- -c landing-pages -n 3
npm run pipeline    # ai:build → shots → pages → README
\`\`\`

README + \`index.json\` + \`catalog.json\` are **auto-generated** by \`npm run build\` / \`shots\` / \`pipeline\`.

Machine index: [\`index.json\`](./index.json) · Agents: [\`AGENTS.md\`](./AGENTS.md) · Automation: [\`automation/README.md\`](./automation/README.md)

---

`;

  for (const category of CATEGORY_ORDER) {
    const list = (byCat[category] || []).filter((e) => e.status !== "archived");
    if (!list.length) continue;
    const label = category
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
    md += `## ${label}\n\n`;
    for (const e of list) {
      const prompt = path.posix.join(e.path, e.prompt || "prompt.md");
      const extended = path.posix.join(e.path, e.extended || "prompt.full.md");
      const teaser = e.summary || teaserFromPrompt(e.path);
      const tags = (e.tags || []).map((t) => `\`${t}\``).join(" ");
      const source =
        e.source_model && e.source_model !== "null"
          ? ` · brief by \`${e.source_model}\``
          : "";

      md += `### ${e.title}\n\n`;
      md += `${teaser}\n\n`;
      md += `**Status:** ${e.status} · ${tags}${source}\n\n`;
      md += `[prompt](${prompt}) · [extended](${extended})\n\n`;

      const runs = e.runs || [];
      if (runs.length) {
        md += `#### Model runs\n\n`;
        md += `| Preview | Model | Think | Ctx | Time | Score | Demo |\n`;
        md += `|:-------:|-------|:-----:|----:|-----:|------:|------|\n`;
        for (const r of runs) {
          const img = r.preview_rel
            ? `![${r.model}](${r.preview_rel})`
            : "—";
          const demo = r.has_demo ? `[open](${r.demo_rel})` : "—";
          const mark =
            e.default_run_obj && e.default_run_obj.slug === r.slug
              ? " **(default)**"
              : "";
          const score =
            r.review_score != null && Number.isFinite(Number(r.review_score))
              ? String(r.review_score)
              : "—";
          const think =
            r.thinking_enabled == null
              ? "—"
              : r.thinking_enabled
                ? "on"
                : "off";
          const ctx =
            r.context_tokens != null && Number.isFinite(r.context_tokens)
              ? String(r.context_tokens)
              : "—";
          const time =
            r.duration_ms != null && Number.isFinite(r.duration_ms)
              ? `${Math.round(r.duration_ms / 1000)}s`
              : "—";
          const modelCell = r.model_api
            ? `\`${r.model}\`<br><sub>\`${r.model_api}\`</sub>`
            : `\`${r.model}\``;
          md += `| ${img} | ${modelCell}${mark} | ${think} | ${ctx} | ${time} | ${score} | ${demo} |\n`;
          if (r.review_summary) {
            md += `| | _${String(r.review_summary).replaceAll("|", "/")}_ | | | | | |\n`;
          }
        }
        md += `\n`;
      } else {
        if (e.preview && e.preview !== "null") {
          md += `![${e.title}](${path.posix.join(e.path, e.preview)})\n\n`;
        } else {
          md += `_No shot preview yet._\n\n`;
        }
        md += `_No model runs yet — \`npm run ai:build\` then \`npm run shots\`._\n\n`;
      }

      md += `---\n\n`;
    }
  }

  md += `## Repo layout

\`\`\`
prompts/<category>/<id>/
  meta.yaml
  prompt.md / prompt.full.md
  preview: null until first shot
  runs/<model-slug>/
    meta.yaml                 # model + provider + timestamps
    demo/index.html           # implementation for THAT model
    preview.png               # screenshot for THAT model
\`\`\`

## Automation

| Command | Purpose |
|---------|---------|
| \`npm run ai:new\` | New prompt briefs (stores \`source_model\`) |
| \`npm run ai:build\` | Build \`runs/<model>/\` demo (no overwrite across models) |
| \`npm run shots\` | Screenshot each run → README |
| \`npm run review\` | Vision score; below rebuild floor → drop demo + rebuild |
| \`npm run pages\` | Static site \`site/dist\` |
| \`npm run pipeline\` | build → shots → pages → index |
| \`npm run build\` | validate + regenerate README / index / catalog |

Other AIs should read \`AGENTS.md\` and write entries that pass \`npm run build\`.
`;

  return md;
}

function main() {
  const entries = walkEntries();
  const index = {
    generated_at: new Date().toISOString(),
    schema: "schema/entry.schema.json",
    count: entries.length,
    categories: CATEGORY_ORDER,
    entries: entries.map((e) => ({
      id: e.id,
      title: e.title,
      category: e.category,
      tags: e.tags,
      status: e.status,
      summary: e.summary,
      path: e.path,
      preview:
        e.preview && e.preview !== "null"
          ? path.posix.join(e.path, e.preview)
          : null,
      prompt: path.posix.join(e.path, e.prompt || "prompt.md"),
      extended: path.posix.join(e.path, e.extended || "prompt.full.md"),
      demo:
        e.demo && e.demo !== "null" ? path.posix.join(e.path, e.demo) : null,
      default_run: e.default_run || e.default_run_obj?.slug || null,
      source_model: e.source_model && e.source_model !== "null" ? e.source_model : null,
      source_provider:
        e.source_provider && e.source_provider !== "null" ? e.source_provider : null,
      created: e.created,
      updated: e.updated || e.created,
      model_hints: e.model_hints || [],
      runs: (e.runs || []).map((r) => ({
        slug: r.slug,
        model: r.model,
        model_api: r.model_api,
        provider: r.provider,
        built_at: r.built_at,
        thinking_enabled: r.thinking_enabled,
        stream: r.stream,
        temperature: r.temperature,
        context_tokens: r.context_tokens,
        duration_ms: r.duration_ms,
        prompt_tokens: r.prompt_tokens,
        completion_tokens: r.completion_tokens,
        demo: r.demo_rel,
        preview: r.preview_rel,
        has_demo: r.has_demo,
        has_preview: r.has_preview,
        review_score: r.review_score,
        review_summary: r.review_summary,
      })),
    })),
  };

  fs.writeFileSync(path.join(ROOT, "index.json"), JSON.stringify(index, null, 2) + "\n");
  fs.writeFileSync(path.join(ROOT, "README.md"), renderReadme(entries));
  const catalog = buildCatalog(ROOT);
  writeCatalog(ROOT, catalog);
  console.log(
    `Generated README.md + index.json + catalog.json (${entries.length} entries, ${index.entries.reduce((n, e) => n + e.runs.length, 0)} runs)`
  );
}

main();
