# Kiln-Fired Glaze Sample — Extended

**Concept:**
A digital interface that rejects the abstraction of color pickers. Instead of swatches, users interact with physical artifacts: ceramic glaze samples. This grounds the digital choice in tactile reality, emphasizing the materiality of craft.

**Palette:**
- **Background:** `#2a1b14` (Dark clay, matte, absorbs light).
- **Accent/Glow:** `#d4a373` (Warm kiln light, amber, soft).
- **Text/Highlight:** `#e9edc9` (Bisque ceramic, pale, neutral).

**Typography:**
- **Display:** A high-contrast serif (e.g., Playfair Display or Cormorant Garamond) for titles, evoking traditional pottery labels.
- **Body:** A clean, humanist sans-serif (e.g., Lato or Source Sans) for specifications, kept minimal.

**Layout:**
- **Desktop:** A grid of irregular ceramic discs, arranged like they are drying on a shelf. Some overlap slightly.
- **Mobile:** A vertical scroll of larger, single tiles, emphasizing the texture of each piece.

**Motion Brief:**
1.  **Entrance:** Tiles fade in from the bottom, as if being placed on the shelf by hand.
2.  **Ambient:** A subtle, slow-moving light source pans across the scene, creating dynamic highlights on the glossy glaze surfaces.
3.  **Interaction:** 
    -   **Hover:** Tile lifts 5px on Z-axis. Shadow softens and expands. 
    -   **Click:** A "wet" ripple effect radiates from the center of the tile. The color value updates in the header with a heat-shimmer transition.

**Constraints:**
-   No flat UI elements (buttons, input fields). 
-   Glaze tiles must have visible imperfections (drips, uneven edges).
-   Lighting must be consistent with a single warm source.

**Acceptance Criteria:**
-   User can clearly distinguish between colors based on texture and lighting, not just RGB value.
-   Interaction feels heavy and physical, not snappy.
-   No standard UI kit components are visible.
