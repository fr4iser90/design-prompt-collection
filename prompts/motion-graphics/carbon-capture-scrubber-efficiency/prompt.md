Create an 8-second looping motion-graphics explainer for 'GreenStack' illustrating flue gas scrubbing efficiency. The visual style is hard industrial geometry, strictly avoiding organic clichés like leaves, trees, or soft nature motifs. Use a 16:9 aspect ratio. The background is #1B262C (Deep Charcoal). Text is #EDF5F1 (Off-White) using Archivo for headings and IBM Plex Mono for data. The primary structural elements are #0F4C5C (Deep Teal) for the scrubber tower cross-section and #3282B8 (Bright Cyan) for the CO2 molecules and solvent droplets. The layout must be responsive: on desktop, the tower is centered with ample negative space; on mobile, the tower scales down while maintaining legible text overlays in the corners. Ensure mobile viewports adjust text size to prevent overflow and maintain WCAG AA contrast ratios against the dark background.

**Beat Sheet:**
1. **0.0s–1.5s (Problem):** A cross-section of an industrial scrubber tower appears. Dark, thick smoke labeled 'CO2-RICH FLUE GAS' enters from a pipe on the left, rising turbulently into the tower. Text overlay: 'PROBLEM: EMISSIONS'.
2. **1.5s–4.0s (Mechanism):** Solvent mist (#3282B8, semi-transparent) sprays from nozzles at the top, cascading down. Individual CO2 molecules (small cyan dots) collide with the solvent droplets. Upon collision, the molecules are visually 'captured' (color shift to solid #0F4C5C or merge into the droplet). Text overlay: 'MECHANISM: SOLVENT BINDING'.
3. **4.0s–6.0s (Payoff):** The air exiting the top of the tower is now clear/white (#EDF5F1), labeled 'CLEAN AIR'. The bottom drain shows dark liquid (captured CO2) flowing out. Text overlay: 'PAYOFF: 99% CAPTURE'.
4. **6.0s–8.0s (Lockup):** The scene fades to a clean poster state. The GreenStack logo (stylized stack of three geometric rectangles) appears centrally with the text 'GreenStack | 99% Capture Efficiency' in Archivo Bold. The background settles into a solid #1B262C with a subtle grid.

**Technical Constraints:**
- Use CSS animations or SVG SMIL for the particle collision logic. Do not use heavy WebGL unless necessary for particle count; a simplified 2D SVG/Canvas approach is preferred for crispness.
- The 'poster frame' at 1.5s must be legible: The tower outline and entering smoke must be clear.
- Avoid decorative noise. All motion must serve the explanation of the process.
- Ensure high contrast between the smoke (dark grey/black) and the background, and between the solvent/molecules (cyan) and the background.
- The loop must be seamless or have a clear reset transition at 8.0s.
- **Deliverable:** single-file HTML/CSS/JS.
