# Automation

## One-shot (bauen + checken)

```bash
npm install          # installs pre-commit hook via prepare
npm run ship         # ai:build → shots → pages → build → check
```

Danach nur fertige Entries committen — der Hook blockt Drafts / fehlende Screenshots.

## Pre-commit (automatisch)

Bei jedem `git commit`, wenn `prompts/` / README / index geändert:

1. keine `.env` Secrets  
2. `npm run validate`  
3. `npm run check -- --staged` → nur **polished** Entries mit `runs/<model>/demo` + `preview.png`  
4. regeneriert README/index falls nötig  

Hook neu setzen: `npm run hooks`

## Fertig-Kriterien

| Pflicht | Details |
|---------|---------|
| `status: polished` | Drafts nicht committen (oder nach `experiments/`) |
| ≥1 model run | `runs/<slug>/demo/index.html` |
| Screenshot | `runs/<slug>/preview.png` |
| Prompt-Qualität | Länge + keine `{{placeholders}}` |

## Typischer Flow

```bash
npm run ai:new -- -c landing-pages -n 3
npm run ship                 # baut ALLES offene für AI_MODEL
git add prompts README.md index.json catalog.json
git commit -m "Add landing page prompts"
```

Anderes Model ohne Überschreiben:

```bash
npm run ship -- --model gpt-4.1-mini
# (ai:build akzeptiert --model; ship reicht Args durch)
```

## Commands

| Command | Ergebnis |
|---------|----------|
| `ship` | vollautomatisch bauen + completeness gate |
| `check` | completeness ohne Build |
| `check -- --staged` | nur gestagte Entries (pre-commit) |
| `pipeline` | wie ship ohne finales `check` |
| `hooks` | pre-commit installieren |
