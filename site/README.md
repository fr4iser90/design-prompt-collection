# site/

- `site/dist/` — output of `npm run pages` (gitignored; deploy this or copy to `docs/`)
- Source of truth stays in `prompts/**` + `catalog.json`

## GitHub Pages

1. `npm run pipeline` (demos + screenshots + site)
2. Either:
   - Upload / Actions deploy `site/dist`, or
   - `cp -r site/dist docs` and enable Pages from `/docs`
