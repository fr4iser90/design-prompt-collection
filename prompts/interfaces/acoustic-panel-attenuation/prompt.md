Build a single-file HTML interface for 'Decibel', an acoustic planning tool. The primary task is placing sound-absorbing panels onto a 2D room floor plan to minimize echo. The layout must be a dense, calm workspace: a large central Canvas2D area for the room simulation, flanked by a left sidebar for panel inventory and a right sidebar for real-time metrics. Do not use marketing heroes; the tool starts immediately.

Visual Style: Use a dark, professional palette. Background is #2c3e50 (deep slate). UI chrome and text are #ecf0f1 (off-white). Active states and warnings use #e74c3c (alert red). Data visualization and active selections use #3498db (signal blue). Typography must use 'Anton' for all headers and the brand wordmark 'Decibel' in the top-left chrome. Use 'Lato' for all body text, labels, and metrics. Never use Inter, Roboto, Arial, or system-ui fonts. The aesthetic is engineering-precise, not decorative.

Core Interaction: The user drags rectangular 'foam panels' from the left inventory onto the Canvas2D room diagram. Panels snap to a 10px grid. When a panel is placed, the Canvas2D simulation updates instantly. Sound waves originate from a fixed 'Source' point (center). Waves are rendered as expanding concentric arcs. When a wave hits a wall, it reflects. When a wave hits a panel, it is absorbed (rendered as a fading red zone or stopped arc). The right sidebar must display 'Reverb Time (RT60)' and 'Coverage %' updating in real-time as panels are moved.

States: 
1. Default: Empty room, waves bouncing off bare walls, RT60 is high (red indicator).
2. Selection: A panel in the inventory is hovered or a placed panel is selected (blue outline).
3. Empty: If the user deletes all panels, show a subtle 'No Treatment' state in the metrics.
4. Error: If the user tries to place a panel overlapping another, show a brief red flash on the invalid area and prevent placement.

Layout Constraints: 
- Top Bar: 'Decibel' wordmark (Anton), 'New Room' button, 'Export Plan' button. Height: 60px.
- Left Sidebar (250px): Inventory of panel types (1x1, 2x1, Corner). Each item is a draggable card with a small preview.
- Center Canvas: Takes remaining width. Renders the room walls (white lines), the source (blue dot), and waves (semi-transparent blue arcs). Absorbed areas are shaded red.
- Right Sidebar (200px): Metrics panel. Large numbers for RT60 (Lato, bold). Small labels for 'Coverage'.

Motion Details: 
- Entrance: On load, the room walls draw themselves from corners to center over 1s. Then, the first wave ripple emits.
- Ambient: Waves continuously emit from the source every 200ms. They expand and fade. Reflections are visible as secondary arcs.
- Interaction: Dragging a panel shows a ghost preview. On drop, the wave simulation recalculates immediately. There should be no lag between placement and visual feedback.

Hard Constraints: 
- No external libraries except Google Fonts. Use vanilla JS for the Canvas2D logic.
- The simulation does not need to be physically perfect, but it must visually demonstrate absorption (waves stop/fade at panels) vs reflection (waves bounce off walls).
- Ensure high contrast between the dark background and the light UI elements.
- Do not use card shadows for the main layout; use 1px hairlines (#34495e) to separate panels.
- The 'Decibel' brand must be visible in the chrome but not dominate the workspace.
