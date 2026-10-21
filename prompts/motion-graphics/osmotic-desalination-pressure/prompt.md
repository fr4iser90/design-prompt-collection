Create a high-fidelity 8s motion graphics timeline (16:9) explaining Reverse Osmosis pressure mechanics for brand 'AquaFlux'. Use a dark industrial aesthetic (#0A2A24 bg) with high-contrast diagram elements. Typography: Syne for title/lockup (bold, geometric), IBM Plex Sans for labels/data (monospace-adjacent clarity).

**Scene Composition**:
- **Background**: Deep teal (#0A2A24) with subtle grid lines (#1A4A44, 10% opacity) to suggest engineering space.
- **Foreground Diagram**: A cross-section of an RO membrane. Left side: 'Feed Side' (saltwater). Right side: 'Permeate Side' (fresh water). Center: Vertical membrane line (dashed, #E0F2F1).
- **Elements**: 
  - Water molecules: Small circles (#00B4D8).
  - Salt ions: Larger irregular polygons (#FFD166).
  - Pressure Gauge: Bottom-left, analog style, needle sweeps 0-100 PSI.

**Beat Sheet & Motion Logic**:
1. **0.0s–1.5s (Problem)**: Feed side fills with mixed molecules. Ions drift randomly. Gauge needle starts at 0. Title 'FEED PRESSURE' fades in (Syne, 24px, #E0F2F1).
2. **1.5s–3.0s (Mechanism)**: Gauge needle sweeps rapidly to 80 PSI (#FFD166 highlight). Feed side molecules accelerate toward membrane. Water molecules (#00B4D8) pass through membrane pores (small gaps). Salt ions (#FFD166) collide and bounce off the membrane surface (elastic collision animation, slight squash/stretch).
3. **3.0s–5.0s (Payoff)**: Pure water flows smoothly to right (Permeate). Brine (high ion concentration) is diverted down/left (Reject stream). Label 'PERMEATE FLOW' and 'BRINE DISPOSAL' appear (IBM Plex Sans, 14px). Membrane ripples subtly as water passes.
4. **5.0s–8.0s (Lockup)**: Diagram fades to 50% opacity. AquaFlux logo (Syne, bold, white) scales up center. Metric '99.8% REJECTION' appears below. Loop resets.

**Technical Constraints**:
- Use CSS keyframes or JS rAF for smooth particle motion. No heavy WebGL.
- Ion bounce must feel physical (easing: cubic-bezier(0.34, 1.56, 0.64, 1)).
- Gauge needle rotation must be precise (transform: rotate).
- Loop seamlessly: End state matches start state (or fade-out/in if needed).
- **Poster Frame @ 1.5s**: Membrane visible, gauge at ~40 PSI, ions approaching, title 'FEED PRESSURE' visible. Readable at 1200x630.

**Layout & Responsiveness**:
- **Desktop**: Full 16:9 canvas centered. Diagram occupies central 80% width.
- **Mobile**: Stack vertically if needed, but prioritize horizontal flow for RO logic. Scale typography down by 20%.
- **Constraints**: No external libraries. Single-file HTML/CSS/JS. Reduced motion support: static frame at 1.5s.

**Acceptance Criteria**:
- [ ] 8s loop, seamless.
- [ ] Poster frame readable at 1200x630.
- [ ] Ions bounce, water passes.
- [ ] Gauge sweeps to 80 PSI.
- [ ] Logo and metric appear.
- [ ] Strict palette usage.
- [ ] Syne/IBM Plex fonts.
- [ ] 60fps smoothness.

Deliverable: single-file HTML/CSS/JS.
