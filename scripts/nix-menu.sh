#!/usr/bin/env bash
# Interactive command picker for the design-prompt-collection nix-shell.
#   menu          — numbered menu
#   menu help     — print cheat sheet only
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

cheat() {
  cat <<'EOF'
┌─ design-prompt-collection ──────────────────────────────────┐
│  Worker                                                      │
│    worker-daemon     Langlauf (fill+commit+push+gh-pages)    │
│    worker            Interactive worker (flags)              │
│    worker-status     Queue / progress                        │
│    stop / stop-force Stop worker (+ SIGKILL)                 │
│    slots             Gateway idle/busy                       │
│                                                              │
│  Pipeline                                                    │
│    ai-new            Neue Prompt-Briefs                      │
│    ai-build          Demos bauen                             │
│    shots             Screenshots                             │
│    review            Vision-Score / rebuild                  │
│    review-force      Alle Runs neu scoren (fehlt Shot→shot)  │
│    playwright-check  Chromium/CDP Screenshot Smoke-Test      │
│    pipeline / ship   Full pipeline (+ check)                 │
│    pages / pages-deploy  Site bauen / Pages triggern         │
│                                                              │
│  Repo                                                        │
│    build             validate + README + index               │
│    check             completeness gate                       │
│    git-status        git status -sb                          │
│                                                              │
│  Tip: menu   ·   touch STOP                                  │
└──────────────────────────────────────────────────────────────┘
EOF
}

run() {
  echo "▶ $*"
  # shellcheck disable=SC2086
  eval "$@"
}

if [[ "${1:-}" == "help" || "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cheat
  exit 0
fi

cheat
echo
PS3=$'\nAuswahl (Nummer, oder q): '
options=(
  "Worker-Daemon starten (Langlauf)"
  "Worker-Status"
  "Worker stoppen"
  "Worker stoppen --force"
  "Slots anzeigen"
  "ai:new  (3 landing-pages)"
  "ai:build"
  "shots"
  "review"
  "review --force (ensure shots)"
  "playwright:check"
  "pipeline"
  "ship"
  "pages"
  "pages:deploy"
  "build (README/index)"
  "check"
  "git status"
  "Cheat sheet nochmal"
  "Quit"
)

select opt in "${options[@]}"; do
  case "$REPLY" in
    1) run "sh ./scripts/worker-daemon.sh"; break ;;
    2) run "npm run worker:status"; break ;;
    3) run "npm run stop"; break ;;
    4) run "npm run stop -- --force"; break ;;
    5) run "npm run slots"; break ;;
    6) run "npm run ai:new -- -c landing-pages -n 3"; break ;;
    7) run "npm run ai:build"; break ;;
    8) run "npm run shots"; break ;;
    9) run "npm run review"; break ;;
    10) run "npm run review -- --force"; break ;;
    11) run "npm run playwright:check"; break ;;
    12) run "npm run pipeline"; break ;;
    13) run "npm run ship"; break ;;
    14) run "npm run pages"; break ;;
    15) run "npm run pages:deploy"; break ;;
    16) run "npm run build"; break ;;
    17) run "npm run check"; break ;;
    18) run "git status -sb"; break ;;
    19) cheat; continue ;;
    20|q|Q) echo "bye"; break ;;
    *) echo "Ungültig: $REPLY"; continue ;;
  esac
done
