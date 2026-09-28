#!/usr/bin/env node
/**
 * scaffold.mjs — create a new prompt entry from templates
 *
 * Usage:
 *   npm run scaffold -- --category landing-pages --id aurora-saas-hero --title "Aurora SaaS Hero"
 *   npm run scaffold -- -c animations -i magnetic-nav -t "Magnetic Nav"
 *
 * Flags:
 *   --category / -c   landing-pages | animations | concepts | experiments
 *   --id / -i         kebab-case folder name
 *   --title / -t      human title
 *   --force           overwrite existing folder
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CATEGORIES = ["landing-pages", "animations", "concepts", "experiments"];

function parseArgs(argv) {
  const out = { force: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--force") out.force = true;
    else if (a === "--category" || a === "-c") out.category = argv[++i];
    else if (a === "--id" || a === "-i") out.id = argv[++i];
    else if (a === "--title" || a === "-t") out.title = argv[++i];
  }
  return out;
}

function die(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

function fill(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? "");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

const args = parseArgs(process.argv.slice(2));
if (!args.category || !CATEGORIES.includes(args.category)) {
  die(`--category must be one of: ${CATEGORIES.join(", ")}`);
}
if (!args.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(args.id)) {
  die("--id must be kebab-case (e.g. aurora-saas-hero)");
}
if (!args.title) die("--title is required");

const dest = path.join(ROOT, "prompts", args.category, args.id);
if (fs.existsSync(dest) && !args.force) {
  die(`Entry already exists: ${dest} (use --force to overwrite)`);
}

const tplDir = path.join(ROOT, "templates", "entry");
const vars = {
  ID: args.id,
  TITLE: args.title,
  CATEGORY: args.category,
  DATE: today(),
};

fs.mkdirSync(dest, { recursive: true });

for (const file of ["meta.yaml", "prompt.md", "prompt.full.md"]) {
  const src = fs.readFileSync(path.join(tplDir, file), "utf8");
  fs.writeFileSync(path.join(dest, file), fill(src, vars));
}

console.log(`Created ${path.relative(ROOT, dest)}`);
console.log("Next: edit meta.yaml + prompts, then npm run ai:build / shots (preview stays null until a real shot)");
