Build a single-file HTML/CSS/JS tool named 'CoreTemp' that simulates 1D heat diffusion for sous-vide cooking. The interface must be a dense, functional dashboard, not a marketing page. Use a dark theme: background #1A1A1A, primary text #FFFFFF, accent #00FF9D, and muted elements #4A4A4A. Typography must use Space Grotesk for headings and JetBrains Mono for all data readouts. 

The core component is a Canvas-based visualization showing a cross-section of a protein block. The simulation calculates heat transfer from the water bath to the center point using the heat equation. The user controls two primary inputs: Bath Temperature (range 50°C–90°C) and Protein Thickness (range 1cm–10cm). 

Visualize the temperature gradient across the protein using a strict color map: cold is #1A1A1A, warm is #4A4A4A, and safe/pasteurized is #00FF9D. A vertical line indicates the 'Core Temperature' location. A horizontal line indicates the 'Pasteurization Threshold' (e.g., 55°C for chicken). 

Implement three specific motions: 1) On load, the grid fades in from a cold blue tint to neutral gray. 2) The core temperature marker pulses at a frequency inversely proportional to the protein thickness (thicker = slower pulse). 3) When dragging the temperature slider, the 'Safe Zone' boundary line must exhibit elastic morphing, snapping sharply when the core temp crosses the pasteurization threshold. 

Include a data panel showing real-time values: Current Core Temp, Time to Pasteurization, and Total Cook Time. Use hairline borders (#4A4A4A) for panels, no drop shadows. Ensure the layout is responsive but optimized for desktop. No external libraries except Google Fonts. The code must be self-contained in one HTML file.

**Layout Details**: 
Desktop layout uses a CSS Grid with `grid-template-columns: 3fr 2fr`. The left column contains the Canvas element, which should fill the available height minus header/footer. The right column is a flex-column stack containing the Control Panel and Data Readout Panel. 
Mobile layout (<768px) stacks these vertically: Header, Canvas (fixed aspect ratio 16:9 or square), Controls, Data. 
Header: Fixed height 60px. Flexbox `justify-content: space-between`. Left: 'CoreTemp' logo (Space Grotesk, 24px, bold). Right: Status Indicator (small dot + text 'Simulating' or 'Safe'). 
Footer: Fixed height 40px. Centered text, muted color #4A4A4A, font-size 12px. 
Control Panel: Contains two custom-styled range inputs. Track color #4A4A4A, Thumb color #00FF9D. Labels above sliders. 
Data Panel: Three distinct rows. Each row has a label (left, muted) and value (right, white, monospace). 

**Motion Details**: 
1. **Entrance**: Canvas opacity transitions from 0 to 1 over 1.5s. Simultaneously, the initial temperature map renders with a blue hue (#003366) that lerps to the standard gradient over 2s. 
2. **Pulse**: The core marker is a 4px circle. Its radius oscillates between 4px and 6px. Frequency `f = 1 / (thickness_cm * 0.5)`. 
3. **Elastic Snap**: The 'Safe Zone' line is drawn on the Canvas. When the user drags the Bath Temp slider, the line's Y-position interpolates with a spring physics model (stiffness 0.1, damping 0.8). When `coreTemp >= threshold`, the line snaps instantly to the threshold Y-position and flashes #00FF9D for 200ms. 

**Constraints**: 
- **Physics**: Use explicit finite difference method for 1D heat equation. Grid size 100 points. Time step dt=0.01s. 
- **Performance**: Use `requestAnimationFrame`. Clear Canvas every frame. 
- **Accessibility**: Sliders must have `aria-label` and `aria-valuenow`. 
- **No External Assets**: Only Google Fonts links allowed. 

**Acceptance Criteria**: 
1. Single HTML file. 
2. Canvas renders heat map. 
3. Sliders update simulation. 
4. Pulse frequency changes with thickness. 
5. Elastic snap on threshold cross. 
6. Entrance animation works. 
7. Data panel updates real-time. 
8. Correct palette and fonts. 
9. No shadows. 
10. Error state on invalid input. 
11. Responsive layout. 

Deliverable: single-file HTML/CSS/JS.
