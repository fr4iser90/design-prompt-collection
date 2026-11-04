## Concept
A high-fidelity, scroll-driven optical simulation for 'Vitreous Labs', an architectural glass design studio. The experience visualizes the behavior of light passing through curved glass surfaces into water, creating dynamic caustic patterns. The user 'scrubs' the depth of a virtual water tank, altering the refraction index and the resulting light path on a concrete floor. The aesthetic is quiet luxury, saline, and precise—avoiding generic UI trends in favor of hard physics and typography.

## Scene sheet
1.  **Entrance (0.0s - 1.5s):** 
    *   Screen is dark (#0A1C28).
    *   A sharp white light ray (#FFFFFF) animates drawing from the top-left corner (0,0) to the center.
    *   At 1.5s, the ray hits a horizontal 'water line' (initially set at 50% viewport height).
    *   The beam splits: a faint reflected shimmer goes up, a strong refracted beam goes down.
    *   The brand 'VITREOUS' (Didot, white, 8vw) fades in, centered. It is partially obscured by the refracted light's glare but readable.
2.  **Scroll Phase 1: Low Tide (Scroll 0–0.2):**
    *   Water level is low (bottom 20% of screen).
    *   Light beam enters air, hits water surface near the bottom.
    *   Refraction is minimal. Caustics on the floor are sharp, distant, and web-like.
    *   Text 'VITREOUS' is fully in air, crisp and high-contrast.
3.  **Scroll Phase 2: Rising Tide (Scroll 0.2–0.8):**
    *   Water level rises smoothly.
    *   The light beam bends more aggressively (simulated Snell's law).
    *   The water color shifts from clear to saline blue (#E0F7FA) and then deeper (#8C9EA0).
    *   Caustics expand, become softer, and fill more of the lower screen. The 'concrete' texture becomes harder to see as light diffuses.
4.  **Scroll Phase 3: Submersion (Scroll 0.8–1.0):**
    *   Water level is high (top 80% of screen).
    *   The light beam is fully submerged. The path is complex and rippling.
    *   The interference pattern is dense and bright.
    *   Text 'VITREOUS' is now fully submerged. It should appear slightly distorted/refracted but remain legible, glowing with the ambient light.
5.  **Hover State:**
    *   Hovering anywhere reveals a fixed 'Depth Gauge' overlay in the bottom-right.
    *   Data updates in real-time: Depth %, Refractive Index (n), Angle of Incidence.

## Poster frame
**Time:** 1.5s (End of entrance animation, start of scroll idle).
**Visual:**
-   **Background:** Dark concrete texture (#0A1C28) visible in the top 50% (air).
-   **Water Line:** A distinct horizontal boundary at 50% height. Below is a gradient from #E0F7FA to #0A1C28.
-   **Light:** A single, sharp white beam enters from top-left (10% x, 0% y) and hits the center of the water line. It refracts downward-right at a steeper angle.
-   **Caustics:** A bright, web-like interference pattern is visible on the 'floor' (bottom 50%), centered under the refracted beam.
-   **Typography:** 'VITREOUS' in Didot, white, centered at 50% height. The middle of the text is intersected by the light beam, creating a high-contrast glare effect. The text is crisp.
-   **UI:** No UI visible.

## Palette
-   **Air/Light:** `#F4F6F8` (Used for the light ray, text, and upper atmosphere).
-   **Mid-Water:** `#8C9EA0` (Used for the bulk of the water volume, creating depth).
-   **Deep Floor:** `#0A1C28` (Used for the background texture and deep water).
-   **Caustic Highlight:** `#E0F7FA` (Used for the bright interference patterns and surface glare).

## Type
-   **Display:** 'Didot' (or similar high-contrast serif like 'Playfair Display' if Didot is unavailable, but Didot is preferred for the sharp, architectural feel). Weight: Regular or Light. Size: 8vw, tracking: -0.02em.
-   **Body/UI:** 'Work Sans' (or 'IBM Plex Mono' for the gauge). Weight: Light/Medium. Size: 14px for gauge, 12px for labels. Uppercase for gauge labels.

## Frame
-   **Aspect Ratio:** Full viewport (100vw, 100vh).
-   **Layout:** Absolute positioned layers within a relative container.
-   **Grid:** None. Free-form physics-based positioning.
-   **Texture:** A subtle noise overlay (CSS `background-image: url(data:image/svg+xml...)`) on the entire background to simulate concrete grain.

## Motion
-   **Entrance:** `clip-path` animation on the light ray SVG path to simulate drawing. Opacity fade-in on text and water surface.
-   **Scroll:** Use `requestAnimationFrame` to interpolate `waterLevel` based on scroll position. Update SVG path `d` attribute for the light ray based on water level. Update CSS `background-position` or `transform` on the caustics layer to simulate movement.
-   **Caustics:** Animate SVG `feTurbulence` `baseFrequency` using a slow sine wave (period ~5s) to create organic, rippling interference. Apply a `feDisplacementMap` to the caustics layer to distort the underlying 'floor'.
-   **Interaction:** Hover triggers a CSS class toggle for the gauge overlay (opacity/transform transition). JS updates the text content of the gauge on mousemove/scroll.

## Constraints
-   **No Libraries:** Pure HTML/CSS/JS. No Three.js, no GSAP. Use native SVG filters and CSS transitions.
-   **Performance:** Limit SVG filter complexity. Use `will-change: transform` on animated layers. Avoid layout thrashing during scroll.
-   **Accessibility:** Respect `prefers-reduced-motion`. If active, disable scroll-driven refraction and show the static Poster Frame. Ensure text contrast meets WCAG AA.
-   **No Glassmorphism:** Do not use `backdrop-filter: blur()`. The 'glass' effect must be achieved through light geometry and refraction simulation, not UI blur.
-   **No Particles:** Do not use canvas particles. All light effects must be vector/SVG or CSS gradients.

## Acceptance criteria
-   [ ] The 'VITREOUS' text is visible and readable in the Poster Frame (1.5s).
-   [ ] Scrolling changes the water level visually (gradient mask moves).
-   [ ] Scrolling changes the light ray angle (SVG path updates).
-   [ ] Caustics are visible only below the water line.
-   [ ] Hovering displays the Depth Gauge with live data.
-   [ ] No external JS libraries are loaded.
-   [ ] The color palette strictly matches the hex codes provided.
-   [ ] The font is Didot (or high-contrast serif) and Work Sans/Mono.
-   [ ] Reduced motion preference results in a static, readable poster.
-   [ ] Deliverable is a single-file HTML/CSS/JS.

## Type pairing
Didot (Display) + Work Sans (Body)
