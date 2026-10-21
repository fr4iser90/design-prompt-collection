# Meridian Audit Lockup

Build an **8-second looping motion-graphics identity sequence** for **Meridian Audit** (fictional compliance studio). Not a landing page. Not a draggable UI study.

**Frame:** 16:9 stage centered in the viewport (letterbox OK on tall screens). Autoplay on load; Space/click restarts. `prefers-reduced-motion`: hard-cut to final hold.

**Palette:** bg `#0B1210`, panel `#15201C`, ink `#E8F0EA`, accent `#C9A227` (ledger gold).
**Type:** display **PP Neue Montreal** (or **Söhne** fallback), body **IBM Plex Sans**. Never Inter/Roboto/Arial.

## Beat sheet
1. **0.0–1.2s** — Dark field. Thin gold rule draws left→right. Circular **M** monogram stroke-draws in ink.
2. **1.2–3.4s** — Monogram path-morphs into wordmark **MERIDIAN**; counters open; metallic light sweep across stems.
3. **3.4–5.2s** — Subline **AUDIT** fades up in tracking +120→+40; two hairline ledger rules bracket the lockup.
4. **5.2–7.0s** — Hold. Soft dust particles drift; brand remains hero-scale.
5. **7.0–8.0s** — Dissolve to black; loop.

## Hard rules
- Brand **Meridian Audit** must read as hero type by beat 3.
- Still at t≈0.6s and t≈5.5s must work as posters (shots pipeline).
- Ban: nav chrome, CTAs, feature cards, purple glow, cream+terracotta.

## Deliverable
Single-file HTML/CSS/JS (SVG paths + rAF or CSS timeline). No external JS frameworks.
