Deliverable: single-file HTML/CSS/JS.

Build a high-fidelity editorial interface for a culinary publication named "Mise en Place." The core metaphor is a professionally starched linen napkin, not crumpled paper. The layout must feel crisp, geometric, and tactile, avoiding rustic farmhouse clichés in favor of chef precision.

**Visual Identity & Palette:**
Use a strict three-color palette: Background `#f5f5f0` (warm off-white linen), Ink `#2c2c2c` (charcoal text), and Accent `#a89f91` (taupe/stone for creases and UI elements). Typography must pair `Playfair Display` (serif, for headlines and pull-quotes) with `Work Sans` (sans-serif, for body text and metadata). Do not use Inter, Roboto, or system fonts. The aesthetic is clean, airy, and structured, reminiscent of a high-end restaurant menu or a culinary textbook.

**Layout Structure:**
The page is structured as a vertical stack of "folds." Each major section (e.g., "Appetizers," "Mains," "Desserts") is represented as a folded panel. 
1. **Hero Section:** A full-viewport introduction featuring the brand name "Mise en Place" in large Playfair Display. The background should have a subtle, high-quality linen texture (CSS gradient or SVG noise) to establish materiality.
2. **The Fold Mechanism:** Below the hero, content is divided into horizontal bands. Each band represents a chapter. The dividers between bands are "creases"—thin, sharp lines in `#a89f91` that suggest a fold.
3. **Content Density:** Within each unfolded section, use a clean, spacious grid. Avoid dense newspaper columns. Use large margins and generous line-height (1.6–1.8) for readability. Include high-quality placeholder images of food preparation (steam, steel, hands) with a slight desaturation to match the palette.

**Interactions & Motion:**
1. **Entrance Animation:** On load, the hero section should animate as if unfolding diagonally. Use CSS `clip-path` or `transform: rotateX` with `perspective` to simulate the cloth opening. The text should fade in with a slight upward drift.
2. **Ambient Motion:** The edges of the content containers should have a very subtle, slow "ripple" effect. This can be achieved with a CSS animation on `box-shadow` or a slight `transform: skew` oscillation to mimic fabric weight in a draft. Keep it subtle (opacity 0.1–0.3) to avoid distraction.
3. **Accordion Folds:** Clicking a "crease" line (the divider between sections) should expand the section below it. 
   - **Mechanic:** Use JavaScript to toggle a class that changes the `height` or `max-height` of the content container.
   - **Visual Feedback:** As the section expands, the "crease" line should thicken slightly or change color to `#2c2c2c` to indicate active state. The content should slide down smoothly (cubic-bezier easing) to mimic the physical unfolding of cloth.
   - **Push Effect:** If multiple sections are open, they should push each other down naturally (standard document flow), but the animation should feel weighted, not instantaneous.

**Technical Constraints:**
- **Single File:** All HTML, CSS, and JS must be in one file.
- **No Libraries:** Use vanilla JS and CSS. No React, Vue, or heavy animation libraries like GSAP (unless embedded via CDN, but vanilla is preferred for performance).
- **Responsive:** The fold mechanism must work on mobile. On smaller screens, the "horizontal push" effect may need to be simplified to a vertical accordion, but the visual metaphor of the crease must remain.
- **Performance:** Ensure animations are GPU-accelerated (use `transform` and `opacity` only). Avoid layout thrashing during the unfold animation.
- **Accessibility:** Ensure all interactive creases are keyboard accessible (tabindex, enter/space to toggle). Use ARIA attributes for expanded/collapsed states.

**Content Guidelines:**
- Use realistic culinary content. Headlines like "The Art of the Reduction," "Knife Skills," "Seasonal Produce."
- Body text should be lorem ipsum or short, meaningful culinary excerpts.
- Include a "Chef's Note" pull-quote style in each section, using Playfair Display italic.

**Anti-Patterns to Avoid:**
- No rustic wood textures.
- No warm, muddy earth tones beyond the specified palette.
- No dense, multi-column newspaper layouts.
- No heavy shadows or 3D effects that look like plastic.
- No emoji or icons that break the typographic purity.

**Implementation Details:**
- Use CSS variables for colors and spacing.
- Structure the HTML semantically: `<main>`, `<section>`, `<article>`.
- The "crease" elements should be `<button>` or `<div role="button">` for accessibility.
- Add a subtle hover state to the creases: cursor changes to `pointer`, and the line color shifts slightly.
- Ensure the linen background texture is subtle enough not to interfere with text readability.
