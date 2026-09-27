#!/usr/bin/env node
// install-hooks.mjs — install pre-commit into .git/hooks (no git config changes)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(ROOT, ".githooks", "pre-commit");
const gitDir = path.join(ROOT, ".git");
const destDir = path.join(gitDir, "hooks");
const dest = path.join(destDir, "pre-commit");

if (!fs.existsSync(src)) {
  console.error("Missing .githooks/pre-commit");
  process.exit(1);
}
if (!fs.existsSync(gitDir)) {
  console.warn("No .git directory — skip hook install");
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
fs.chmodSync(dest, 0o755);
fs.chmodSync(src, 0o755);
console.log("Git pre-commit hook installed → .git/hooks/pre-commit");
