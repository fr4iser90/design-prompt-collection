# Batik Wax Resist Flow — Extended

## Concept
Batik is a wax-resist dyeing technique, particularly associated with Indonesia and Malaysia. The process involves applying wax to cloth, dyeing the cloth, and then removing the wax to reveal the pattern. This concept gamifies the artistic process, allowing users to create complex, organic patterns through the interplay of additive wax and subtractive dye. It celebrates the imperfection of hand-craft.

## Palette
-   **Ivory**: `#fffff0` (Base fabric color)
-   **Wax**: `#daa520` (Goldenrod, semi-transparent, textured)
-   **Dye 1 (Soga Brown)**: `#8b4513` (Traditional batik brown)
-   **Dye 2 (Indigo)**: `#006400` (Deep green-blue, traditional)
-   **Dye 3 (Maroon)**: `#8b0000` (Dark red)

## Typography
-   **UI Labels**: 'Rajdhani' or 'Exo 2' (Technical, clean) for tool buttons. Small, uppercase.
-   **Title**: 'Playfair Display' (Serif) for the header, evoking the traditional art form.

## Layout
-   **Desktop**: Split screen. Left 70% is the Canvas. Right 30% is the Control Panel (Color swatches, Tool selection).
-   **Mobile**: Canvas fills screen. Bottom sheet for controls. Swipe up to reveal tools.

## Motion Brief
1.  **Wax Application**: As the user drags, the wax line should have a slight "bleed" or spread effect, simulating hot wax sinking into fabric. Jitter in the line path to mimic hand tremor.
2.  **Dye Flood**: When 'Dye' is clicked, the color spreads from the edges inward (or from click point) over 1.5 seconds. It should look like liquid soaking into paper.
3.  **Wax Removal**: 'Wash' animation shows the wax dissolving/flaking off, revealing the underlying color.

## Constraints Checklist
-   [ ] Wax must visibly resist dye.
-   [ ] Colors must mix realistically (e.g., yellow wax on blue dye = greenish, or wax prevents dye entirely).
-   [ ] No harsh pixelation; use canvas smoothing.

## Acceptance Criteria
-   The resist effect is clear and intuitive.
-   The patterns created look authentically Batik-inspired.
-   Mobile touch controls are responsive and precise.

## Variants
-   **A**: Single dye color, focus on wax pattern complexity.
-   **B**: Multi-layer dyeing, allowing for complex color mixing and over-dyeing.
