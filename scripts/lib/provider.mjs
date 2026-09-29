// Shared OpenAI-compatible chat + entry filesystem helpers.
import fs from "node:fs";
import path from "node:path";
import { CATEGORIES, PROVIDER_BASES, loadEnvFile, today, envFlag } from "./helpers.mjs";
import { waitForIdleSlot, fetchModelSlots } from "./slots.mjs";

export function resolveAiConfig(root, { requireKey = true } = {}) {
  loadEnvFile(path.join(root, ".env"));
  const provider = (process.env.AI_PROVIDER || "openrouter").toLowerCase();
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  // AI_MODEL = display name + runs/<slug>/ folder
  // AI_MODEL_API = id sent to /v1/chat/completions (defaults to AI_MODEL; e.g. gateway alias "chat")
  // AI_ENGINE / AI_ENGINE_LINK = runtime (gufo, llamacpp, …) stored in run meta + README
  const model = process.env.AI_MODEL;
  const modelApi = process.env.AI_MODEL_API || model;
  const engine = (process.env.AI_ENGINE || "").trim() || null;
  const engineLink = (process.env.AI_ENGINE_LINK || "").trim() || null;
  let baseUrl = process.env.AI_BASE_URL || PROVIDER_BASES[provider];
  if (requireKey && !apiKey) throw new Error("Missing AI_API_KEY in .env");
  if (!model) throw new Error("Missing AI_MODEL in .env");
  if (!baseUrl) {
    throw new Error(
      `Unknown AI_PROVIDER="${provider}". Use openai|openrouter|groq|custom + AI_BASE_URL`
    );
  }
  const thinkingEnabled = envFlag("THINKING_ENABLED", false);
  // Stream keeps the connection alive on long builds; default on.
  // Thinking text is only printed when THINKING_ENABLED=true.
  // When false, requests also get /no_think + enable_thinking=false (Qwen/Gufo).
  const stream = envFlag("AI_STREAM", true);
  const waitForSlot = envFlag("WAIT_FOR_SLOT", true);
  return {
    provider,
    apiKey: apiKey || "",
    model, // stored in run meta + folder slug
    modelApi, // request body "model"
    engine,
    engineLink,
    baseUrl: baseUrl.replace(/\/$/, ""),
    thinkingEnabled,
    stream,
    waitForSlot,
  };
}

export const ONE_HOUR_MS = 60 * 60 * 1000;

/** Shared abort for Ctrl+C/SIGTERM — close the in-flight SSE/TCP socket. */
const shutdown = new AbortController();
let shutdownHooked = false;
/** @type {ReadableStreamDefaultReader<Uint8Array> | null} */
let activeSseReader = null;
/** @type {ReadableStream<Uint8Array> | null} */
let activeSseBody = null;

export function isShutdownAborted() {
  return shutdown.signal.aborted;
}

export function getShutdownSignal() {
  return shutdown.signal;
}

/** Force-cancel the in-flight SSE body so the gateway sees disconnect and frees the slot. */
export function forceCloseActiveStream(reason = "aborted") {
  const reader = activeSseReader;
  const body = activeSseBody;
  activeSseReader = null;
  activeSseBody = null;
  try {
    reader?.cancel(reason);
  } catch {
    /* ignore */
  }
  try {
    // Some runtimes expose cancel on the body itself
    body?.cancel?.(reason);
  } catch {
    /* ignore */
  }
}

function ensureShutdownHook() {
  if (shutdownHooked) return;
  shutdownHooked = true;
  const halt = (sig) => {
    if (shutdown.signal.aborted) {
      forceCloseActiveStream(`aborted by ${sig}`);
      return;
    }
    console.error(`\n  ${sig} — aborting stream (closing SSE/TCP now)…`);
    shutdown.abort(new Error(`aborted by ${sig}`));
    forceCloseActiveStream(`aborted by ${sig}`);
    // Don't linger: exit after socket teardown so orphans can't keep the slot
    setTimeout(() => process.exit(130), 150);
  };
  process.on("SIGINT", () => halt("SIGINT"));
  process.on("SIGTERM", () => halt("SIGTERM"));
}

function mergeAbortSignals(...signals) {
  const out = new AbortController();
  const onAbort = () => {
    if (!out.signal.aborted) out.abort();
  };
  for (const s of signals) {
    if (!s) continue;
    if (s.aborted) {
      out.abort();
      return out.signal;
    }
    s.addEventListener("abort", onAbort, { once: true });
  }
  return out.signal;
}

function abortPromise(signal) {
  return new Promise((_, reject) => {
    if (!signal) return;
    if (signal.aborted) {
      reject(Object.assign(new Error("Aborted"), { name: "AbortError" }));
      return;
    }
    signal.addEventListener(
      "abort",
      () => reject(Object.assign(new Error("Aborted"), { name: "AbortError" })),
      { once: true }
    );
  });
}

