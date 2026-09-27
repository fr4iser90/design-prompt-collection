# Axiom Foundry Logo Morph — Extended
Concept: Axiom Foundry is a precision hardware studio whose identity must collapse from a circular monogram into a confident wordmark. The motion should feel machined, warm, and premium.
Palette: forest ink background #0C1B16, deeper panel #17352B, molten gold accent #C9A227 for stroke and light sweep.
Type pairing: PP Neue Montreal for the wordmark, IBM Plex Sans for supporting UI text, both rendered as SVG outlines.
Layout desktop: centered logo stage, 16:9 safe area, subtle grid and registration marks. Mobile: logo scales to 72% of viewport width with reduced particle density.
Motion brief: entrance: gold stroke draws the circular monogram over 800ms. Ambient: dust particles drift upward and the logo breathes at 0.4% scale. Interaction: on click or autoplay, the circle collapses, letter counters open, and the wordmark AXIOM forms with a metallic light sweep across the paths.
Constraints: morph must remain crisp, use path interpolation or transform-based approximation, avoid purple glow, no cream terracotta, no blurry text, accessible reduced-motion shows final wordmark.
Acceptance criteria: the morph reads as one continuous transformation, not two crossfaded logos; the gold sweep highlights geometry; timing is under 3 seconds.
Variants A/B: A uses true SVG path morph; B uses layered letter masks and stroke draw for broader browser support.
