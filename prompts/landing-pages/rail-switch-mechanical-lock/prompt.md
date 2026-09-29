Build a single-file HTML/CSS/JS landing page for 'SwitchPoint', a railway logistics platform. The design must reject all SaaS clichés (no gradients, no floating cards, no soft shadows). The aesthetic is 'Signal Warning': raw industrial utility, high-contrast monochrome, and tactile mechanical feedback.

**Visual Composition & Layout**
The viewport is dominated by a single, full-bleed visual plane representing a macro-view of a railway switch (point). This is not a background image behind text; it is the primary interface. The layout is split vertically or horizontally depending on aspect ratio, but the 'Rail Assembly' must occupy at least 60% of the visual weight.

1.  **Background/Canvas**: Use `#2C2C2C` as the base. The rail tracks themselves are rendered in `#F5F5F5` (steel white) with subtle noise textures to simulate brushed metal. Do not use pure black.
2.  **Typography**: Use 'Anton' for the brand name 'SwitchPoint' and headline. It must be massive, condensed, and tight-tracked. Use 'IBM Plex Sans' for all functional labels, data readouts, and the CTA. No other fonts.
3.  **Hero Content**: Positioned in the negative space of the rail assembly. The headline should be something like 'LOCK THE ROUTE' or 'MECHANICAL CERTAINTY'. It must feel stamped or stenciled, not typed.
4.  **No Cards**: Do not wrap content in white boxes with rounded corners. Use borders, dividers, and background color shifts to separate sections. The 'Route Data' reveal should appear as a digital overlay on the steel, not a pop-up.

**The Core Interaction: The Lever**
The central interactive element is a 'Switch Lever' (a UI slider styled as a heavy mechanical handle).

1.  **Mechanism**: When the user drags the lever, the 'rails' in the visual plane must physically shift. This is not a simple CSS transform. The rails should slide horizontally (or pivot) to align with a new path.
2.  **Physics**: Implement resistance. As the lever approaches the 'locked' position (e.g., 80-100% drag), the movement should become harder to drag (simulating magnetic or mechanical lock resistance). If released before locking, it should snap back slightly or settle, but not fully lock.
3.  **Feedback**: When the lock is engaged, the UI should change state. The rails align perfectly. A `#FFB300` (Safety Yellow) indicator lights up. The text 'LOCKED' appears in Anton font, large and bold. The route data (e.g., 'Sector 7: Clear', 'Cargo: Steel') fades in or stamps onto the screen.
4.  **Ambient Motion**: Even when idle, the rail tracks should have a very subtle, rhythmic vibration (1-2px translate) to simulate the hum of distant trains or machinery. This should be continuous but low-amplitude.

**Technical Constraints**
-   **Single File**: All HTML, CSS, and JS in one file.
-   **No External Assets**: Use CSS gradients, SVGs, or Canvas for the rail visuals. No JPGs/PNGs.
-   **Performance**: The drag interaction must be smooth (60fps). Use `requestAnimationFrame` for the rail movement logic.
-   **Accessibility**: Ensure the slider is keyboard accessible. Add aria-labels for the 'Locked' state.
-   **Color Usage**: `#FFB300` is ONLY for the active/locked state indicator and critical warnings. Do not use it for links or general accents. The default state is monochrome.

**Content Structure**
1.  **Header**: Minimal. Brand name 'SwitchPoint' (Anton) in top-left. No nav links. Maybe a status indicator 'SYSTEM: ONLINE' in IBM Plex Sans.
2.  **Hero/Main**: The Rail Assembly + Lever. Headline 'ROUTING IS PHYSICS'.
3.  **Subtext**: 'SwitchPoint replaces digital guesswork with mechanical certainty. One lever. One path. Zero error.'
4.  **CTA**: 'INITIALIZE SWITCH' (Button styled like a physical toggle or a stamped button, not a pill). Hover state: Inverts colors or adds a `#FFB300` outline.
5.  **Footer**: Minimal copyright, small print, maybe a serial number 'SP-001-IND'.

**Anti-Patterns to Avoid**
-   Do not use drop shadows on the rails. Use highlights and lowlights to create depth.
-   Do not use rounded corners on the rails or the lever. They must be sharp, industrial, or chamfered.
-   Do not use purple, blue, or green. Stick to the specified palette.
-   Do not make the interaction feel 'bouncy' or 'elastic'. It must feel 'heavy' and 'magnetic'.

**Implementation Notes**
-   Use CSS `filter: drop-shadow` sparingly for the lever handle to give it lift from the track.
-   The 'vibration' can be achieved with a CSS animation on the container of the rail SVG/CSS.
-   The 'lock' snap should trigger a subtle scale pulse on the 'LOCKED' text.
-   Ensure the layout is responsive. On mobile, the rail assembly should stack vertically, and the lever should be larger for touch.
