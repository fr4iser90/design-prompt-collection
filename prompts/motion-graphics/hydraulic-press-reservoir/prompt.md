Deliverable: single-file HTML/CSS/JS.

Create a 6-second looping motion graphics sequence (16:9) titled 'Pascal's Squeeze' for the fictional brand HydroForm. The sequence explains hydraulic pressure multiplication using a realistic, tactile mechanical aesthetic. Avoid abstract energy lines or glowing particles; focus on solid metal deformation and fluid displacement.

**Visual Style & Palette:**
- Background: Deep charcoal (#1A1A1A) with subtle noise texture.
- Fluid: Bright cyan (#00B4D8) with high viscosity appearance.
- Impact/Heat: Vibrant orange-red (#FF5722) for the steel billet and spark effects.
- Typography: Archivo Black for title cards (bold, industrial), Space Mono for technical labels (gauge readings, pressure values).

**Beat Sheet (6s Loop):**
1. **0.0s–1.5s (Input):** A small, human-scale piston (left side) depresses smoothly. A title card 'INPUT FORCE' appears in Archivo Black. The small piston pushes into a master cylinder filled with cyan fluid.
2. **1.5s–3.5s (Transmission):** The cyan fluid travels through a connecting line to the right. Visualize pressure buildup: the fluid line pulses slightly, and a pressure gauge needle (Space Mono numbers) swings from 0 to max. The large piston (right side) begins to move upward.
3. **3.5s–6.0s (Output):** The large piston slams down rapidly onto a red-hot steel billet. The billet deforms realistically (squashes down). A heavy 'thud' animation triggers a screen shake (2px amplitude, 0.1s duration) and a brief spark burst (orange #FF5722). The title card 'OUTPUT FORCE' appears. The loop resets smoothly.

**Technical Constraints:**
- Use HTML5 Canvas or SVG for the mechanical components.
- Implement precise easing: ease-in-out for piston movement, ease-out for impact.
- Ensure the poster frame at ~1.5s is visually balanced and readable.
- No external libraries; use vanilla JS for animation logic.
- Reduced motion: static final frame showing the crushed billet and maxed gauge.

**Poster Frame (~1.5s):**
- The small piston is halfway down.
- The pressure gauge needle is rising.
- The title 'Pascal's Squeeze' is visible in the top left.
- The fluid line is taut with pressure.

**Acceptance Criteria:**
- [ ] Single HTML file with embedded CSS/JS.
- [ ] 6s loop duration.
- [ ] Three distinct beats with clear visual separation.
- [ ] Realistic fluid displacement (no glowing lines).
- [ ] Screen shake on impact.
- [ ] Correct typography pairing.
- [ ] Poster frame readable at 1.5s.

**Layout & Responsiveness:**
- **Desktop:** Full 16:9 canvas centered. Split composition: Left (Input), Center (Transmission/Gauge), Right (Output).
- **Mobile:** Vertical stack or scaled-down 16:9 with increased font sizes for readability. Ensure touch targets for any interactive elements (if added) are min 44px.
- **Constraints:** Must render correctly at 1920x1080 and 375x667. Use CSS `object-fit: contain` for the canvas container.

**Motion Details:**
- **Fluid Sloshing:** Add subtle sine-wave oscillation to the fluid surface in the master cylinder during the Input phase to indicate stored energy.
- **Gauge Needle:** Use a spring-damper simulation for the needle swing to avoid robotic movement. Overshoot by 5% before settling.
- **Billet Deformation:** Use a mesh deformation algorithm or pre-calculated keyframes for the squash effect. The billet should widen as it compresses, maintaining volume conservation visually.
- **Sparks:** Generate 10-15 particles with random velocities, gravity, and fade-out curves. Color gradient from white-hot center to orange edges.

**Acceptance Criteria (Extended):**
- [ ] Fluid level in master cylinder drops inversely proportional to slave cylinder rise.
- [ ] Gauge needle overshoots and settles realistically.
- [ ] Billet volume conservation visually maintained during squash.
- [ ] No layout shift on mobile devices.
- [ ] Code is minified-ready but readable for debugging.
