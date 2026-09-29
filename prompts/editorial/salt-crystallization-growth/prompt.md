Build a high-fidelity editorial landing page for 'Saline Press', a culinary preservation zine. The design must reject rustic farmhouse aesthetics in favor of industrial precision, steel, and linen textures. Use a strict monochrome palette: Background #F2F2F2 (linen white), Ink #1C1C1C (deep steel), Accent #9CA3AF (oxidized silver). Typography must pair Söhne Mono (for metadata, captions, and structural elements) with Canela Text (for primary reading body). Do not use Inter, Roboto, or system fonts.

Layout Structure:
1. Hero Section: Full viewport height. Centered title 'CURE' in massive Canela Text. The title must not fade in. Instead, implement a 'shatter-reassemble' animation where individual characters start as scattered geometric fragments (triangles/rectangles) and snap into their final kerned positions with a sharp, mechanical ease-out (cubic-bezier(0.19, 1, 0.22, 1)). Background features a subtle, slow-moving noise texture resembling damp concrete. On mobile, the hero title scales down to 15vw to maintain impact without overflow.
2. Reading Flow: A single-column, long-form essay layout. Max-width 65ch. Generous whitespace (2rem line height, 1.5rem paragraph spacing). No multi-column broadsheet grid. Use a sticky left rail for chapter navigation, styled with Söhne Mono, small caps, and thin rules. On mobile (<768px), this rail collapses into a sticky top bar with horizontal scroll capability for chapter links.
3. The 'Growth' Mechanic: Body text paragraphs must not simply appear. Implement a Canvas-based or SVG-based overlay that simulates crystallization. Text starts invisible. A 'seed' point initiates a jagged, outward expansion animation where characters pop into existence with a slight jitter, locking into a rigid grid alignment. This mimics salt crystals forming on a damp surface. The animation should be slow and deliberate (1.5s duration per paragraph), using a step-based easing function to feel geological rather than fluid. On mobile, reduce granularity to word-level animation to preserve performance.
4. Interactive Lexicon: Specific culinary terms (e.g., 'brine', 'cure', 'lactic') within the text are marked as keywords. On hover, the visible text character must 'flake' away (opacity 0, slight y-shift) revealing a tooltip underneath. The tooltip is a small, sharp-edged box with Söhne Mono text, background #1C1C1C, text #F2F2F2. The transition is instantaneous, no fade. Ensure tooltips do not overflow viewport edges on mobile by calculating position dynamically.

Technical Constraints:
- Use CSS Grid for layout.
- Implement the crystallization effect using a custom JS animation loop or Framer Motion with precise keyframes for character-by-character appearance.
- Ensure high contrast ratios for accessibility.
- No rounded corners on UI elements (buttons, tooltips, images). Use sharp 0px borders.
- Images should be treated as archival prints: grayscale, slight grain, no soft shadows.
- Mobile responsive: The sticky rail collapses into a top bar. The crystallization animation simplifies to a faster, less granular effect to preserve performance.

Visual Tone:
Cold, precise, scientific yet tactile. Think lab notes meets high-end fashion editorial. Avoid any warm earth tones, terracotta, or cream. The 'linen' is grey-white, not beige. The 'steel' is matte, not reflective chrome. The motion is structural, not decorative.

Deliverable: single-file HTML/CSS/JS.