async function readSseChatStream(
  res,
  {
    showThinking = false,
    showContentTicks = false,
    onThinking,
    onContent,
    onFirstToken,
    signal = null,
  } = {}
) {
  if (!res.body) throw new Error("No response body for SSE stream");
  const reader = res.body.getReader();
  activeSseReader = reader;
  activeSseBody = res.body;
  const decoder = new TextDecoder();
  let buffer = "";
  let content = "";
  let thinking = "";
  let usage = null;
  let sawThinking = false;
  let sawContent = false;
  let firstTokenAt = null;

  const markFirst = () => {
    if (firstTokenAt != null) return;
    firstTokenAt = Date.now();
    onFirstToken?.(firstTokenAt);
  };

  const onAbort = () => {
    forceCloseActiveStream("abort signal");
  };
  signal?.addEventListener("abort", onAbort, { once: true });
  if (signal?.aborted) {
    forceCloseActiveStream("already aborted");
    throw Object.assign(new Error("Aborted"), { name: "AbortError" });
  }

  try {
    while (true) {
      if (signal?.aborted) {
        await reader.cancel("aborted").catch(() => {});
        throw Object.assign(new Error("Aborted"), { name: "AbortError" });
      }
      const { done, value } = await Promise.race([
        reader.read(),
        abortPromise(signal),
      ]);
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n");
      buffer = parts.pop() || "";

      for (const line of parts) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(":")) continue;
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") continue;
        let json;
        try {
          json = JSON.parse(payload);
        } catch {
          continue;
        }
        if (json.usage) usage = json.usage;
        const delta = json.choices?.[0]?.delta || {};
        const t =
          delta.reasoning_content ||
          delta.reasoning ||
          delta.thinking ||
          (typeof delta.reasoning_details === "string"
            ? delta.reasoning_details
            : "");
        const c = delta.content || "";
        if (t) {
          markFirst();
          thinking += t;
          if (showThinking) {
            if (!sawThinking) {
              process.stderr.write("\n  ── thinking ──\n");
              sawThinking = true;
            }
            process.stderr.write(t);
          }
          onThinking?.(t);
        }
        if (c) {
          markFirst();
          content += c;
          if (showContentTicks) {
            if (!sawContent) {
              process.stderr.write("\n  ── content ──\n");
              sawContent = true;
            }
            if (content.length % 2000 < c.length) process.stderr.write("·");
          }
          onContent?.(c);
        }
      }
    }
  } finally {
    signal?.removeEventListener("abort", onAbort);
    if (activeSseReader === reader) activeSseReader = null;
    if (activeSseBody === res.body) activeSseBody = null;
    try {
      reader.releaseLock();
    } catch {
      /* ignore */
    }
  }

  if ((showThinking && sawThinking) || (showContentTicks && sawContent)) {
    process.stderr.write("\n");
  }
  return { content, thinking, usage, firstTokenAt };
}

/** Append /think or /no_think to the last user turn (Qwen hybrid thinking). */
export function applyThinkingControls(messages, thinkingEnabled) {
  const tag = thinkingEnabled ? "/think" : "/no_think";
  const out = messages.map((m) => {
    if (Array.isArray(m.content)) {
      return { ...m, content: m.content.map((p) => ({ ...p })) };
    }
    return { ...m };
  });
  for (let i = out.length - 1; i >= 0; i--) {
    if (out[i].role !== "user") continue;
    const c = out[i].content;
    if (typeof c === "string") {
      const cleaned = c.replace(/\s*\/(?:no_)?think\s*$/i, "").trimEnd();
      out[i].content = `${cleaned}\n${tag}`;
    } else if (Array.isArray(c)) {
      const textIdx = c.findIndex((p) => p && p.type === "text");
      if (textIdx >= 0) {
        const cleaned = String(c[textIdx].text || "")
          .replace(/\s*\/(?:no_)?think\s*$/i, "")
          .trimEnd();
        c[textIdx].text = `${cleaned}\n${tag}`;
      } else {
        c.push({ type: "text", text: tag });
      }
    }
    break;
  }
  return out;
}

