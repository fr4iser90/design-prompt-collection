## Concept
The 'Decibel' Studio Soundproofing Planner is a specialized engineering tool designed for audio professionals to visualize acoustic treatment. Unlike generic room planners, this interface focuses on the physics of sound propagation. The core value proposition is immediate visual feedback: as users place absorptive materials, they see sound waves dampen in real-time. The design language is 'Engineering Calm'—dense, precise, and devoid of marketing fluff. It prioritizes the canvas as the primary workspace, with supporting panels for input and data.

## Primary task
The user's goal is to reduce the room's Reverb Time (RT60) to a target level by strategically placing foam panels. 
1. Select a panel type from the left inventory.
2. Drag it onto the central room diagram.
3. Observe the change in wave behavior (absorption vs. reflection).
4. Monitor the RT60 metric in the right sidebar.
5. Repeat until the target RT60 is reached or the room is fully treated.

## States
- **Default**: The room is empty. Waves bounce off all four walls. RT60 is high (displayed in red). The canvas shows a clean grid.
- **Hover/Selection**: When hovering over an inventory item, it highlights with a blue border. When a placed panel is selected, it shows a blue outline and handles for resizing (if applicable).
- **Active Drag**: A semi-transparent ghost of the panel follows the cursor. The grid snaps the ghost to 10px increments.
- **Error**: If a panel is dropped overlapping another or outside the room bounds, the ghost turns red, and a subtle shake animation occurs. The drop is rejected.
- **Empty/Reset**: If all panels are removed, the metrics return to the 'Bare Room' baseline. A subtle 'No Treatment' label appears in the metrics panel.

## Palette
- **Background**: #2c3e50 (Deep Slate) - Used for the main app background and canvas background.
- **Ink/Text**: #ecf0f1 (Off-White) - Used for all text, UI icons, and room walls.
- **Accent/Warning**: #e74c3c (Alert Red) - Used for high RT60 values, error states, and absorbed wave zones.
- **Data/Active**: #3498db (Signal Blue) - Used for sound waves, selected panels, and primary buttons.
- **Hairlines**: #34495e (Slate Grey) - Used for borders between panels and grid lines.

## Type
- **Display**: 'Anton' - Used for the 'Decibel' wordmark, section headers ('Inventory', 'Metrics'), and large metric numbers (RT60). It provides a strong, industrial presence.
- **Body**: 'Lato' - Used for all labels, button text, tooltips, and small data points. It is clean and legible at small sizes.
- **Constraint**: Never use Inter, Roboto, Arial, or system-ui. The font stack must explicitly load Anton and Lato from Google Fonts.

## Layout
- **Structure**: A three-column flexbox layout. 
- **Top Bar (60px)**: Contains the 'Decibel' wordmark (Anton, 24px, left-aligned) and utility buttons ('New', 'Export') on the right. Background #2c3e50, bottom border 1px #34495e.
- **Left Sidebar (250px)**: 'Panel Inventory'. Contains draggable cards for panel types (e.g., 'Standard Foam', 'Corner Trap'). Each card is a simple rectangle with a preview icon and label. Background #2c3e50, right border 1px #34495e.
- **Center Canvas (Flex-grow)**: The main workspace. Renders the room outline, grid, source point, and wave simulation. Background #2c3e50.
- **Right Sidebar (200px)**: 'Acoustic Metrics'. Displays 'RT60' (large Anton number), 'Coverage %', and 'Panel Count'. Background #2c3e50, left border 1px #34495e.

## Motion
- **Entrance**: On page load, the room walls animate drawing from the corners inward over 800ms. After completion, the first sound wave ripple emits from the center.
- **Ambient**: Sound waves continuously emit from the source point every 200ms. They expand as concentric arcs. When hitting a wall, they reflect (bounce). When hitting a panel, they fade out rapidly (absorption). The intensity of the wave decreases with distance.
- **Interaction**: Dragging a panel from the inventory creates a 'ghost' element. On drop, the simulation recalculates instantly. There is no transition delay; the wave behavior changes the frame after placement.

## Constraints
- **Technology**: Single HTML file. Vanilla JavaScript for Canvas2D rendering. No React/Vue/Svelte unless strictly necessary for state management (prefer vanilla for simplicity).
- **Performance**: The wave simulation must run at 60fps. Limit the number of active wave arcs to prevent lag.
- **Visuals**: Do not use drop shadows. Use 1px borders for separation. Do not use gradients for UI elements; use flat colors.
- **Accessibility**: Ensure text contrast meets WCAG AA. Provide aria-labels for interactive elements.
- **Anti-Cliche**: Avoid purple glow effects. Avoid generic 'dashboard' widget soup. The interface must feel like a specialized CAD or engineering tool, not a SaaS landing page.

## Acceptance criteria
- [ ] The 'Decibel' wordmark is visible in the top-left using the 'Anton' font.
- [ ] All body text uses 'Lato'. No Inter/Roboto/Arial is present in the computed styles.
- [ ] The room walls animate drawing on load.
- [ ] Users can drag panels from the left sidebar to the canvas.
- [ ] Panels snap to a 10px grid.
- [ ] Sound waves are rendered as expanding arcs.
- [ ] Waves reflect off bare walls.
- [ ] Waves are absorbed (fade/stop) when hitting placed panels.
- [ ] The RT60 metric updates in real-time as panels are added/removed.
- [ ] Overlapping panels trigger an error state (red flash/shake).
- [ ] The layout is responsive but maintains the 3-column structure on desktop.
- [ ] No marketing hero section exists; the tool is visible immediately.

## Type pairing
Anton + Lato
