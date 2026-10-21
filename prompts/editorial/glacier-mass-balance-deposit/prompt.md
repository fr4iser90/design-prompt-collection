Build a single-file HTML/CSS/JS editorial data-story experience titled "Mass Balance Ledger" for the imprint "Cryo-Chronicle". The core mechanic visualizes annual glacier mass balance as physical stratified sediment layers accumulating vertically on a canvas.

**Visual Identity & Palette:**
Use a deep, cold palette. Background: #1a2332 (Deep Ice Shadow). Primary Data/Positive Mass: #48cae4 (Glacial Blue). Secondary Data/Negative Mass: #e63946 (Meltwater Red, added for contrast against the blue/white scheme to signify loss). Text/Ink: #f1faee (Snow White). Accent/Metadata: #90e0ef (Pale Ice). 
Typography must be expressive and editorial. Use 'Cormorant Garamond' for all headings, pull-quotes, and narrative text to evoke a scientific journal or annual report. Use 'IBM Plex Mono' for all data labels, years, and numerical values to ensure legibility and a technical feel. Do not use Inter, Roboto, or system fonts. The brand "Cryo-Chronicle" should appear as a sticky header or masthead in Cormorant Garamond, small-caps, tracking wide.

**Layout Structure:**
The page is a vertical scroll narrative. 
1. **Hero Section:** A large, centered title "Mass Balance Ledger" in Cormorant Garamond. Below it, a brief intro paragraph in IBM Plex Mono. The background is the deep #1a2332 with a subtle, static noise texture to mimic paper or ice grain.
2. **The Data Canvas:** A fixed or sticky central column (approx 60% width on desktop, 90% on mobile) where the visualization happens. This is the "Ledger".
3. **Narrative Blocks:** As the user scrolls, text blocks appear to the left or right of the canvas, explaining specific years or trends. These blocks should fade in/out based on scroll position.
4. **Cumulative Meter:** A thin vertical line on the right edge of the canvas container that tracks the cumulative mass balance. It grows upward with positive years and shrinks/carves downward with negative years.

**Core Mechanic: The Sediment Stack:**
Implement a HTML5 Canvas element that renders the "Ledger". 
- **Bedrock:** At the start of the scroll, a thick horizontal bar (the bedrock) slides up from the bottom of the canvas viewport. It should have a subtle mineral texture (procedurally generated noise or a simple pattern).
- **Layering:** As the user scrolls past specific scroll triggers (one per year of data), a new layer is added to the stack.
- **Positive Mass (Growth):** If the data value is positive, a new layer of #48cae4 grows upward from the top of the previous layer. The height of the layer is proportional to the magnitude of the mass balance. The edge of the new layer should not be perfectly straight; add slight irregularity to mimic natural sediment deposition.
- **Negative Mass (Erosion):** If the data value is negative, a layer of #e63946 grows downward from the top of the previous layer, effectively "carving" into the existing blue layers. This should look like erosion or melting. Use a dissolve effect or a jagged edge to simulate the carving. The red layer represents the loss of ice.
- **Ambient Motion:** Overlay a particle system on the canvas. Slow, irregular "meltwater" particles (small, semi-transparent white/blue dots) drip down the surface of the current top layer. They should leave faint, temporary dark streaks that fade out, simulating water running over ice.

**Interaction & Scroll Logic:**
- Use `IntersectionObserver` or scroll event listeners to detect when a specific year's narrative block enters the viewport.
- When a year is active, animate the corresponding layer's height from 0 to its final value over ~1 second. Use an easing function (ease-out) for natural movement.
- The cumulative meter on the right should update in real-time as layers are added/removed.
- Hovering over a specific layer should display a tooltip with the exact year and mass balance value in IBM Plex Mono.

**Technical Constraints:**
- Deliverable: single-file HTML/CSS/JS.
- Use vanilla JavaScript. No external libraries except Google Fonts.
- The canvas must be responsive. Recalculate dimensions on window resize.
- Ensure text is selectable and accessible. The canvas is decorative/visual; the data must also be present in the DOM for screen readers (e.g., in the narrative blocks or a hidden table).
- Performance: Optimize the canvas rendering loop. Only redraw when necessary (scroll, animation, resize). Use `requestAnimationFrame`.
- Avoid "dashboard soup". This is an editorial piece, not a SaaS dashboard. The focus is on the narrative of the data, not on filtering or complex controls.
- The "carve" effect for negative mass must be visually distinct from the "grow" effect for positive mass. The red should feel destructive, the blue constructive.

**Content Data:**
Include a hardcoded array of data for 10-15 years of glacier mass balance. Example structure:
`[{ year: 2010, balance: 0.4 }, { year: 2011, balance: -0.2 }, ...]`
Ensure the narrative text references these specific years and values.

**Anti-Cliche Checks:**
- No standard bar charts. The bars must look like physical layers.
- No purple gradients or glow effects.
- No generic "read more" buttons. The scroll itself is the interaction.
- No dense multi-column newspaper layout. Keep it airy and focused on the vertical rhythm.
