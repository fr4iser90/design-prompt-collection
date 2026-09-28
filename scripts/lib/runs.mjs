// Per-model run folders so builds never overwrite across models.
//
// prompts/<cat>/<id>/runs/<model-slug>/
//   meta.yaml          # model, provider, built_at, review_*, …
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

function q(s) {
  if (s === null || s === undefined) return "null";
  return `"${String(s).replaceAll('"', '\\"')}"`;
}

function numOrNull(v) {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function boolOrNull(v) {
  if (v === undefined || v === null || v === "") return null;
  if (typeof v === "boolean") return v;
  if (v === true || v === "true" || v === 1 || v === "1") return true;
  if (v === false || v === "false" || v === 0 || v === "0") return false;
  return null;
}

/** Score below this → drop demo and rebuild (default 5). */
export function rebuildBelowScore() {
  const n = Number(process.env.REBUILD_BELOW_SCORE ?? 5);
  return Number.isFinite(n) && n >= 1 ? n : 5;
}

/** After this many rejects, stop rebuilding (default 3). */
export function maxBuildAttempts() {
  const n = Number(process.env.BUILD_MAX_ATTEMPTS ?? 3);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 3;
}

export function isAbandonedMeta(meta) {
  return String(meta?.status || "") === "abandoned";
}

export function isAbandonedRun(entryDir, slug) {
  return isAbandonedMeta(readRunMeta(runDir(entryDir, slug)));
}

/**
 * Reject a bad run so the worker rebuilds it.
 * - deletes demo/
 * - moves preview.png → preview.rejected.png (evidence)
 * - clears live review_score (forces re-score after rebuild)
 * - keeps last_review_* + reject_reason + build_attempts
 * - status=rebuild | abandoned (if attempts >= max)
 */
export function rejectRunForRebuild(runPath, {
  reason,
  model = null,
  model_slug = null,
  provider = null,
  review_score = null,
  review_summary = null,
  review_issues = null,
} = {}) {
  const existing = readRunMeta(runPath) || {};
  const attempts = (numOrNull(existing.build_attempts) || 0) + 1;
  const max = maxBuildAttempts();
  const abandoned = attempts >= max;
  const status = abandoned ? "abandoned" : "rebuild";

  const demoFile = path.join(runPath, "demo", "index.html");
  if (fs.existsSync(demoFile)) {
    try {
      fs.unlinkSync(demoFile);
    } catch {
      /* ignore */
    }
  }

  const previewLive = path.join(runPath, "preview.png");
  const previewRejected = path.join(runPath, "preview.rejected.png");
  if (fs.existsSync(previewLive)) {
    try {
      if (fs.existsSync(previewRejected)) fs.unlinkSync(previewRejected);
      fs.renameSync(previewLive, previewRejected);
    } catch {
      try {
        fs.unlinkSync(previewLive);
      } catch {
        /* ignore */
      }
    }
  }

  const score =
    review_score != null && Number.isFinite(Number(review_score))
      ? Number(review_score)
      : numOrNull(existing.review_score);
  const summary =
    review_summary != null
      ? String(review_summary).slice(0, 220)
      : existing.review_summary || null;
  const issues = Array.isArray(review_issues)
    ? review_issues
    : Array.isArray(existing.review_issues)
      ? existing.review_issues
      : existing.review_issues
        ? [String(existing.review_issues)]
        : [];

  const meta = writeRunMeta(runPath, {
    ...existing,
    model: model || existing.model,
    model_slug: model_slug || existing.model_slug,
    provider: provider || existing.provider,
    demo: "demo/index.html",
    preview: null,
    status,
    build_attempts: attempts,
    reject_reason: String(reason || "rejected").slice(0, 200),
    rejected_at: new Date().toISOString(),
    review_score: null,
    review_summary: null,
    review_issues: [],
    reviewed_at: null,
    last_review_score: score,
    last_review_summary: summary,
    last_reject_reason: String(reason || "rejected").slice(0, 200),
  });

  return { ...meta, abandoned, attempts, max, last_issues: issues };
}

/** Build/extract failed — count attempt; abandon after max (no endless retry). */
export function recordBuildFailure(runPath, {
  reason,
  model = null,
  model_slug = null,
  provider = null,
} = {}) {
  const existing = readRunMeta(runPath) || {};
  const attempts = (numOrNull(existing.build_attempts) || 0) + 1;
  const max = maxBuildAttempts();
  const abandoned = attempts >= max;
  const status = abandoned ? "abandoned" : "rebuild";

  const demoFile = path.join(runPath, "demo", "index.html");
  if (fs.existsSync(demoFile)) {
    try {
      fs.unlinkSync(demoFile);
    } catch {
      /* ignore */
    }
  }

  const meta = writeRunMeta(runPath, {
    ...existing,
    model: model || existing.model || model_slug,
    model_slug: model_slug || existing.model_slug,
    provider: provider || existing.provider,
    demo: "demo/index.html",
    preview: null,
    status,
    build_attempts: attempts,
    reject_reason: String(reason || "build_failed").slice(0, 200),
    rejected_at: new Date().toISOString(),
    last_reject_reason: String(reason || "build_failed").slice(0, 200),
  });

  return { ...meta, abandoned, attempts, max };
}

export function writeRunMeta(runPath, data) {
  const existing = readRunMeta(runPath) || {};
  const merged = { ...existing, ...data };
  const meta = {
    model: merged.model,
    model_slug: merged.model_slug || modelSlug(merged.model),
    model_api: merged.model_api || null,
    provider: merged.provider || null,
    engine: merged.engine || null,
    engine_link: merged.engine_link || null,
    built_at: merged.built_at || today(),
    updated: today(),
    demo: merged.demo || "demo/index.html",
    preview: merged.preview || null,
    status: merged.status || "built",
    thinking_enabled: boolOrNull(merged.thinking_enabled),
    stream: boolOrNull(merged.stream),
    temperature: numOrNull(merged.temperature),
    context_tokens: numOrNull(merged.context_tokens),
    duration_ms: numOrNull(merged.duration_ms),
    gen_ms: numOrNull(merged.gen_ms),
    ttft_ms: numOrNull(merged.ttft_ms),
    queue_wait_ms: numOrNull(merged.queue_wait_ms),
    wall_ms: numOrNull(merged.wall_ms),
    prompt_tokens: numOrNull(merged.prompt_tokens),
    completion_tokens: numOrNull(merged.completion_tokens),
    total_tokens: numOrNull(merged.total_tokens),
    build_attempts: numOrNull(merged.build_attempts) || 0,
    reject_reason: merged.reject_reason || null,
    rejected_at: merged.rejected_at || null,
    last_review_score: numOrNull(merged.last_review_score),
    last_review_summary: merged.last_review_summary || null,
    last_reject_reason: merged.last_reject_reason || null,
    review_score:
      merged.review_score === undefined || merged.review_score === null
        ? null
        : Number(merged.review_score),
    review_summary: merged.review_summary || null,
    review_issues: Array.isArray(merged.review_issues)
      ? merged.review_issues
      : merged.review_issues
        ? [String(merged.review_issues)]
        : [],
    reviewed_at: merged.reviewed_at || null,
  };

  let text = `model: ${q(meta.model)}
model_slug: ${meta.model_slug}
`;
  if (meta.model_api) text += `model_api: ${q(meta.model_api)}\n`;
  text += `provider: ${q(meta.provider)}
`;
  if (meta.engine) text += `engine: ${q(meta.engine)}\n`;
  if (meta.engine_link) text += `engine_link: ${q(meta.engine_link)}\n`;
  text += `built_at: "${meta.built_at}"
updated: "${meta.updated}"
demo: ${meta.demo}
preview: ${meta.preview ? meta.preview : "null"}
status: ${meta.status}
build_attempts: ${meta.build_attempts}
`;
  if (meta.thinking_enabled != null) {
    text += `thinking_enabled: ${meta.thinking_enabled}\n`;
  }
  if (meta.stream != null) text += `stream: ${meta.stream}\n`;
  if (meta.temperature != null) text += `temperature: ${meta.temperature}\n`;
  if (meta.context_tokens != null) {
    text += `context_tokens: ${meta.context_tokens}\n`;
  }
  // duration_ms = gen_ms (primary); keep legacy field + explicit breakdown
  const genMs = meta.gen_ms != null ? meta.gen_ms : meta.duration_ms;
  if (genMs != null) text += `duration_ms: ${genMs}\n`;
  if (meta.gen_ms != null) text += `gen_ms: ${meta.gen_ms}\n`;
  if (meta.ttft_ms != null) text += `ttft_ms: ${meta.ttft_ms}\n`;
  if (meta.queue_wait_ms != null) text += `queue_wait_ms: ${meta.queue_wait_ms}\n`;
  if (meta.wall_ms != null) text += `wall_ms: ${meta.wall_ms}\n`;
  if (meta.prompt_tokens != null) {
    text += `prompt_tokens: ${meta.prompt_tokens}\n`;
  }
  if (meta.completion_tokens != null) {
    text += `completion_tokens: ${meta.completion_tokens}\n`;
  }
  if (meta.total_tokens != null) {
    text += `total_tokens: ${meta.total_tokens}\n`;
  }
  if (meta.reject_reason) text += `reject_reason: ${q(meta.reject_reason)}\n`;
  if (meta.rejected_at) text += `rejected_at: ${q(meta.rejected_at)}\n`;
  if (meta.last_review_score != null) {
    text += `last_review_score: ${meta.last_review_score}\n`;
  }
  if (meta.last_review_summary) {
    text += `last_review_summary: ${q(meta.last_review_summary)}\n`;
  }
  if (meta.last_reject_reason) {
    text += `last_reject_reason: ${q(meta.last_reject_reason)}\n`;
  }
  if (meta.review_score != null && Number.isFinite(meta.review_score)) {
    text += `review_score: ${meta.review_score}
`;
  }
  if (meta.review_summary) text += `review_summary: ${q(meta.review_summary)}\n`;
  if (meta.reviewed_at) text += `reviewed_at: ${q(meta.reviewed_at)}\n`;
  if (meta.review_issues.length) {
    text += `review_issues:\n`;
    for (const issue of meta.review_issues) {
      text += `  - ${q(issue)}\n`;
    }
  }

  fs.mkdirSync(runPath, { recursive: true });
  fs.writeFileSync(path.join(runPath, "meta.yaml"), text);
  return meta;
}

export function readRunMeta(runPath) {
  const p = path.join(runPath, "meta.yaml");
  if (!fs.existsSync(p)) return null;
  return parseMeta(fs.readFileSync(p, "utf8"), p);
}

/** Migrated pre-runs/ snapshots — not a real model benchmark. */
export function isLegacyRun(run) {
  if (!run) return false;
  const slug = String(run.slug || run.model_slug || "").toLowerCase();
  const model = String(run.model || "").toLowerCase();
  const provider = String(run.provider || "").toLowerCase();
  return slug === "legacy" || model === "legacy" || provider === "legacy";
}

/** Runs shown in README / index (excludes legacy migration folders). */
export function visibleRuns(runs) {
  return (runs || []).filter((r) => !isLegacyRun(r));
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
      meta.preview &&
      /\.(png|webp|jpe?g)$/i.test(String(meta.preview)) &&
      fs.existsSync(path.join(dir, meta.preview))
        ? meta.preview
        : fs.existsSync(path.join(dir, "preview.png"))
          ? "preview.png"
          : fs.existsSync(path.join(dir, "preview.webp"))
            ? "preview.webp"
            : fs.existsSync(path.join(dir, "preview.jpg"))
              ? "preview.jpg"
              : null;
    const issues = Array.isArray(meta.review_issues)
      ? meta.review_issues
      : meta.review_issues
        ? [String(meta.review_issues)]
        : [];
    runs.push({
      slug,
      model: meta.model || slug,
      model_api: meta.model_api || null,
      provider: meta.provider || null,
      engine: meta.engine || null,
      engine_link: meta.engine_link || null,
      built_at: meta.built_at || null,
      status: meta.status || "built",
      build_attempts: numOrNull(meta.build_attempts) || 0,
      reject_reason: meta.reject_reason || null,
      last_review_score: numOrNull(meta.last_review_score),
      thinking_enabled: boolOrNull(meta.thinking_enabled),
      stream: boolOrNull(meta.stream),
      temperature: numOrNull(meta.temperature),
      context_tokens: numOrNull(meta.context_tokens),
      duration_ms: numOrNull(meta.duration_ms),
      gen_ms: numOrNull(meta.gen_ms) ?? numOrNull(meta.duration_ms),
      ttft_ms: numOrNull(meta.ttft_ms),
      queue_wait_ms: numOrNull(meta.queue_wait_ms),
      wall_ms: numOrNull(meta.wall_ms),
      prompt_tokens: numOrNull(meta.prompt_tokens),
      completion_tokens: numOrNull(meta.completion_tokens),
      total_tokens: numOrNull(meta.total_tokens),
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
      review_score:
        meta.review_score != null && meta.review_score !== ""
          ? Number(meta.review_score)
          : null,
      review_summary: meta.review_summary || null,
      review_issues: issues,
      reviewed_at: meta.reviewed_at || null,
    });
  }
  return runs;
}

