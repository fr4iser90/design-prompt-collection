#!/bin/sh
# Detached multi-day worker. Prefer:
#   nix-shell --run 'sh ./scripts/worker-daemon.sh'
set -eu
ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found. Run:  nix-shell --run 'sh ./scripts/worker-daemon.sh'" >&2
  exit 1
fi

if [ ! -f package.json ]; then
  echo "not in repo root: $ROOT" >&2
  exit 1
fi

if [ ! -f .env ]; then
  echo "missing .env — copy .env.example and set AI_API_KEY / AI_MODEL" >&2
  exit 1
fi

# Preflight: key must be present (ignore comments / blank)
if ! grep -E '^[[:space:]]*AI_API_KEY=[^#[:space:]]' .env >/dev/null 2>&1 \
  && ! grep -E '^[[:space:]]*OPENAI_API_KEY=[^#[:space:]]' .env >/dev/null 2>&1; then
  echo "Missing AI_API_KEY (or OPENAI_API_KEY) in .env — refuse to start" >&2
  exit 1
fi

# Already running?
if pgrep -f 'scripts/worker.mjs' >/dev/null 2>&1; then
  echo "worker already running:" >&2
  pgrep -af 'scripts/worker.mjs' >&2 || true
  echo "stop first:  touch STOP   or   pkill -f scripts/worker.mjs" >&2
  exit 1
fi

rm -f STOP
mkdir -p "$ROOT/.worker"
LOG="${WORKER_LOG:-/tmp/worker.log}"
NPM="$(command -v npm)"

echo "starting worker via $NPM → $LOG"
nohup "$NPM" run worker -- \
  --fill --fill-n 10 --fill-when-below 1 --max-parallel 2 --commit --push --gh-pages \
  >>"$LOG" 2>&1 &
echo $! >"$ROOT/.worker/pid"
echo "pid=$(cat "$ROOT/.worker/pid")  log=$LOG"
echo "status:  nix-shell --run 'npm run worker:status'   OR   cat $ROOT/.worker/status.txt"
echo "tail -f $LOG"
echo "stop:  nix-shell --run 'npm run stop'   (or: npm run stop -- --force)"
