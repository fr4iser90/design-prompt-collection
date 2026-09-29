#!/usr/bin/env node
// shots.mjs — screenshot each runs/<model>/demo → runs/<model>/preview.png + regen README
//
// Demo files on disk are NEVER modified. Capture serves HTML over HTTP; optional
// serve-time safety patches (e.g. known infinite spawn loops) apply only to the
// response bytes — not written back to demo/index.html.
// NixOS: system Chromium via CDP (playwright.launch(executablePath) hangs).
// Never wait for networkidle — external fonts / infinite rAF would hang forever.
//
//   npm run shots
//   npm run shots -- --id tidal-studio-hero
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
/** Max wall time per run — protects the worker from wedged Chromium. */
const SHOT_BUDGET_MS = 25000;
/** Time after navigation for fonts + first animation frames (real paint). */
const SETTLE_MS = 1500;

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
      ".woff": "font/woff",
    }[ext] || "application/octet-stream"
  );
}

/**
 * Serve-time only (never writes to disk). Fixes LLM bug:
 * `while (particles.length < count) spawn(new P(), true)` without push → infinite loop.
 */
function prepareHtmlForShot(html) {
  return html.replace(
    /while\s*\(\s*particles\.length\s*<\s*count\s*\)\s*spawn\(\s*new\s+P\(\)\s*,\s*true\s*\)\s*;/g,
    "while(particles.length < count){const __dpcP=new P();spawn(__dpcP,true);particles.push(__dpcP);}"
  );
}

