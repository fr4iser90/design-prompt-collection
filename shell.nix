{ pkgs ? import <nixpkgs> { } }:

# Dev shell — current maintained Node from nixpkgs (not an EOL pin).
#   nix-shell
#   nix-shell --run 'sh ./scripts/worker-daemon.sh'
#   menu          # interactive picker (inside shell)
pkgs.mkShell {
  name = "design-prompt-collection";

  buildInputs = with pkgs; [
    nodejs # follows nixpkgs current / non-EOL default
    git
    chromium # system browser for Playwright shots (no CDN download)
  ];

  shellHook = ''
    export PATH="$PWD/node_modules/.bin:$PATH"
    # Playwright prefers its own browsers path under $HOME, not nix store
    export PLAYWRIGHT_BROWSERS_PATH="$HOME/.cache/ms-playwright"
    export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1

    # Interactive picker (aliases — work in bash nix-shell without export -f)
    chmod +x "$PWD/scripts/nix-menu.sh" 2>/dev/null || true
    alias menu='sh "$PWD/scripts/nix-menu.sh"'
    alias dpc='sh "$PWD/scripts/nix-menu.sh"'

    # Compact cheat sheet (skip when non-interactive: nix-shell --run …)
    if [ -t 1 ] && [ -z "''${DPC_QUIET:-}" ]; then
      echo ""
      echo "design-prompt-collection  ·  node $(node -v)  npm $(npm -v)"
      echo "chromium: $(command -v chromium || echo missing)"
      echo ""
      echo "  menu / dpc          interactive command picker"
      echo "  menu help           print full cheat sheet"
      echo ""
      echo "  Worker"
      echo "    npm run worker -- --fill --fill-n 10 --max-parallel 2 --commit --push --gh-pages"
      echo "    sh ./scripts/worker-daemon.sh"
      echo "    npm run worker:status | slots | stop [-- --force]"
      echo ""
      echo "  Pipeline"
      echo "    npm run ai:new | ai:build | shots | review | pipeline | ship"
      echo "    npm run pages | pages:deploy | build | check"
      echo ""
      echo "  Playwright"
      echo "    npm run playwright:check     # CDP+screenshot smoke test"
      echo "    npm run review -- --force    # vision re-score (ensures shots)"
      echo ""
      echo "  Stop worker:  touch STOP   ·   Quiet banner: DPC_QUIET=1 nix-shell"
      echo ""
    fi
  '';
}
