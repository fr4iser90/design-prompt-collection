#!/usr/bin/env node
// pages.mjs — build static GitHub Pages site into site/dist (multi-model runs)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { walkEntries } from "./lib/provider.mjs";
import { buildCatalog, writeCatalog } from "./lib/catalog.mjs";
import { listRuns, migrateLegacyRun, pickDefaultRun } from "./lib/runs.mjs";
import { CATEGORIES } from "./lib/helpers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "site", "dist");
const CAT_ORDER = CATEGORIES;

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function shell({ title, body, root }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${esc(title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="${root}/assets/site.css"/>
</head>
<body>
${body}
</body>
</html>
`;
}

function writeCss() {
  fs.mkdirSync(path.join(OUT, "assets"), { recursive: true });
  fs.writeFileSync(
    path.join(OUT, "assets", "site.css"),
    `:root{--bg:#0c0f12;--ink:#f2efe8;--muted:#9aa3ad;--line:#24303a;--accent:#7ec8c3;--card:#141a20}
*{box-sizing:border-box}html,body{margin:0;background:var(--bg);color:var(--ink);font-family:"IBM Plex Sans",system-ui,sans-serif}
a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}
.wrap{width:min(1120px,calc(100% - 2.5rem));margin:0 auto}
header.site{padding:2.5rem 0 1.5rem;border-bottom:1px solid var(--line);margin-bottom:2rem}
header.site .brand{font-family:Fraunces,Georgia,serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;letter-spacing:-.02em;color:var(--ink);text-decoration:none}
header.site p{color:var(--muted);max-width:42rem;line-height:1.5}
.nav-cats{display:flex;flex-wrap:wrap;gap:.75rem 1.25rem;margin-top:1rem;font-size:.9rem}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem;padding-bottom:1rem}
.card{background:var(--card);border:1px solid var(--line);overflow:hidden;display:flex;flex-direction:column}
.card img{width:100%;aspect-ratio:1200/630;object-fit:cover;display:block;background:#000}
.card .body{padding:1rem 1.1rem 1.2rem;display:flex;flex-direction:column;gap:.55rem;flex:1}
.card h2{font-family:Fraunces,Georgia,serif;font-size:1.15rem;margin:0;font-weight:600}
.card .summary{color:var(--muted);font-size:.9rem;line-height:1.45;margin:0;flex:1}
.card .meta{font-size:.75rem;color:var(--muted);letter-spacing:.04em;text-transform:uppercase}
.card .links{display:flex;flex-wrap:wrap;gap:.75rem;font-size:.85rem}
h1.page{font-family:Fraunces,Georgia,serif;font-size:clamp(1.6rem,3vw,2.2rem);margin:0 0 .5rem}
.entry-layout{display:grid;gap:1.5rem;padding-bottom:3rem}
@media(min-width:900px){.entry-layout{grid-template-columns:1.4fr .9fr;align-items:start}}
.frame-wrap{border:1px solid var(--line);background:#000;aspect-ratio:1200/630;overflow:hidden;margin-bottom:.75rem}
.frame-wrap iframe{width:100%;height:100%;border:0;background:#000}
.side{display:flex;flex-direction:column;gap:1rem}
.side .prompt{background:var(--card);border:1px solid var(--line);padding:1rem;overflow:auto;max-height:28rem;font-size:.82rem;line-height:1.45;white-space:pre-wrap}
.tags{display:flex;flex-wrap:wrap;gap:.4rem}
.tags span{border:1px solid var(--line);padding:.2rem .5rem;font-size:.75rem;color:var(--muted)}
.run-label{font-size:.8rem;color:var(--muted);margin:.25rem 0 .5rem}
footer.site{border-top:1px solid var(--line);padding:1.5rem 0 2.5rem;color:var(--muted);font-size:.85rem}
`
  );
}

function main() {
  if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true, force: true });
  writeCss();
  writeCatalog(ROOT, buildCatalog(ROOT));

  const entries = walkEntries(ROOT)
    .filter((e) => e.status !== "archived")
    .map((e) => {
      migrateLegacyRun(e.dir, "legacy");
      e.runs = listRuns(e.dir, e.rel);
      e.default_run_obj = pickDefaultRun(e.runs, e.default_run);
      return e;
    });

  const byCat = Object.fromEntries(CAT_ORDER.map((c) => [c, []]));
  for (const e of entries) (byCat[e.category] || (byCat[e.category] = [])).push(e);

  for (const e of entries) {
    const dest = path.join(OUT, "entries", e.category, e.id);
    fs.mkdirSync(dest, { recursive: true });
    const previewRel =
      e.preview && e.preview !== "null" ? e.preview : null;
    if (previewRel) {
      const previewSrc = path.join(e.dir, previewRel);
      if (fs.existsSync(previewSrc)) {
        copyFile(previewSrc, path.join(dest, path.basename(previewSrc)));
      }
    }
    copyFile(path.join(e.dir, "prompt.md"), path.join(dest, "prompt.md"));
    copyFile(path.join(e.dir, "prompt.full.md"), path.join(dest, "prompt.full.md"));
    const runsSrc = path.join(e.dir, "runs");
    if (fs.existsSync(runsSrc)) copyDir(runsSrc, path.join(dest, "runs"));

    const promptText = fs.readFileSync(path.join(e.dir, "prompt.md"), "utf8");
    const root = "../../..";
    const runsHtml = (e.runs || [])
      .map((r) => {
        const demo = r.has_demo
          ? `<div class="frame-wrap"><iframe src="runs/${esc(r.slug)}/demo/index.html" title="${esc(r.model)}" loading="lazy"></iframe></div>
             <p class="run-label"><code>${esc(r.model)}</code> · <a href="runs/${esc(r.slug)}/demo/index.html" target="_blank" rel="noopener">open demo</a></p>`
          : "";
        return demo;
      })
      .join("\n");

    const noRunsBlock = previewRel
      ? `<img src="${esc(previewRel)}" alt="${esc(e.title)}" style="width:100%;border:1px solid var(--line)"/>
      <p style="color:var(--muted)">No model runs — <code>npm run ai:build -- --id ${esc(e.id)}</code></p>`
      : `<p style="color:var(--muted)">No demo/preview yet — <code>npm run ai:build -- --id ${esc(e.id)}</code></p>`;

    const body = `
<header class="site"><div class="wrap">
  <a class="brand" href="${root}/index.html">Design Prompt Collection</a>
  <p><a href="${root}/index.html">← Catalog</a> · ${esc(e.category)}</p>
</div></header>
<main class="wrap entry-layout">
  <section>
    <h1 class="page">${esc(e.title)}</h1>
    <p style="color:var(--muted)">${esc(e.summary)}</p>
    ${runsHtml || noRunsBlock}
  </section>
  <aside class="side">
    <div class="tags">${(e.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
    ${e.source_model && e.source_model !== "null" ? `<p class="run-label">Brief by <code>${esc(e.source_model)}</code></p>` : ""}
    <div><strong>Short prompt</strong><div class="prompt">${esc(promptText)}</div></div>
    <p><a href="prompt.md">prompt.md</a> · <a href="prompt.full.md">prompt.full.md</a></p>
  </aside>
</main>
<footer class="site"><div class="wrap">Generated from repo catalog.</div></footer>`;
    fs.writeFileSync(
      path.join(dest, "index.html"),
      shell({ title: `${e.title} · Design Prompt Collection`, body, root })
    );
  }

  const sections = CAT_ORDER.filter((c) => (byCat[c] || []).length)
    .map((cat) => {
      const cards = byCat[cat]
        .map((e) => {
          const href = `entries/${e.category}/${e.id}/index.html`;
          const def = e.default_run_obj;
          const img = def?.preview_name
            ? `entries/${e.category}/${e.id}/runs/${def.slug}/${def.preview_name}`
            : e.preview && e.preview !== "null"
              ? `entries/${e.category}/${e.id}/${e.preview}`
              : null;
          const modelNote = def ? ` · ${def.model}` : "";
          const thumb = img
            ? `<a href="${href}"><img src="${esc(img)}" alt="${esc(e.title)}"/></a>`
            : `<a href="${href}" class="body" style="aspect-ratio:1200/630;display:flex;align-items:center;justify-content:center;color:var(--muted);border-bottom:1px solid var(--line)">no preview</a>`;
          return `<article class="card">
  ${thumb}
  <div class="body">
    <div class="meta">${esc(e.category)} · ${esc(e.status)}${esc(modelNote)}</div>
    <h2><a href="${href}" style="color:inherit;text-decoration:none">${esc(e.title)}</a></h2>
    <p class="summary">${esc(e.summary)}</p>
    <div class="links"><a href="${href}">View</a><a href="entries/${e.category}/${e.id}/prompt.md">Prompt</a></div>
  </div>
</article>`;
        })
        .join("\n");
      return `<section id="${cat}" class="wrap" style="margin-bottom:2.5rem">
  <h2 style="font-family:Fraunces,Georgia,serif;font-size:1.4rem;margin:0 0 1rem">${esc(cat)}</h2>
  <div class="grid">${cards}</div>
</section>`;
    })
    .join("\n");

  fs.writeFileSync(
    path.join(OUT, "index.html"),
    shell({
      title: "Design Prompt Collection",
      root: ".",
      body: `
<header class="site"><div class="wrap">
  <a class="brand" href="./index.html">Design Prompt Collection</a>
  <p>High-refined prompts with per-model demos and screenshots.</p>
  <nav class="nav-cats">
    ${CAT_ORDER.filter((c) => (byCat[c] || []).length)
      .map((c) => `<a href="#${c}">${esc(c)}</a>`)
      .join("")}
    <span style="color:var(--muted)">${entries.length} entries</span>
  </nav>
</div></header>
${sections}
<footer class="site"><div class="wrap"><code>npm run pipeline</code></div></footer>`,
    })
  );

  for (const f of ["catalog.json", "index.json"]) {
    const src = path.join(ROOT, f);
    if (fs.existsSync(src)) copyFile(src, path.join(OUT, f));
  }

  console.log(`Pages built → site/dist (${entries.length} entries)`);
}

main();