export function hasRunDemo(entryDir, slug) {
  const demo = path.join(runDir(entryDir, slug), "demo", "index.html");
  return fs.existsSync(demo);
}

/**
 * After reject/rebuild: point entry meta at an existing demo + shot, else null.
 */
export function syncEntryPointers(entryDir, entryRelPosix, metaPath, updateMetaFields) {
  const runs = listRuns(entryDir, entryRelPosix);
  const liveDemos = runs.filter((r) => r.has_demo);
  const hasShotPreview = (r) =>
    r.has_preview &&
    r.preview_name &&
    /\.(png|webp|jpe?g)$/i.test(r.preview_name);

  const patch = {
    demo: null,
    default_run: null,
    preview: null,
  };

  if (liveDemos.length) {
    const def = pickDefaultRun(liveDemos, null);
    patch.default_run = def.slug;
    patch.demo = path.posix.join(
      "runs",
      def.slug,
      def.demo_name || "demo/index.html"
    );
    if (hasShotPreview(def)) {
      patch.preview = path.posix.join("runs", def.slug, def.preview_name);
    }
  } else {
    const shot = [...runs].reverse().find(hasShotPreview);
    if (shot) {
      patch.preview = path.posix.join("runs", shot.slug, shot.preview_name);
      patch.default_run = shot.slug;
    }
  }

  if (metaPath && typeof updateMetaFields === "function") {
    updateMetaFields(metaPath, patch);
  }
  return patch;
}

