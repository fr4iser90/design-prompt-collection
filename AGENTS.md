# AGENTS.md — how other AIs fill this repo

You are contributing to a **design prompt collection**. Every entry is a self-contained folder that must pass `npm run build`.

## Non-negotiables

1. **One folder = one prompt** under `prompts/<category>/<kebab-id>/`
2. Required files: `meta.yaml`, `preview.svg|png|webp`, `prompt.md`, `prompt.full.md`
3. Categories: `landing-pages` | `animations` | `concepts` | `experiments`
4. Status: `draft` until art direction is sharp → then `polished`
5. After edits: run `npm run build` (validate + regenerate `README.md` + `index.json`)
6. Do **not** invent co-authors or Cursor attribution in commits

## Create a new entry

```bash
npm run scaffold -- --category landing-pages --id my-concept-name --title "My Concept Name"
```

Then replace template placeholders with a **high-refined** brief. Never leave `{{...}}` or `replace-me` tags.

## `meta.yaml` contract

```yaml
id: my-concept-name          # == folder name
title: "My Concept Name"
category: landing-pages      # == parent folder
tags: [saas, hero, motion]   # kebab-case, 1–12
status: draft                # draft | polished | archived
summary: "20–220 char teaser shown in README"
preview: preview.svg
prompt: prompt.md
extended: prompt.full.md
demo: null                   # or demo.html
created: "2026-09-27"
updated: "2026-09-27"
model_hints: [cursor, chatgpt, claude]
```

Full schema: `schema/entry.schema.json`  
Machine index after generate: `index.json`

## Writing quality bar

### `prompt.md` (short — copy/paste)
- Direct instruction a coding/design model can execute in one shot
- Include intent, hard visual rules, and deliverable format
- Prefer concrete art direction over vague adjectives
- Align with the frontend design rules in this org (brand first, no hero cards, expressive type, atmospheric background, 2–3 motions)

### `prompt.full.md` (extended)
- Concept paragraph, palette, type pairing, layout desktop/mobile
- Motion brief (entrance / ambient / interaction)
- Constraints checklist + acceptance criteria
- Optional variants A/B

### Preview
- Prefer a real capture (`preview.webp` 1200×630) when a demo exists
- Until then, a labeled SVG placeholder is OK — update `meta.preview` if you change format

## Local AI fill (recommended)

```bash
cp .env.example .env
npm install && npx playwright install chromium

npm run ai:new -- -c landing-pages -n 3
npm run pipeline                 # ai:build → shots → pages → build
```

| Command | Does |
|---------|------|
| `ai:new` | new high-quality prompt briefs (uses `catalog.json`) |
| `ai:build` | LLM implements each prompt as `runs/<model>/demo/index.html` |
| `shots` | Playwright screenshots → `preview.png` + regenerate README (auto-installs Chromium if missing) |
| `review` | vision score → README; score too low or broken shot → rebuild (max attempts then abandoned) |
| `pages` | static site → `site/dist` |
| `pipeline` | build demos + shots + pages + index |
| `ship` | pipeline + completeness gate (one-shot) |
| `worker` | autonomous loop: slot-wait → build → shots (optional fill) |
| `stop` | STOP file + SIGTERM builds (`--force` kills hard) |
| `slots` | print Gufo `slots_idle` / busy |
| `check` | only finished entries? (pre-commit uses `--staged`) |
| `hooks` | install git pre-commit |

Multi-day: `npm run worker -- --fill --fill-n 10 --fill-when-below 1 --max-parallel 2 --commit --push` — stop with `npm run stop` (or `npm run stop -- --force`). Details: `automation/README.md`.
| `build` | validate + README + index + catalog only |

Steer fill with `--mood`, `--lane`, `--seed`, `--avoid`. Details: `automation/README.md`.

## Batch workflow for chat AIs

1. Read `index.json` / `catalog.json` to avoid duplicate ids & niches
2. Scaffold or create folders for N new ids
3. Write `prompt.md` + `prompt.full.md` + `meta.yaml`
4. Run `npm run pipeline` (or `ai:build` + `shots` + `pages`)
5. Stop when Validation OK and demos/previews exist

## What not to do

- Do not dump multiple prompts into one folder
- Do not put polished work only in README (README is generated)
- Do not use Inter / Roboto / Arial / system as the prescribed display stack
- Do not default to purple-glow SaaS or cream+terracotta clichés unless the brief intentionally targets that look
- Do not add secrets, API keys, or binary bloat (keep previews lean)

## GitHub Pages

`npm run pages` → `site/dist`. Deploy: Settings → Pages → **GitHub Actions**, then `--gh-pages` after `--push` (or `npm run pages:deploy`). Workflow: `.github/workflows/pages.yml`.
