# Hammered Copper Pulse — Extended Brief

## Concept
This animation captures the *weight* of metal. It’s not liquid, but it’s not static. It’s the feeling of pressing into a thick, warm sheet of copper. The 'hammered' texture provides visual noise that interacts dynamically with the smooth ripples, creating a complex, tactile surface.

## Palette
- **Copper Base**: `#B87333`
- **Oxidized Shadow**: `#8B4513`
- **Bright Highlight**: `#E08D3C`
- **Specular Glint**: `#F4C430` (Gold-like, very sharp)
- **Deep Crevice**: `#2C1A14` (Almost black, warm)

## Typography
- **Font**: *Oswald* or *Bebas Neue* (Condensed, industrial, strong).
- **Weight**: Bold.
- **Color**: `#F4C430` (High contrast against copper).
- **Position**: Bottom left, small, tracking wide. Just the brand name: "COPPER & OXIDE".

## Layout
- **Desktop**: Full screen canvas.
- **Mobile**: Full screen, touch-enabled ripples.

## Motion Brief
1.  **Idle**: The copper sheet has a very slow, almost imperceptible breathing motion (subtle sine wave on vertices).
2.  **Interaction**: On mouse move, a 'dent' follows the cursor with significant lag (physics-based). On click (or periodic pulse), a radial ripple expands.
3.  **Ripple Physics**: The ripple should cause the hammered texture to 'stretch' and compress. The specular highlights should flare brightly at the peak of the ripple and dim in the trough.
4.  **Damping**: Ripples should fade out quickly (2-3s), leaving the surface to slowly return to the hammered state.

## Constraints & Acceptance
- **Materiality**: Must not look like plastic or water. Needs metallic luster.
- **Texture Persistence**: The hammered indentations must remain visible during deformation.
- **Performance**: Efficient vertex shader. Avoid high-poly counts; use normal maps for detail.
- **No Over-glow**: Highlights should be sharp, not blurry/bloomed.

## Variants
- **A**: 'Patina' variant where the copper is greenish (#5C7A65) and the highlights are dimmer.
- **B**: 'Brushed' variant where the texture is linear (brushed metal) instead of hammered, and ripples follow the grain direction.
