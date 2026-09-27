// Gateway slot polling — GET /v1/models → slots_idle / slots_busy
import { envFlag } from "./helpers.mjs";

export async function fetchModelSlots({ baseUrl, apiKey, modelApi }) {
  const url = `${baseUrl.replace(/\/$/, "")}/models`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    throw new Error(`models HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const data = await res.json();
  const list = data.data || data.models || [];
  const id = modelApi || "";
  let entry =
    list.find((m) => m.id === id) ||
    list.find((m) => String(m.id).toLowerCase() === String(id).toLowerCase()) ||
    list.find((m) => m.load_state === "ok" && (m.slots_idle != null || m.slots_total != null));

  if (!entry) {
    return {
      id,
      found: false,
      slots_idle: null,
      slots_busy: null,
      slots_total: null,
      load_state: null,
      raw: list.map((m) => m.id),
    };
  }
  return {
    id: entry.id,
    found: true,
    slots_idle: entry.slots_idle ?? null,
    slots_busy: entry.slots_busy ?? null,
    slots_total: entry.slots_total ?? null,
    load_state: entry.load_state ?? entry.status ?? null,
    status: entry.status ?? null,
  };
}

/**
 * Block until at least `need` idle slots (or abortSignal).
 * If gateway doesn't expose slots, returns immediately (compat).
 */
export async function waitForIdleSlot(cfg, {
  need = 1,
  pollMs = Number(process.env.SLOT_POLL_MS || 15000),
  signal = null,
  label = "slot",
} = {}) {
  const enabled = cfg.waitForSlot !== false && envFlag("WAIT_FOR_SLOT", true);
  if (!enabled) return { skipped: true };

  while (true) {
    if (signal?.aborted) throw new Error("Aborted while waiting for slot");
    let info;
    try {
      info = await fetchModelSlots({
        baseUrl: cfg.baseUrl,
        apiKey: cfg.apiKey,
        modelApi: cfg.modelApi || cfg.model,
      });
    } catch (err) {
      console.warn(`  [${label}] models poll failed: ${err.message} — retry in ${pollMs}ms`);
      await sleep(pollMs, signal);
      continue;
    }

    if (!info.found || info.slots_idle == null) {
      // Provider has no slot metadata — don't block forever
      console.log(`  [${label}] no slots_* on /models — proceeding without gate`);
      return { skipped: true, info };
    }

    if (info.load_state && /down|unavailable/i.test(String(info.load_state))) {
      console.warn(
        `  [${label}] model ${info.id} load_state=${info.load_state} — waiting ${pollMs}ms`
      );
      await sleep(pollMs, signal);
      continue;
    }

    if (info.slots_idle >= need) {
      console.log(
        `  [${label}] slots ok idle=${info.slots_idle}/${info.slots_total ?? "?"} busy=${info.slots_busy ?? "?"}`
      );
      return { skipped: false, info };
    }

    console.log(
      `  [${label}] waiting for slot (idle=${info.slots_idle} need=${need} busy=${info.slots_busy})…`
    );
    await sleep(pollMs, signal);
  }
}

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error("Aborted"));
      return;
    }
    const t = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(new Error("Aborted"));
      },
      { once: true }
    );
  });
}
