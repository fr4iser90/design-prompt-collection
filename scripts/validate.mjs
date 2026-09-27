#!/usr/bin/env node
/**
 * validate.mjs — ensure every entry matches schema + folder contract
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PROMPTS = path.join(ROOT, "prompts");
const CATEGORIES = ["landing-pages", "animations", "concepts", "experiments"];
const STATUSES = ["draft", "polished", "archived"];

function parseMeta(text, filePath) {
  const lines = text.split(/\r?\n/);
  const obj = {};
  let currentList = null;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const listMatch = raw.match(/^\s+-\s+(.*)$/);
    if (listMatch && currentList) {
      let v = listMatch[1].trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      currentList.push(v === "null" ? null : v);
      continue;
    }
    const kv = raw.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) throw new Error(`Parse error ${filePath}:${i + 1}`);
    const [, key, rest] = kv;
    currentList = null;
    if (rest === "" || rest === "|" || rest === ">") {
      obj[key] = [];
      currentList = obj[key];
      continue;
    }
    let val = rest.trim();
    if (val === "null") val = null;
    else if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    obj[key] = val;
  }
  for (const listKey of ["tags", "model_hints"]) {
    if (!Array.isArray(obj[listKey])) obj[listKey] = obj[listKey] ? [obj[listKey]] : [];
  }
  return obj;
}

function fail(errors, msg) {
  errors.push(msg);
}

function validateEntry(category, id, errors) {
  const dir = path.join(PROMPTS, category, id);
  const metaPath = path.join(dir, "meta.yaml");
  if (!fs.existsSync(metaPath)) {
    fail(errors, `${category}/${id}: missing meta.yaml`);
    return;
  }
  const meta = parseMeta(fs.readFileSync(metaPath, "utf8"), metaPath);

  if (meta.id !== id) fail(errors, `${category}/${id}: meta.id must equal folder name`);
  if (meta.category !== category) fail(errors, `${category}/${id}: meta.category mismatch`);
  if (!meta.title || meta.title.length < 3) fail(errors, `${category}/${id}: title too short`);
  if (!STATUSES.includes(meta.status)) fail(errors, `${category}/${id}: bad status`);
  if (!meta.summary || meta.summary.length < 20 || meta.summary.length > 220) {
    fail(errors, `${category}/${id}: summary must be 20–220 chars`);
  }
  if (!Array.isArray(meta.tags) || meta.tags.length < 1) {
    fail(errors, `${category}/${id}: need ≥1 tag`);
  }
  for (const t of meta.tags || []) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t)) {
      fail(errors, `${category}/${id}: bad tag "${t}"`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.created || "")) {
    fail(errors, `${category}/${id}: created must be YYYY-MM-DD`);
  }
  if (meta.prompt !== "prompt.md") fail(errors, `${category}/${id}: prompt must be prompt.md`);
  if (meta.extended !== "prompt.full.md") {
    fail(errors, `${category}/${id}: extended must be prompt.full.md`);
  }
  if (!meta.preview || !/^(preview\.(svg|png|webp|jpg|jpeg)|runs\/[a-z0-9-]+\/preview\.(svg|png|webp|jpg|jpeg))$/.test(meta.preview)) {
    fail(errors, `${category}/${id}: invalid preview filename`);
  }

  for (const req of ["prompt.md", "prompt.full.md"]) {
    if (!fs.existsSync(path.join(dir, req))) {
      fail(errors, `${category}/${id}: missing file ${req}`);
    }
  }
  if (!fs.existsSync(path.join(dir, meta.preview))) {
    fail(errors, `${category}/${id}: missing preview ${meta.preview}`);
  }
  if (meta.demo && meta.demo !== "null" && !fs.existsSync(path.join(dir, meta.demo))) {
    fail(errors, `${category}/${id}: demo listed but missing: ${meta.demo}`);
  }

  const prompt = fs.readFileSync(path.join(dir, "prompt.md"), "utf8").trim();
  const full = fs.readFileSync(path.join(dir, "prompt.full.md"), "utf8").trim();
  if (prompt.length < 80) fail(errors, `${category}/${id}: prompt.md too short`);
  if (full.length < 200) fail(errors, `${category}/${id}: prompt.full.md too short`);
  if (prompt.includes("{{") || full.includes("{{")) {
    fail(errors, `${category}/${id}: unresolved template placeholders`);
  }
}

function main() {
  const errors = [];
  if (!fs.existsSync(PROMPTS)) fail(errors, "prompts/ missing");

  for (const category of CATEGORIES) {
    const catDir = path.join(PROMPTS, category);
    if (!fs.existsSync(catDir)) continue;
    for (const id of fs.readdirSync(catDir)) {
      const dir = path.join(catDir, id);
      if (!fs.statSync(dir).isDirectory()) continue;
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
        fail(errors, `${category}/${id}: folder must be kebab-case`);
        continue;
      }
      validateEntry(category, id, errors);
    }
  }

  if (errors.length) {
    console.error(`Validation failed (${errors.length}):\n` + errors.map((e) => ` - ${e}`).join("\n"));
    process.exit(1);
  }
  console.log("Validation OK");
}

main();
