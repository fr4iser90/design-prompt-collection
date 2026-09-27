# Obsidian Loom Mask Reveal — Extended
Concept: Obsidian Loom is a modular furniture brand using woven metal and smoked glass. The reveal is editorial, not card based: a dark band lifts to expose a crafted product moment.
Palette: near-black canvas #09090B, graphite reveal band #1D1D20, acid lime accent #D6FF57 for thin rules and cursor trace.
Type pairing: Editorial New for the headline, Söhne Mono for captions and measurements.
Layout desktop: full-bleed section, headline Woven Forms split into seven horizontal strips, product image sits behind the strips, left-aligned captions appear after reveal.
Layout mobile: headline splits into five strips, reveal triggered by scroll or tap, captions stack below the image.
Motion brief: entrance: image scales from 1.08 to 1.02 over 900ms, strips reveal bottom to top with 70ms stagger. Ambient: grain overlay and soft vignette breathe at 4% opacity. Interaction: cursor draws a thin lime trace and slightly displaces nearby strips.
Constraints: use clip-path or SVG mask, no purple glow, no cream terracotta, no hero cards, preserve typography spacing during reveal.
Acceptance criteria: reveal feels like fabric unrolling, not fade-in; image remains sharp; text is never clipped; reduced-motion shows final composition.
Variants A/B: A uses horizontal clip-path strips; B uses SVG path mask with woven notch edges.
