## Concept
'Tremor Log' is a server health monitor that rejects the ephemeral nature of digital logs. Instead of refreshing dashboards with glowing dots, it presents server uptime as a physical, mechanical seismograph. The core thesis is permanence: errors are recorded as ink traces on a rotating drum. Once written, they cannot be erased. This creates a sense of weight and responsibility for system stability. The UI is a single, focused tool surface, not a dashboard. It is a 'drum chamber' where the user observes and annotates.

## Primary task
The user's primary task is to observe server latency via the ink trace and annotate critical incidents by dragging the pen arm to create permanent ink blots. The interface must clearly communicate the 'read-only' nature of the data and the 'write-only' nature of the annotations.

## States
1. **Idle/Spinning**: The drum rotates at a constant speed. The pen arm hovers slightly above the paper, vibrating subtly. A thin, steady ink line is being drawn.
2. **Annotation (Active)**: The user clicks and holds the pen arm. The arm lowers to touch the paper. A thick, irregular ink blot forms. Dragging the mouse moves the arm, smearing the ink. The ink is permanent.
3. **Critical Spike**: Simulated data causes a sudden latency spike. The pen arm vibrates violently, drawing a jagged, thick line. The line color shifts to #d9534f (red) for the duration of the spike.
4. **Empty/Start**: On initial load, the drum is empty. The pen arm lowers, and the first line begins to draw.

## Palette
- **Paper/Background**: #f2f0ec. A warm, off-white paper color. Apply a subtle CSS noise filter or SVG turbulence to simulate paper grain. This is the primary canvas.
- **Ink/Chrome**: #1a1a1a. A deep, near-black. Used for the pen arm, the standard ink line, all text, and UI borders. It should feel like heavy, wet ink.
- **Alert/Error**: #d9534f. A muted, brick red. Used ONLY for critical latency spikes in the ink line and the 'Critical' status text. Do not use for buttons or general UI accents. It should feel like a warning stamp, not a neon glow.

## Type
- **Data & Readouts**: 'JetBrains Mono'. Use for all numerical data (latency ms, timestamps, status codes). It must be crisp, monospaced, and precise. Font size: 14px for data, 12px for timestamps.
- **Labels & Instructions**: 'Source Sans Pro'. Use for the brand wordmark 'Tremor Log', section headers ('Control Panel'), and instructional text ('Drag to Annotate'). Font size: 16px for headers, 14px for instructions. Weight: 400 (Regular) or 600 (Semi-Bold). 
- **Hierarchy**: The brand wordmark should be small and understated, located in the top-left of the Control Panel. The data readouts should be prominent but not shouting. The instructional text should be subtle, guiding the user without cluttering the view.

## Layout
- **Grid**: A simple two-column layout. Left column (70%) is the 'Drum Chamber'. Right column (30%) is the 'Control Panel'.
- **Drum Chamber**: Full height of the viewport. The drum is a horizontal cylinder. The ink line is drawn across the center. The pen arm is anchored at the top center of this column, extending down to the drum.
- **Control Panel**: Full height. Background: #f2f0ec. Border-left: 1px solid #1a1a1a. Contains the brand wordmark, a 'Current Status' readout (e.g., 'Latency: 45ms'), and a 'History' list (optional, minimal text list of recent annotations). No cards, no widgets. Just text and hairlines.
- **Density**: Keep the Control Panel sparse. Use ample whitespace. The focus must remain on the drum. The Control Panel is a reference, not a control center.

## Motion
- **Entrance**: The drum starts spinning from a standstill, accelerating over 2 seconds to a steady speed. The pen arm lowers from a 'hover' position to a 'touch' position with a slight mechanical bounce (ease-out-back). 
- **Ambient**: The pen arm has a constant, low-frequency vibration (1-2px amplitude, 10-15Hz) to represent baseline server noise. The ink line thickness varies slightly with this vibration (thicker when vibrating more). 
- **Interaction**: When the user clicks the pen arm, it lowers instantly. When dragging, the ink blot grows and smears. The ink blot should have an irregular, organic edge, not a perfect circle. Use a canvas blur or noise filter to achieve this. When released, the pen arm lifts back up with a slight delay (ease-in).
- **Critical Spike**: When a spike occurs, the vibration amplitude increases dramatically (5-10px). The ink line becomes jagged and thick. The color shifts to #d9534f. The transition should be abrupt, not smooth.

## Constraints
- **No Cards**: Do not use card components. Use panels and hairlines.
- **No Glows**: Do not use box-shadow glows or neon effects. The 'glow' should be simulated by ink bleed (canvas blur) if necessary, but keep it subtle.
- **No Dashboard Widgets**: Do not add charts, graphs, or status dots. The only visualization is the seismograph line.
- **Permanence**: The ink blots must persist. Do not allow deletion. 
- **Performance**: Use requestAnimationFrame for the drum rotation and vibration. Optimize canvas rendering to avoid lag.
- **Accessibility**: Ensure the Control Panel text has sufficient contrast. Provide a text-based status readout for screen readers.

## Acceptance criteria
1. **Visuals**: The drum rotates smoothly. The ink line is drawn continuously. The pen arm vibrates subtly. The paper texture is visible.
2. **Interaction**: Clicking and dragging the pen arm creates a permanent ink blot. The blot smears when dragged. The blot cannot be deleted.
3. **States**: The 'Critical' state changes the ink color to #d9534f and increases vibration. The 'Annotation' state lowers the pen arm.
4. **Typography**: 'JetBrains Mono' is used for all data. 'Source Sans Pro' is used for labels. No system fonts.
5. **Layout**: The two-column layout is maintained. The Control Panel is sparse and clean.
6. **Code**: Single HTML file. No external libraries. Canvas used for rendering.
7. **Feel**: The interface feels physical and heavy, not digital and light. The permanence of the ink is clear.
