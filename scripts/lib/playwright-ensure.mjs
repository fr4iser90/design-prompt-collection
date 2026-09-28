// Ensure Playwright can launch a browser (bundled or system Chromium via CDP).
import fs from "node:fs";
import path from "node:path";
import net from "node:net";
import { spawn, spawnSync } from "node:child_process";
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

function freePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.listen(0, "127.0.0.1", () => {
      const addr = s.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      s.close((err) => (err ? reject(err) : resolve(port)));
    });
    s.on("error", reject);
  });
}

async function waitForCdp(port, timeoutMs = 20000) {
  const start = Date.now();
  let lastErr;
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return await res.json();
    } catch (err) {
      lastErr = err;
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(
    `Chromium CDP not ready on :${port} (${lastErr?.message || "timeout"})`
  );
}

/**
 * NixOS / mismatched Playwright: chromium.launch(executablePath) often hangs
 * forever on goto/setContent. Spawning with --remote-debugging-port + CDP works.
 */
async function launchSystemViaCdp(playwright, executablePath) {
  const port = await freePort();
  // Do NOT pass --disable-gpu / --disable-software-rasterizer together:
  // heavy canvas + SVG filters then peg the renderer and page.screenshot never returns.
  // SwiftShader gives a real (software) GL path so particles/grain still paint correctly.
  const args = [
    "--headless=new",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-extensions",
    "--disable-background-networking",
    "--font-render-hinting=none",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    `--remote-debugging-port=${port}`,
    "--remote-debugging-address=127.0.0.1",
    "about:blank",
  ];
  const child = spawn(executablePath, args, {
    stdio: ["ignore", "ignore", "pipe"],
    env: process.env,
  });
  let stderr = "";
  child.stderr?.on("data", (d) => {
    stderr += String(d);
    if (stderr.length > 4000) stderr = stderr.slice(-4000);
  });
  child.on("exit", (code, signal) => {
    if (code && code !== 0) {
      console.warn(
        `  chromium exited code=${code} signal=${signal || ""}` +
          (stderr ? `\n  ${stderr.slice(0, 400)}` : "")
      );
    }
  });

  try {
    await waitForCdp(port);
  } catch (err) {
    try {
      child.kill("SIGKILL");
    } catch {
      /* ignore */
    }
    throw new Error(`${err.message}${stderr ? `\n${stderr.slice(0, 500)}` : ""}`);
  }

  const browser = await playwright.chromium.connectOverCDP(
    `http://127.0.0.1:${port}`
  );

  const origClose = browser.close.bind(browser);
  browser.close = async (...closeArgs) => {
    try {
      await origClose(...closeArgs);
    } catch {
      /* ignore */
    }
    try {
      if (!child.killed) child.kill("SIGTERM");
    } catch {
      /* ignore */
    }
    setTimeout(() => {
      try {
        if (!child.killed) child.kill("SIGKILL");
      } catch {
        /* ignore */
      }
    }, 2000);
  };

  return browser;
}

/**
 * Returns { playwright, executablePath, ok, mode }.
 * ok=false → shots deferred; caller should not exit the worker.
 */
export async function ensurePlaywrightSoft() {
  const playwright = await loadPlaywrightModule();
  let bundled = bundledChromiumPath(playwright);
  let system = findSystemChrome();

  if (system) {
    console.log(`  playwright: using system browser ${system}`);
    return { playwright, executablePath: system, ok: true, mode: "system-cdp" };
  }

  if (bundled) {
    console.log(`  playwright: bundled chromium ok`);
    return { playwright, executablePath: null, ok: true, mode: "bundled" };
  }

  console.warn(
    "  no bundled/system Chromium — trying download (shots need a browser)…"
  );
  tryInstallBundledChromium();
  const fresh = await loadPlaywrightModule();
  bundled = bundledChromiumPath(fresh);
  system = findSystemChrome();

  if (system) {
    console.log(`  playwright: using system browser ${system}`);
    return { playwright: fresh, executablePath: system, ok: true, mode: "system-cdp" };
  }
  if (bundled) {
    console.log(`  playwright: bundled chromium ok after install`);
    return { playwright: fresh, executablePath: null, ok: true, mode: "bundled" };
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
  fixPlaywrightBrowsersPath();
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

  // Prefer CDP + system chromium (reliable on NixOS). launch(executablePath) hangs.
  if (system) {
    try {
      console.log(`  chromium: CDP launch ${system}`);
      // Avoid nix playwright-browsers path interfering with CDP
      fixPlaywrightBrowsersPath();
      return await launchSystemViaCdp(soft.playwright, system);
    } catch (err) {
      console.warn(`  CDP launch failed: ${err.message}`);
    }
  }

  const args = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ];
  if (bundled) {
    try {
      console.log("  chromium: bundled launch");
      return await chromium.launch({ headless: true, args });
    } catch (err) {
      console.warn(`  bundled launch failed: ${err.message}`);
    }
  }

  throw new Error(
    "Could not launch Chromium for screenshots (CDP + bundled failed)"
  );
}
