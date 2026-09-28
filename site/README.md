# site/

- `site/dist/` — output of `npm run pages` (gitignored; Actions deploys this artifact)
- Source of truth stays in `prompts/**` + `catalog.json` / `index.json`

## GitHub Pages

1. Repo → **Settings → Pages → Source: GitHub Actions**
2. Push `.github/workflows/pages.yml` (on `main`/`master`)
3. Worker (opt-in, like commit/push):

```bash
npm run worker -- --commit --push --gh-pages
# or env: WORKER_GH_PAGES=true
```

Nach erfolgreichem `--push` baut der Worker lokal `site/dist` und triggert `pages.yml` via `gh workflow run`. Push auf `main` startet den Workflow zusätzlich automatisch.

Manuell:

```bash
npm run pages:deploy
```
