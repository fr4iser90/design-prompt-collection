# Batch task template (paste to another AI)

Copy everything below the line into Cursor / ChatGPT / Claude.

---

You are filling the **design-prompt-collection** repo.

## Context files (read first)
- `AGENTS.md` — rules of engagement
- `schema/entry.schema.json` — meta contract
- `index.json` — existing ids (do not collide)
- `templates/entry/*` — file shapes

## Your task
Create **N** new polished entries in category **CATEGORY** with these themes:

1. …
2. …
3. …

## Procedure
1. For each theme, choose a kebab-case `id` not present in `index.json`
2. Run: `npm run scaffold -- -c CATEGORY -i ID -t "Title"`
3. Rewrite `prompt.md` (short, executable) and `prompt.full.md` (art direction)
4. Update `meta.yaml` (`status: polished`, real `summary`, real `tags`)
5. Customize `preview.svg` colors to match the brief (or add `preview.webp`)
6. Optionally add `demo.html` and set `demo: demo.html` in meta
7. Run `npm run build` and fix all validation errors
8. Reply with the list of created paths + titles

## Quality bar
High-refined design prompts only. Brand-first heroes, no Inter/Roboto/Arial defaults, no purple-glow SaaS clichés unless requested, no hero cards/badges. See frontend design rules in AGENTS.md / org rules.
