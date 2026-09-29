#!/usr/bin/env node
// ai-fill.mjs / ai:new — 2-pass prompt generation (pitch → expand) via .env provider
// Vision scoring of demos = scripts/review.mjs (NOT this file).
//
// Always loads catalog.json (domains, brands, tags, niches) to avoid overlaps.
// Steer each run with --mood / --lane / --seed / --avoid / --brief.
// Optional: AI_FILL_MODEL / AI_FILL_MODEL_API for a stronger fill-only model.
//
//   npm run ai:new -- -c landing-pages -n 3
//   npm run ai:new -- -c games -n 2 --lane arcade-precision
//   npm run ai:new -- -c webgl -n 2 --mood "filmic glass SDF"
//   npm run ai:new -- -c animations -n 3 --mood "brutal kinetic type"
//   npm run ai:new -- -c concepts -n 2 --lane arid-minimal --seed 42
//   npm run ai:new -- --all -n 2 --avoid "fintech,ocean,parallax"
//   npm run ai:lanes
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  CATEGORIES,
  FILL_CATEGORIES,
  PROVIDER_BASES,
  loadEnvFile,
  parseArgs,
  writeEntry,
  today,
  envFlag,
} from "./lib/helpers.mjs";
import {
  buildCatalog,
  writeCatalog,
  maxSimilarity,
  pickLane,
  listLanes,
  seedToInt,
  LANES,
} from "./lib/catalog.mjs";
import { waitForIdleSlot } from "./lib/slots.mjs";
import { chatCompletions } from "./lib/provider.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function die(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

function resolveConfig() {
  loadEnvFile(path.join(ROOT, ".env"));
  const provider = (process.env.AI_PROVIDER || "openrouter").toLowerCase();
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  // Optional stronger model only for fill (falls back to AI_MODEL)
  const model = process.env.AI_FILL_MODEL || process.env.AI_MODEL;
  const modelApi =
    process.env.AI_FILL_MODEL_API ||
    process.env.AI_FILL_MODEL ||
    process.env.AI_MODEL_API ||
    model;
  let baseUrl = process.env.AI_BASE_URL || PROVIDER_BASES[provider];

  if (!apiKey) {
    die("Missing AI_API_KEY in .env (copy .env.example → .env)");
  }
  if (!process.env.AI_MODEL && !process.env.AI_FILL_MODEL) {
    die("Missing AI_MODEL in .env");
  }
  if (!baseUrl) {
    die(
      `Unknown AI_PROVIDER="${provider}". Use openai|openrouter|groq|custom + AI_BASE_URL`
    );
  }
  return {
    provider,
    apiKey,
    model,
    modelApi,
    baseUrl: baseUrl.replace(/\/$/, ""),
    waitForSlot: envFlag("WAIT_FOR_SLOT", true),
  };
}

function ensureCatalog() {
  const catalogPath = path.join(ROOT, "catalog.json");
  if (!fs.existsSync(catalogPath) || !fs.existsSync(path.join(ROOT, "index.json"))) {
    console.log("Building catalog…");
    const build = spawnSync("npm", ["run", "generate"], {
      cwd: ROOT,
      encoding: "utf8",
      shell: process.platform === "win32",
    });
    if (build.status !== 0) {
      if (build.stderr) process.stderr.write(build.stderr);
      die("Failed to generate catalog");
    }
  }
  return buildCatalog(ROOT);
}

function extractJson(text) {
  const trimmed = text.trim();
  const tryParse = (s) => JSON.parse(s);
  try {
    return tryParse(trimmed);
  } catch {
    /* continue */
  }
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return tryParse(fence[1].trim());
  const objStart = trimmed.indexOf("{");
  const objEnd = trimmed.lastIndexOf("}");
  if (objStart !== -1 && objEnd > objStart) {
    return tryParse(trimmed.slice(objStart, objEnd + 1));
  }
  const start = trimmed.indexOf("[");
  const end = trimmed.lastIndexOf("]");
  if (start !== -1 && end > start) return tryParse(trimmed.slice(start, end + 1));
  throw new Error("Model response was not valid JSON");
}

function catalogBrief(catalog, category) {
  const catEntries = catalog.by_category?.[category] || [];
  const otherNiches = catalog.niches.filter((n) => !n.startsWith(`${category}:`));
  const saturated = catEntries.filter((e) =>
    SATURATED_NICHE_RE.test(
      `${e.id} ${e.title} ${(e.tags || []).join(" ")} ${e.summary || ""}`
    )
  );
  const lines = [
    `## Occupied niches in ${category} (${catEntries.length}) — DO NOT near-duplicate`,
    ...catEntries.map(
      (e) =>
        `- [${e.id}] ${e.title} | tags: ${(e.tags || []).join(", ")} | brands: ${(e.brands || []).join(", ") || "—"} | ${e.summary}`
    ),
    "",
  ];
  if (saturated.length >= 8 && (category === "landing-pages" || category === "concepts")) {
    lines.push(
      `## SATURATED cluster (${saturated.length} food/craft/ledger-ish) — BANNED unless operator mood forces it`,
      `Avoid: coffee, pasta, pottery, kiln, butcher, grill, fermentation, tea, caviar, ledger, microfilm metaphors.`,
      ""
    );
  }
  lines.push(
    `## Other categories (avoid cross-copying the same idea)`,
    ...otherNiches.slice(0, 40).map((n) => `- ${n}`),
    "",
    `## Used ids (never reuse): ${catalog.ids.join(", ") || "(none)"}`,
    `## Used brands (invent new ones): ${catalog.brands.join(", ") || "(none)"}`,
    `## Hot tags (do not just reshuffle these): ${Object.keys(catalog.tag_frequency || {})
      .slice(0, 40)
      .join(", ") || "(none)"}`
  );
  return lines.join("\n");
}

