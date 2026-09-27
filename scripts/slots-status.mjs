#!/usr/bin/env node
// slots-status.mjs — print /v1/models slot info (no completion call)
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveAiConfig } from "./lib/provider.mjs";
import { fetchModelSlots } from "./lib/slots.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const cfg = resolveAiConfig(ROOT);
const info = await fetchModelSlots({
  baseUrl: cfg.baseUrl,
  apiKey: cfg.apiKey,
  modelApi: cfg.modelApi,
});
console.log(JSON.stringify({ model: cfg.model, api: cfg.modelApi, ...info }, null, 2));
