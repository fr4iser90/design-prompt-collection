Deliverable: single-file HTML/CSS/JS.

Build a high-fidelity editorial experience for "Chef & Vacuum," a molecular gastronomy publication. The core metaphor is a vacuum seal: the page is a sterile, airless environment where scroll tension physically compresses content against a glass plane. Reject all rustic, farmhouse, or organic warmth. This is a lab, not a kitchen.

**Visual Identity & Palette**
Use a strict tri-color palette: Deep Void (#0a0a0a) for the background, representing the vacuum; Sterile White (#e0e0e0) for primary text and structural lines; and Cyan Pulse (#00f0ff) exclusively for interactive states, data highlights, and the "seal" indicator. No gradients, no shadows, no textures. The aesthetic is clinical precision. Ensure the background remains pure black to maximize contrast with the cyan accents. The white text should feel metallic, not paper-like.

**Typography**
Use Space Mono for all body copy, metadata, and technical annotations to evoke a lab report or code terminal. Use GT America Mono (or a similar geometric monospace) for headlines and pull-quotes. Headlines must be uppercase, tight tracking (-0.05em), and aligned to a strict 12-column grid. Body text should be 14px, line-height 1.6, with generous paragraph spacing to allow the "air" to breathe before being sucked out. Ensure font loading is optimized to prevent layout shift. Use font-display: swap.

**Layout Structure**
Implement a sticky left-hand rail (20% width) displaying the "Seal Status" (a vertical progress bar that fills with Cyan Pulse as the user scrolls) and chapter markers. The main content area (80% width) is a single-column flow of long-form essays. Each section is separated by a "seal line"—a thin, glowing cyan horizontal rule that animates into existence as it enters the viewport. Images are not decorative; they are "specimens." They must be cropped to perfect squares or rectangles, bordered by 1px solid #e0e0e0, and labeled with monospace captions (e.g., "SPECIMEN 04: HYDROCOLLOID GEL"). The layout must feel rigid and engineered, with no organic irregularities.

**Motion & Physics**
1. **Entrance (The Pump Cycle):** On initial load, all content elements (text blocks, images) are slightly blurred (filter: blur(4px)) and scaled down (scale(0.95)). As the user scrolls, they snap into focus and full scale with a cubic-bezier(0.19, 1, 0.22, 1) easing, simulating the sudden pressure change of a vacuum seal. This effect should be subtle but perceptible, creating a sense of tension release.
2. **Ambient (Circulator Pulse):** The edges of the viewport (top and bottom borders) should pulse with a faint cyan glow (#00f0ff) at a steady 1Hz rhythm, mimicking the heartbeat of a sous-vide circulator. This is achieved via a CSS animation on a fixed-position border element. The glow should be soft but distinct, creating a frame around the content.
3. **Interaction (Condensation Focus):** When hovering over a paragraph or image, the background behind it should darken slightly (opacity 0.9), and the element itself should gain a sharp, 1px cyan outline. Simultaneously, apply a slight `backdrop-filter: blur(2px)` to the surrounding area to simulate air condensing around the cold surface of the element. This interaction should feel tactile and responsive.

**Content Requirements**
Include three distinct "chapters" or articles. Each must have a headline, a subhead, body text, and at least one "specimen" image placeholder. Use lorem ipsum text but format it as scientific abstracts or recipe protocols. Include a footer with "Chef & Vacuum" branding in Space Mono, small caps, and a "Seal Integrity: 100%" status indicator. The content should feel dense and informative, reflecting the seriousness of the subject matter.

**Technical Constraints**
- Use vanilla JavaScript for scroll-based animations (IntersectionObserver for entrance effects).
- CSS Grid for layout.
- No external libraries except Google Fonts.
- Ensure responsive design: on mobile, the sticky rail becomes a top bar, and the pulse effect is reduced to a simple progress bar.
- Performance: Use `will-change: transform, filter` sparingly to avoid jank. Ensure animations are GPU-accelerated.
- Accessibility: Ensure color contrast ratios meet WCAG AA standards. Provide `prefers-reduced-motion` support to disable the pulse and entrance animations.
- Mobile Layout: On screens narrower than 768px, the left rail collapses into a fixed top bar showing only the progress percentage. The main content takes up 100% width. The ambient pulse is disabled to save battery and reduce visual clutter.
