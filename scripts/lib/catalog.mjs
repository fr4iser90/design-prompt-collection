// Catalog + anti-overlap helpers for AI fill.
import fs from "node:fs";
import path from "node:path";
import { CATEGORIES } from "./helpers.mjs";

const BRAND_RE = /\*\*([A-Z][A-Za-z0-9][A-Za-z0-9 &-]{1,40})\*\*/g;
export function tokenize(text) {
  return new Set(
    String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/[\s-]+/)
      .filter((w) => w.length > 2)
  );
}

export function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

export function extractBrands(promptMd) {
  const brands = new Set();
  let m;
  const re = new RegExp(BRAND_RE.source, "g");
  while ((m = re.exec(promptMd || ""))) {
    const name = m[1].trim();
    if (/^(HTML|CSS|JS|API|CTA|UI|UX)$/i.test(name)) continue;
    brands.add(name);
  }
  return [...brands];
}

/** Build a dense catalog used to steer generation + avoid overlaps. */
export function buildCatalog(root) {
  const indexPath = path.join(root, "index.json");
  const entries = [];
  if (fs.existsSync(indexPath)) {
    const data = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    for (const e of data.entries || []) {
      const promptPath = path.join(root, e.prompt || path.join(e.path, "prompt.md"));
      let promptTeaser = e.summary || "";
      let brands = [];
      if (fs.existsSync(promptPath)) {
        const md = fs.readFileSync(promptPath, "utf8");
        brands = extractBrands(md);
        const lines = md
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter((l) => l && !l.startsWith("#") && !l.startsWith("-") && !l.startsWith("|"));
        if (lines[0]) promptTeaser = lines[0].slice(0, 160);
      }
      const fingerprint = [e.title, e.summary, ...(e.tags || []), ...brands]
        .join(" ")
        .toLowerCase();
      entries.push({
        id: e.id,
        title: e.title,
        category: e.category,
        tags: e.tags || [],
        status: e.status,
        summary: e.summary,
        brands,
        teaser: promptTeaser,
        fingerprint,
        tokens: [...tokenize(fingerprint)],
      });
    }
  }

  const byCategory = Object.fromEntries(CATEGORIES.map((c) => [c, []]));
  const tagFreq = {};
  const brands = new Set();
  const ids = new Set();
  const niches = [];

  for (const e of entries) {
    ids.add(e.id);
    byCategory[e.category] = byCategory[e.category] || [];
    byCategory[e.category].push({
      id: e.id,
      title: e.title,
      tags: e.tags,
      summary: e.summary,
      brands: e.brands,
    });
    for (const t of e.tags) tagFreq[t] = (tagFreq[t] || 0) + 1;
    for (const b of e.brands) brands.add(b);
    niches.push(`${e.category}: ${e.title} — ${e.summary}`);
  }

  return {
    generated_at: new Date().toISOString(),
    count: entries.length,
    ids: [...ids].sort(),
    brands: [...brands].sort(),
    tag_frequency: Object.fromEntries(
      Object.entries(tagFreq).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    ),
    niches,
    by_category: byCategory,
    entries,
  };
}

export function writeCatalog(root, catalog) {
  const out = {
    generated_at: catalog.generated_at,
    count: catalog.count,
    ids: catalog.ids,
    brands: catalog.brands,
    tag_frequency: catalog.tag_frequency,
    niches: catalog.niches,
    by_category: catalog.by_category,
  };
  fs.writeFileSync(path.join(root, "catalog.json"), JSON.stringify(out, null, 2) + "\n");
}

export function maxSimilarity(candidate, catalogEntries) {
  const tokens = tokenize(
    [candidate.title, candidate.summary, ...(candidate.tags || [])].join(" ")
  );
  let best = { score: 0, against: null };
  for (const e of catalogEntries) {
    const score = jaccard(tokens, new Set(e.tokens || tokenize(e.fingerprint)));
    if (score > best.score) best = { score, against: e.id };
  }
  return best;
}

