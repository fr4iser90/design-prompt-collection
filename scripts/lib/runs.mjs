// Per-model run folders so builds never overwrite across models.
//
// prompts/<cat>/<id>/runs/<model-slug>/
//   meta.yaml          # model, provider, built_at, …
//   demo/index.html
//   preview.png
import fs from "node:fs";
import path from "node:path";
import { parseMeta } from "./provider.mjs";
import { today } from "./helpers.mjs";

/** Turn "halogen-qwen3.8-flash-next" / "anthropic/claude-sonnet-4" into a folder slug. */
export function modelSlug(modelId) {
  return String(modelId || "unknown")
    .trim()
    .toLowerCase()
    .replace(/^[./]+|[./]+$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "unknown";
}

export function runsRoot(entryDir) {
  return path.join(entryDir, "runs");
}

export function runDir(entryDir, slug) {
  return path.join(runsRoot(entryDir), slug);
}

export function writeRunMeta(runPath, data) {
  const meta = {
    model: data.model,
    model_slug: data.model_slug || modelSlug(data.model),
    provider: data.provider || null,
    built_at: data.built_at || today(),
    updated: today(),
    demo: data.demo || "demo/index.html",
    preview: data.preview || null,
    status: data.status || "built",
  };
  const q = (s) => (s === null || s === undefined ? "null" : `"${String(s).replaceAll('"', '\\"')}"`);
  const text = `model: ${q(meta.model)}
model_slug: ${meta.model_slug}
provider: ${q(meta.provider)}
built_at: "${meta.built_at}"
updated: "${meta.updated}"
demo: ${meta.demo}
preview: ${meta.preview ? meta.preview : "null"}
status: ${meta.status}
`;
  fs.mkdirSync(runPath, { recursive: true });
  fs.writeFileSync(path.join(runPath, "meta.yaml"), text);
  return meta;
}

export function readRunMeta(runPath) {
  const p = path.join(runPath, "meta.yaml");
  if (!fs.existsSync(p)) return null;
  return parseMeta(fs.readFileSync(p, "utf8"), p);
}

/** Discover all model runs for an entry (filesystem is source of truth). */
export function listRuns(entryDir, entryRelPosix) {
  const root = runsRoot(entryDir);
  if (!fs.existsSync(root)) return [];
  const runs = [];
  for (const slug of fs.readdirSync(root).sort()) {
    const dir = path.join(root, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const meta = readRunMeta(dir) || {
      model: slug,
      model_slug: slug,
      provider: null,
      built_at: null,
    };
    const demoRel = meta.demo || "demo/index.html";
    const demoAbs = path.join(dir, demoRel);
    const previewName =
      meta.preview && fs.existsSync(path.join(dir, meta.preview))
        ? meta.preview
        : fs.existsSync(path.join(dir, "preview.png"))
          ? "preview.png"
          : fs.existsSync(path.join(dir, "preview.svg"))
            ? "preview.svg"
            : null;
    runs.push({
      slug,
      model: meta.model || slug,
      provider: meta.provider || null,
      built_at: meta.built_at || null,
      status: meta.status || "built",
      dir,
      has_demo: fs.existsSync(demoAbs),
      has_preview: Boolean(previewName),
      demo_rel: path.posix.join(entryRelPosix, "runs", slug, demoRel),
      preview_rel: previewName
        ? path.posix.join(entryRelPosix, "runs", slug, previewName)
        : null,
      demo_abs: demoAbs,
      preview_abs: previewName ? path.join(dir, previewName) : null,
      preview_name: previewName,
      demo_name: demoRel,
    });
  }
  return runs;
}

export function hasRunDemo(entryDir, slug) {
  const demo = path.join(runDir(entryDir, slug), "demo", "index.html");
  return fs.existsSync(demo);
}

/** Pick default run: meta.default_run, else newest with preview, else newest with demo. */
export function pickDefaultRun(runs, defaultSlug) {
  if (!runs.length) return null;
  if (defaultSlug) {
    const hit = runs.find((r) => r.slug === defaultSlug);
    if (hit) return hit;
  }
  const withPreview = [...runs].filter((r) => r.has_preview).reverse();
  if (withPreview.length) return withPreview[0];
  const withDemo = [...runs].filter((r) => r.has_demo).reverse();
  if (withDemo.length) return withDemo[0];
  return runs[runs.length - 1];
}

/**
 * Migrate legacy demo/ + root preview.png into runs/<slug>/ once.
 */
export function migrateLegacyRun(entryDir, slug = "legacy") {
  const legacyDemo = path.join(entryDir, "demo", "index.html");
  const targetDemo = path.join(runDir(entryDir, slug), "demo", "index.html");
  if (fs.existsSync(legacyDemo) && !fs.existsSync(targetDemo)) {
    fs.mkdirSync(path.dirname(targetDemo), { recursive: true });
    fs.renameSync(legacyDemo, targetDemo);
    const legacyDir = path.join(entryDir, "demo");
    if (fs.existsSync(legacyDir) && fs.readdirSync(legacyDir).length === 0) {
      fs.rmdirSync(legacyDir);
    }
  }
  const legacyPreview = path.join(entryDir, "preview.png");
  const targetPreview = path.join(runDir(entryDir, slug), "preview.png");
  if (fs.existsSync(legacyPreview) && !fs.existsSync(targetPreview)) {
    const runHasDemo = fs.existsSync(path.join(runDir(entryDir, slug), "demo", "index.html"));
    if (runHasDemo) {
      fs.mkdirSync(path.dirname(targetPreview), { recursive: true });
      fs.copyFileSync(legacyPreview, targetPreview);
    }
  }
  if (fs.existsSync(path.join(runDir(entryDir, slug), "demo", "index.html"))) {
    writeRunMeta(runDir(entryDir, slug), {
      model: slug,
      model_slug: slug,
      provider: "legacy",
      preview: fs.existsSync(targetPreview) ? "preview.png" : null,
      demo: "demo/index.html",
    });
  }
}

// re-export for convenience
export { today };
