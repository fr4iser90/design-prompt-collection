Build a single-file HTML/CSS/JS editorial experience titled "The Decay Ribbon" for the publication "Perigee Press". This is a vertical narrative where a single SVG ribbon acts as the primary data visualization and storytelling device. 

**Visual Style & Palette:**
Use a deep space background (#03045e) to establish the void. The primary accent is a bright, legible cyan (#00b4d8) for the healthy orbital ribbon. The critical failure/burn-off color is a hot, intense magenta-red (#ff006e). Text should be high-contrast white or light gray for readability against the dark background. Avoid gradients on the background; keep it solid and deep.

**Typography:**
Use "Syne" for all headings, pull-quotes, and the publication brand mark to convey a modern, technical, yet expressive feel. Use "Work Sans" for body copy, ensuring high legibility for long-form reading. Do not use Inter, Roboto, or Arial. The type hierarchy must be clear: large, bold Syne for chapter titles, smaller Work Sans for narrative text.

**Core Mechanic: The Ribbon:**
The centerpiece is a continuous SVG path that starts at the top of the viewport and extends downward. 
1. **Entrance:** On load, a bright cyan dot appears at the top-center, pulsing once. It then begins to trail a thin, smooth SVG line downward, simulating the start of the satellite's descent.
2. **Ambient Motion:** The ribbon should gently sway left and right with a low-amplitude sine wave animation to simulate orbital drift. This motion should be subtle, not distracting.
3. **Scroll Interaction:** As the user scrolls down, the ribbon's vertical position (altitude) drops relative to the center of the screen. The waviness (eccentricity) of the ribbon should also change based on simulated telemetry data (e.g., more erratic waviness as altitude decreases). 
4. **Burn-Off Phase:** When the scroll reaches a critical threshold (e.g., 70% down), the ribbon's stroke color transitions from cyan (#00b4d8) to hot magenta-red (#ff006e). At this point, particle sparks should emit from the line, simulating atmospheric friction. The visible path length of the ribbon should shorten as it "burns off," and a countdown timer in the margin should tick down to zero.

**Layout & Structure:**
- **Publication Brand:** "Perigee Press" should be prominently displayed at the top, establishing the editorial context.
- **Reading Hierarchy:** The narrative text should flow alongside the ribbon, using a sticky chapter rail or spread structure to guide the reader. The ribbon is the visual anchor, but the text must remain readable.
- **Pull-Quotes:** Use large Syne typography for pull-quotes, integrated into the layout without card backgrounds. They should feel like part of the visual flow.
- **Data Legibility:** Ensure that any numerical data (altitude, velocity, countdown) is clearly legible and uses a monospaced or tabular font variant if necessary, but stick to the primary type pairing for consistency.

**Technical Constraints:**
- Use vanilla JavaScript for scroll tracking and SVG manipulation. No heavy libraries like D3 or Three.js unless absolutely necessary for the particle effect (a simple canvas overlay or SVG circle animation is preferred for performance).
- The SVG path should be generated dynamically based on scroll position to ensure smooth animation.
- Ensure the experience is responsive: the ribbon should remain centered and the text should reflow appropriately on smaller screens.
- Avoid "dashboard soup": do not add extra charts, gauges, or UI elements. The ribbon is the sole data visualization.
- No AI-default looks: avoid purple glows, cream backgrounds, or dense multi-column broadsheet layouts.

**Deliverable:** single-file HTML/CSS/JS.
