Deliverable: single-file HTML/CSS/JS.

Build a specialized industrial chemistry tool interface for 'Halite Protocol'. The primary task is to adjust salinity levels to achieve a specific crystal purity target within a simulated brine tank.

**Visual Language & Palette**
Use a strict saline palette: Deep Abyss (#050a0f) for the background and tank interior, Brine White (#e0f0f5) for text and UI chrome, and Halite Blue (#a0d8ef) for active states, crystal highlights, and data lines. The aesthetic is 'quiet luxury' meets 'industrial precision'. Avoid generic SaaS gradients or purple glows. The interface should feel like a high-end laboratory monitor.

**Typography**
Use 'Neue Machina' for all headings, labels, and the brand wordmark. It should feel technical and sharp. Use 'IBM Plex Mono' for all numerical data, slider values, and status readouts. This pairing reinforces the scientific, data-driven nature of the tool. Ensure high contrast between the white text and the dark background.

**Layout & Structure**
The layout is a single-view tool surface. No marketing heroes. 
1. **Header**: Minimal chrome. Left: 'Halite Protocol' wordmark in Neue Machina. Right: Status indicator (e.g., 'SYSTEM STABLE', 'SATURATION HIGH').
2. **Main Canvas**: A large, central rectangular area representing the brine tank. This is a `<canvas>` element. It occupies 70% of the viewport height.
3. **Control Panel**: A sidebar or bottom bar (depending on viewport) containing the primary interaction: a vertical or horizontal slider labeled 'Salinity Concentration'. Include a 'Target Purity' readout and a 'Current Purity' readout in IBM Plex Mono.

**The Simulation (Canvas)**
Implement a particle-based crystal growth simulation using HTML5 Canvas 2D.
- **Physics**: Crystals grow from a seed point at the bottom center. 
- **Low Salinity (0-30%)**: Growth is slow. Crystals form perfect, orthogonal cubes (halite structure). Edges are sharp. Color is a faint, translucent Halite Blue.
- **High Salinity (70-100%)**: Growth is rapid and chaotic. Crystals branch out irregularly, forming dendritic or jagged structures. Color shifts to a brighter, more opaque white-blue. 
- **Medium Salinity**: A mix of structured and chaotic growth.
- **Visual Feedback**: As the user drags the slider, the existing crystal structure should 'jitter' slightly, indicating instability or rapid change. New growth should appear immediately in the next frame.

**States & Interactions**
1. **Default**: The tank is filled with dark brine. A small seed crystal is visible. The slider is at 50%.
2. **Interaction**: Dragging the slider updates the `salinity` variable. The canvas re-renders the growth algorithm based on this new value. The 'Current Purity' number updates in real-time.
3. **Selection**: If the user clicks a 'Reset' button, the canvas clears, and a new seed is generated.
4. **Error**: If the user sets salinity to 100% for too long, display a 'PRECIPITATION OVERFLOW' warning in red (#ff4444) in the status bar. The crystal growth stops or becomes erratic.
5. **Empty**: If the simulation is paused, the canvas shows the static last frame with a 'PAUSED' overlay.

**Motion & Animation**
- **Entrance**: On load, animate a 'brine fill' effect where a dark blue gradient rises from the bottom of the canvas to the top, simulating the tank filling up. This takes 1.5 seconds.
- **Ambient**: Implement a subtle particle system for 'micro-bubbles'. Small, white, semi-transparent circles rise slowly from the bottom of the canvas to the top at a constant velocity. They should be sparse and not distract from the crystal growth.
- **Interaction**: When the slider is moved, the crystal lattice should exhibit 'jitter'—a slight, high-frequency vibration in the rendering of the crystal edges. This provides tactile feedback.

**Constraints**
- Do not use external libraries for the simulation; write vanilla JS for the canvas logic.
- Do not use CSS animations for the crystal growth; it must be frame-by-frame canvas rendering.
- The UI must be responsive but prioritize desktop aspect ratios.
- No emoji. No rounded corners on the main tank container (sharp, industrial edges).

**Acceptance Criteria**
- [ ] Single HTML file contains all CSS, JS, and HTML.
- [ ] 'Neue Machina' and 'IBM Plex Mono' are loaded via Google Fonts or similar CDN.
- [ ] Canvas renders a growing crystal structure.
- [ ] Slider input directly changes crystal growth pattern (chaotic vs. cubic).
- [ ] Micro-bubbles are visible and moving.
- [ ] Entrance animation (brine fill) plays on load.
- [ ] 'Target Purity' and 'Current Purity' are displayed in monospace.
- [ ] No generic 'dashboard' widgets or marketing copy.
