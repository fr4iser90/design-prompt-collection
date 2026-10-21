## Concept
'The Tear Line' is a kinetic typography piece that uses the physical metaphor of tearing paper to reveal hidden meaning. It contrasts the secrecy of the surface ('SECRET') with the truth revealed underneath ('UNLOCK'). The design language is brutalist print design: high contrast, monumental type, and tactile textures. The brand 'Rip & Read' is implied through the action, not a logo. The experience must be immersive, drawing the viewer into the physicality of the tear.

## Beat sheet
-   **0.0s - 1.0s (The Lock):** Static shot. Word 'SECRET' in black Impact (#1A1A1A) centered on white paper (#F4F4F4). Paper texture is visible but subtle. No movement. The composition is balanced and calm, setting the stage for the disruption.
-   **1.0s - 2.5s (The Rip):** A jagged tear path animates diagonally. The path is not smooth; it has 4 distinct 'snaps' or irregularities. A thin shadow line (#333) traces the tear to simulate depth. The tear starts at the top-left edge and ends at the bottom-right edge. The motion should feel forceful and abrupt.
-   **2.5s - 4.0s (The Reveal):** The paper splits into two halves. The left half translates -20% on the X-axis; the right half translates +20% on the X-axis. As they separate, the word 'UNLOCK' in orange Georgia (#FF4500) is revealed in the gap. The orange text is slightly larger and bolder, appearing as if printed on the back of the paper. The reveal should feel rewarding.
-   **4.0s - 6.0s (The Reset):** The halves slide back together with a slight ease-in-out. The tear line fades out as the paper closes. The state returns to the initial 'SECRET' view. The reset should be smooth and unobtrusive, preparing for the next loop.

## Poster frame
**Timestamp:** ~1.5s (Mid-tear).
**Visual:** The word 'SECRET' is partially torn. The tear line is visible at 40% completion, running diagonally. The left half of the 'S' is slightly shifted left, revealing a sliver of orange (#FF4500) behind the black ink. The tension of the tear is palpable; the paper fibers at the tear edge are slightly frayed (simulated with small SVG path irregularities). The composition is centered, with the tear line cutting through the vertical center of the screen. This frame should be visually striking and suitable for social media sharing.

## Palette
-   **Background:** #F4F4F4 (Off-white paper)
-   **Ink (Front Text):** #1A1A1A (Near-black)
-   **Reveal (Back Text):** #FF4500 (Vibrant Orange)
-   **Tear Shadow:** #333333 (Dark grey for depth)

## Type
-   **Primary Font:** Impact (or a similar condensed sans-serif with heavy weight). Used for 'SECRET'. Must be uppercase.
-   **Secondary Font:** Georgia (or a similar serif with strong contrast). Used for 'UNLOCK'. Must be uppercase and bold.
-   **Size:** Text must occupy 60-70% of the viewport width. Kerning should be tight for Impact to create a solid block of ink. On mobile, ensure the text does not wrap and remains within safe margins.

## Frame
-   **Aspect Ratio:** 16:9 (Desktop), 9:16 (Mobile)
-   **Resolution:** 1920x1080 (Desktop), 1080x1920 (Mobile)
-   **Composition:** Centered. The tear line runs diagonally from top-left to bottom-right, intersecting the center of the screen. On mobile, the diagonal may adjust to maintain visual balance.
-   **Texture:** A subtle SVG noise filter or CSS background-image with a high-frequency grain pattern to simulate paper. The grain should be static and non-distracting.

## Motion
-   **Tear Path:** Use an SVG `<path>` with `d` attribute defining a jagged line. Animate the `stroke-dashoffset` or use a clip-path animation to reveal the tear. The path should be complex enough to look organic.
-   **Separation:** CSS `transform: translateX()` on the two halves. Use `cubic-bezier(0.25, 0.1, 0.25, 1)` for a natural physical feel. Ensure GPU acceleration via `translate3d`.
-   **Reveal:** The orange text is static in position but masked by the closing halves. As the halves move apart, the mask opens, revealing the text. The reveal should be gradual and satisfying.
-   **Easing:** The tear animation should have a slight 'acceleration' at the snap points to mimic the physical resistance of paper. The reset should be slower and more controlled.

## Constraints
-   **No Blurs:** All edges must be sharp. No Gaussian blurs or soft shadows except for the thin tear line.
-   **No Gradients:** Solid colors only. The paper texture is the only variation.
-   **Seamless Loop:** The end state must be identical to the start state. No visible jump or glitch.
-   **Performance:** Use hardware-accelerated transforms (`translate3d`) for the sliding halves. Optimize SVG paths for rendering speed.
-   **Accessibility:** Ensure high contrast between text and background. Provide alt text for the visual content if applicable in a web context.
-   **Responsiveness:** The layout must adapt to different screen sizes without breaking the tear effect or text legibility.

## Acceptance criteria
-   [ ] The tear line is jagged, not straight.
-   [ ] The orange text 'UNLOCK' is only visible when the paper is torn apart.
-   [ ] The font pairing is Impact and Georgia (or close equivalents).
-   [ ] The loop duration is exactly 6 seconds.
-   [ ] The poster frame at 1.5s shows the tear in progress.
-   [ ] No external libraries (like GSAP) are required; pure CSS/SVG/JS is preferred.
-   [ ] The paper texture is visible but does not obscure the text.
-   [ ] The animation runs smoothly at 60fps on desktop and mobile devices.
-   [ ] The layout is responsive and maintains integrity across viewports.

Deliverable: single-file HTML/CSS/JS.

## Type pairing
Impact + Georgia
