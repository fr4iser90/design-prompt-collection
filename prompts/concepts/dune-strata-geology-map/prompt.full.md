# Dune Strata Geology Map — Extended Brief

**Concept**
A minimalist, scientific visualization of desert geological layers, inspired by the stark beauty of arid landscapes. The design treats geological data as an artistic composition, using the interplay of light, shadow, and heat distortion to evoke the physical sensation of the desert.

**Palette**
- **Base:** Bone White (`#F5F2EA`) - representing sand and bleached stone.
- **Accent:** Clay Dust (`#D4C5B0`) - for subtle grid lines and inactive states.
- **Depth:** Iron Oxide (`#8C7A6B`) - for text and active states.
- **Shadow:** Soft Black (`rgba(0,0,0,0.1)`) - long, hard-edged shadows to simulate high-noon sun.

**Typography**
- **Display:** 'Cormorant Garamond' (Light weight) - Elegant, serifed, evoking old geological surveys.
- **Data:** 'IBM Plex Mono' (Regular) - Technical, precise, for depth markers and coordinates.

**Layout**
- **Desktop:** Split screen. Left 30%: Vertical list of geological eras. Right 70%: Abstract horizontal line patterns representing rock strata. The lines should have varying thickness and texture (dashed, solid, dotted).
- **Mobile:** Stacked view. The list becomes a horizontal scrollable ticker at the top. The strata visualization becomes a vertical cross-section.

**Motion**
- **Entrance:** Lines draw in from left to right with a slight elastic easing.
- **Ambient:** A very subtle, slow-moving gradient overlay (opacity 2%) simulates heat haze across the screen.
- **Interaction:** On hover, the selected strata label lifts (translateY(-2px)) and casts a longer, sharper shadow. The corresponding line-art expands slightly in width and changes color to Iron Oxide. A 'heat shimmer' filter (`feTurbulence` + `feDisplacementMap`) is applied to the hovered text.

**Constraints**
- No rounded corners. All elements must be sharp or naturally organic.
- No bright colors. Stick to the arid palette.
- Accessibility: Ensure sufficient contrast between text and background despite the muted palette.

**Acceptance Criteria**
- The page feels 'hot' and 'dry' through visual cues alone.
- Interactions are subtle but distinct.
- Performance: Heat haze effects must not cause jank.
