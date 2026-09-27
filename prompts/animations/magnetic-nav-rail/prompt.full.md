# Magnetic Nav Rail — Extended
Concept: Vector Harbor is a marine logistics dashboard with a side rail that feels physically attracted to the pointer. The rail is the brand hero: quiet navy architecture, amber signal, and elastic magnetism.
Palette: deep harbor navy #0A1016 for canvas, graphite panel #13212B for rail surface, amber #E8C468 for active state and magnetic ring.
Type pairing: Space Grotesk for rail labels, IBM Plex Mono for tooltip coordinates and tiny metrics.
Layout desktop: fixed 96px vertical rail on left, six icon-label pairs, expanded 240px label drawer on hover, tooltip follows pointer with 16px offset.
Layout mobile: bottom navigation with six compact buttons, magnetic effect becomes scale and glow, no pointer tracking.
Motion brief: entrance: rail fades and slides 18px from left, items stagger 50ms. Ambient: pointer proximity creates a soft amber field, active capsule slides with spring easing. Interaction: items lean toward cursor, scale 1.06, stretch 1.04 horizontally, click snaps to active and emits a 180ms pulse.
Constraints: no purple glow, no framework, accessible aria-current, reduced-motion fallback, 60fps transform/opacity only.
Acceptance criteria: motion feels magnetic but not sticky; labels remain legible; active state is clear without color alone; demo runs in one HTML file.
Variants A/B: A uses sliding capsule underline; B uses magnetic border ring that collapses on click.
