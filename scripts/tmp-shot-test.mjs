#!/usr/bin/env node
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import net from "node:net";
import { launchChromium, ensurePlaywright } from "./lib/playwright-ensure.mjs";

function freePort() {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.listen(0, "127.0.0.1", () => {
      const p = s.address().port;
      s.close(() => resolve(p));
    });
  });
}

const html = fs.readFileSync(
  path.resolve(
    "prompts/animations/bone-dust-spiral/runs/qwen3-8-flash-next-ud-q4-k-xl/demo/index.html"
  ),
  "utf8"
);

const mode = process.argv[2] || "inline";

if (mode === "inline") {
  const port = await freePort();
  const chrome = "/run/current-system/sw/bin/chromium";
  console.log("inline CDP port", port);
  const child = spawn(
    chrome,
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      `--remote-debugging-port=${port}`,
      "--remote-debugging-address=127.0.0.1",
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] }
  );
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) {
        console.log("cdp ready");
        break;
      }
    } catch {
      /* wait */
    }
    await new Promise((r) => setTimeout(r, 200));
    if (i === 49) throw new Error("no cdp");
  }
  const browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
  const page = await browser.contexts()[0].newPage();
  await page.setContent(html, { waitUntil: "commit", timeout: 10000 });
  console.log("title", await page.title());
  await page.screenshot({ path: "/tmp/bone-inline.png" });
  console.log("OK", fs.statSync("/tmp/bone-inline.png").size);
  await browser.close();
  child.kill("SIGKILL");
} else {
  const pw = await ensurePlaywright();
  const browser = await launchChromium(pw);
  const page = await browser.contexts()[0].newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: "commit", timeout: 10000 });
  console.log("title", await page.title());
  await page.screenshot({ path: "/tmp/bone-module.png" });
  console.log("OK", fs.statSync("/tmp/bone-module.png").size);
  await browser.close();
}
