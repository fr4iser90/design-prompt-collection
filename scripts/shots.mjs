#!/usr/bin/env node
// shots.mjs — screenshot each runs/<model>/demo → runs/<model>/preview.png + regen README
//
//   npm run shots
//   npm run shots -- --id tidal-studio-hero
//   npm run shots -- --model halogen-qwen3.8-flash-next
//   npm run shots -- --missing
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { walkEntries, updateMetaFields } from "./lib/provider.mjs";
import { CATEGORIES } from "./lib/helpers.mjs";
import {
  listRuns,
  migrateLegacyRun,
  writeRunMeta,
  readRunMeta,
  modelSlug,
  pickDefaultRun,
  rejectRunForRebuild,
  syncEntryPointers,
} from "./lib/runs.mjs";
import { ensurePlaywright, launchChromium } from "./lib/playwright-ensure.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WIDTH = 1200;
const HEIGHT = 630;

function die(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

function parseCli(argv) {
  const out = {
    category: null,
    id: null,
    model: null,
    missing: false,
    limit: Infinity,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--missing") out.missing = true;
    else if (a === "--category" || a === "-c") out.category = argv[++i];
    else if (a === "--id" || a === "-i") out.id = argv[++i];
    else if (a === "--model") out.model = argv[++i];
    else if (a === "--limit" || a === "-n") out.limit = Number(argv[++i]);
  }
  return out;
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".woff2": "font/woff2",
    }[ext] || "application/octet-stream"
  );
}

function startStaticServer(rootDir) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
        const rel = urlPath === "/" ? "/index.html" : urlPath;
        const filePath = path.normalize(path.join(rootDir, rel));
        if (!filePath.startsWith(rootDir)) {
          res.writeHead(403);
          res.end("Forbidden");
          return;
        }
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        res.writeHead(200, { "Content-Type": contentType(filePath) });
        fs.createReadStream(filePath).pipe(res);
      } catch (err) {
        res.writeHead(500);
        res.end(String(err.message));
      }
    });
    server.listen(0, "127.0.0.1", () => {
      resolve({ server, port: server.address().port });
    });
    server.on("error", reject);
  });
}

async function shotRun(browser, entry, run) {
  const { server, port } = await startStaticServer(run.dir);
  // demo lives at runs/<slug>/demo/index.html — server root is run.dir
  const demoUrl = `http://127.0.0.1:${port}/demo/index.html`;
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  try {
    // Don't wait for networkidle — Google Fonts / external assets can hang forever.
    // Abort common webfont CDNs so screenshots stay local and fast.
    await page.route("**/*fonts.googleapis.com/**", (route) => route.abort());
    await page.route("**/*fonts.gstatic.com/**", (route) => route.abort());
    await page.route("**/*fonts.bunny.net/**", (route) => route.abort());
    await page.goto(demoUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    // Brief settle for CSS layout / canvas first paint (not network)
    await new Promise((r) => setTimeout(r, 800));
    try {
      await page.waitForLoadState("load", { timeout: 5000 });
    } catch {
      /* fonts blocked / slow — continue with what we have */
    }
    const broken = await page.evaluate(() => {
      const body = document.body;
      if (!body) return "no_body";
      const text = (body.innerText || "").trim();
      const html = body.innerHTML || "";
      if (
        /\? If |Need position|Could make|Put inside|If outside|Let's |Good\. On/i.test(
          text
        ) ||
        /\? If |Need position|Could make|Put inside/i.test(html)
      ) {
        return "thinking_prose_in_page";
      }
      if (text.length < 20 && body.querySelectorAll("*").length < 8) {
        return "nearly_empty";
      }
      // mostly blank canvas: no meaningful painted content size
      const main = body.querySelector("main") || body;
      const rect = main.getBoundingClientRect();
      if (rect.width < 50 || rect.height < 50) return "tiny_layout";
      return null;
    });
    if (broken) {
      const rej = rejectRunForRebuild(run.dir, {
        reason: `shot_broken:${broken}`,
        model: run.model,
        model_slug: run.slug,
        provider: run.provider,
      });
      syncEntryPointers(entry.dir, entry.rel, entry.metaPath, updateMetaFields);
      console.warn(
        `  ✗ broken (${broken}) → ${rej.status} attempt ${rej.attempts}/${rej.max}` +
          (rej.abandoned ? " (give up)" : " (rebuild)")
      );
      throw new Error(`demo looks broken (${broken}) — rejected for rebuild`);
    }
    const outPath = path.join(run.dir, "preview.png");
    await page.screenshot({ path: outPath, type: "png" });
    const prev = readRunMeta(run.dir) || {};
    writeRunMeta(run.dir, {
      ...prev,
      model: run.model,
      model_slug: run.slug,
      provider: run.provider,
      engine: run.engine || prev.engine || null,
      engine_link: run.engine_link || prev.engine_link || null,
      demo: "demo/index.html",
      preview: "preview.png",
      status: "shot",
      reject_reason: null,
    });
    console.log(`  shot ${entry.rel}/runs/${run.slug}/preview.png`);
  } finally {
    await context.close();
    await new Promise((r) => server.close(r));
  }
}

