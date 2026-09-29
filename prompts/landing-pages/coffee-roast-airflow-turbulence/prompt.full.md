# Coffee Roast Airflow Turbulence — Extended Brief

**Concept:**
'Turbine & Bean' makes machines that control heat. The design must visualize the invisible: airflow and thermodynamics. It appeals to roasters who care about precision, not just taste. The aesthetic is 'Industrial Heat'—dark, energetic, and controlled.

**Art Direction:**
- **Atmosphere:** Dark, high-contrast. The background is near-black (#111111) to make the orange airflow pop. The feel is like looking at a furnace or a jet engine intake.
- **Materiality:** Matte metal and heat. UI elements look like machined aluminum (dark grey, sharp edges). The 'heat' is represented by color and speed, not blur.
- **Lighting:** Self-illuminated elements. The orange particles emit light, casting subtle glows on nearby UI elements.

**Typography:**
- **Display:** 'Archivo Black' or 'Oswald'. All-caps. Used for section titles like 'AIRFLOW CONTROL', 'TEMPERATURE CURVE'.
- **Body:** 'Roboto Mono' or 'Space Mono'. Used for data points and specs. Monospace reinforces the technical nature.

**Layout:**
- **Desktop:** Split screen. Left side is the live airflow simulation. Right side is a control panel UI (sliders, dials) that is styled but non-functional (or functionally linked to the sim if possible). The simulation bleeds slightly behind the text.
- **Mobile:** The simulation becomes a background layer. Content is stacked in high-contrast white cards with sharp corners.

**Motion Brief:**
1.  **Entrance:** The airflow starts slow (cool grey), then accelerates and heats up (turns orange) over 3 seconds.
2.  **Ambient:** Continuous particle flow. The 'roast zone' pulses gently.
3.  **Interaction:** Hovering over a 'Product' card causes the airflow behind it to constrict or change direction, showing how the machine manages heat in different modes.

**Constraints Checklist:**
- [ ] No brown/beige colors.
- [ ] No 'artisanal' hand-drawn elements.
- [ ] Performance: Use `requestAnimationFrame` and limit particle count for mobile (max 500).
- [ ] Contrast: Ensure orange text is not used on small body copy; use white/grey for text, orange only for accents/sim.

**Acceptance Criteria:**
The page feels hot and dynamic. The user understands that the product is about *control* over a volatile force (heat).
