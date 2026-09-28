// Ensure Playwright can launch a browser (bundled or system Chromium).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

/** Prefer user cache when PLAYWRIGHT_BROWSERS_PATH points at a nix store. */
export function fixPlaywrightBrowsersPath() {
  const cur = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (cur && cur.startsWith("/nix/")) {
    process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(
      process.env.HOME || "/tmp",
      ".cache",
      "ms-playwright"
    );
  }
  if (!process.env.PLAYWRIGHT_BROWSERS_PATH) {
    process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(
      process.env.HOME || "/tmp",
      ".cache",
      "ms-playwright"
    );
  }
  return process.env.PLAYWRIGHT_BROWSERS_PATH;
}

function playwrightCliJs() {
  return path.join(ROOT, "node_modules", "playwright", "cli.js");
}

function playwrightProgramJs() {
  return path.join(ROOT, "node_modules", "playwright", "lib", "program.js");
}

/** System Chrome/Chromium (NixOS + Debian + snap). */
export function findSystemChrome() {
  const names = [
    "chromium",
    "chromium-browser",
    "google-chrome",
    "google-chrome-stable",
    "chrome",
  ];
  for (const name of names) {
    const r = spawnSync("which", [name], { encoding: "utf8" });
    if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();
  }
  for (const p of [
    "/run/current-system/sw/bin/chromium",
    "/run/current-system/sw/bin/chromium-browser",
    "/etc/profiles/per-user/" +
      (process.env.USER || "") +
      "/bin/chromium",
    path.join(process.env.HOME || "", ".nix-profile/bin/chromium"),
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/snap/bin/chromium",
  ]) {
    if (p && fs.existsSync(p)) return p;
  }
  return null;
}

function bundledChromiumPath(playwright) {
  try {
    const p = playwright.chromium.executablePath();
    return p && fs.existsSync(p) ? p : null;
  } catch {
    return null;
  }
}

function repairPlaywrightPackage() {
  if (fs.existsSync(playwrightCliJs()) && fs.existsSync(playwrightProgramJs())) {
    return true;
  }
  console.warn("  Playwright package incomplete — npm install…");
  const r = spawnSync("npm", ["install"], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });
  return (
    r.status === 0 &&
    fs.existsSync(playwrightCliJs()) &&
    fs.existsSync(playwrightProgramJs())
  );
}

/** Try to install bundled Chromium. Returns whether it exists afterward. */
function tryInstallBundledChromium() {
  fixPlaywrightBrowsersPath();
  if (!repairPlaywrightPackage()) return false;

  const cli = playwrightCliJs();
  if (!fs.existsSync(cli)) return false;

  const timeoutMs = String(
    process.env.PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT || 180000
  );
  console.log(
    `  optional: downloading Playwright Chromium (timeout ${timeoutMs}ms)…`
  );
  const r = spawnSync(process.execPath, [cli, "install", "chromium"], {
    cwd: ROOT,
    stdio: "inherit",
    env: {
      ...process.env,
      PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT: timeoutMs,
    },
    shell: process.platform === "win32",
  });
  return r.status === 0;
}

async function loadPlaywrightModule() {
  fixPlaywrightBrowsersPath();
  if (!fs.existsSync(playwrightCliJs()) || !fs.existsSync(playwrightProgramJs())) {
    repairPlaywrightPackage();
  }
  try {
    return await import("playwright");
  } catch (err) {
    if (!repairPlaywrightPackage()) {
      throw new Error(`playwright missing — npm install (${err.message})`);
    }
    return await import("playwright");
  }
}

/**
 * Returns { playwright, executablePath, ok, mode }.
 * ok=false → shots deferred; caller should not exit the worker.
 */
export async function ensurePlaywrightSoft() {
  const playwright = await loadPlaywrightModule();
  let bundled = bundledChromiumPath(playwright);
  let system = findSystemChrome();

  if (bundled) {
    console.log(`  playwright: bundled chromium ok`);
    return { playwright, executablePath: null, ok: true, mode: "bundled" };
  }

  if (system) {
    console.log(`  playwright: using system browser ${system}`);
    return { playwright, executablePath: system, ok: true, mode: "system" };
  }

  // No browser yet — try download once (may timeout; soft)
  console.warn(
    "  no bundled/system Chromium — trying download (shots need a browser)…"
  );
  tryInstallBundledChromium();
  const fresh = await loadPlaywrightModule();
  bundled = bundledChromiumPath(fresh);
  system = findSystemChrome();

  if (bundled) {
    console.log(`  playwright: bundled chromium ok after install`);
    return { playwright: fresh, executablePath: null, ok: true, mode: "bundled" };
  }
  if (system) {
    console.log(`  playwright: using system browser ${system}`);
    return { playwright: fresh, executablePath: system, ok: true, mode: "system" };
  }

  console.warn(
    "  playwright: no browser (install chromium or retry playwright install).\n" +
      "  Worker continues — builds OK; shots deferred."
  );
  return { playwright: fresh, executablePath: null, ok: false, mode: "none" };
}

/** For shots.mjs — throws if no browser can launch. */
export async function ensurePlaywright() {
  const r = await ensurePlaywrightSoft();
  if (!r.ok) {
    throw new Error(
      "No Chromium for screenshots. Install system chromium or:\n" +
        "  PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=300000 node node_modules/playwright/cli.js install chromium"
    );
  }
  return r.playwright;
}

export async function launchChromium(playwright = null) {
  const soft = playwright
    ? {
        playwright,
        executablePath: findSystemChrome(),
        ok: true,
      }
    : await ensurePlaywrightSoft();

  if (!soft.ok) {
    throw new Error(
      "No Chromium for screenshots — install system chromium or retry playwright install"
    );
  }

  const { chromium } = soft.playwright;
  const system = soft.executablePath || findSystemChrome();
  const bundled = bundledChromiumPath(soft.playwright);

  const attempts = [];
  if (bundled) {
    attempts.push(() => chromium.launch({ headless: true }));
  }
  if (system) {
    attempts.push(() =>
      chromium.launch({ headless: true, executablePath: system })
    );
  }
  // Playwright channel discovery (some distros)
  attempts.push(() => chromium.launch({ headless: true, channel: "chromium" }));
  attempts.push(() => chromium.launch({ headless: true, channel: "chrome" }));

  let lastErr;
  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr instanceof Error
    ? lastErr
    : new Error(String(lastErr || "chromium launch failed"));
}
