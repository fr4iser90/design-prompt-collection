# Screen Print Ink Bleed — Extended

## Concept
A study in tactile typography. This animation captures the physical reality of screen printing on uncoated stock: the ink doesn't just sit on top; it interacts with the substrate. The visual metaphor is 'weight' and 'presence'—ink so thick and wet it defies the sharpness of digital type.

## Palette
- **Ink**: `#0F0F0F` (Rich Black, not pure black, to allow texture visibility)
- **Paper**: `#F5F2EA` (Warm Cotton, slightly yellowed)
- **Subsurface**: `#D9D4C7` (The faint tone of the paper fibers absorbing ink)
- **Accent**: `#00AEEF` (Process Cyan, used only for subtle registration marks or under-printing)

## Typography
- **Font**: A high-contrast, heavy serif (e.g., Bodoni or Didot variant). The stroke contrast must be high to show the bleeding effect clearly on thick vs. thin strokes.
- **Size**: Monumental. The letter should fill 60-80% of the viewport.

## Motion Brief
1. **Entrance**: The letter appears with a slight 'stencil' lift-off, dropping onto the paper with a subtle scale impact (0.98 → 1.0).
2. **Ambient Bleed**: Using SVG `feTurbulence` and `feDisplacementMap`, animate the `baseFrequency` or `scale` attribute to simulate the ink spreading. The edges should fuzz and soften over 3 seconds.
3. **Interaction**: On hover, the bleed reverses slightly (ink 'dries' and tightens), or accelerates the bleed effect. 
4. **Loop**: A slow breathing cycle of soft-to-sharp-to-soft.

## Technical Constraints
- **Texture**: Use a CSS `background-image` with an SVG noise pattern for the paper. Do not use bitmap images for the paper to keep it scalable.
- **Performance**: SVG filters can be expensive. Limit the filter to the text element itself. Use `will-change: filter`.
- **Accessibility**: Ensure the final state of the text remains legible despite the bleed. Provide a `prefers-reduced-motion` fallback where the text is static and sharp.

## Acceptance Criteria
- The bleed looks organic, not like a Gaussian blur.
- The paper texture interacts with the ink color (ink appears darker in textured valleys).
- Motion is smooth, 60fps on mid-range devices.
