Create a 6-second looping motion graphic titled 'The Tear Line' for the fictional brand 'Rip & Read'. The visual style is high-contrast editorial print: stark white paper background (#F4F4F4) with a subtle, high-frequency grain texture to simulate physical paper. No digital gradients or soft shadows; use hard, sharp edges. The layout must be fully responsive, adapting seamlessly from desktop widescreen to mobile vertical viewports, ensuring the central typography remains dominant and legible across all device sizes.

Core Mechanic:
1.  **Start (0.0s - 1.0s):** The screen displays the word 'SECRET' in massive, black Impact font (color #1A1A1A), centered. The paper is intact. The grain texture is static, providing a tactile base without distracting from the text.
2.  **Tear (1.0s - 2.5s):** A jagged, irregular tear line animates diagonally from top-left to bottom-right across the word. This is not a simple mask; the tear path should have 3-5 distinct 'yanks' or points of resistance, simulating the physical act of ripping paper. The tear line itself is a thin, dark shadow (#333) to give depth. The animation timing should mimic the uneven speed of a real rip, accelerating slightly at snap points.
3.  **Reveal (2.5s - 4.0s):** As the tear completes, the left half of the paper slides left, and the right half slides right, separating by about 20-30% of their width. Behind the gap, the word 'UNLOCK' appears in bold orange Georgia font (color #FF4500). The orange text should be slightly larger than the black text to create a 'bleed-through' effect, as if printed on the underside of the paper. The separation motion must use hardware-accelerated transforms for smoothness.
4.  **Reset (4.0s - 6.0s):** The halves slide back together smoothly, closing the gap and hiding 'UNLOCK'. The tear line disappears, and the paper appears whole again, resetting for the loop. The easing curve should feel natural, like paper settling back into place.

Technical Constraints:
-   Use SVG clip-paths for the tear effect to ensure crisp edges.
-   The tear path must be generated procedurally or pre-defined with irregular coordinates, not a straight line.
-   Font sizes: 'SECRET' and 'UNLOCK' must be large enough to fill 60-70% of the screen width on both desktop and mobile.
-   Background must remain static white; only the text layers move.
-   Ensure the loop is seamless: the state at 6.0s must match 0.0s exactly.
-   Add a subtle 'paper rustle' sound cue if audio is supported, but the visual must stand alone.
-   No external libraries like GSAP; use pure CSS animations and JavaScript for logic.
-   Ensure high contrast for accessibility compliance.

Deliverable: single-file HTML/CSS/JS.
