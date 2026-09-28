# Magnetic Morph Wordmark

**Concept**: A premium brand interaction where typography exhibits magnetic properties. The wordmark is stable but reactive, suggesting flexibility and strength.

**Visual Rules**:
1.  **Base State**: A bold, custom SVG wordmark (e.g., "FLUX") in black (#111111) on off-white (#f0f0f0).
2.  **Magnetic Field**:
    *   When the cursor enters the bounding box of a letter, that letter (and its immediate neighbors) distorts toward the cursor position.
    *   **Center Letter**: Moves 40% of the distance to the cursor.
    *   **Adjacent Letters**: Move 20% of the distance.
    *   **Distant Letters**: Remain static.
3.  **Morphing**: The SVG paths should not just translate; they should *skew* or *scale* slightly to indicate tension. Use `transform: translate(x, y) skew(x, y)`.
4.  **Snap Back**: On mouse leave, use a spring easing function (e.g., `cubic-bezier(0.175, 0.885, 0.32, 1.275)`) to return to original position.
5.  **Accent**: A thin blue (#0055ff) underline traces the path of the cursor movement, fading out quickly.

**Deliverable**: HTML/CSS/JS. Use SVG for the wordmark to allow path manipulation if needed, or CSS transforms on individual `<span>` elements.
