## Concept
Create a single-page instrument panel for an industrial electrolysis cell simulation. The design language is 'Precision Utility': stark, high-contrast, and functional. The goal is to visualize the invisible concept of 'electrical load balance' as a tangible physical constraint using particle flow. The interface should feel like a piece of hardware monitoring software from a high-end chemical plant, not a consumer web app. The aesthetic rejects modern 'soft UI' trends in favor of brutalist clarity.

## Primary task
The user's primary task is to adjust the 'Current Load' slider to maintain optimal ion flow balance across the membrane. The user must observe the particle velocity and membrane stability to determine if the system is in equilibrium. If the load is too high, the system enters a 'Pressure Alert' state, requiring the user to reduce the load to restore balance. The interface provides immediate visual feedback on the consequences of electrical load changes.

## States
1. **Default (Balanced)**: The membrane line is a solid, bright #00FFFF. Particles flow smoothly from left (H+) and right (OH-) toward the center. The 'Status' readout displays 'NOMINAL' in green/cyan. Efficiency is >90%.
2. **Selection (Hover)**: When the user hovers over the 'Current Load' slider, a small tooltip appears displaying the exact Ampere value (e.g., '45.2 A'). The slider track highlights slightly. Keyboard focus outlines must be 2px solid #00FFFF.
3. **Empty (Paused)**: If the 'Run Simulation' toggle is off, the canvas freezes. Particles stop moving. The canvas background dims. The 'Status' readout displays 'IDLE' in gray. No particle updates occur to save CPU.
4. **Error (Imbalance)**: If the 'Current Load' exceeds 95% or if the simulated temperature exceeds a threshold, the membrane line flashes #FF0055. A large 'PRESSURE ALERT' text appears in the center of the canvas. The background of the right-hand data panel turns a faint red tint. The 'Status' readout displays 'CRITICAL' in #FF0055. A subtle CSS shake animation applies to the main container for 200ms.

## Palette
- **Background**: #1A1A1A (Deep Charcoal) - Used for the main app background and canvas background.
- **Ink/Text**: #FFFFFF (White) - Used for primary labels and high-priority data.
- **Secondary Text**: #888888 (Gray) - Used for secondary labels, units, and inactive states.
- **Accent (Stable)**: #00FFFF (Electric Cyan) - Used for active particles, the membrane line in a balanced state, and positive data trends.
- **Alert (Critical)**: #FF0055 (Magenta-Red) - Used for error states, pressure alerts, and critical data values.
- **Borders**: #333333 (Dark Gray) - Used for hairline separators between panels.

## Type
- **Display/Labels**: Barlow Condensed. Use uppercase for all headers and labels. Font-weight 600 for headers, 400 for labels. Letter-spacing 0.1em for a technical, spaced-out look.
- **Data/Mono**: JetBrains Mono. Use for all numerical values, units (A, V, °C, %), and status codes. This ensures tabular alignment and a 'machine-read' aesthetic.
- **Hierarchy**: 
  - Panel Headers: Barlow Condensed, 14px, Uppercase, #888888.
  - Main Data Values: JetBrains Mono, 24px, #FFFFFF.
  - Units: JetBrains Mono, 12px, #888888.
  - Status Indicators: Barlow Condensed, 16px, Uppercase, Color-coded (Cyan/Red/Gray).

## Layout
The layout is a strict 3-column grid, full viewport height.
1. **Left Column (Controls)**: Width 25%. Contains the 'Current Load' slider (vertical orientation preferred for industrial feel, or horizontal with large track), 'Voltage' input, and 'Run/Pause' toggle. Use hairline borders to separate control groups. Padding: 20px.
2. **Center Column (Visualization)**: Width 50%. Contains the HTML5 Canvas element. The canvas should fill the available space. A vertical line in the center represents the membrane. Particles are rendered here. No UI overlays except the 'Pressure Alert' text which appears only in error state.
3. **Right Column (Data)**: Width 25%. Contains readouts for 'Efficiency', 'Temperature', 'Flow Rate', and 'Status'. Each readout is a simple label-value pair. Use a monospaced font for values to ensure they don't shift width when numbers change. 

**Responsive Behavior**: On screens < 768px, switch to a single column stack. Order: Controls, Canvas, Data. Canvas height fixed at 40vh. Hide 'Flow Rate' on mobile to reduce clutter. Ensure touch targets are large enough for mobile interaction.

## Motion
1. **Entrance**: On load, particles should stream in from the edges of the canvas toward the center, establishing the flow direction immediately. The UI elements should fade in quickly (200ms) without complex easing.
2. **Ambient**: The membrane line should have a subtle 'pulse' or glow effect when in the balanced state, indicating active current. Particles should have slight vertical jitter to simulate thermal noise, but their horizontal velocity should be consistent with the load slider.
3. **Interaction**: 
   - Slider Drag: Particle velocity should update in real-time as the slider is dragged. There should be no lag. Use `input` event, not `change`.
   - Error Trigger: When the threshold is crossed, the membrane color change and alert text should appear instantly (no fade-in) to mimic a hardware alarm.
   - Hover: Tooltips on the slider should appear with a 100ms delay to prevent flickering during rapid movement.

## Constraints
- **No Marketing Chrome**: No hero images, no 'Welcome' text, no decorative icons. Every pixel must serve the simulation or data display.
- **No Rounded Corners**: All UI elements (buttons, inputs, panels) must have sharp 90-degree corners.
- **Performance**: The particle system must run at 60fps. Limit particle count to 200-300 to ensure smooth performance on standard hardware. Use `requestAnimationFrame`.
- **Accessibility**: Ensure color contrast ratios meet WCAG AA standards. The cyan on charcoal and white on charcoal must be readable. Provide aria-labels for all controls. Support keyboard navigation for sliders.
- **Single File**: All CSS and JS must be embedded in the HTML file. No external assets except Google Fonts.

## Acceptance criteria
- [ ] The interface loads with a dark charcoal background (#1A1A1A) and no white flashes.
- [ ] Typography uses Barlow Condensed for labels and JetBrains Mono for data. No system fonts are used.
- [ ] The 'Current Load' slider controls the horizontal velocity of particles in the canvas.
- [ ] Particles are cyan (#00FFFF) dots that flow toward a central vertical line.
- [ ] When the load is set to >95%, the central line turns red (#FF0055) and flashes.
- [ ] A 'PRESSURE ALERT' text appears in the canvas when in error state.
- [ ] The 'Status' readout in the right panel changes to 'CRITICAL' in red when in error state.
- [ ] The 'Run/Pause' toggle freezes the particle animation and dims the canvas.
- [ ] Hovering over the slider displays a tooltip with the exact Ampere value.
- [ ] The layout is a strict 3-column grid with hairline borders (#333) separating the columns.
- [ ] The code is contained in a single HTML file with embedded CSS and JS.
- [ ] No rounded corners are present on any UI element.
- [ ] The particle animation is smooth (no stuttering) on a standard laptop browser.
- [ ] Mobile layout stacks correctly and remains usable.