const DESIGN_CANON = `SHARED DESIGN BAR (senior designer reject otherwise):
- Expressive type; NEVER Inter / Roboto / Arial / system-ui
- Named hex palette (≥3) with roles (bg / ink / accent)
- ≥2–3 intentional motions with purpose (not decorative noise)
- Concrete, fail-able brief — no vibe-only fluff
- Avoid AI-default looks: purple-glow SaaS; cream(#F4F1EA)+terracotta+serif; broadsheet dense columns; emoji; pill spam; multi-layer shadows`;

const FEW_SHOT = {
  "landing-pages": `GOOD: brand dominates viewport 1; one full-bleed visual truth; type pairing + hex; motions serve hierarchy; single HTML.
BAD: feature-card SaaS; purple glow; another coffee/pasta/pottery/ledger clone; inset hero card.`,
  animations: `GOOD: one kinetic object/system; motion parameters named; interaction changes the motion language.
BAD: "animated landing page"; Lottie wallpaper; marketing copy around a looping GIF.`,
  concepts: `GOOD: named artifact (e.g. "ORBIT desk lamp UI that grows shadows as tasks overdue") + exact layout + type + 3 motions + HTML deliverable.
BAD: "a concept exploring the future of productivity" with no artifact, no layout, no fails.`,
  games: `GOOD: "HOLDFAST — one-screen tug: hold to tension a cable; release to fling a weight into a moving socket. Fail = slack snap. Score = sockets cleared. Input: pointer down/up."
BAD: "atmospheric indie game landing"; Flappy/Snake/runner; pretty scene you cannot play; CTA to Download.`,
  webgl: `GOOD: material/light/shader/camera is the hero; one interaction (orbit/deform/scrub).
BAD: Three.js canvas under a SaaS header; product configurator with price cards.`,
  editorial: `GOOD: publication brand; reading rhythm; folio/rail; photo as craft.
BAD: SaaS landing cosplaying as magazine; dense fake newspaper columns.`,
  interfaces: `GOOD: one primary task; selection/empty/error; panels earn their keep.
BAD: dashboard widget soup; marketing hero above the tool; card grid with no job.`,
  experiments: `GOOD: one weird thesis + still demable art direction + acceptance criteria.
BAD: random shader dump / "R&D playground" with no brief.`,
};

const CATEGORY_BRIEF = {
  "landing-pages": `CATEGORY = landing-pages
${DESIGN_CANON}
LANDING-SPECIFIC:
- One composition in viewport 1 (not dashboard)
- Brand name = HERO signal (brand test without nav)
- FULL-BLEED hero visual plane — ban inset/side-panel/floating media cards
- Hero budget ONLY: brand + headline + one sentence + CTA group + dominant visual
- Ban hero overlays, stats strips, promo chips, feature cards in viewport 1
- Real visual anchor (product/place/atmosphere) — blob gradients alone ≠ the idea
- Deliverable: single-file HTML/CSS/JS (stack only in tags + one line)
SATURATION: food/craft/ledger metaphors are OVERUSED — prefer transit, optics, civic, sport timing, acoustics, cartography, industrial safety, fashion-tech unless mood forces craft
${FEW_SHOT["landing-pages"]}`,

  animations: `CATEGORY = animations
${DESIGN_CANON}
ANIMATION-SPECIFIC:
- Motion IS the product — one focused kinetic study / interactive system
- NOT a marketing landing with a looping decoration
- Specify: what moves, easing/physics metaphor, what pointer/scroll/keydown changes
- Composition still readable as design (type + palette + stage), not a blank canvas demo
- Deliverable: single HTML (+ canvas/CSS/WebGL as needed); tags carry stack
- Ban: autoplaying marketing video headers; unexplained particle spam
${FEW_SHOT.animations}`,

  concepts: `CATEGORY = concepts
${DESIGN_CANON}
CONCEPT-SPECIFIC (this is where weak prompts die — be ruthless):
- ONE named artifact the demo IS (device / ritual object / speculative UI / spatial system) — invent a proper noun
- Composition rules as strict as a landing: what sits where on desktop AND mobile
- Interaction plan: what the user does in the first 5 seconds
- Art direction must answer: material, light, type reason, palette roles
- prompt_full MUST include headings ## Artifact and ## Interaction (in addition to Concept/Palette/Type/Layout/Motion/Constraints/Acceptance)
- Ban: "explore the future of…"; moodboard essays; film stills with no UI; feature lists; another food/craft fetish unless mood forces it
- Deliverable: one HTML demo of the artifact — not a pitch deck
${FEW_SHOT.concepts}`,

  games: `CATEGORY = games
GAME DESIGN BAR (do NOT apply landing-page hero/CTA rules here):
- The HTML demo must be PLAYABLE end-to-end in one viewport — if you cannot lose, it is not a game brief
- Mandatory fields in the brief (name them explicitly):
  1) Title / fantasy (short)
  2) Core loop (verb → risk → reward → reset) in one sentence
  3) Input map (exact keys / pointer states)
  4) Fail condition (what ends a run)
  5) Win or score rule
  6) Entities on screen (player, hazards, targets) — counts/behavior
  7) Feedback juice (hit/fail/success) — visual+optional audio cue
  8) Type + hex palette for HUD/readability (never Inter/Roboto/Arial)
- prompt_full MUST include: ## Core loop, ## Input, ## Fail / win, ## Entities, ## Feel (plus Palette/Type/Constraints/Acceptance)
- Prefer Canvas 2D or WebGL; state stack in tags
- Difficulty: fair read — silhouette/contrast first, HUD sparse
- Ban ABSOLUTELY: landing pages about games; Download/CTA heroes; Flappy Bird / Snake / endless runner / Pong / 2048 clones; unplayable concept art; "atmospheric exploration" with no fail state
- Expressive fantasy OK — mechanics must still be implementable in one HTML file by a mid-level JS dev in one sitting
${FEW_SHOT.games}`,

  webgl: `CATEGORY = webgl
${DESIGN_CANON}
WEBGL-SPECIFIC:
- Scene/material/shader/camera is the hero — not a marketing shell around a canvas
- Specify renderer stack (Three.js / raw WebGL / R3F) in tags + deliverable line
- One primary interaction: orbit OR deform OR parameter scrub
- Light + material honesty (or intentional non-PBR thesis) named in brief
- Ban: SaaS chrome wrapping the canvas; shopping configurators; particle spam without composition
${FEW_SHOT.webgl}`,

  editorial: `CATEGORY = editorial
${DESIGN_CANON}
EDITORIAL-SPECIFIC:
- Publication/imprint brand as hero signal; reading hierarchy first
- Folio / long essay / annual spread metaphor — scroll as page rhythm
- Sticky chapter rail OR spread structure; pull-quotes as type not cards
- Photography/print craft as visual anchor
- Ban: SaaS landings; broadsheet pastiche (hairline dense multi-columns); newsletter modals
${FEW_SHOT.editorial}`,

  interfaces: `CATEGORY = interfaces
${DESIGN_CANON}
INTERFACE-SPECIFIC:
- Working product UI: one primary task per view
- Required states: default, selection, empty, error (name them in acceptance)
- Cards ONLY when they wrap an interactive unit; prefer panels/hairlines
- Brand = product wordmark in chrome (still unmistakable)
- Density with calm — ban dashboard widget soup and marketing heroes above the tool
- Deliverable: single HTML tool surface (svelte/react OK in tags)
${FEW_SHOT.interfaces}`,

  experiments: `CATEGORY = experiments
${DESIGN_CANON}
EXPERIMENT-SPECIFIC:
- One weird/risky thesis that is STILL demable and art-directed
- State the research question + what "success" looks like visually
- Must include palette, type, motions, acceptance — not a tech dump
- Ban: untitled sandboxes; unexplained generative noise; missing deliverable
${FEW_SHOT.experiments}`,
};

