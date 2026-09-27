// Shared OpenAI-compatible chat + entry filesystem helpers.
import fs from "node:fs";
import path from "node:path";
import { CATEGORIES, PROVIDER_BASES, loadEnvFile, today } from "./helpers.mjs";

export function resolveAiConfig(root) {
  loadEnvFile(path.join(root, ".env"));
  const provider = (process.env.AI_PROVIDER || "openrouter").toLowerCase();
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  // AI_MODEL = label / runs/<slug>/ name
  // AI_MODEL_API = id sent to /v1/chat/completions (defaults to AI_MODEL)
  const model = process.env.AI_MODEL;
  const modelApi = process.env.AI_MODEL_API || model;
  let baseUrl = process.env.AI_BASE_URL || PROVIDER_BASES[provider];
  if (!apiKey) throw new Error("Missing AI_API_KEY in .env");
  if (!model) throw new Error("Missing AI_MODEL in .env");
  if (!baseUrl) {
    throw new Error(
      `Unknown AI_PROVIDER="${provider}". Use openai|openrouter|groq|custom + AI_BASE_URL`
    );
  }
  return {
    provider,
    apiKey,
    model, // stored in run meta + folder slug
    modelApi, // request body "model"
    baseUrl: baseUrl.replace(/\/$/, ""),
  };
}

export const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * Chat completion.
 *
 * IMPORTANT for long HTML builds:
 * - timeout defaults to 1 hour
 * - NEVER auto-retry network drops (that starts a competing job while the LLM still runs)
 * - Only retry HTTP 503 queue_timeout (request was rejected; no job started)
 */
export async function chatCompletions({
  baseUrl,
  apiKey,
  model,
  modelApi,
  provider,
  messages,
  temperature = 0.7,
  jsonMode = false,
  timeoutMs = ONE_HOUR_MS,
  /** Max waits when gateway returns 503 queue busy (no job started). */
  queueRetries = 10,
  heartbeatMs = 30_000,
}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  if (provider === "openrouter") {
    headers["HTTP-Referer"] = "https://github.com/local/design-prompt-collection";
    headers["X-Title"] = "design-prompt-collection";
  }
  const body = { model: modelApi || model, temperature, messages };
  if (jsonMode) body.response_format = { type: "json_object" };

  const url = `${baseUrl}/chat/completions`;
  let lastErr;

  for (let attempt = 0; attempt <= queueRetries; attempt++) {
    const started = Date.now();
    const heartbeat = setInterval(() => {
      const sec = Math.round((Date.now() - started) / 1000);
      const max = Math.round(timeoutMs / 1000);
      console.log(`  … waiting for model ${sec}s / ${max}s (no retry while job runs)`);
    }, heartbeatMs);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
      });
      const raw = await res.text();

      if (!res.ok) {
        let retryAfterSec = null;
        try {
          const j = JSON.parse(raw);
          if (j.retry_after != null) retryAfterSec = Number(j.retry_after);
          else if (j.error?.retry_after != null) {
            retryAfterSec = Number(j.error.retry_after);
          }
        } catch {
          /* ignore */
        }
        const headerRetry = Number(res.headers.get("retry-after"));
        if (!retryAfterSec && Number.isFinite(headerRetry)) {
          retryAfterSec = headerRetry;
        }

        const queueRejected =
          res.status === 503 &&
          /queue|busy|capacity|slots|source_queue/i.test(raw);

        // Only safe to retry when the gateway refused the job (never started).
        if (queueRejected && attempt < queueRetries) {
          const waitSec = Math.min(Math.max(retryAfterSec || 30, 5), 120);
          console.warn(
            `  queue full (503) — waiting ${waitSec}s then retry ${attempt + 1}/${queueRetries} (no parallel job)`
          );
          lastErr = new Error(`Provider HTTP ${res.status}: ${raw.slice(0, 800)}`);
          await new Promise((r) => setTimeout(r, waitSec * 1000));
          continue;
        }

        throw new Error(`Provider HTTP ${res.status}: ${raw.slice(0, 800)}`);
      }

      const data = JSON.parse(raw);
      const msg = data.choices?.[0]?.message || {};
      const content =
        (typeof msg.content === "string" && msg.content.trim() && msg.content) ||
        (typeof msg.reasoning_content === "string" && msg.reasoning_content) ||
        "";
      if (!content) throw new Error(`Empty model content: ${raw.slice(0, 400)}`);
      return content;
    } catch (err) {
      lastErr = err;
      if (err?.name === "TimeoutError" || err?.cause?.name === "TimeoutError") {
        throw new Error(
          `Model timed out after ${Math.round(timeoutMs / 1000)}s (1 request, no retry)`
        );
      }
      // Network drop mid-generation: DO NOT retry — server may still be working.
      const cause = err.cause
        ? ` (${err.cause.code || err.cause.message || err.cause})`
        : "";
      if (/fetch failed|ECONNRESET|EPIPE|UND_ERR/i.test(String(err.message) + cause)) {
        throw new Error(
          `${err.message}${cause} — NOT retrying (LLM may still be running on the server; retry would start a competing job)`
        );
      }
      throw err instanceof Error ? err : new Error(String(err));
    } finally {
      clearInterval(heartbeat);
    }
  }
  throw lastErr;
}