/**
 * Repair entry metas whose demo/preview paths are missing (or svg while demo claimed).
 * `entries` from walkEntries; returns count patched.
 */
export function repairStaleEntryPointers(entries, updateMetaFields) {
  let n = 0;
  for (const e of entries || []) {
    const demo =
      e.demo && e.demo !== "null" ? path.join(e.dir, e.demo) : null;
    const preview =
      e.preview && e.preview !== "null" ? path.join(e.dir, e.preview) : null;
    const demoMissing = Boolean(demo && !fs.existsSync(demo));
    const previewMissing = Boolean(preview && !fs.existsSync(preview));
    const svgWithDemo =
      Boolean(demo && fs.existsSync(demo)) &&
      e.preview &&
      /\.svg$/i.test(String(e.preview));
    if (!demoMissing && !previewMissing && !svgWithDemo) continue;
    syncEntryPointers(e.dir, e.rel, e.metaPath, updateMetaFields);
    n += 1;
  }
  return n;
}

/** Pick default run: meta.default_run, else newest with shot preview, else newest with demo.
 * Prefers non-legacy runs so migration snapshots never win the default badge. */
export function pickDefaultRun(runs, defaultSlug) {
  if (!runs.length) return null;
  const preferred = visibleRuns(runs);
  const pool = preferred.length ? preferred : runs;
  if (defaultSlug) {
    const hit = pool.find((r) => r.slug === defaultSlug);
    if (hit) return hit;
    // Explicit default_run pointing at legacy: fall through to a real run if any
  }
  const withPreview = [...pool]
    .filter(
      (r) =>
        r.has_preview &&
        r.preview_name &&
        /\.(png|webp|jpe?g)$/i.test(r.preview_name)
    )
    .reverse();
  if (withPreview.length) return withPreview[0];
  const withDemo = [...pool].filter((r) => r.has_demo).reverse();
  if (withDemo.length) return withDemo[0];
  return pool[pool.length - 1];
}

