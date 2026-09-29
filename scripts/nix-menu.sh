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
│                      (-c landing-pages|animations|concepts|  │
│                       games|webgl|editorial|interfaces …)    │
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
  "ai:new  (2 games)"
  "ai:new  (2 webgl)"
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
    7) run "npm run ai:new -- -c games -n 2"; break ;;
    8) run "npm run ai:new -- -c webgl -n 2"; break ;;
    9) run "npm run ai:build"; break ;;
    10) run "npm run shots"; break ;;
    11) run "npm run review"; break ;;
    12) run "npm run review -- --force"; break ;;
    13) run "npm run playwright:check"; break ;;
    14) run "npm run pipeline"; break ;;
    15) run "npm run ship"; break ;;
    16) run "npm run pages"; break ;;
    17) run "npm run pages:deploy"; break ;;
    18) run "npm run build"; break ;;
    19) run "npm run check"; break ;;
    20) run "git status -sb"; break ;;
    21) cheat; continue ;;
    22|q|Q) echo "bye"; break ;;
    *) echo "Ungültig: $REPLY"; continue ;;
  esac
done
