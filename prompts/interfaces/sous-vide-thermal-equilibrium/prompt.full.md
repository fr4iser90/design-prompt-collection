## Concept
CoreTemp is a precision tool for sous-vide cooks, visualizing the physics of heat diffusion. It avoids decorative gradients in favor of strict scientific visualization. The goal is to predict when a protein's core reaches pasteurization based on bath temperature and thickness. The aesthetic is 'chef precision': steel, linen, and steam, but rendered as a digital instrument. No rustic kitsch, no farmhouse vibes. Just clean, dark-mode engineering.

## Primary task
Adjust bath temperature and protein thickness to observe the heat diffusion simulation and determine the time required for the core to reach the pasteurization threshold. The user must be able to read the 'Safe to Eat' state instantly via color and data.

## States
1. **Default**: Simulation running at initial values (e.g., 55°C, 5cm). Core temp rising. 
2. **Selection**: User adjusts sliders. Simulation recalculates in real-time. 
3. **Empty**: Not applicable (always has default values), but if inputs are invalid, show error state. 
4. **Error**: If inputs are out of bounds, highlight inputs in red (#FF4444) and pause simulation. 
5. **Safe**: When core temp > threshold, the core marker turns #00FF9D and pulses faster.

## Palette
- **Background**: #1A1A1A (Deep charcoal, not black)
- **Ink**: #FFFFFF (Pure white for data)
- **Accent**: #00FF9D (Neon green for 'Safe' state)
- **Muted**: #4A4A4A (Gray for inactive elements, borders, cold states)
- **Error**: #FF4444 (Red for invalid inputs)

## Type
- **Headings**: Space Grotesk. Bold, geometric. Used for 'CoreTemp', section titles.
- **Data**: JetBrains Mono. Used for all numbers, labels, and axis ticks. Monospace ensures alignment of changing values.
- **Hierarchy**: H1 is the brand. H2 is section titles. Body text is minimal. Data is prominent.

## Layout
- **Header**: Brand 'CoreTemp' left-aligned. Status indicator right-aligned.
- **Main View**: Split into two columns on desktop.
  - **Left (60%)**: Canvas visualization. Shows the protein block, temperature gradient, core marker, and pasteurization line.
  - **Right (40%)**: Control Panel. Sliders for Temperature and Thickness. Data readouts for Core Temp, Time to Pasteurization, Total Time.
- **Footer**: Minimal copyright. No marketing links.
- **Density**: High. Use hairline borders (#4A4A4A) to separate sections. No card shadows. Panels are flat.

## Motion
1. **Entrance**: The canvas grid fades in from a cold blue tint (#003366) to the neutral gray (#4A4A4A) over 1.5 seconds. This sets the 'cold start' context.
2. **Ambient**: The core temperature marker (a small circle or line) pulses. The pulse frequency is inversely proportional to protein thickness. Thicker protein = slower pulse. This visually represents thermal inertia.
3. **Interaction**: When dragging the temperature slider, the 'Safe Zone' boundary line (a horizontal line on the canvas) morphs elastically. It stretches slightly as the user drags, then snaps sharply into place when the core temperature crosses the pasteurization threshold. This provides tactile feedback for the critical 'safe' moment.

## Constraints
- **Single File**: All HTML, CSS, and JS must be in one file.
- **No Libraries**: No React, Vue, D3, or Three.js. Use vanilla JS and Canvas API.
- **Physics Accuracy**: Use a simplified 1D heat equation. Do not fake the data. The simulation must respond realistically to input changes.
- **Performance**: Maintain 60fps during simulation and interaction.
- **Accessibility**: Ensure contrast ratios meet WCAG AA. Use aria-labels for sliders.
- **No Decorative Noise**: No background patterns, no unnecessary animations. Every motion must serve the data.

## Acceptance criteria
1. [ ] Single HTML file loads without external dependencies (except Google Fonts).
2. [ ] Canvas renders a 1D heat diffusion simulation that updates in real-time.
3. [ ] Sliders for Temperature and Thickness correctly update the simulation.
4. [ ] Core temperature marker pulses at a rate inversely proportional to thickness.
5. [ ] 'Safe Zone' boundary line exhibits elastic morphing and snapping when crossing the threshold.
6. [ ] Entrance animation fades from cold blue to neutral gray.
7. [ ] Data panel shows real-time Core Temp, Time to Pasteurization, and Total Time.
8. [ ] Palette uses exactly #1A1A1A, #00FF9D, #FFFFFF, #4A4A4A.
9. [ ] Typography uses Space Grotesk and JetBrains Mono.
10. [ ] No drop shadows or card-style containers. Use hairline borders.
11. [ ] Error state triggers if inputs are out of bounds.
12. [ ] Layout is responsive but optimized for desktop.

## Extended Layout & Responsive Behavior
**Desktop (>1024px)**: 
- Use CSS Grid: `display: grid; grid-template-columns: 3fr 2fr; gap: 20px; padding: 20px;`
- Header spans full width. Footer spans full width.
- Canvas container: `position: relative; width: 100%; height: calc(100vh - 140px);`
- Control Panel: `display: flex; flex-direction: column; gap: 15px;`
- Data Panel: `display: flex; flex-direction: column; gap: 10px; border-top: 1px solid #4A4A4A; padding-top: 15px;`

**Mobile (<768px)**: 
- Switch to `display: flex; flex-direction: column;`
- Canvas container: `width: 100%; aspect-ratio: 1/1; max-height: 400px;`
- Control Panel: Full width. Sliders stack vertically.
- Data Panel: Full width. Values align right.
- Font sizes scale down: H1 20px, Data 14px.

## Detailed Motion Specifications
**1. Entrance Animation**:
- CSS: `@keyframes fadeIn { from { opacity: 0; filter: hue-rotate(180deg); } to { opacity: 1; filter: hue-rotate(0deg); } }`
- Apply to Canvas element. Duration 1.5s. Easing: `ease-out`.
- JS: Initialize temperature array with 20°C. Render loop starts immediately.

**2. Core Marker Pulse**:
- JS: `const pulseFreq = 1 / (thickness * 0.5);` (Hz)
- `const time = performance.now() / 1000;`
- `const radius = 4 + 2 * Math.sin(time * pulseFreq * Math.PI * 2);`
- Draw circle at core X position with calculated radius.
- Color: #FFFFFF if unsafe, #00FF9D if safe.

**3. Elastic Snap**:
- JS: Maintain `currentSafeLineY` and `targetSafeLineY`.
- On slider drag: `targetSafeLineY` updates based on bath temp.
- In render loop: `currentSafeLineY += (targetSafeLineY - currentSafeLineY) * 0.1;` (Spring interpolation).
- If `coreTemp >= threshold`: `currentSafeLineY = targetSafeLineY;` (Snap). Trigger flash effect.
- Flash effect: Draw line with `globalAlpha = 0.5` for 200ms after snap.

## Technical Implementation Details
**Physics Engine**:
- Use 1D Heat Equation: `dT/dt = alpha * d2T/dx2`
- Discretize into N=100 cells.
- `alpha` (thermal diffusivity) ~ 1.4e-7 m^2/s for meat.
- Boundary conditions: Left/Right edges fixed at Bath Temp.
- Initial condition: Uniform 20°C (room temp).
- Update loop: `T[i] += alpha * dt / dx^2 * (T[i-1] - 2*T[i] + T[i+1])`

**Canvas Rendering**:
- Map temperature to color: 
  - T < 40°C: #1A1A1A
  - 40°C <= T < 55°C: Lerp #1A1A1A to #4A4A4A
  - T >= 55°C: #00FF9D
- Draw vertical bars for each cell.
- Draw horizontal line for threshold.
- Draw vertical line for core.

**Input Handling**:
- `<input type="range">` for Temp and Thickness.
- Event listener `input` for real-time updates.
- Validate ranges: Temp 50-90, Thickness 1-10.
- If invalid: Add class `.error` to input container. Change border to #FF4444. Pause simulation.

**Data Calculation**:
- **Core Temp**: `T[50]` (center cell).
- **Time to Pasteurization**: Estimate based on current rate of change. If `dT/dt > 0`, `time = (threshold - coreTemp) / dT/dt`. Display as MM:SS.
- **Total Cook Time**: Time elapsed since simulation start. Display as MM:SS.

**Deliverable**: single-file HTML/CSS/JS.
