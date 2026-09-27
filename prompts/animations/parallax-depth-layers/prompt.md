# Parallax Depth Layers

Build a **three-plane parallax** section that tells a landscape story on scroll.

## Intent
- Depth for a travel / outdoor / architecture concept page
- Mood: misty canopy — green ink, soft fog

## Hard rules
- Exactly three layers (far / mid / near) with distinct scroll rates; near may include a foreground silhouette.
- Use `transform: translate3d` + `will-change` sparingly; clamp parallax on mobile or reduce to two planes.
- Atmospheric fog gradient between layers (CSS), not seven nested cards.
- Typography overlay: one brand wordmark + one short line — brand first.
- `prefers-reduced-motion`: static composed frame, no scroll-linked motion.
- No scroll-jacking; native scroll only.

## Deliver
`demo.html` ~150–200vh tall with the parallax block and a quiet following section so scroll context exists.
