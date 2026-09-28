#!/usr/bin/env node
// playwright-check.mjs — smoke test that Chromium+CDP+screenshot works in this shell.
//
//   npm run playwright:check
//   nix-shell --run 'npm run playwright:check'
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ensurePlaywright,
  findSystemChrome,
  launchChromium,
} from "./lib/playwright-ensure.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WIDTH = 1200;
const HEIGHT = 630;

function die(msg) {
  console.error(`playwright:check FAIL — ${msg}`);
  process.exit(1);
}

async function main() {
  process.chdir(ROOT);
  const chrome = findSystemChrome();
  console.log(`chromium: ${chrome || "(none — will try bundled)"}`);
  console.log(
    `PLAYWRIGHT_BROWSERS_PATH=${process.env.PLAYWRIGHT_BROWSERS_PATH || "(unset)"}`
  );

  const pw = await ensurePlaywright();
  const t0 = Date.now();
  const browser = await launchChromium(pw);
  const context =
    browser.contexts()[0] ||
    (await browser.newContext({
      viewport: { width: WIDTH, height: HEIGHT },
      deviceScaleFactor: 1,
    }));
  const page = await context.newPage();
  await page.setViewportSize({ width: WIDTH, height: HEIGHT });

  await page.setContent(
    `<!doctype html><html><body style="margin:0;background:linear-gradient(135deg,#1a1a1a,#444);color:#eee;font:24px/1.2 Georgia,serif;display:grid;place-items:center;height:100vh">
      <main>playwright-check ok</main>
    </body></html>`,
    { waitUntil: "domcontentloaded", timeout: 8000 }
  );

  const out = path.join(os.tmpdir(), `dpc-playwright-check-${process.pid}.png`);
  await page.screenshot({ path: out, type: "png", timeout: 10000 });
  const bytes = fs.statSync(out).size;
  await page.close().catch(() => {});
  await browser.close().catch(() => {});

  if (bytes < 1000) die(`screenshot too small (${bytes}B)`);
  console.log(
    `playwright:check OK — ${WIDTH}×${HEIGHT} png ${bytes}B in ${Date.now() - t0}ms`
  );
  console.log(`  wrote ${out}`);
  try {
    fs.unlinkSync(out);
  } catch {
    /* keep if busy */
  }
}

main().catch((e) => die(e.stack || e.message));
