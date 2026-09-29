# Moroccan Tadelakt Polish — Extended

## Concept
Tadelakt is a waterproof lime plaster originating from Morocco, used in hammams. It is polished with river stones and treated with black soap and olive oil to become dense, glossy, and water-repellent. This concept explores the transformation from raw material to refined surface, emphasizing the tactile joy of polishing. Suitable for interior design, spa, or architectural brands.

## Palette
-   **Raw Plaster**: `#d2b48c` (Tan, sandy)
-   **Polished Tadelakt**: `#a0522d` (Sienna, deeper, richer)
-   **Green Variant**: `#8fbc8f` (Seafoam, common in traditional Tadelakt)
-   **Gloss Highlight**: `#ffffff` (Specular white)

## Typography
-   **Headings**: 'Amiri' (Serif, Arabic-inspired Latin glyphs) or 'Cormorant Infanta'. Elegant, flowing.
-   **Body**: 'Lato' or 'Open Sans'. Neutral, readable.

## Layout
-   **Desktop**: Full-screen immersive canvas. Minimal UI overlay in corners. Instructions appear as subtle, fading text.
-   **Mobile**: Full-screen. Gesture-based polishing.

## Motion Brief
1.  **Polishing**: As the 'stone' cursor moves, the texture changes in real-time. The transition should be a radial gradient centered on the cursor, fading out the roughness and increasing glossiness.
2.  **Light Reflection**: A slow, moving light source (e.g., simulated sun from top-left) creates dynamic highlights on the polished areas. Rough areas remain matte and diffuse.
3.  **Water Beading**: If water droplets are added, they should roll off polished areas with physics-based motion, but stick/spread on rough areas.

## Constraints Checklist
-   [ ] The difference between raw and polished must be immediately visible.
-   [ ] Glossiness must be dynamic (react to light/mouse).
-   [ ] No harsh edges between polished and unpolished areas (feathered transition).

## Acceptance Criteria
-   The user feels a sense of satisfaction in 'smoothing' the surface.
-   The water behavior correctly distinguishes between treated and untreated areas.
-   Performance remains smooth at 60fps during polishing.

## Variants
-   **A**: Single color (Terracotta), focus on gloss transition.
-   **B**: Multi-color zones, user polishes to reveal hidden colors underneath.