/** Minimal YAML parse (same subset as generate/validate). */
export function parseMeta(text, filePath = "meta.yaml") {
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
    if (!kv) throw new Error(`Cannot parse ${filePath}:${i + 1}`);
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
    if (!Array.isArray(obj[listKey])) {
      obj[listKey] = obj[listKey] ? [obj[listKey]] : [];
    }
  }
  return obj;
}

export function serializeMeta(meta) {
  const q = (s) => `"${String(s).replaceAll('"', '\\"')}"`;
  const tags = (meta.tags || []).map((t) => `  - ${t}`).join("\n");
  const hints = (meta.model_hints || ["cursor", "chatgpt", "claude"])
    .map((t) => `  - ${t}`)
    .join("\n");
  const demo =
    meta.demo === null || meta.demo === undefined ? "null" : meta.demo;
  const defaultRun =
    meta.default_run === null || meta.default_run === undefined
      ? "null"
      : meta.default_run;
  const sourceModel =
    meta.source_model === null || meta.source_model === undefined
      ? "null"
      : q(meta.source_model);
  const sourceProvider =
    meta.source_provider === null || meta.source_provider === undefined
      ? "null"
      : q(meta.source_provider);
  return `id: ${meta.id}
title: ${q(meta.title)}
category: ${meta.category}
tags:
${tags}
status: ${meta.status}
summary: ${q(meta.summary)}
preview: ${meta.preview}
prompt: ${meta.prompt || "prompt.md"}
extended: ${meta.extended || "prompt.full.md"}
demo: ${demo}
default_run: ${defaultRun}
source_model: ${sourceModel}
source_provider: ${sourceProvider}
created: "${meta.created}"
updated: "${meta.updated || today()}"
model_hints:
${hints}
`;
}

export function walkEntries(root) {
  const prompts = path.join(root, "prompts");
  const out = [];
  for (const category of CATEGORIES) {
    const catDir = path.join(prompts, category);
    if (!fs.existsSync(catDir)) continue;
    for (const id of fs.readdirSync(catDir).sort()) {
      const dir = path.join(catDir, id);
      if (!fs.statSync(dir).isDirectory()) continue;
      const metaPath = path.join(dir, "meta.yaml");
      if (!fs.existsSync(metaPath)) continue;
      const meta = parseMeta(fs.readFileSync(metaPath, "utf8"), metaPath);
      out.push({
        ...meta,
        dir,
        rel: path.posix.join("prompts", category, id),
        metaPath,
      });
    }
  }
  return out;
}

export function updateMetaFields(metaPath, patch) {
  const meta = parseMeta(fs.readFileSync(metaPath, "utf8"), metaPath);
  Object.assign(meta, patch, { updated: today() });
  fs.writeFileSync(metaPath, serializeMeta(meta));
  return meta;
}

export function demoPathFor(entry) {
  if (entry.demo) return path.join(entry.dir, entry.demo);
  const preferred = path.join(entry.dir, "demo", "index.html");
  if (fs.existsSync(preferred)) return preferred;
  const legacy = path.join(entry.dir, "demo.html");
  if (fs.existsSync(legacy)) return legacy;
  return null;
}

export function hasDemo(entry) {
  const p = demoPathFor(entry);
  return Boolean(p && fs.existsSync(p));
}

export function extractHtmlDocument(text) {
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:html)?\s*([\s\S]*?)```/i);
  const body = fence ? fence[1].trim() : trimmed;
  const start = body.search(/<!DOCTYPE html>|<html[\s>]/i);
  if (start === -1) {
    throw new Error("Model did not return a full HTML document");
  }
  let html = body.slice(start).trim();
  if (!/<\/html>/i.test(html)) {
    throw new Error("HTML document missing </html>");
  }
  // trim trailing junk after </html>
  const end = html.toLowerCase().lastIndexOf("</html>");
  html = html.slice(0, end + "</html>".length);
  return html;
}
