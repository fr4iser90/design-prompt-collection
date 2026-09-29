# Swiss Poster Grid Reconstruction — Extended

**Concept:**
A digital homage to the Zurich School of Design in the 1950s. The design rejects ornamentation in favor of objective communication and mathematical precision. It feels like a living poster.

**Art Direction:**
- **Palette:** Monochrome black and white, punctuated by a single, vibrant red (#ff0000). This red is used for emphasis, geometric shapes, and CTA buttons.
- **Typography:** Sans-serif only. 'Helvetica Neue' or 'Inter' with tight tracking for headlines. Body text is justified or ragged-right, strictly adhering to grid baselines.
- **Imagery:** Abstract geometric compositions. If photos are used, they are black and white, high-contrast, and cropped into strict geometric frames (circles, squares).

**Layout:**
- **Hero:** A massive red circle or triangle overlapping a block of black text. The layout is dynamic but mathematically balanced.
- **Services/Work:** Presented in a strict grid. Each item is a cell in the grid, separated by hairline rules.
- **Navigation:** Minimalist. A fixed left-side vertical menu or a top bar with just text links.

**Motion Brief:**
- **Entrance:** 'Grid Fill' animation. Elements fly in from outside the viewport and snap into their grid coordinates with a slight overshoot (elastic ease-out).
- **Interaction:** Hovering over a grid cell inverts the colors (black background, white text) or swaps the red accent to black.
- **Ambient:** Subtle, slow rotation of large geometric background shapes to provide depth without breaking the flat aesthetic.

**Technical Notes:**
- Use CSS Grid with `gap` to create the visible rules.
- Use `clip-path` for geometric image cropping.
- Ensure typography scales fluidly but maintains grid alignment on resize.
