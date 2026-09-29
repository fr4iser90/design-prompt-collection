#!/usr/bin/env node
// Rename runs/<from>/ → runs/<to>/ and rewrite run + entry metas.
//
//   npm run migrate:runs -- --from qwen3-8-flash-next
//   (uses AI_MODEL / AI_ENGINE / AI_ENGINE_LINK from .env for --to + engine fields)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvFile } from "./lib/helpers.mjs";
import { modelSlug, writeRunMeta, readRunMeta, runDir } from "./lib/runs.mjs";
import { walkEntries, updateMetaFields, pinEngineLink } from "./lib/provider.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function parseCli(argv) {
  const out = { from: null, to: null, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--from") out.from = argv[++i];
    else if (a === "--to") out.to = argv[++i];
    else if (a === "--dry-run") out.dryRun = true;
  }
  return out;
}

function rewriteEntryPaths(text, from, to) {
  return text
    .split(from)
    .join(to);
}

function main() {
  loadEnvFile(path.join(ROOT, ".env"));
  const args = parseCli(process.argv.slice(2));
  const from = args.from || "qwen3-8-flash-next";
  const model = process.env.AI_MODEL;
  if (!model && !args.to) {
    console.error("Set AI_MODEL in .env or pass --to <slug>");
    process.exit(1);
  }
  const to = args.to || modelSlug(model);
  const engine = (process.env.AI_ENGINE || "").trim() || null;
  const engineRev = (process.env.AI_ENGINE_REV || "").trim() || null;
  const engineVersion = (process.env.AI_ENGINE_VERSION || "").trim() || null;
  const engineLink = pinEngineLink(
    (process.env.AI_ENGINE_LINK || "").trim() || null,
    { engineRev, engineVersion }
  );

  if (from === to) {
    console.error(`from === to (${from}); nothing to rename`);
    process.exit(1);
  }

  console.log(
    `Migrate runs/${from}/ → runs/${to}/` +
      (model ? ` (model=${model})` : "") +
      (engine ? ` engine=${engine}` : "") +
      (args.dryRun ? " [dry-run]" : "")
  );

  const entries = walkEntries(ROOT);
  let renamed = 0;
  let patched = 0;

  for (const entry of entries) {
    const src = runDir(entry.dir, from);
    const dest = runDir(entry.dir, to);
    if (!fs.existsSync(src)) continue;

    if (fs.existsSync(dest)) {
      console.warn(`  skip ${entry.rel}: runs/${to}/ already exists`);
      continue;
    }

    if (args.dryRun) {
      console.log(`  would rename ${entry.rel}/runs/${from} → ${to}`);
      renamed++;
      continue;
    }

    fs.renameSync(src, dest);
    renamed++;

    const prev = readRunMeta(dest) || {};
    writeRunMeta(dest, {
      ...prev,
      model: model || prev.model || to,
      model_slug: to,
      engine: engine || prev.engine || null,
      engine_link: engineLink || prev.engine_link || null,
      engine_rev: engineRev || prev.engine_rev || null,
      engine_version: engineVersion || prev.engine_version || null,
      provider: prev.provider || "custom",
    });

    // Fix entry meta paths that still point at the old slug
    const metaPath = entry.metaPath;
    if (metaPath && fs.existsSync(metaPath)) {
      const raw = fs.readFileSync(metaPath, "utf8");
      if (raw.includes(from)) {
        fs.writeFileSync(metaPath, rewriteEntryPaths(raw, from, to));
        patched++;
      } else {
        // Ensure default_run/demo point at new slug when present
        const patch = {};
        if (entry.default_run === from) patch.default_run = to;
        if (entry.demo && String(entry.demo).includes(from)) {
          patch.demo = String(entry.demo).split(from).join(to);
        }
        if (entry.preview && String(entry.preview).includes(from)) {
          patch.preview = String(entry.preview).split(from).join(to);
        }
        if (Object.keys(patch).length) {
          updateMetaFields(metaPath, patch);
          patched++;
        }
      }
    }

    console.log(`  ✓ ${entry.rel}/runs/${from} → ${to}`);
  }

  console.log(`Done: renamed=${renamed} entry_metas_patched=${patched}`);
  if (!args.dryRun && renamed) {
    console.log("Next: npm run build");
  }
}

main();
