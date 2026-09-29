# Cutout Collage Layer Shift — Extended

## Concept
Inspired by Dadaist and Matisse paper cutouts. This animation explores the depth of flat materials. By sliding physical-looking layers against each other, we create a sense of space and discovery without 3D rendering. It feels like flipping through a scrapbook or rearranging a magazine layout in real-time.

## Palette
- **Background**: `#2C2C2C` (Charcoal, provides high contrast for paper)
- **Paper 1**: `#E63946` (Vibrant Red)
- **Paper 2**: `#A8DADC` (Soft Teal)
- **Paper 3**: `#F1FAEE` (Off-White)
- **Accent/Text**: `#1D3557` (Deep Navy, for text revealed on base layer)

## Typography
- **Font**: A bold, sans-serif display face (e.g., Anton or Impact variant). Text should be 'printed' on the base layer or one of the cutouts.
- **Treatment**: Text can be partially obscured by the moving layers, creating a 'whack-a-mole' reading experience.

## Layout & Composition
- **Desktop**: Wide aspect ratio. Layers should overlap significantly in the center, creating a focal point of chaos that resolves into clarity when aligned.
- **Mobile**: Stack the layers vertically with vertical parallax movement instead of horizontal, to fit the narrower viewport.

## Motion Brief
1. **Entrance**: Layers fly in from off-screen edges, settling into their starting positions with a slight 'bounce' (elastic easing).
2. **Ambient**: Continuous horizontal drift. The speeds should be relatively prime (e.g., 1x, 1.618x, 0.5x) to prevent perfect repetition too quickly.
3. **Interaction**: Mouse movement tilts the entire stack slightly (perspective transform), enhancing the 3D feel of the flat layers.
4. **Sound**: Subtle 'rustle' of paper on hover or click (optional, but adds tactility).

## Technical Constraints
- **Shadows**: Use `box-shadow` or `filter: drop-shadow` to separate layers. The shadow direction must remain consistent (e.g., top-left light source).
- **Edges**: Avoid standard rounded corners. Use `clip-path: polygon(...)` with many points to simulate jagged, hand-cut edges.
- **Performance**: Use `transform: translate3d()` for motion. Do not animate `left/top`.

## Acceptance Criteria
- The 'cut' edges look convincing, not pixelated or aliased.
- The parallax effect clearly communicates depth.
- The color contrast is high and print-ready (CMYK friendly).