/**
 * Migrate legacy demo/ + root preview.png into runs/<slug>/ once.
 */
export function migrateLegacyRun(entryDir, slug = "legacy") {
  const legacyDemo = path.join(entryDir, "demo", "index.html");
  const targetDemo = path.join(runDir(entryDir, slug), "demo", "index.html");
  if (fs.existsSync(legacyDemo) && !fs.existsSync(targetDemo)) {
    fs.mkdirSync(path.dirname(targetDemo), { recursive: true });
    fs.copyFileSync(legacyDemo, targetDemo);
  }
  const legacyPreview = path.join(entryDir, "preview.png");
  const targetPreview = path.join(runDir(entryDir, slug), "preview.png");
  if (fs.existsSync(legacyPreview) && !fs.existsSync(targetPreview)) {
    fs.mkdirSync(path.dirname(targetPreview), { recursive: true });
    fs.copyFileSync(legacyPreview, targetPreview);
  }
  const dest = runDir(entryDir, slug);
  if (fs.existsSync(targetDemo) || fs.existsSync(targetPreview)) {
    if (!fs.existsSync(path.join(dest, "meta.yaml"))) {
      writeRunMeta(dest, {
        model: slug,
        model_slug: slug,
        provider: "legacy",
        demo: fs.existsSync(targetDemo) ? "demo/index.html" : null,
        preview: fs.existsSync(targetPreview) ? "preview.png" : null,
      });
    }
  }
}