const SATURATED_NICHE_RE =
  /\b(coffee|barista|roast|brew|pasta|noodle|ramen|sushi|boulangerie|butcher|pottery|kiln|ceramic|cast[- ]iron|grill|fermentation|spice|tea|caviar|culinary|kitchen|ledger|microfilm|microfiche)\b/i;

const BANNED_PHRASE_RE =
  /\b(cutting[- ]edge|seamless experience|next[- ]gen|unlock (your )?potential|revolutionize|elevate your|delightful experience|user[- ]friendly|stunning visuals?|vibrant (color|palette)|sleek (and )?modern|modern (and )?minimal|beautiful design)\b/i;
const VAGUE_PAD_RE =
  /\b(modern|sleek|minimal|elegant|stunning|beautiful|vibrant|clean|simple|unique|innovative)\b/gi;
const GENERIC_STACK_RE = /\b(Inter|Roboto|Arial|system[- ]ui|Helvetica Neue)\b/;
const TYPE_HINT_RE =
  /\b(typeface|typography|font[- ]family|serif|sans[- ]serif|display type|mono(?:space)?|pairing)\b/i;
const MOTION_HINT_RE =
  /\b(entrance|ambient|interaction|hover|scroll|pointer|keydown|raf|requestAnimationFrame|spring|easing|loop|orbit|scrub)\b/i;
const EDITORIAL_HINT_RE =
  /\b(essay|folio|spread|pull[- ]?quote|chapter|magazine|gazette|editorial|serif|reading|scroll)\b/i;
const INTERFACES_HINT_RE =
  /\b(panel|toolbar|sidebar|settings|console|queue|pane|control|selection|empty state|tool)\b/i;
const GAMES_HINT_RE =
  /\b(playable|controls?|keyboard|pointer|win|lose|score|fail|loop|arcade|puzzle|level)\b/i;
const WEBGL_HINT_RE =
  /\b(three\.?js|webgl|shader|fragment|vertex|mesh|scene|camera|canvas|sdf|pbr|r3f)\b/i;
const GAME_CLONE_RE =
  /\b(flappy|snake game|endless runner|2048 clone|pong clone|tetris clone)\b/i;
const ANIM_HINT_RE =
  /\b(motion|kinetic|easing|spring|timeline|scrub|parallax|loop|raf|requestAnimationFrame|gsap|keyframes)\b/i;
const EXPERIMENT_HINT_RE =
  /\b(experiment|thesis|prototype|generative|research|hypothesis|unusual|speculative)\b/i;
const LANDING_HINT_RE =
  /\b(brand|hero|cta|headline|landing|full[- ]?bleed|viewport)\b/i;

/** Professional oneshot / extended word targets [min, max]. */
const WORD_TARGETS = {
  "landing-pages": { md: [500, 1200], full: [800, 1800], label: "complete landing page" },
  animations: { md: [300, 700], full: [500, 1100], label: "hero / motion section" },
  concepts: { md: [300, 700], full: [600, 1200], label: "concept / artifact oneshot" },
  games: { md: [300, 700], full: [600, 1200], label: "browser one-shot game" },
  webgl: { md: [300, 700], full: [500, 1100], label: "WebGL scene oneshot" },
  editorial: { md: [500, 1200], full: [800, 1800], label: "editorial / folio" },
  interfaces: { md: [500, 1000], full: [800, 1500], label: "tool / interface" },
  experiments: { md: [300, 700], full: [500, 1100], label: "experiment oneshot" },
};

