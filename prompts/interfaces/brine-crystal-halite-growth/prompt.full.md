## Concept
'Halite Protocol' is a specialized industrial tool for simulating crystal growth under varying salinity conditions. The core metaphor is 'Water as Plane'—the brine is a medium that reacts to user input with physical fidelity. The design language is 'Aquatic Depth': dark, pressurized, and precise. We are avoiding abstract 'growth' animations in favor of specific, physics-based crystallography that responds to data. The user is not just watching a graph; they are cultivating a structure.

## Primary task
The user must adjust the 'Salinity Concentration' slider to achieve a 'Target Purity' score. The visual feedback is the crystal lattice itself. 
- **Low Salinity**: Slow growth, perfect cubic geometry (high purity, low speed).
- **High Salinity**: Fast growth, chaotic dendritic branching (low purity, high speed).
The user must find the 'sweet spot' where the crystal structure matches the target geometric complexity.

## States
1. **Default**: The tank is filled with dark brine (#050a0f). A seed crystal is visible at the bottom center. The slider is at 50%. The status bar reads 'SYSTEM IDLE'.
2. **Active Growth**: The user drags the slider. The crystal grows in real-time. The 'Current Purity' metric updates. The 'Jitter' effect is active on the crystal edges.
3. **Overflow/Error**: If salinity > 95% for > 5 seconds, the status bar turns red (#ff4444) and reads 'PRECIPITATION OVERFLOW'. Growth stops. The user must lower salinity to reset.
4. **Success**: If 'Current Purity' matches 'Target Purity' (±5%), the status bar turns green (#44ff88) and reads 'LATTICE STABLE'. The ambient bubbles slow down.
5. **Empty/Paused**: If the user clicks 'Pause', the canvas freezes. A semi-transparent overlay reads 'SIMULATION PAUSED'.

## Palette
- **Background/Tank**: #050a0f (Deep Abyss). This is the primary canvas color. It should feel like deep water.
- **Ink/Text**: #e0f0f5 (Brine White). Used for all UI text, labels, and the brand wordmark. High contrast.
- **Accent/Crystal**: #a0d8ef (Halite Blue). Used for the crystal structure, active slider track, and data lines. This color should have a slight glow effect in the canvas (via shadowBlur) to simulate bioluminescence or refraction.
- **Error**: #ff4444 (Alert Red). Only for status warnings.
- **Success**: #44ff88 (Stable Green). Only for success states.

## Type
- **Display**: 'Neue Machina'. Use for the 'Halite Protocol' wordmark, section headers ('SALINITY CONTROL'), and button labels. Weight: 500 or 700. Tracking: 0.05em. This font provides the 'industrial precision' feel.
- **Body/Data**: 'IBM Plex Mono'. Use for all numerical values (salinity %, purity score), status messages, and small labels. Weight: 400. This font reinforces the 'scientific instrument' aesthetic.
- **Hierarchy**: The wordmark is 1.5rem. Section headers are 1rem. Data values are 1.25rem. Small labels are 0.75rem.

## Layout
- **Container**: Full viewport height (100vh). Flexbox column.
- **Header**: Fixed height 60px. Flex row. Space-between. Left: Wordmark. Right: Status Indicator (pill-shaped, but sharp corners).
- **Main Area**: Flex-grow 1. Flex row (on desktop) or column (on mobile).
  - **Canvas Container**: Flex-grow 2. Position relative. The `<canvas>` element fills this container. Border: 1px solid #a0d8ef (20% opacity). No border-radius.
  - **Control Panel**: Flex-grow 1. Max-width 300px. Padding 20px. Background: #0a141e (slightly lighter than bg). Border-left: 1px solid #a0d8ef (20% opacity).
    - **Slider**: Custom styled range input. Track: #050a0f. Thumb: #a0d8ef. Height: 4px. Thumb size: 16px.
    - **Readouts**: Two blocks. 'TARGET PURITY' (static value) and 'CURRENT PURITY' (dynamic value). Use IBM Plex Mono.
    - **Buttons**: 'RESET', 'PAUSE'. Simple text buttons with underline on hover. No background fill.

## Motion
1. **Entrance (Brine Fill)**: On page load, animate a CSS gradient or canvas overlay that rises from `bottom: 0` to `top: 0` over 1.5s. This simulates the tank filling with brine. The crystal seed appears only after the fill reaches 50%.
2. **Ambient (Micro-bubbles)**: Implement a particle system in the canvas. 20-30 particles. Each particle is a circle (radius 1-2px). Color: #e0f0f5 (20% opacity). Velocity: 0.5px/frame upwards. When a particle reaches the top, it resets to the bottom. This adds life to the dark tank without distracting.
3. **Interaction (Lattice Jitter)**: When the slider value changes, apply a random offset (±1px) to the crystal rendering coordinates for 10 frames. This creates a 'vibration' effect, indicating the system is reacting to the new salinity input. This should feel tactile, like a physical reaction.
4. **Transition (Growth)**: The crystal growth should be smooth. Use `requestAnimationFrame`. Do not use CSS transitions for the canvas content.

## Constraints
- **No External Libraries**: Use vanilla JavaScript for the canvas simulation. No Three.js, no D3, no GSAP. This ensures the 'single-file' constraint and keeps the code lightweight.
- **No Generic UI**: Do not use Bootstrap or Tailwind classes. Write custom CSS. Avoid 'card' components. Use panels and hairlines.
- **Performance**: The canvas should render at 60fps. Limit the number of crystal nodes to prevent lag. Use `clearRect` efficiently.
- **Accessibility**: Ensure the slider is keyboard accessible (arrow keys). Add `aria-label` to the canvas and controls.
- **No Marketing**: No hero sections, no 'About' text, no feature lists. This is a tool, not a landing page.

## Acceptance criteria
- [ ] **Deliverable**: A single HTML file containing all HTML, CSS, and JS.
- [ ] **Fonts**: 'Neue Machina' and 'IBM Plex Mono' are correctly loaded and applied.
- [ ] **Palette**: The background is #050a0f, text is #e0f0f5, and accents are #a0d8ef. No other colors are used except for error/success states.
- [ ] **Simulation**: The canvas displays a growing crystal structure that changes shape based on the slider value (cubic vs. chaotic).
- [ ] **Interaction**: Dragging the slider causes immediate visual feedback (jitter) and updates the 'Current Purity' readout.
- [ ] **States**: The 'Overflow' error state triggers correctly when salinity is too high for too long.
- [ ] **Motion**: The 'Brine Fill' entrance animation plays on load. Micro-bubbles are visible and moving.
- [ ] **Layout**: The interface is responsive and fits within the viewport without scrolling (except for content overflow if necessary, but prefer fit).
- [ ] **Code Quality**: The JS is clean, commented, and uses `requestAnimationFrame` for the loop.
- [ ] **No Clichés**: No purple gradients, no rounded corners on the tank, no emoji, no generic 'dashboard' widgets.
