## Concept
Create a 'Baroque Gilded Framing Kit' asset studio. This is a 2D Game Kit focused on UI chrome and decorative elements. The core fantasy is 'Restoration': users interact with tarnished gold assets, polishing them to reveal their true, luxurious state. The visual style is high-fidelity Baroque, emphasizing intricate scrollwork, gold leaf materials, and deep mahogany backgrounds. This is not a pixel art kit; it is a vector-based, scalable, production-ready UI pack.

## Palette
- **Primary Gold:** #D4AF37 (Base gold), #FFD700 (Polished highlight), #8B7355 (Tarnished base)
- **Background:** #3E2723 (Deep Mahogany), #1A110D (Shadow/Depth)
- **Accent:** #FFFFFF (Text/Highlights), #5D4037 (Secondary Wood)
- **Role:** Gold is the hero material. Mahogany provides contrast and depth. White is used sparingly for text and specular highlights.

## Type
- **Display:** Cinzel (Serif, Roman-inspired, gold color). Used for pack title, asset names, and section headers.
- **Body:** Montserrat (Sans-serif, clean, white/light gray). Used for UI controls, labels, and technical details.
- **Hierarchy:** Cinzel for emotional/branding elements; Montserrat for functional/interactive elements.

## Layout
- **Header:** Pack title 'Baroque Gilded Framing Kit' in Cinzel, gold. Subtitle in Montserrat.
- **Main View:** 4x4 Grid of asset cards. Each card shows the asset in its current state (Tarnished/Polished).
- **Sidebar:** Controls for 'Toggle Tarnish', 'Export All', 'Theme Toggle'.
- **Asset Card:** Hover effect reveals polished state via radial gradient mask. Click to lock polished state. 'Copy SVG' and 'Download SVG' buttons appear on hover.
- **Footer:** Technical info, license, credits.

## Motion
- **Entrance:** Gold leaf sweep animation across the title and grid. Left-to-right gradient mask reveals assets.
- **Ambient:** Subtle light sweep across polished gold surfaces. Simulates specular reflection.
- **Interaction:** 
  - Hover: Cursor changes to 'polish' icon. Radial gradient expands from cursor, revealing polished gold.
  - Click: Locks polished state. Small ripple effect.
  - Toggle: Smooth transition between tarnished and polished states for all assets.

## Pack type
2D Game Kit (UI/Decor). Vector-based, scalable assets.

## Style bible
- **Materials:** 24k Gold Leaf (metallic, reflective, malleable), Deep Mahogany (wood grain, dark, rich), Tarnish (oxidized, dull, textured).
- **Edge Language:** Intricate scrollwork, acanthus leaves, bevels, drop shadows. No sharp, flat edges.
- **Silhouette:** Ornate, symmetrical, heavy. Assets should feel substantial and expensive.
- **Light:** Directional light from top-left. Specular highlights on gold. Ambient occlusion in crevices.

## Inventory
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

## Download
- **Format:** SVG (Scalable Vector Graphics).
- **Options:** Download individual assets, Download all as ZIP, Copy SVG code to clipboard.
- **Metadata:** Each SVG includes title, description, and license info.

## Viewer
- **Grid View:** 4x4 layout for easy browsing.
- **Preview:** Hover to see polished state. Click to lock.
- **Controls:** Toggle tarnish visibility, export options, theme toggle.
- **Poster Frame:** At 1.5s, display Hero Frame in polished state with light sweep.

## Constraints
- Single HTML file. No external dependencies except Google Fonts (Cinzel, Montserrat).
- All graphics must be inline SVG or Canvas-generated. No external images.
- SVG paths must be optimized but detailed.
- Ensure assets are visually distinct at 32px and 64px sizes.
- No stick figures, no primitive shapes, no flat Kenney-style clones.
- Code must be clean, commented, and ready for integration.

## Acceptance criteria
- [ ] Single HTML file loads without errors.
- [ ] 16 distinct assets are displayed in a 4x4 grid.
- [ ] Assets are vector-based (SVG) and scalable.
- [ ] 'Polish' interaction works: hover reveals polished state, click locks it.
- [ ] 'Toggle Tarnish' control works globally.
- [ ] 'Copy SVG' and 'Download SVG' functions work for each asset.
- [ ] 'Download All' function works.
- [ ] Visual style matches Baroque theme: gold, mahogany, scrollwork.
- [ ] No pixel art or primitive shapes.
- [ ] Type pairing (Cinzel + Montserrat) is correctly applied.
- [ ] Entrance animation (gold leaf sweep) plays on load.
- [ ] Ambient light sweep animation is visible on polished assets.
- [ ] Assets are visually distinct at small sizes (32px).
- [ ] Code is clean and commented.
