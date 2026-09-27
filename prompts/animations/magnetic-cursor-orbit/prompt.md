# Magnetic Cursor Orbit

Implement a **magnetic cursor orbit** microinteraction for a horizontal text nav.

## Intent
- Feel: precise instruments pulled by a soft magnet — premium site chrome
- Context: works on a dark editorial portfolio header

## Hard rules
- Each nav item has a hit radius; inside it, the label translates toward the cursor with spring damping (not linear).
- A small custom cursor / satellite dot may orbit the active item; keep it minimal — no glow spam.
- Typography stays sharp (no blur trails). Prefer a distinctive grotesque (e.g. Neue Montreal / Satoshi).
- Respect `prefers-reduced-motion`: disable magnetism, keep simple hover underline.
- Touch devices: degrade to standard hover/active states (no fake cursor).
- Performance: rAF + transforms only; no layout thrash.

## Deliver
Single `demo.html` (HTML/CSS/JS) demonstrating the nav on an atmospheric dark background. Document the spring constants in comments.
