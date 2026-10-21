## Concept
A kinetic identity loop for fictional studio 'Dot & Grain'. The animation deconstructs typography into its mechanical print components (CMYK halftone dots). Dots drift chaotically, snap to a rigid grid, assemble into letters 'D' and 'O', then explode into ink spray. The aesthetic is high-contrast screen printing: sharp edges, mechanical precision, no softness. This piece explores the tension between organic randomness and digital rigidity. The loop is designed to be seamless, creating a hypnotic effect that draws the viewer into the mechanical process of digital typography.

## Beat Sheet
- **0.0–2.0s (Drift):** 200 dots (Cyan #00AEFF, Magenta #FF005D, Yellow #FFF000) drift randomly across the 16:9 white stage. Motion is Brownian (random walk). No grid. Opacity 0.7. Dots start at random positions within the viewport bounds. Velocity is randomized but capped to prevent off-screen escape. Each dot has a unique phase offset for organic feel. The drift should feel chaotic yet contained, with dots bouncing off the edges of the viewport if they reach the boundary.
- **2.0–3.0s (Grid Reveal):** A 12px lattice grid (1px Black #000000) fades in (opacity 0 → 0.2). Dots begin to decelerate smoothly. The grid lines are crisp, no anti-aliasing artifacts preferred. The fade-in is linear to match the mechanical theme. The grid should appear as a subtle background structure, hinting at the order that is about to emerge.
- **3.0–4.0s (Snap):** Dots snap to nearest grid intersection using elastic easing. Grid opacity remains 0.2. The snap animation should feel tactile, like magnets engaging. Each dot finds its target coordinate based on a predefined pattern for the letters. The elastic easing should provide a slight overshoot and settle, giving the animation a sense of weight and physicality.
- **4.0–6.0s (Form):** Dots scale up from 2px to 12px radius. They align to form the letter 'D' (Cyan dots) and 'O' (Magenta dots) in the center. Yellow dots overlay the center of 'D' to create Black overlap via CSS `mix-blend-mode: multiply`. The letters are in Futura PT Medium, but rendered as dot clusters. The scaling is staggered slightly by dot index for a wave effect. The formation should be precise, with dots aligning perfectly to the grid intersections.
- **6.0–7.0s (Explode):** Dots shrink rapidly (12px to 0) and explode outward from the letter centers with high velocity (1000px/s). Grid fades out. The explosion vector is radial from the center of each letter. Dots fade to opacity 0 as they leave the viewport. The explosion should feel sudden and energetic, contrasting with the previous order.
- **7.0–8.0s (Lockup):** The text 'Dot & Grain' (Futura PT Medium, Black #000000, 24px) fades in at bottom center (opacity 0 → 1). Holds for 1s. Then fades out. Loop restarts. The text fade-in is smooth, contrasting the sharp dot movements. The lockup should be clean and legible, providing a clear brand identity at the end of the loop.

## Poster Frame
**Time:** 1.5s. **State:** Dots are mid-drift, no grid visible. White background. Scattered CMYK dots. Text 'Dot & Grain' is visible at bottom center (opacity 0.5). The composition feels random but balanced. This frame serves as the fallback for reduced motion users. The poster frame should be visually appealing on its own, capturing the essence of the animation in a static image.

## Palette
- **Cyan:** #00AEFF (Primary ink)
- **Magenta:** #FF005D (Secondary ink)
- **Yellow:** #FFF000 (Accent/Overlap)
- **Black:** #000000 (Text/Grid)
- **White:** #FFFFFF (Background)

## Type
- **Display:** Futura PT Medium (for 'Dot & Grain' lockup and letter forms).
- **Meta:** Space Mono Bold (for any debug info, hidden by default).
- **Letter Forms:** 'D' and 'O' are not text elements; they are clusters of dots arranged to mimic the glyph shapes of Futura PT Medium. Use a canvas or SVG path sampling to generate dot positions. The dot positions should be pre-calculated to ensure accurate letter formation.

## Frame
- **Aspect Ratio:** 16:9.
- **Stage:** Full viewport, White #FFFFFF background. Centered container with max-width 1200px.
- **Grid:** 12px lattice, 1px Black #000000 lines, opacity 0.2 (visible 2.0–6.0s). Grid is drawn on a separate layer or canvas.

## Motion
- **Drift:** Random walk (Brownian) with max velocity 50px/s. Use Perlin noise or simple random walk for smoothness.
- **Snap:** Elastic easing (cubic-bezier(0.175, 0.885, 0.32, 1.275)) over 0.5s. Implement spring physics for natural bounce.
- **Scale:** Linear interpolation (2px to 12px) over 1.0s. Scale transform origin is center of dot.
- **Explode:** Exponential ease-out (velocity decays) over 1.0s. Velocity vectors are normalized from center.
- **Blend:** `mix-blend-mode: multiply` for Yellow over Cyan/Magenta to create Black. Ensure blending context is isolated.

## Constraints
- **No Gradients:** All fills must be solid hex colors.
- **No Blur:** Use opacity for softness, not `filter: blur()`.
- **Perfect Circles:** Dots must be `border-radius: 50%`.
- **Seamless Loop:** 0.0s state must match 8.0s state (empty white stage, text hidden).
- **Performance:** Use `transform: translate()` and `scale()` for animation. Avoid layout thrashing. Batch DOM updates or use Canvas.
- **Reduced Motion:** If `prefers-reduced-motion`, show only the Poster Frame (static dots, static text).
- **Accessibility:** Ensure color contrast for text is sufficient. Provide aria-labels for interactive elements.

## Acceptance criteria
- [ ] 8s loop duration (±0.1s).
- [ ] 200 dots total (approx 66 Cyan, 66 Magenta, 66 Yellow).
- [ ] Grid visible only between 2.0s and 6.0s.
- [ ] Letters 'D' and 'O' clearly formed by dots at 5.0s.
- [ ] Yellow dots create Black overlap via multiply blend mode.
- [ ] 'Dot & Grain' text visible at 7.5s.
- [ ] Poster frame @ 1.5s shows scattered dots, no grid, text opacity 0.5.
- [ ] Click resets loop to 0.0s.
- [ ] No gradients or blur filters used.
- [ ] Layout responsive: Desktop full width, Mobile scaled.
- [ ] Single file deliverable with no external dependencies.

## Type pairing
Futura + Space Mono
