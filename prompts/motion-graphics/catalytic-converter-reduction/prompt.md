Deliverable: single-file HTML/CSS/JS. Build a high-fidelity, 8-second looping motion graphics explainer titled "The Honeycomb Reduction" for the fictional brand FlowCore. The visual metaphor is a macroscopic view of a catalytic converter's internal honeycomb structure. The scene must feel industrial, precise, and chemically accurate, avoiding generic "green tech" tropes in favor of mechanical/chemical truth.

**Visual Style & Palette:**
Use a strict three-color palette: Deep Charcoal (#121212) for the background and unlit metal structures, Neon Green (#00FF9D) for clean outputs (N2, CO2) and active catalyst states, and Hot Pink/Red (#FF3366) for toxic inputs (NOx, CO) and high-energy bond breaks. The aesthetic is "Broadcast Explainer" meets "Industrial Blueprint." Use Syne for all title cards and brand lockups (bold, geometric, expressive). Use IBM Plex Mono for all data labels, chemical formulas (NOx, CO2), and timing markers. No Inter, Roboto, or Arial.

**Scene Composition (16:9):**
The stage is a dark void. Centered is a 3D-styled honeycomb lattice (rendered via CSS 3D transforms or Canvas 2D with perspective) stretching into the depth. The lattice is metallic but dark, only illuminating when active.

**Beat Sheet (8s Loop):**
1. **0.0–2.0s (The Problem):** A stream of jagged, red (#FF3366) particles labeled "NOx" and "CO" rushes from the left foreground toward the honeycomb. The honeycomb is dark and inert. A title card fades in: "TOXIC INPUT" in Syne, bottom-left.
2. **2.0–5.0s (The Mechanism):** The red particles hit the front face of the honeycomb. As they enter the hexagonal cells, specific nodes (catalyst sites) flash bright white, then shift to Neon Green (#00FF9D). The red particles visually "split"—the red core remains, but a smaller red dot (Oxygen) detaches and dissolves into the background. The main particle turns green. This must look like a rhythmic "snap" or "pop," not a slow fade.
3. **5.0–8.0s (The Payoff):** The now-green particles (#00FF9D) exit the right side of the honeycomb at high speed. They are labeled "N2" and "CO2." The honeycomb glows with a steady, low-intensity green ambient light. A final title card: "CLEAN OUTPUT" in Syne, bottom-right. The loop resets seamlessly.

**Technical Constraints:**
- Use `requestAnimationFrame` for all motion.
- Implement a `prefers-reduced-motion` media query that pauses the animation at the 4.0s mark (mid-mechanism) and displays a static poster frame.
- The honeycomb structure should be generated programmatically (JS loop creating hex divs or canvas paths) to ensure scalability.
- Particle physics should be simple linear interpolation with slight sine-wave jitter to simulate gas flow.
- Ensure text is legible against the dark background; use text-shadow or background pills for labels if necessary, but keep it minimal.

**Poster Frame Requirement:**
The animation must be readable at the 1.5s mark. At this timestamp, the red particles are just entering the frame, and the title "TOXIC INPUT" is fully visible. The honeycomb should be clearly defined. This state will be captured for social media thumbnails.
