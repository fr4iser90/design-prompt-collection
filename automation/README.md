# Automation

## Multi-day autonomous worker

Genau der Loop den du willst:

1. Alle fehlenden Demos für `AI_MODEL` / Alias bauen (Slot-Gate, ≤2 parallel)
2. Screenshots → hart validieren → bei Broken: Demo weg, Rebuild
3. Vision-Score → README (one-shot — **kein** Demo-Löschen / Score-Rebuild)
4. Nach `BUILD_MAX_ATTEMPTS` (default 3) Rejects wegen **broken shot** → `status: abandoned`
5. Commit/Push nach jedem produktiven Cycle
6. Wenn Queue leer: Katalog → neue Prompts → wieder bauen

```bash
# Langlauf (Server / SSH — nix-shell liefert npm)
cd ~/Documents/design-prompt-collection
nix-shell --run 'sh ./scripts/worker-daemon.sh'
tail -f /tmp/worker.log

# Stop
npm run stop
# hard:
npm run stop -- --force
```

Interactive:

```bash
nix-shell
npm run worker -- --fill --fill-n 10 --fill-when-below 1 --max-parallel 2 --commit --push --gh-pages
```

Status:

```bash
nix-shell --run 'npm run worker:status'   # fertig/gesamt, next, session
cat .worker/status.txt                    # gleiche Snapshot-Datei
pgrep -af 'worker.mjs'
tail -f /tmp/worker.log                   # Live; STATUS-Block jeden Cycle
```

Im Log / in `status.txt` steht z.B.:

```
══ WORKER STATUS … ══
progress  3/15 demos fertig  (20%)
queue     build=12  shots=0
next      BUILD next=forge-and-roast-coffee-lab
upcoming  id-a, id-b, …
session   cycles=4  built=3  filled=0  commits=1  pushes=1
```

Nur Backlog leeren (keine neuen Prompts, kein Commit):

```bash
npm run worker -- --max-parallel 2
```

Slots checken:

```bash
npm run slots
```

| Flag / Env | Default | Meaning |
|------------|---------|---------|
| `--fill` / `WORKER_FILL` | off | neue Prompts wenn Queue leer |
| `--fill-n` / `WORKER_FILL_N` | `10` | Batch-Größe **gesamt** (gleichmäßig split). Fill = **2-pass** `ai:new` (pitch→expand). Vision-Score = `review`, nicht Fill. Steer: `FILL_MOOD` / `FILL_AVOID` / `FILL_LANE` / `AI_FILL_MODEL`. |
| `--fill-when-below` | `1` | fill erst wenn `build_queue < N` (1 = erst wenn leer) |
| `--max-parallel` | `2` | parallele Builds (1 Slot frei lassen) |
| `--commit` / `WORKER_COMMIT` | off | nach Cycle wenn shots+scores fertig (Builds dürfen noch offen sein) |
| `--push` / `WORKER_PUSH` | off | danach `git push` (eigenes Flag; HTTPS nutzt `GITHUB_TOKEN` aus `.env`) |
| `--stop-after-push` / `WORKER_STOP_AFTER_PUSH` | off | nach erstem erfolgreichen Push STOP schreiben + exit |
| `--gh-pages` / `WORKER_GH_PAGES` | off | nach Push: `site/dist` bauen + Pages-Workflow triggern |
| `WAIT_FOR_SLOT` | `true` | vor jedem LLM-Call auf idle Slot warten |
| `SLOT_POLL_MS` | `15000` | Poll-Intervall |
| `WORKER_IDLE_MS` | `20000` | Sleep wenn idle / keine Slots |
| `THINKING_ENABLED` | `false` | `true` → `/think` + live dump; `false` → `/no_think` + `enable_thinking=false` |
| Run meta timings | — | `ttft_ms` (first token), `gen_ms`/`duration_ms` (generate), `queue_wait_ms`, `wall_ms`; tokens: `context_tokens` (max), `prompt_tokens`, `completion_tokens` |
| `BUILD_MAX_ATTEMPTS` | `3` | nach broken-shot Rejects → `abandoned` (kein Score-Rebuild) |

Run-Meta: Benchmarks + `review_score` (nur wenn behalten), bei Reject `last_review_score` / `preview.rejected.png` / `build_attempts`.

**Validieren** = hart (HTML + Shot). **Bewerten** = Vision-Score. **Rebuild** = Shot-broken oder Score zu niedrig.

Playwright: Worker startet **immer** (Builds brauchen keinen Browser). Shots nutzen
System-Chromium wenn vorhanden; Download ist optional und darf timeouten.
Auf NixOS: `chromium` im PATH (z.B. `nix-shell` mit chromium) oder später
`PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=300000 npm run playwright:install`.

Smoke-Test (nix-shell):

```bash
npm run playwright:check
```

Vision neu scoren (vorhandene `preview.png`; fehlt → zuerst `shots`):

```bash
npm run review -- --force              # alle Runs des aktuellen AI_MODEL
npm run review -- --force --id my-id   # ein Entry
npm run review -- --force --no-shots   # nur vorhandene Previews, nichts shottten
```

Demo-HTML auf Disk wird von `shots`/`review` **nie** editiert.

## One-shot

```bash
npm run ship         # ai:build → shots → pages → build → check
```

Pre-commit scaffold skip: `SKIP_COMPLETE_CHECK=1 git commit -m "…"`

## Commands

| Command | Ergebnis |
|---------|----------|
| `review` | Vision-Score → README (one-shot; no score-based demo rebuild) |
| `worker` | autonomous loop (slots + build + shots + review + optional fill/commit/push/gh-pages) |
| `stop` | touch STOP + SIGTERM worker/build/fill (`--force` → SIGKILL) |
| `slots` | print idle/busy from gateway |
| `ship` | one-shot pipeline + check |
| `ai:new` / `ai:build` / `shots` / `pages` | single steps — cats: landing-pages, animations, concepts, games, webgl, editorial, interfaces, experiments |
| `ai:lanes` | list creative lanes (games/webgl have dedicated pools) |
| `pages:deploy` | build `site/dist` + trigger GitHub Pages workflow |
| `check` | ship-ready gate |
| `hooks` | install pre-commit |