/** Creative director lanes — pick one each run for variety. */
export const LANES = {
  "material-poetry":
    "Lead with tactile materials (stone, glaze, paper, metal). Object honesty over UI chrome.",
  "editorial-print":
    "Magazine/print energy: monumental type, rules, ink, crop photography. Not broadsheet pastiche.",
  "soft-machine":
    "Humane industrial: aluminum, porcelain, gaskets. Calm appliances / tools, no steampunk.",
  "nocturnal-nature":
    "Night botanicals, wet leaves, biological light. Romantic but sharp — no cottagecore.",
  "arid-minimal":
    "Desert light, bone, clay, long shadows. Sparse composition, heat haze atmosphere.",
  "kinetic-type":
    "Typography is the performer. Masks, springs, magnetic type — motion serves hierarchy.",
  "archival-tech":
    "Library-of-the-future: indexes, ledgers, north light. Trust without dashboard soup.",
  "culinary-craft":
    "Food/craft hospitality with chef precision. Steam, steel, linen — not rustic farmhouse kitsch.",
  "sports-precision":
    "Athletic timing and measurement. Sweeping motion, tight tracking, competitive calm.",
  "cultural-hybrid":
    "Cross-cultural contemporary design (name a specific place/craft tradition). Avoid costume clichés.",
  "aquatic-depth":
    "Water as plane: tide, glass, refraction. Quiet luxury, saline palette.",
  "signal-warning":
    "Utility / safety / infrastructure aesthetics. Stripes, stamps, mono labels — intentional tension.",
  // games
  "arcade-precision":
    "Tight one-screen arcade loop: readable risk, fair fail, juicy feedback. No endless runner clones.",
  "puzzle-tactile":
    "Spatial / logic puzzle with physical metaphor (blocks, ink, magnets). Satisfaction over difficulty spike.",
  "rhythm-timing":
    "Beat / timing skill: sync input to pulse. Visual metronome, not just music wallpaper.",
  "stealth-signal":
    "Light/shadow or detection games: tension from being seen. Sparse HUD, strong silhouette read.",
  "toybox-physics":
    "Playable physics toy: catapult, balance, fluid. Toys first, score second.",
  // webgl
  "shader-sculpt":
    "Fragment/vertex craft as the hero: SDF, noise, light models. Composition over UI chrome.",
  "material-lab":
    "PBR / filmic materials under a single key light. Metal, glass, cloth — object study in 3D.",
  "volumetric-atmosphere":
    "Fog, godrays, particles as space. Camera glide; stillness with depth, not busy particle spam.",
  "procedural-terrain":
    "Generated landscape / city fabric. Readable silhouette at distance; detail on approach.",
  "interactive-sculpture":
    "One 3D object/scene you orbit/deform. Interaction reveals form — not a product configurator.",
  // editorial
  "folio-spread":
    "Magazine spread energy: monumental crop, pull-quotes, ink hierarchy. Scroll as page-turn, not card stack.",
  "longform-rail":
    "Essay / reportage: sticky type rail, chapter marks, quiet photography. Reading rhythm over CTA spam.",
  "print-reconstruction":
    "Reconstruct a print artifact on screen (folio, gazette, annual). Paper grain, registration — not fake newspaper pastiche.",
  // interfaces
  "tool-surface":
    "Working UI: panels exist because the user acts. Density with calm; cards only for interactive units.",
  "instrument-panel":
    "Console / instrument metaphor: meters, sends, queues. Precise controls, no marketing chrome.",
  "review-split":
    "Compare / annotate / decide surfaces. Split panes, selection states, decisive primary action.",
};

/** Which categories a lane is eligible for. Untagged = design cats only (not games/webgl). */
const DESIGN_CATS = [
  "landing-pages",
  "animations",
  "concepts",
  "editorial",
  "interfaces",
  "experiments",
];
export const LANE_FOR = {
  "arcade-precision": ["games"],
  "puzzle-tactile": ["games"],
  "rhythm-timing": ["games"],
  "stealth-signal": ["games"],
  "toybox-physics": ["games"],
  "shader-sculpt": ["webgl"],
  "material-lab": ["webgl"],
  "volumetric-atmosphere": ["webgl", "animations"],
  "procedural-terrain": ["webgl"],
  "interactive-sculpture": ["webgl", "concepts"],
  "folio-spread": ["editorial", "concepts"],
  "longform-rail": ["editorial"],
  "print-reconstruction": ["editorial", "landing-pages"],
  "tool-surface": ["interfaces"],
  "instrument-panel": ["interfaces"],
  "review-split": ["interfaces"],
  "kinetic-type": DESIGN_CATS,
  "editorial-print": [...DESIGN_CATS.filter((c) => c !== "interfaces"), "editorial"],
  "sports-precision": [...DESIGN_CATS, "games"],
  "archival-tech": [...DESIGN_CATS],
  "soft-machine": [...DESIGN_CATS],
};

export function lanesForCategory(category) {
  const keys = Object.keys(LANES).filter((id) => {
    const allowed = LANE_FOR[id];
    if (!allowed) return DESIGN_CATS.includes(category);
    return allowed.includes(category);
  });
  return Object.fromEntries(keys.map((id) => [id, LANES[id]]));
}

export function pickLane(name, seed, category = null) {
  const pool = category ? lanesForCategory(category) : LANES;
  if (name && LANES[name]) {
    if (category && !pool[name]) {
      // explicit --lane always wins if it exists globally
      return { id: name, brief: LANES[name] };
    }
    return { id: name, brief: LANES[name] };
  }
  const keys = Object.keys(pool);
  if (!keys.length) {
    const fallback = Object.keys(LANES);
    const n = seedToInt(seed);
    const id = fallback[n % fallback.length];
    return { id, brief: LANES[id] };
  }
  const n = seedToInt(seed);
  const id = keys[n % keys.length];
  return { id, brief: pool[id] };
}

export function seedToInt(seed) {
  if (seed === undefined || seed === null || seed === "") {
    return (Date.now() ^ (Math.random() * 1e9)) >>> 0;
  }
  const s = String(seed);
  if (/^\d+$/.test(s)) return Number(s) >>> 0;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function listLanes() {
  return Object.entries(LANES).map(([id, brief]) => ({
    id,
    brief,
    categories: LANE_FOR[id] || DESIGN_CATS,
  }));
}
