## Concept
'The Yield Curve' is a 6-second motion graphics loop that visualizes agricultural success as literal physical growth. It rejects the standard 'dashboard soup' of line graphs and pie charts in favor of a single, powerful metaphor: the data bar IS the wheat stalk. The narrative arc moves from potential (seed/soil) to action (growth) to achievement (impact/target) to celebration (gold/brand). This is for 'Grain & Ledger', a fictional agri-financial consultancy.

## Beat sheet
1.  **0.0s–1.0s (The Seed):** Dark soil background (#8B5A2B). A single gold dot pulses in the center. Minimalist, quiet start.
2.  **1.0s–3.5s (The Growth):** A thick gold vertical bar grows upward from the seed. Geometric leaves unfurl left and right. The growth is rapid but eased, mimicking organic acceleration and deceleration.
3.  **3.5s–5.0s (The Impact):** The bar hits a horizontal 'Target Yield' line. A mechanical 'thud' effect (screen shake + bar compression) occurs. The number '4.2M Tons' snaps into view above the bar in bold serif type.
4.  **5.0s–6.0s (The Lockup):** The background transitions from brown to bright gold (#E6C229). The 'Grain & Ledger' logo fades in. Hold for loop.

## Poster frame
At ~1.5s (mid-growth) or ideally at ~5.0s (final hold), the frame must be readable as a static poster. The recommended poster frame is at **5.0s–5.5s**: The background is bright gold. The tall gold bar is fully grown with leaves. The text '4.2M Tons' is clearly visible in large black serif font above the bar. The 'Grain & Ledger' logo is visible at the bottom. This frame communicates the 'record high' achievement instantly.

## Palette
-   **#2C2C2C (Ink/Text):** Used for the main number '4.2M' and logo to ensure high contrast against the gold background.
-   **#E6C229 (Harvest Gold):** The primary accent color. Used for the growing bar, the seed, and the final background state.
-   **#8B5A2B (Drought Brown):** The starting background color, representing soil and drought conditions before the 'harvest'.

## Type
-   **Display:** 'EditorialSerif' (or similar high-contrast serif like Playfair Display) for the number '4.2M'. It must be bold, large, and dominant.
-   **Body:** 'DINNextW23' (or similar technical sans-serif) for the unit 'Tons' and the brand name 'Grain & Ledger'. It should be smaller, tracked out, and precise.

## Frame
-   **Aspect Ratio:** 16:9.
-   **Composition:** Centralized. The bar grows from the bottom-center axis. The text is centered above the bar. The logo is anchored at the bottom-center or bottom-left.
-   **Background:** Starts as a textured dark brown (use a subtle noise filter or SVG pattern). Ends as a flat, vibrant gold.

## Motion
-   **Seed Pulse:** Scale transform 100% -> 110% -> 100% over 1s.
-   **Bar Growth:** Height transform 0% -> 100% over 2.5s. Use `cubic-bezier(0.25, 1, 0.5, 1)` for a natural ease-out.
-   **Leaf Unfurl:** Scale X transform 0% -> 100% with a slight rotation, staggered as the bar passes their position.
-   **Thud/Shake:** At 3.5s, apply a `translate(2px, -2px)` then `translate(-2px, 2px)` then `translate(0,0)` over 100ms. Simultaneously, scale Y of the bar 100% -> 95% -> 100%.
-   **Color Shift:** Background color transition from #8B5A2B to #E6C229 over 1s starting at 5.0s.

## Constraints
-   No external JS libraries (no GSAP, no Three.js). Use CSS keyframes or SVG SMIL.
-   No dashboard UI elements (axes, grid lines, tooltips).
-   No generic 'fade-in' animations; use 'snap' or 'grow' mechanics.
-   The text must remain legible throughout the color shift.
-   The loop must be seamless (the transition from gold back to brown should be a quick cut or a very fast fade at the very end).

## Acceptance criteria
-   [ ] The background changes from brown to gold during the sequence.
-   [ ] The number '4.2M' is clearly visible and in a serif font.
-   [ ] The bar grows from the bottom center.
-   [ ] There is a visible 'shake' or 'thud' effect when the bar reaches the top.
-   [ ] The loop duration is approximately 6 seconds.
-   [ ] No purple, blue, or neon colors are used; strictly adhere to the brown/gold/black palette.
-   [ ] The 'Grain & Ledger' brand name is present in the final frame.
