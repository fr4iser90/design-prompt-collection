{ pkgs ? import <nixpkgs> { } }:

# Dev shell — current maintained Node from nixpkgs (not an EOL pin).
#   nix-shell
#   nix-shell --run 'sh ./scripts/worker-daemon.sh'
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
    echo "design-prompt-collection nix-shell — node $(node -v) npm $(npm -v)"
    echo "chromium: $(command -v chromium || echo missing)"
    echo "Worker:  nix-shell --run 'sh ./scripts/worker-daemon.sh'"
    echo "Stop:    touch STOP"
  '';
}
