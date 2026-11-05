Build a single-file HTML Asset Studio for 'Baroque Gilded Framing Kit'. This is a 2D Game Kit (UI/Decor) containing 16 high-fidelity vector-based assets. The visual language is strict Baroque: heavy ornamentation, acanthus leaves, 24k gold leaf (#D4AF37) on deep mahogany (#3E2723) or dark parchment backgrounds. No pixel art; all assets must be scalable SVG paths with complex bezier curves for scrollwork.

**Inventory (16 Items):**
1. Hero Frame (Large, 4-corner scrollwork)
2. Modal Frame (Medium, top/bottom ornament)
3. Button Plate (Small, pill-shaped with gold trim)
4. Icon Container (Circular, laurel wreath border)
5. Divider Line (Horizontal, central medallion)
6. Corner Flourish (L-shape, standalone)
7. Title Banner (Ribbon style, gold text area)
8. Progress Bar Track (Ornate ends)
9. Progress Bar Fill (Gold gradient)
10. Tooltip Bubble (Speech tail with scrollwork)
11. Inventory Slot (Square, beveled gold edge)
12. Health Bar Frame (Heart-shaped or shield outline)
13. Menu Panel (Vertical list container)
14. Badge (Starburst or seal style)
15. Scroll End Cap (Cylindrical roll effect)
16. Background Texture Tile (Subtle damask pattern)

**Material Simulation:**
Implement a 'Tarnish' layer. Each asset has two states: Tarnished (darkened gold, #8B7355) and Polished (bright gold, #FFD700 with specular highlights). Use CSS filters or SVG masks to simulate the 'Polish' interaction. Hovering over an asset in the viewer should reveal the polished state via a radial gradient mask expanding from the cursor. Clicking locks the polished state.

**Viewer UX:**
- Layout: Grid view (4x4) for the 16 items.
- Controls: Toggle 'Show Tarnish' (default on). 'Export SVG' button per item. 'Download All' button.
- Poster Frame: At 1.5s, display the Hero Frame in polished state with a light sweep animation.
- Chrome: Use Cinzel for headers (gold text) and Montserrat for UI labels (white/light gray). Background is deep mahogany (#3E2723).

**Technical Constraints:**
- Single HTML file. No external images. All graphics are inline SVG or Canvas-generated.
- SVG paths must be optimized but detailed (min 500 points for Hero Frame).
- Use CSS variables for colors to allow theme swapping.
- Ensure assets are visually distinct at 32px and 64px sizes.
- No stick figures, no primitive shapes, no flat Kenney-style clones. Every asset must have depth via gradients and drop shadows.
- Include a 'Copy SVG' functionality for each asset.
- The 'Polish' effect must feel tactile: use a cursor change (brush icon) and a subtle sound effect placeholder (visual ripple).

**Deliverable:**
A functional asset studio where users can preview, polish, and download high-quality Baroque UI assets. The code must be clean, commented, and ready for integration into a game engine.