function collectJobs(args) {
  let entries = walkEntries(ROOT).filter((e) => e.status !== "archived");
  if (args.category) entries = entries.filter((e) => e.category === args.category);
  if (args.id) entries = entries.filter((e) => e.id === args.id);

  const jobs = [];
  for (const entry of entries) {
    migrateLegacyRun(entry.dir, "legacy");
    let runs = listRuns(entry.dir, entry.rel).filter((r) => r.has_demo);
    if (args.model) {
      const slug = modelSlug(args.model);
      runs = runs.filter((r) => r.slug === slug);
    }
    if (args.missing) runs = runs.filter((r) => !r.has_preview);
    for (const run of runs) jobs.push({ entry, run });
  }
  return jobs.slice(0, args.limit);
}

async function main() {
  const args = parseCli(process.argv.slice(2));
  if (args.category && !CATEGORIES.includes(args.category)) die("bad --category");

  const jobs = collectJobs(args);
  if (!jobs.length) {
    console.log("Nothing to screenshot. Build a model run first: npm run ai:build");
    return;
  }

  const pw = await ensurePlaywright();
  console.log(`Screenshotting ${jobs.length} model run(s) at ${WIDTH}×${HEIGHT}`);
  const browser = await launchChromium(pw);
  let ok = 0;
  let fail = 0;
  const touched = new Set();
  try {
    for (const { entry, run } of jobs) {
      try {
        await shotRun(browser, entry, run);
        touched.add(entry.metaPath);
        ok++;
      } catch (err) {
        fail++;
        console.error(`  FAIL ${entry.rel}/${run.slug}: ${err.message}`);
      }
    }
  } finally {
    await browser.close();
  }

  // Sync entry-level default preview/demo to default_run
  for (const metaPath of touched) {
    const entry = walkEntries(ROOT).find((e) => e.metaPath === metaPath);
    if (!entry) continue;
    const runs = listRuns(entry.dir, entry.rel);
    const def = pickDefaultRun(runs, entry.default_run);
    if (!def) continue;
    const patch = {
      default_run: def.slug,
      demo: path.posix.join("runs", def.slug, def.demo_name || "demo/index.html"),
    };
    if (def.preview_name) {
      patch.preview = path.posix.join("runs", def.slug, def.preview_name);
      // also mirror to entry root for simple consumers
      const rootPreview = path.join(entry.dir, "preview.png");
      if (def.preview_abs && fs.existsSync(def.preview_abs)) {
        fs.copyFileSync(def.preview_abs, rootPreview);
        patch.preview = "preview.png";
      }
    }
    updateMetaFields(metaPath, patch);
  }

  console.log("Regenerating README / index / catalog…");
  const build = spawnSync("npm", ["run", "generate"], {
    cwd: ROOT,
    encoding: "utf8",
    shell: process.platform === "win32",
    stdio: "inherit",
  });
  if (build.status !== 0) die("generate failed after shots");

  console.log(`\nDone. ok=${ok} fail=${fail}`);
  if (fail) process.exit(1);
}

main().catch((e) => die(e.stack || e.message));