/**
 * Chat completion.
 *
 * - timeout defaults to 1 hour
 * - AI_STREAM=true (default): SSE stream (keepalive); quiet unless THINKING_ENABLED
 * - THINKING_ENABLED=true: print model thinking tokens live + /think + enable_thinking
 * - THINKING_ENABLED=false: /no_think on last user turn + enable_thinking=false
 * - NEVER auto-retry network drops mid-job
 * - Only retry HTTP 503 queue_timeout (request rejected; no job started)
 * - Timings (ms):
 *     queue_wait_ms — slot poll + 503 retry sleeps
 *     ttft_ms       — POST start → first thinking/content token (stream only)
 *     gen_ms        — first token → stream end (non-stream: whole response body)
 *     duration_ms   — alias of gen_ms (README "Gen" / primary benchmark)
 *     wall_ms       — wall clock including queue wait
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
  stream = true,
  thinkingEnabled = false,
  waitForSlot = true,
  timeoutMs = ONE_HOUR_MS,
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

  // json_object + stream is flaky on many gateways — force non-stream for jsonMode
  const useStream = stream && !jsonMode;
  const wiredMessages = applyThinkingControls(messages, thinkingEnabled);

  const body = {
    model: modelApi || model,
    temperature,
    messages: wiredMessages,
    stream: useStream,
    // Gufo / Qwen hybrid: explicit thinking switch (ignored by servers that don't care)
    enable_thinking: Boolean(thinkingEnabled),
    chat_template_kwargs: { enable_thinking: Boolean(thinkingEnabled) },
  };
  if (jsonMode) body.response_format = { type: "json_object" };

  ensureShutdownHook();
  const url = `${baseUrl}/chat/completions`;
  let lastErr;
  const wallStart = Date.now();
  let queueWaitMs = 0;
  let contextTokens = null;

  for (let attempt = 0; attempt <= queueRetries; attempt++) {
    if (shutdown.signal.aborted) {
      throw new Error("Aborted before request (Ctrl+C)");
    }
    const attemptStart = Date.now();
    let gotBytes = false;
    // slot → request → (stream: first token / non-stream: full body)
    let phase = "slot";
    const heartbeat = setInterval(() => {
      const sec = Math.round((Date.now() - attemptStart) / 1000);
      const max = Math.round(timeoutMs / 1000);
      if (gotBytes && useStream && !thinkingEnabled) {
        console.log(`  … streaming ${sec}s`);
        return;
      }
      if (gotBytes) return;
      if (phase === "slot") {
        console.log(`  … waiting for idle slot ${sec}s / ${max}s`);
        return;
      }
      if (useStream) {
        console.log(`  … waiting for first token ${sec}s / ${max}s`);
        return;
      }
      // Non-stream (ai-fill json, etc.): no tokens until the whole body arrives
      console.log(`  … waiting for full response ${sec}s / ${max}s`);
    }, heartbeatMs);

    const signal = mergeAbortSignals(
      AbortSignal.timeout(timeoutMs),
      shutdown.signal
    );

    try {
      const slotT0 = Date.now();
      const slot = await waitForIdleSlot(
        { baseUrl, apiKey, model, modelApi, waitForSlot },
        { need: 1, signal: shutdown.signal, label: modelApi || model }
      );
      queueWaitMs += Date.now() - slotT0;
      if (slot?.info?.context_tokens != null) {
        contextTokens = slot.info.context_tokens;
      } else if (contextTokens == null) {
        try {
          const info = await fetchModelSlots({
            baseUrl,
            apiKey,
            modelApi: modelApi || model,
          });
          if (info.context_tokens != null) contextTokens = info.context_tokens;
        } catch {
          /* optional meta */
        }
      }

      phase = "request";
      const requestStart = Date.now();
      let firstTokenAt = null;

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal,
      });

      if (!res.ok) {
        const raw = await res.text();
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

        if (queueRejected && attempt < queueRetries) {
          const waitSec = Math.min(Math.max(retryAfterSec || 30, 5), 120);
          console.warn(
            `  queue full (503) — waiting ${waitSec}s then retry ${attempt + 1}/${queueRetries}`
          );
          lastErr = new Error(`Provider HTTP ${res.status}: ${raw.slice(0, 800)}`);
          const sleepT0 = Date.now();
          await new Promise((r) => setTimeout(r, waitSec * 1000));
          queueWaitMs += Date.now() - sleepT0;
          continue;
        }

        // Gufo/etc: response_format not implemented — drop and retry once
        if (
          res.status === 400 &&
          body.response_format &&
          /response_format|unsupported_field|not implemented/i.test(raw)
        ) {
          console.warn("  response_format unsupported — retrying without it…");
          delete body.response_format;
          lastErr = new Error(`Provider HTTP ${res.status}: ${raw.slice(0, 800)}`);
          continue;
        }

        throw new Error(`Provider HTTP ${res.status}: ${raw.slice(0, 800)}`);
      }

      const pack = (content, usage = null, timing = {}) => {
        const doneAt = Date.now();
        const ttft =
          timing.ttft_ms != null
            ? timing.ttft_ms
            : timing.firstTokenAt != null
              ? timing.firstTokenAt - requestStart
              : null;
        const gen =
          timing.gen_ms != null
            ? timing.gen_ms
            : timing.firstTokenAt != null
              ? doneAt - timing.firstTokenAt
              : doneAt - requestStart;
        const wall = doneAt - wallStart;
        const promptTokens =
          usage?.prompt_tokens ?? usage?.input_tokens ?? null;
        const completionTokens =
          usage?.completion_tokens ?? usage?.output_tokens ?? null;
        const totalTokens =
          usage?.total_tokens ??
          (promptTokens != null && completionTokens != null
            ? promptTokens + completionTokens
            : null);
        return {
          content,
          // duration_ms = generation only (benchmark primary)
          duration_ms: gen,
          gen_ms: gen,
          ttft_ms: ttft,
          queue_wait_ms: queueWaitMs,
          wall_ms: wall,
          thinking_enabled: Boolean(thinkingEnabled),
          model,
          model_api: modelApi || model,
          temperature,
          stream: useStream,
          context_tokens: contextTokens,
          usage: usage || null,
          prompt_tokens: promptTokens,
          completion_tokens: completionTokens,
          total_tokens: totalTokens,
        };
      };

      if (useStream) {
        const {
          content,
          thinking: _thinking,
          usage,
          firstTokenAt: streamFirst,
        } = await readSseChatStream(res, {
          showThinking: thinkingEnabled,
          showContentTicks: thinkingEnabled,
          signal,
          onFirstToken: (t) => {
            firstTokenAt = t;
            gotBytes = true;
          },
          onThinking: () => {
            gotBytes = true;
          },
          onContent: () => {
            gotBytes = true;
          },
        });
        // Never persist reasoning/thinking as the demo — only assistant content.
        const out = (content && content.trim()) || "";
        if (!out) {
          throw new Error("Empty streamed model content (no assistant content deltas)");
        }
        return pack(out, usage, {
          firstTokenAt: streamFirst || firstTokenAt,
        });
      }

      const raw = await res.text();
      gotBytes = true;
      const data = JSON.parse(raw);
      const msg = data.choices?.[0]?.message || {};
      const content =
        (typeof msg.content === "string" && msg.content.trim() && msg.content) ||
        "";
      if (!content) throw new Error(`Empty model content: ${raw.slice(0, 400)}`);
      // Non-stream: no TTFT; gen = full response time after POST
      return pack(content, data.usage || null, {
        ttft_ms: null,
        gen_ms: Date.now() - requestStart,
      });
    } catch (err) {
      lastErr = err;
      forceCloseActiveStream("error/abort cleanup");
      if (shutdown.signal.aborted || err?.name === "AbortError") {
        throw new Error(
          "Aborted — SSE/TCP stream closed (slot should free)"
        );
      }
      if (err?.name === "TimeoutError" || err?.cause?.name === "TimeoutError") {
        throw new Error(
          `Model timed out after ${Math.round(timeoutMs / 1000)}s (1 request, no retry)`
        );
      }
      const cause = err.cause
        ? ` (${err.cause.code || err.cause.message || err.cause})`
        : "";
      if (/fetch failed|ECONNRESET|EPIPE|UND_ERR|aborted/i.test(String(err.message) + cause)) {
        throw new Error(
          `${err.message}${cause} — NOT retrying (stream closed; do not re-POST)`
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
  for (const listKey of ["tags", "model_hints", "review_issues"]) {
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
  const preview =
    meta.preview === null || meta.preview === undefined || meta.preview === ""
      ? "null"
      : meta.preview;
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
preview: ${preview}
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
  const flatDemo = path.join(entry.dir, "demo.html");
  if (fs.existsSync(flatDemo)) return flatDemo;
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
  assertDemoHtmlOk(html);
  return html;
}

/**
 * Reject demos where planning prose leaked into the markup (white/broken pages).
 * Does not touch THINKING_* settings — only validates the HTML we would write.
 */
export function assertDemoHtmlOk(html) {
  if (!html || html.length < 1200) {
    throw new Error("HTML too short to be a finished demo");
  }
  if (!/<style[\s>]/i.test(html) && !/\sstyle\s*=/i.test(html)) {
    throw new Error("HTML missing <style> (incomplete demo)");
  }
  if (!/<body[\s>]/i.test(html) || !/<\/body>/i.test(html)) {
    throw new Error("HTML missing <body>…</body>");
  }
  // Planning / chain-of-thought leaked as text nodes between tags
  const leak =
    />\s*(?:\?|\.\.\.)?\s*(?:If |Need |Could |Maybe |Let's |Let us |Put |Good\.|Also |Wait |Hmm |TODO\b)/i.test(
      html
    ) ||
    /(?:Need position|Could make|Put inside|If outside|warum |Good\. On mobile)/i.test(
      html
    );
  if (leak) {
    throw new Error("HTML contains planning/thinking prose — refusing to save");
  }
  // Incomplete placeholders often left by aborted streams
  if (/<\s*style\s*>\s*\.\.\.\s*<\/style>/i.test(html) || />\s*\.\.\.\s*</.test(html)) {
    throw new Error("HTML contains unfinished '...' placeholders");
  }
}