function startStaticServer(rootDir) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
        const rel = urlPath === "/" ? "/index.html" : urlPath;
        const filePath = path.normalize(path.join(rootDir, rel));
        if (!filePath.startsWith(path.normalize(rootDir))) {
          res.writeHead(403);
          res.end("Forbidden");
          return;
        }
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const type = contentType(filePath);
        if (path.extname(filePath).toLowerCase() === ".html") {
          const raw = fs.readFileSync(filePath, "utf8");
          const body = prepareHtmlForShot(raw);
          res.writeHead(200, { "Content-Type": type });
          res.end(body);
          return;
        }
        res.writeHead(200, { "Content-Type": type });
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

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`${label} timed out after ${ms}ms`)),
      ms
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function shotRun(browser, entry, run) {
  const demoFile = path.join(run.dir, "demo", "index.html");
  if (!fs.existsSync(demoFile)) {
    throw new Error(`missing ${demoFile}`);
  }

  const { server, port } = await startStaticServer(run.dir);
  const demoUrl = `http://127.0.0.1:${port}/demo/index.html`;

  const context =
    browser.contexts()[0] ||
    (await browser.newContext({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 1,
    }));
  const page = await context.newPage();
  await page.setViewportSize({ width: WIDTH, height: HEIGHT });
  page.setDefaultTimeout(12000);
  page.setDefaultNavigationTimeout(12000);

  try {
    console.log(`  load ${entry.rel}/runs/${run.slug} …`);

    // Block non-local network during capture so Google Fonts / CDNs cannot stall
    // DOMContentLoaded. Demo files stay untouched — we still paint the real page
    // (system fallback fonts if webfonts are unreachable).
    await page.route("**/*", async (route) => {
      const reqUrl = route.request().url();
      if (
        reqUrl.startsWith("http://127.0.0.1") ||
        reqUrl.startsWith("http://localhost") ||
        reqUrl.startsWith("file:") ||
        reqUrl.startsWith("data:") ||
        reqUrl.startsWith("blob:")
      ) {
        await route.continue();
        return;
      }
      const type = route.request().resourceType();
      if (type === "stylesheet") {
        await route.fulfill({
          status: 200,
          contentType: "text/css",
          body: "/* shot: external stylesheet skipped */",
        });
        return;
      }
      await route.abort();
    });

    // Freeze from inside rAF: heavy canvas can starve timers. Nothing removed —
    // particles/grain/filters stay as last painted frame; only further frames pause.
    await page.addInitScript((settleMs) => {
      try {
        Object.defineProperty(window, "devicePixelRatio", {
          configurable: true,
          get: () => 1,
        });
      } catch {
        /* ignore */
      }

      const pauseCss = () => {
        if (document.getElementById("dpc-shot-freeze")) return;
        const style = document.createElement("style");
        style.id = "dpc-shot-freeze";
        style.textContent = `*,*::before,*::after{
          animation-play-state:paused !important;
          transition:none !important;
        }`;
        const mount = () =>
          (document.documentElement || document.head || document.body)?.appendChild(
            style
          );
        if (document.documentElement) mount();
        else document.addEventListener("DOMContentLoaded", mount, { once: true });
      };
      pauseCss();

      const origRaf = window.requestAnimationFrame.bind(window);
      const t0 = Date.now();
      let frozen = false;
      let frames = 0;

      window.requestAnimationFrame = (cb) => {
        if (frozen) return 0;
        return origRaf((ts) => {
          if (frozen) return;
          frames += 1;
          const due = Date.now() - t0 >= settleMs || frames >= 8;
          if (due) {
            // Ready before possibly-heavy final paint so screenshot can proceed.
            frozen = true;
            window.__dpcShotReady = true;
            pauseCss();
            try {
              cb(ts);
            } catch {
              /* ignore */
            }
            return;
          }
          try {
            cb(ts);
          } catch {
            /* ignore */
          }
        });
      };

      setTimeout(() => {
        if (!frozen) {
          frozen = true;
          pauseCss();
          window.__dpcShotReady = true;
        }
      }, settleMs + 800);
    }, SETTLE_MS);

    // commit = first response; do NOT use networkidle
    await page.goto(demoUrl, { waitUntil: "commit", timeout: 12000 });
    try {
      await page.waitForLoadState("domcontentloaded", { timeout: 5000 });
    } catch {
      /* commit is enough */
    }

    // Real paint + freeze
    await new Promise((r) => setTimeout(r, SETTLE_MS + 300));
    try {
      await page.waitForFunction(() => window.__dpcShotReady === true, null, {
        timeout: 8000,
      });
    } catch {
      /* freeze best-effort — still try the shot */
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
    // Capture the real frozen frame (grain/particles/filters still visible)
    await page.screenshot({ path: outPath, type: "png", timeout: 10000 });

    const prev = readRunMeta(run.dir) || {};
    writeRunMeta(run.dir, {
      ...prev,
      model: run.model,
      model_slug: run.slug,
      provider: run.provider,
      engine: run.engine || prev.engine || null,
      engine_link: run.engine_link || prev.engine_link || null,
      engine_rev: run.engine_rev || prev.engine_rev || null,
      engine_version: run.engine_version || prev.engine_version || null,
      demo: "demo/index.html",
      preview: "preview.png",
      status: "shot",
      reject_reason: null,
    });
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`  shot ${entry.rel}/runs/${run.slug}/preview.png (${kb}KB)`);
  } finally {
    await page.close().catch(() => {});
    await new Promise((r) => server.close(r));
  }
}

function collectJobs(args) {
  let entries = walkEntries(ROOT).filter((e) => e.status !== "archived");
  if (args.category) entries = entries.filter((e) => e.category === args.category);
  if (args.id) entries = entries.filter((e) => e.id === args.id);

  const jobs = [];
  for (const entry of entries) {
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
  console.log(
    `  mode=playwright+CDP  settle=${SETTLE_MS}ms  budget=${SHOT_BUDGET_MS}ms/run (real demos)`
  );
  const browser = await launchChromium(pw);

  let ok = 0;
  let fail = 0;
  const touched = new Set();
  try {
    for (const { entry, run } of jobs) {
      try {
        await withTimeout(
          shotRun(browser, entry, run),
          SHOT_BUDGET_MS,
          `${entry.id}/${run.slug}`
        );
        touched.add(entry.metaPath);
        ok++;
      } catch (err) {
        fail++;
        console.error(`  FAIL ${entry.rel}/${run.slug}: ${err.message}`);
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }

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
