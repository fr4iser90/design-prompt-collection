# Automation

## Multi-day autonomous worker

Genau der Loop den du willst:

1. Alle fehlenden Demos für `AI_MODEL` / Alias bauen (Slot-Gate, ≤2 parallel)
2. Screenshots → Pages → `index.json` / `catalog.json` / README
3. Wenn Build-Queue leer: Katalog lesen, **10 neue** Prompts (anti-overlap), dann wieder bauen
4. Optional committen → rinse & repeat

```bash
# Langlauf (tmux/screen empfohlen)
npm run worker -- --fill --fill-n 10 --fill-when-below 1 --max-parallel 2 --commit

# Stop
touch STOP
# oder Ctrl+C
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
| `--fill-n` / `WORKER_FILL_N` | `10` | Batch-Größe (split über 3 Kategorien) |
| `--fill-when-below` | `1` | fill erst wenn `build_queue < N` (1 = erst wenn leer) |
| `--max-parallel` | `2` | parallele Builds (1 Slot frei lassen) |
| `--commit` / `WORKER_COMMIT` | off | nach produktivem Cycle `git commit` |
| `WAIT_FOR_SLOT` | `true` | vor jedem LLM-Call auf idle Slot warten |
| `SLOT_POLL_MS` | `15000` | Poll-Intervall |
| `WORKER_IDLE_MS` | `20000` | Sleep wenn idle / keine Slots |

State: `.worker/state.json` (gitignored). Model kommt aus `.env` (`AI_MODEL` + optional `AI_MODEL_API`).

## One-shot

```bash
npm run ship         # ai:build → shots → pages → build → check
```

Pre-commit scaffold skip: `SKIP_COMPLETE_CHECK=1 git commit -m "…"`

## Commands

| Command | Ergebnis |
|---------|----------|
| `worker` | autonomous loop (slots + build + shots + optional fill/commit) |
| `slots` | print idle/busy from gateway |
| `ship` | one-shot pipeline + check |
| `ai:new` / `ai:build` / `shots` / `pages` | single steps |
| `check` | ship-ready gate |
| `hooks` | install pre-commit |