function wordCount(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function lengthGuide(category) {
  const t = WORD_TARGETS[category] || WORD_TARGETS.concepts;
  return `LENGTH TARGETS (${t.label}):
- prompt_md (oneshot): ${t.md[0]}–${t.md[1]} words (reject below ${t.md[0]})
- prompt_full_md (extended): ${t.full[0]}–${t.full[1]} words (reject below ${t.full[0]})
Prefer mid-range. Density over fluff — every sentence constrains the implementer.`;
}

function buildPitchSystem(category) {
  const catBlock = CATEGORY_BRIEF[category] || `CATEGORY = ${category}`;
  const gameExtra =
    category === "games"
      ? `
Games pitch EXTRA required fields:
"core_loop": "verb → risk → reward → reset",
"input_map": "exact keys/pointer",
"fail": "what ends the run",
"win_or_score": "how you succeed"
Brand may be the game title. Do NOT pitch a landing page.`
      : "";
  const conceptExtra =
    category === "concepts"
      ? `
Concepts pitch EXTRA:
"artifact": "named thing the demo IS",
"first_interaction": "what user does in first 5 seconds"`
      : "";
  return `You are a ruthless senior web designer / creative director inventing DISTINCT concept pitches.

Return ONLY JSON: { "pitches": [ /* … */ ] }

Each pitch shape:
{
  "id": "kebab-case-unique",
  "title": "Human Title",
  "brand": "FictionalBrand or GameTitle",
  "niche": "industry + visual truth + interaction mechanic (not a vibes sentence)",
  "tags": ["kebab","tags"],
  "colors": ["#RRGGBB","#RRGGBB","#RRGGBB"],
  "type_pairing": "DisplayFace + BodyFace (named; never Inter/Roboto/Arial)",
  "motions": ["entrance: …", "ambient: …", "interaction: …"],
  "hook": "why a senior designer would respect this (≤25 words)",
  "anti_cliche": "exact cliché avoided"
}
${gameExtra}
${conceptExtra}

${catBlock}

Rules:
- Orthogonal to occupied niches — new industry OR visual language OR interaction mechanic
- New brands/titles only
- Motions specific (not "subtle fade" / "smooth transitions")
- If category is landing-pages: brand required; hero = one composition; no card-based hero
- If category is games: playable loop required — unplayable pitches are failures
- Do NOT write prompt_md yet`;
}

function buildExpandSystem(category) {
  const catBlock = CATEGORY_BRIEF[category] || `CATEGORY = ${category}`;
  const len = lengthGuide(category);
  const headings =
    category === "games"
      ? `prompt_full_md with EXACT headings:
## Concept
## Core loop
## Input
## Fail / win
## Entities
## Feel
## Palette
## Type
## Constraints
## Acceptance criteria`
      : category === "concepts"
        ? `prompt_full_md with EXACT headings:
## Concept
## Artifact
## Interaction
## Palette
## Type
## Layout
## Motion
## Constraints
## Acceptance criteria`
        : category === "interfaces"
          ? `prompt_full_md with EXACT headings:
## Concept
## Primary task
## States
## Palette
## Type
## Layout
## Motion
## Constraints
## Acceptance criteria`
          : `prompt_full_md with EXACT headings:
## Concept
## Palette
## Type
## Layout
## Motion
## Constraints
## Acceptance criteria`;

  return `You expand ONE approved pitch into a HIGH-REFINED brief a senior specialist would approve.

Return ONLY JSON:
{
  "id": "same-as-pitch",
  "title": "…",
  "tags": ["…"],
  "summary": "40-220 char teaser with concrete visual/mechanic truth",
  "colors": ["#RRGGBB","#RRGGBB","#RRGGBB"],
  "type_pairing": "Display + Body",
  "motions": ["entrance: …", "ambient: …", "interaction: …"],
  "prompt_md": "…",
  "prompt_full_md": "…"
}

${catBlock}

${len}

prompt_md = executable oneshot (look + behavior + hard constraints). Write to the TARGET WORD RANGE — not a stub.
${headings}

Acceptance criteria must be fail-able checklists.
Ban vague padding. No {{placeholders}}.`;
}

function buildPitchUser({
  category,
  count,
  themes,
  catalog,
  lane,
  mood,
  avoid,
  brief,
  seed,
}) {
  const themeLine = themes
    ? `Forced themes (one pitch each):\n${themes
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t, i) => `${i + 1}. ${t}`)
        .join("\n")}`
    : `Invent ${count} DISTINCT pitches for this category.`;

  return [
    `Category: ${category}`,
    `Count: ${
      themes
        ? themes.split(",").map((s) => s.trim()).filter(Boolean).length
        : count
    }`,
    `Run seed: ${seed}`,
    `Creative lane: ${lane.id} — ${lane.brief}`,
    mood ? `Extra mood / direction: ${mood}` : null,
    avoid ? `Explicitly avoid: ${avoid}` : null,
    brief ? `Operator brief:\n${brief}` : null,
    "",
    themeLine,
    "",
    catalogBrief(catalog, category),
    "",
    `Return JSON { "pitches": [...] } only.`,
  ]
    .filter((p) => p !== null)
    .join("\n");
}

function buildExpandUser({ category, pitch, lane, mood, catalog }) {
  return [
    `Category: ${category}`,
    `Lane: ${lane.id} — ${lane.brief}`,
    mood ? `Mood: ${mood}` : null,
    "",
    `Approved pitch (expand faithfully — sharpen, do not dilute):`,
    JSON.stringify(pitch, null, 2),
    "",
    `Avoid colliding with: ${(catalog.ids || []).slice(-30).join(", ") || "(none)"}`,
    `Hot tags to not merely reshuffle: ${Object.keys(catalog.tag_frequency || {})
      .slice(0, 25)
      .join(", ")}`,
    "",
    `Return the single expanded entry JSON object only.`,
  ]
    .filter((p) => p !== null)
    .join("\n");
}

async function chatJson(cfg, messages, temperature) {
  await waitForIdleSlot(cfg, { need: 1, label: cfg.modelApi || cfg.model });
  try {
    const result = await chatCompletions({
      ...cfg,
      messages,
      temperature,
      jsonMode: true,
      stream: false,
      thinkingEnabled: Boolean(cfg.thinkingEnabled),
    });
    return result.content;
  } catch (err) {
    const maybeFormat =
      err.status === 400 &&
      /response_format|json_object|unsupported/i.test(err.body || err.message);
    if (!maybeFormat) throw err;
    console.warn("  json_object unsupported — retrying plain…");
    const result = await chatCompletions({
      ...cfg,
      messages,
      temperature,
      jsonMode: false,
      stream: false,
      thinkingEnabled: Boolean(cfg.thinkingEnabled),
    });
    return result.content;
  }
}

function normalizePayload(content, keyHints = ["entries", "pitches", "items", "prompts"]) {
  let parsed = extractJson(content);
  if (!Array.isArray(parsed) && parsed && typeof parsed === "object") {
    for (const k of keyHints) {
      if (Array.isArray(parsed[k])) {
        parsed = parsed[k];
        break;
      }
    }
    if (!Array.isArray(parsed)) {
      parsed = Object.values(parsed).find(Array.isArray);
    }
  }
  if (!Array.isArray(parsed)) {
    // single object expand response
    if (parsed && typeof parsed === "object" && (parsed.prompt_md || parsed.id)) {
      return [parsed];
    }
    throw new Error("Expected array in JSON");
  }
  return parsed;
}

function requireFullSections(full, id, category) {
  const base = [
    ["## Concept", /##\s*Concept\b/i],
    ["## Palette", /##\s*Palette\b/i],
    ["## Type", /##\s*Type\b/i],
    ["## Constraints", /##\s*Constraints\b/i],
    ["## Acceptance criteria", /##\s*Acceptance criteria\b/i],
  ];
  const byCat = {
    games: [
      ["## Core loop", /##\s*Core loop\b/i],
      ["## Input", /##\s*Input\b/i],
      ["## Fail / win", /##\s*Fail\s*\/\s*win\b/i],
      ["## Entities", /##\s*Entities\b/i],
      ["## Feel", /##\s*Feel\b/i],
    ],
    concepts: [
      ["## Artifact", /##\s*Artifact\b/i],
      ["## Interaction", /##\s*Interaction\b/i],
      ["## Layout", /##\s*Layout\b/i],
      ["## Motion", /##\s*Motion\b/i],
    ],
    default: [
      ["## Layout", /##\s*Layout\b/i],
      ["## Motion", /##\s*Motion\b/i],
    ],
    interfaces: [
      ["## Primary task", /##\s*Primary task\b/i],
      ["## States", /##\s*States\b/i],
      ["## Layout", /##\s*Layout\b/i],
      ["## Motion", /##\s*Motion\b/i],
    ],
  };
  const needed = [...base, ...(byCat[category] || byCat.default)];
  const missing = needed.filter(([, re]) => !re.test(full)).map(([n]) => n);
  if (missing.length) {
    throw new Error(`prompt_full_md missing headings for ${id}: ${missing.join(", ")}`);
  }
}

function vaguePadRatio(text) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 40) return 0;
  const hits = (text.match(VAGUE_PAD_RE) || []).length;
  return hits / words.length;
}

function sanitizeEntry(raw, { category, status, existingIds }) {
  const id = String(raw.id || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!id) throw new Error("Entry missing id");
  if (existingIds.has(id)) throw new Error(`Duplicate id from model: ${id}`);

  const tags = (raw.tags || [])
    .map((t) =>
      String(t)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    )
    .filter(Boolean)
    .slice(0, 12);
  if (tags.length < 3) throw new Error(`Need ≥3 tags for ${id}`);
  if (category === "games" && !tags.includes("game")) tags.push("game");
  if (
    category === "webgl" &&
    !tags.some((t) => /webgl|three|shader|canvas/.test(t))
  ) {
    tags.push("webgl");
  }

  const summary = String(raw.summary || "").trim();
  if (summary.length < 40 || summary.length > 220) {
    throw new Error(`Bad summary length for ${id}: ${summary.length}`);
  }
  if (BANNED_PHRASE_RE.test(summary)) {
    throw new Error(`Generic marketing fluff in summary: ${id}`);
  }

  const prompt_md = String(raw.prompt_md || "").trim();
  const prompt_full_md = String(raw.prompt_full_md || "").trim();
  const targets = WORD_TARGETS[category] || WORD_TARGETS.concepts;
  const mdWords = wordCount(prompt_md);
  const fullWords = wordCount(prompt_full_md);
  if (mdWords < targets.md[0]) {
    throw new Error(
      `prompt_md too short for ${category}: ${mdWords} words < ${targets.md[0]} (${targets.label})`
    );
  }
  if (mdWords > targets.md[1] * 1.35) {
    throw new Error(
      `prompt_md too bloated for ${category}: ${mdWords} words > ~${targets.md[1]} target`
    );
  }
  if (fullWords < targets.full[0]) {
    throw new Error(
      `prompt_full_md too short for ${category}: ${fullWords} words < ${targets.full[0]}`
    );
  }
  if (fullWords > targets.full[1] * 1.4) {
    throw new Error(
      `prompt_full_md too bloated for ${category}: ${fullWords} words > ~${targets.full[1]} target`
    );
  }
  if (prompt_md.includes("{{") || prompt_full_md.includes("{{")) {
    throw new Error(`Unresolved placeholders in ${id}`);
  }
  if (/replace-me|TODO:|TBD/i.test(prompt_md + prompt_full_md)) {
    throw new Error(`Template leftovers in ${id}`);
  }
  if (
    GENERIC_STACK_RE.test(prompt_md) ||
    GENERIC_STACK_RE.test(prompt_full_md) ||
    GENERIC_STACK_RE.test(String(raw.type_pairing || ""))
  ) {
    throw new Error(`Forbidden default font stack in ${id}`);
  }
  if (BANNED_PHRASE_RE.test(prompt_md) || BANNED_PHRASE_RE.test(prompt_full_md)) {
    throw new Error(`Generic fluff language in ${id}`);
  }
  if (vaguePadRatio(prompt_md + "\n" + prompt_full_md) > 0.035) {
    throw new Error(`Too much vague adjective padding in ${id}`);
  }
  if (!DELIVERABLE_RE.test(prompt_md)) {
    throw new Error(`prompt_md missing deliverable/stack line: ${id}`);
  }

  if (
    (category === "landing-pages" || category === "concepts") &&
    /\b(hero card|feature cards?|card grid|pricing cards?|floating card|inset hero|rounded media card)\b/i.test(
      prompt_md + "\n" + prompt_full_md
    )
  ) {
    throw new Error(`Banned card/inset-hero language in ${id}`);
  }

  if (
    (category === "landing-pages" || category === "concepts") &&
    SATURATED_NICHE_RE.test(`${id} ${raw.title || ""} ${tags.join(" ")} ${summary}`)
  ) {
    throw new Error(`Saturated food/craft/ledger niche rejected: ${id}`);
  }

  requireFullSections(prompt_full_md, id, category);

  const typePairing = String(raw.type_pairing || "").trim();
  const blob = `${prompt_md}\n${prompt_full_md}\n${typePairing}`;
  if (!TYPE_HINT_RE.test(blob) && typePairing.length < 8) {
    throw new Error(`Missing type pairing for ${id}`);
  }
  if (category !== "games" && !MOTION_HINT_RE.test(blob)) {
    throw new Error(`Missing concrete motion language for ${id}`);
  }

  const motions = Array.isArray(raw.motions)
    ? raw.motions.map((m) => String(m).trim()).filter(Boolean)
    : [];
  if (category !== "games" && motions.length < 2) {
    throw new Error(`Need ≥2 motions for ${id}`);
  }

  if (category === "games") {
    if (!/\b(WASD|Arrow|pointer|click|tap|keyboard|Space|mousedown|touch)\b/i.test(blob)) {
      throw new Error(`games missing concrete input map: ${id}`);
    }
    if (!/\b(fail|die|miss|lose|game over|snap|break|timeout)\b/i.test(blob)) {
      throw new Error(`games missing fail condition: ${id}`);
    }
    if (!/\b(win|score|clear|survive|complete|points?)\b/i.test(blob)) {
      throw new Error(`games missing win/score rule: ${id}`);
    }
    if (!/\b(loop|verb|risk|reward|reset)\b/i.test(blob)) {
      throw new Error(`games missing core-loop language: ${id}`);
    }
    if (/\b(sign up|get started|download now|pricing|feature cards?|saas)\b/i.test(blob)) {
      throw new Error(`games brief looks like a landing page: ${id}`);
    }
    if (GAME_CLONE_RE.test(blob)) {
      throw new Error(`banned game-clone trope in ${id}`);
    }
  }
  if (category === "concepts") {
    if (/\b(explore the future|reimagine|moodboard|manifesto)\b/i.test(blob)) {
      throw new Error(`concepts manifesto fluff rejected: ${id}`);
    }
    if (!/\b(artifact|object|device|instrument|apparatus|desk|lamp|lens|rig)\b/i.test(blob)) {
      // soft: at least Interaction heading already required; require proper noun-ish brand/title length
      if (String(raw.title || "").trim().split(/\s+/).length < 2) {
        throw new Error(`concepts needs a named artifact title: ${id}`);
      }
    }
  }
  if (category === "webgl" && !WEBGL_HINT_RE.test(blob)) {
    throw new Error(`webgl entry lacks 3D/shader language: ${id}`);
  }
  if (
    category === "webgl" &&
    /\b(pricing|feature cards?|saas hero|sign up|get started)\b/i.test(blob)
  ) {
    throw new Error(`webgl entry looks like marketing shell: ${id}`);
  }
  if (category === "editorial" && !EDITORIAL_HINT_RE.test(blob)) {
    throw new Error(`editorial entry lacks reading/folio language: ${id}`);
  }
  if (category === "interfaces" && !INTERFACES_HINT_RE.test(blob)) {
    throw new Error(`interfaces entry lacks tool/panel language: ${id}`);
  }
  if (
    category === "interfaces" &&
    !/\b(empty|error|selection|selected|disabled)\b/i.test(blob)
  ) {
    throw new Error(`interfaces entry missing UI states: ${id}`);
  }
  if (category === "animations" && !ANIM_HINT_RE.test(blob)) {
    throw new Error(`animations entry lacks motion craft language: ${id}`);
  }
  if (category === "landing-pages" && !LANDING_HINT_RE.test(blob)) {
    throw new Error(`landing-pages entry lacks brand/hero/cta language: ${id}`);
  }
  if (category === "experiments" && !EXPERIMENT_HINT_RE.test(blob)) {
    throw new Error(`experiments entry lacks thesis/experiment language: ${id}`);
  }
  if (
    (category === "landing-pages" || category === "interfaces") &&
    !/\b[A-Z][A-Za-z0-9&' .-]{1,40}\b/.test(prompt_md)
  ) {
    throw new Error(`Missing brand/product name signal in ${id}`);
  }

  const colors = (raw.colors || []).filter((c) => /^#[0-9a-fA-F]{6}$/.test(c));
  if (colors.length < 3) {
    throw new Error(`Need ≥3 hex colors for ${id}`);
  }
  const hexInFull = (prompt_full_md.match(/#[0-9a-fA-F]{6}/g) || []).length;
  if (hexInFull < 2) {
    throw new Error(`prompt_full_md must embed ≥2 hex colors: ${id}`);
  }

  let full = prompt_full_md;
  if (
    typePairing &&
    !full.toLowerCase().includes(typePairing.toLowerCase().slice(0, 12))
  ) {
    full += `\n\n## Type pairing\n${typePairing}\n`;
  }
  if (motions.length && !/##\s*Motion\b/i.test(full)) {
    full += `\n\n## Motion\n${motions.map((m) => `- ${m}`).join("\n")}\n`;
  }

  return {
    id,
    title: String(raw.title || id).trim(),
    category,
    tags,
    status,
    summary,
    colors,
    prompt_md,
    prompt_full_md: full,
    created: today(),
  };
}

function sanitizePitch(raw, existingIds, category) {
  const id = String(raw.id || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (!id) throw new Error("Pitch missing id");
  if (existingIds.has(id)) throw new Error(`Duplicate pitch id: ${id}`);
  const hook = String(raw.hook || "").trim();
  if (hook.length < 16) throw new Error(`Pitch hook too weak: ${id}`);
  const brand = String(raw.brand || "").trim();
  if (
    (category === "landing-pages" || category === "interfaces" || category === "editorial") &&
    brand.length < 2
  ) {
    throw new Error(`Pitch missing brand: ${id}`);
  }
  if (category === "games") {
    const loop = String(raw.core_loop || "").trim();
    const input = String(raw.input_map || "").trim();
    const fail = String(raw.fail || "").trim();
    const win = String(raw.win_or_score || "").trim();
    if (loop.length < 12) throw new Error(`Games pitch missing core_loop: ${id}`);
    if (input.length < 4) throw new Error(`Games pitch missing input_map: ${id}`);
    if (fail.length < 4) throw new Error(`Games pitch missing fail: ${id}`);
    if (win.length < 4) throw new Error(`Games pitch missing win_or_score: ${id}`);
    if (GAME_CLONE_RE.test(`${hook} ${loop} ${raw.niche || ""}`)) {
      throw new Error(`Games clone pitch rejected: ${id}`);
    }
  }
  if (category === "concepts") {
    const artifact = String(raw.artifact || "").trim();
    if (artifact.length < 4) throw new Error(`Concepts pitch missing artifact: ${id}`);
    if (/\b(explore the future|reimagine)\b/i.test(`${hook} ${artifact}`)) {
      throw new Error(`Concepts fluff pitch rejected: ${id}`);
    }
  }
  if (category === "webgl" && !WEBGL_HINT_RE.test(`${hook} ${raw.niche || ""} ${(raw.tags || []).join(" ")}`)) {
    throw new Error(`WebGL pitch lacks 3D language: ${id}`);
  }
  const colors = (raw.colors || []).filter((c) => /^#[0-9a-fA-F]{6}$/.test(c));
  if (colors.length < 3) throw new Error(`Pitch needs ≥3 colors: ${id}`);
  const motions = Array.isArray(raw.motions)
    ? raw.motions.map((m) => String(m).trim()).filter(Boolean)
    : [];
  if (motions.length < 2) throw new Error(`Pitch needs ≥2 motions: ${id}`);
  if (
    (category === "landing-pages" || category === "concepts") &&
    SATURATED_NICHE_RE.test(
      `${id} ${raw.title || ""} ${brand} ${(raw.tags || []).join(" ")} ${raw.niche || ""} ${hook}`
    )
  ) {
    throw new Error(`Saturated niche pitch rejected: ${id}`);
  }
  return {
    ...raw,
    id,
    title: String(raw.title || id).trim(),
    brand,
    colors,
    motions,
    hook,
    type_pairing: String(raw.type_pairing || "").trim(),
    tags: (raw.tags || [])
      .map((t) =>
        String(t)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      )
      .filter(Boolean),
  };
}

async function generateForCategory(cfg, args, catalog, category) {
  const seedKey =
    args.seed !== null && args.seed !== undefined && args.seed !== ""
      ? `${args.seed}:${category}`
      : `${Date.now()}-${category}-${Math.random()}`;
  const seed = seedToInt(seedKey);
  const lane = pickLane(args.lane, seed, category);

  let brief = null;
  if (args.brief) {
    const bp = path.isAbsolute(args.brief)
      ? args.brief
      : path.join(ROOT, args.brief);
    if (!fs.existsSync(bp)) die(`Brief not found: ${args.brief}`);
    brief = fs.readFileSync(bp, "utf8").trim();
  }

  const count = args.themes
    ? args.themes.split(",").map((s) => s.trim()).filter(Boolean).length
    : args.count;

  const temperature =
    args.temperature ??
    (process.env.AI_TEMPERATURE
      ? Number(process.env.AI_TEMPERATURE)
      : 0.85);
  const expandTemp = Math.min(0.75, temperature);

  console.log(
    `\n→ ${category} n=${count} lane=${lane.id} seed=${seed} [2-pass]` +
      (args.mood ? ` mood="${args.mood}"` : "") +
      (args.avoid ? ` avoid="${args.avoid}"` : "")
  );

  // ── Pass 1: pitches ──────────────────────────────────────────
  console.log(`  pass1 pitches…`);
  const pitchContent = await chatJson(
    cfg,
    [
      { role: "system", content: buildPitchSystem(category) },
      {
        role: "user",
        content: buildPitchUser({
          category,
          count: Math.max(count, Math.min(count + 2, 8)), // oversample — saturated rejects expected
          themes: args.themes,
          catalog,
          lane,
          mood: args.mood,
          avoid: args.avoid,
          brief,
          seed,
        }),
      },
    ],
    temperature
  );

  const used = new Set(catalog.ids);
  const pitches = [];
  const rejected = [];
  for (const raw of normalizePayload(pitchContent, ["pitches", "entries"])) {
    try {
      const p = sanitizePitch(raw, used, category);
      used.add(p.id);
      pitches.push(p);
    } catch (e) {
      rejected.push({ id: raw?.id, reason: `pitch: ${e.message}` });
    }
  }

  if (!pitches.length) {
    console.warn(`  no valid pitches for ${category}`);
    if (rejected.length) {
      console.warn(
        `  rejected:`,
        rejected.map((r) => `${r.id || "?"} (${r.reason})`).join("; ")
      );
    }
    return [];
  }

  // ── Pass 2: expand (+ sanitize retry) ────────────────────────
  const accepted = [];
  for (const pitch of pitches) {
    if (accepted.length >= count) break;
    console.log(`  pass2 expand ${pitch.id}…`);
    let entry = null;
    let lastErr = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const expandContent = await chatJson(
          cfg,
          [
            { role: "system", content: buildExpandSystem(category) },
            {
              role: "user",
              content:
                buildExpandUser({ category, pitch, lane, mood: args.mood, catalog }) +
                (attempt > 1
                  ? `\n\nPREVIOUS EXPAND FAILED: ${lastErr}\nFix every listed issue. Keep the same id.`
                  : ""),
            },
          ],
          expandTemp
        );
        const raws = normalizePayload(expandContent, ["entries"]);
        const raw = raws[0] || {};
        raw.id = pitch.id;
        raw.title = raw.title || pitch.title;
        raw.tags = raw.tags?.length ? raw.tags : pitch.tags;
        raw.colors = raw.colors?.length >= 3 ? raw.colors : pitch.colors;
        raw.motions = raw.motions?.length >= 2 ? raw.motions : pitch.motions;
        raw.type_pairing = raw.type_pairing || pitch.type_pairing;
        if (!raw.summary) {
          raw.summary = `${pitch.brand || pitch.title}: ${pitch.hook}`.slice(0, 220);
          if (raw.summary.length < 40) {
            raw.summary = `${pitch.title} — ${pitch.niche || pitch.hook}`.slice(0, 220);
          }
        }

        entry = sanitizeEntry(raw, {
          category,
          status: args.status,
          existingIds: new Set([...catalog.ids, ...accepted.map((a) => a.id)]),
        });

        const sim = maxSimilarity(entry, catalog.entries);
        if (sim.score >= args.maxSimilarity && !args.force) {
          throw new Error(
            `too similar to ${sim.against} (${sim.score.toFixed(2)})`
          );
        }
        lastErr = null;
        break;
      } catch (e) {
        lastErr = e.message;
        entry = null;
        if (attempt === 2) {
          rejected.push({ id: pitch.id, reason: `expand: ${lastErr}` });
        } else {
          console.warn(`  retry ${pitch.id}: ${lastErr}`);
        }
      }
    }

    if (!entry) continue;

    catalog.entries.push({
      id: entry.id,
      title: entry.title,
      summary: entry.summary,
      tags: entry.tags,
      fingerprint: [entry.title, entry.summary, ...entry.tags].join(" "),
      tokens: undefined,
    });
    catalog.ids.push(entry.id);
    accepted.push(entry);
  }

  if (rejected.length) {
    console.warn(
      `  rejected ${rejected.length}:`,
      rejected.map((r) => `${r.id || "?"} (${r.reason})`).join("; ")
    );
  }
  return accepted;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.listLanes) {
    console.log("Creative lanes (use --lane <id> or let seed pick):\n");
    for (const { id, brief, categories } of listLanes()) {
      console.log(`  ${id}  [${(categories || []).join(", ")}]\n    ${brief}\n`);
    }
    return;
  }

  if (!args.all && (!args.category || !CATEGORIES.includes(args.category))) {
    die(
      `--category one of: ${CATEGORIES.join(", ")}  (or pass --all)\n` +
        `Examples:\n` +
        `  npm run ai:new -- -c landing-pages -n 3\n` +
        `  npm run ai:new -- -c games --lane arcade-precision -n 2\n` +
        `  npm run ai:new -- -c webgl --lane shader-sculpt -n 2\n` +
        `  npm run ai:new -- -c animations --lane kinetic-type -n 2\n` +
        `  npm run ai:new -- --all -n 2 --mood "unexpected luxury"`
    );
  }
  if (args.category && args.all) die("Use either -c <category> or --all, not both");
  if (!args.themes && (!Number.isFinite(args.count) || args.count < 1 || args.count > 20)) {
    die("--count must be 1–20 (or pass --themes)");
  }
  if (!["draft", "polished"].includes(args.status)) {
    die("--status must be draft|polished");
  }
  if (args.lane && !LANES[args.lane]) {
    die(`Unknown lane "${args.lane}". Run: npm run ai:lanes`);
  }

  const cfg = resolveConfig();
  let catalog = ensureCatalog();
  const targets = args.all ? FILL_CATEGORIES : [args.category];

  console.log(
    `Provider=${cfg.provider} label=${cfg.model} api=${cfg.modelApi || cfg.model} catalog=${catalog.count} entries`
  );

  const allAccepted = [];
  for (const category of targets) {
    // refresh catalog snapshot ids between categories
    catalog = buildCatalog(ROOT);
    // include already-accepted this run
    for (const e of allAccepted) {
      if (!catalog.ids.includes(e.id)) {
        catalog.ids.push(e.id);
        catalog.entries.push({
          id: e.id,
          title: e.title,
          summary: e.summary,
          tags: e.tags,
          fingerprint: [e.title, e.summary, ...e.tags].join(" "),
        });
        catalog.niches.push(`${e.category}: ${e.title} — ${e.summary}`);
      }
    }

    const accepted = await generateForCategory(cfg, args, catalog, category);
    allAccepted.push(...accepted);
  }

  if (!allAccepted.length) {
    die(
      "No entries accepted (all rejected as duplicates/invalid). Steer with --mood/--lane/--avoid and retry."
    );
  }

  if (args.dryRun) {
    console.log(JSON.stringify(allAccepted, null, 2));
    console.log(`\nDry run — ${allAccepted.length} entries not written.`);
    return;
  }

  for (const entry of allAccepted) {
    entry.source_model = cfg.model;
    entry.source_provider = cfg.provider;
    const rel = writeEntry(ROOT, entry, { force: args.force });
    console.log(`Wrote ${rel}`);
  }

  const build = spawnSync("npm", ["run", "build"], {
    cwd: ROOT,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (build.stdout) process.stdout.write(build.stdout);
  if (build.stderr) process.stderr.write(build.stderr);
  if (build.status !== 0) {
    die("Entries written but npm run build failed — fix and re-run build");
  }

  // refresh catalog file after build
  writeCatalog(ROOT, buildCatalog(ROOT));
  console.log(`\nDone. Created ${allAccepted.length} entries.`);
}

main().catch((err) => die(err.stack || err.message));
