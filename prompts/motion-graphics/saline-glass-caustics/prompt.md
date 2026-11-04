Build a full-bleed, scroll-driven hero-kinetic experience for 'Vitreous Labs' using HTML, CSS, and SVG. The core mechanic is a 'depth-scrub' where scrolling down raises a simulated water level across the screen, altering the path of a light ray and the resulting caustic patterns.

**Visual Style:** Quiet luxury, architectural precision. Background is a dark, textured concrete plane (#0A1C28). Above the water line is clear air (#F4F6F8). The light source is a sharp, singular white ray (#FFFFFF) entering from the top-left. The brand name 'VITREOUS' is set in Didot, large, centered, and interacts physically with the light (refracted/blurred when submerged, sharp when in air).

**Technical Implementation:**
1.  **Layering:** Use absolute positioning for distinct layers: Background (concrete texture), Light Ray (SVG path with glow), Water Surface (gradient overlay with opacity), Caustics (SVG filter turbulence on the lower half), and Text Layer.
2.  **Scroll Logic:** Map `window.scrollY` to a `waterLevel` variable (0.0 to 1.0). 
    *   0.0–0.2: Low water. Beam is thin, caustics are distant/sharp. Text is sharp in air.
    *   0.2–0.8: Water rises. Beam bends (change SVG path `d` attribute based on Snell's law approximation). Caustics expand and brighten.
    *   0.8–1.0: High water. Beam is fully submerged. Complex interference patterns. Text 'VITREOUS' becomes fully clear and legible against the deep blue.
3.  **Caustics:** Use an SVG `<filter>` with `<feTurbulence>` and `<feDisplacementMap>` to simulate light interference. Animate the `baseFrequency` or `seed` slightly over time for organic movement. Mask this filter to only appear below the water line.
4.  **Poster Frame (1.5s):** At load, before scroll, animate the entrance: The light ray draws in from top-left, hits the initial water line (set at 50% height for the poster), and splits. Capture this state: Sharp beam, clear 'VITREOUS' text, distinct air/water boundary.
5.  **Interaction:** On hover over the center, display a fixed-position 'Depth Gauge' in Work Sans monospace. Show: `DEPTH: [scroll %]`, `REFRACTIVE INDEX: [calculated value]`, `BEAM ANGLE: [deg]`.

**Layout & Responsiveness:**
-   **Desktop:** Full viewport height (100vh) sticky container. Scroll height is 300vh to allow smooth scrubbing.
-   **Mobile:** Reduce text size to 12vw. Simplify SVG filters for performance. Ensure touch scrolling maps correctly to water level.

**Constraints:**
-   Do NOT use generic glassmorphism (blur). Use hard geometry and light physics.
-   Do NOT use particle systems. Use SVG paths and filters.
-   Ensure reduced-motion respects a static poster state.
-   Colors: Strictly #F4F6F8 (Air/Light), #8C9EA0 (Mid-tone Water), #0A1C28 (Deep Floor), #E0F7FA (Caustic Highlight).
-   Type: Didot for 'VITREOUS', Work Sans for UI/Overlay.

**Acceptance Criteria:**
-   Text is legible in all states.
-   Light ray angle changes dynamically with scroll.
-   Caustics are masked correctly.
-   No external libraries.

Deliverable: single-file HTML/CSS/JS.
