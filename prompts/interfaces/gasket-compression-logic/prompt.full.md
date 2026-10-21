## Concept
Create a high-fidelity, single-view utility interface for 'SealTech', a mechanical seal configuration tool. The design language is 'soft-machine': calm, precise, and tactile. It draws inspiration from industrial design, aluminum finishes, and porcelain, explicitly avoiding steampunk or retro-industrial clichés. The core value proposition is gamifying engineering tolerances by making 'fit' a physical, visual constraint rather than just a numerical check. The interface should feel like a CAD-lite tool, prioritizing spatial understanding and immediate feedback.

## Primary task
The user must stack various gasket materials (Rubber, Graphite, Metal) into a fixed flange gap. The goal is to achieve a 'Valid Seal' state, which requires the total stack thickness to be within a specific tolerance range (not too thin to leak, not too thick to prevent clamping). The interface must provide immediate visual feedback on compression and fit. Users can add, remove, and reorder gaskets. The system calculates effective thickness based on material compressibility when constrained by the flange gap.

## States
1.  **Empty/Default**: The flange gap is visible and empty. A subtle instruction in IBM Plex Mono: 'DRAG GASKET TO START'. The flanges are open. The background is clean porcelain.
2.  **Assembly/Active**: Gaskets are present in the gap. The stack height is visible. The total thickness is calculated and displayed. If the stack is within range, the flanges are shown as 'ready to clamp'. The 'Clamp' button is enabled and pulses subtly if valid.
3.  **Gap Error (Over-thick)**: The total thickness exceeds the flange gap capacity. The flanges remain open. A red (`#D9534F`) pulsing glow emanates from the gap, indicating leakage risk or mechanical interference. Text overlay: 'INTERFERENCE DETECTED'. The 'Clamp' button is disabled and greyed out.
4.  **Under-Compression (Too thin)**: The stack is too thin to create a seal (optional advanced state, or simplified to 'Leak Risk'). If implemented, show a subtle warning icon, not a full error. The 'Clamp' button is enabled but shows a warning tooltip.
5.  **Valid/Clamped**: The stack thickness is correct. The flanges clamp shut with a visual 'thud' (screen shake). The red glow disappears. A success indicator appears. The 'Clamp' button becomes 'Reset'.

## Palette
-   **Background**: `#F2F0ED` (Porcelain White) - Clean, neutral, non-distracting.
-   **Ink/Primary**: `#2C2C2C` (Graphite) - For all text, icons, and primary UI lines.
-   **Accent/Error**: `#D9534F` (Leak Red) - Used ONLY for errors, warnings, and the 'gap' glow. Do not use for decorative elements.
-   **Metallics**: Use CSS gradients for flanges (linear-gradient from #E0E0E0 to #BDBDBD) to simulate brushed aluminum. Gaskets should have distinct material colors: Rubber (#333), Graphite (#111 with layered lines), Metal (#C0C0C0).
-   **Success**: `#2E7D32` (Industrial Green) for the valid state indicator.

## Type
-   **Headings/Labels**: 'Neue Haas Grotesk' (or Helvetica Now). Clean, grotesque, industrial.
-   **Data/Numbers**: 'IBM Plex Mono'. Used for thickness measurements (e.g., '2.5mm'), tolerance limits, and status codes. This reinforces the 'engineering tool' feel.
-   **Hierarchy**: Keep text minimal. The UI is spatial, not textual. Use large, bold numbers for the current stack thickness. Font sizes: Labels 12px, Data 16px, Status 14px.

## Layout
-   **Container**: Full viewport or centered 1200x800 canvas. Max-width 1400px.
-   **Left/Top Panel (Tray)**: A list of draggable gasket types. Each item is a visual representation of the gasket (e.g., a small black rectangle for rubber) with its name and thickness in mono type. No cards with shadows; use flat surfaces with 1px hairline borders (`#E5E5E5`). Height 100% on desktop, fixed height on mobile.
-   **Center (Assembly View)**: 
    -   Two large, rectangular flange plates aligned horizontally. 
    -   The gap between them is the drop zone.
    -   Below the gap, a 'Readout' area shows: 'TOTAL THICKNESS: [Value]mm', 'TOLERANCE: [Min]-[Max]mm'.
-   **Density**: High but calm. No dashboard widgets. No marketing copy. The tool IS the content.
-   **Mobile**: Tray becomes a bottom sheet. Assembly view scales to fit. Touch targets min 44px.

## Motion
1.  **Entrance**: On load, the two flange plates slide in from the left and right edges to their resting position (open state). Use a heavy ease-out curve (cubic-bezier(0.25, 1, 0.5, 1)) to simulate weight. Duration 1.2s.
2.  **Drag Interaction**: When dragging a gasket from the tray, the ghost image follows the cursor. The target gap highlights subtly with a dashed border.
3.  **Drop & Compression**: 
    -   Upon dropping, the gasket snaps into the stack.
    -   **Crucial**: If the addition of the new gasket causes the total stack height to exceed the 'free height' (the height of uncompressed gaskets), the existing layers in the stack must visually compress (scaleY < 1). This animation should be smooth (0.3s ease-in-out).
4.  **Clunk (Success)**: When the user clicks 'Clamp' (or auto-clamps if valid), the flanges slide together rapidly. Trigger a small, sharp screen shake (translateX/Y random small values for 100ms) and a metallic 'clunk' visual pulse.
5.  **Leak Pulse (Error)**: If in 'Gap Error' state, a red radial gradient pulses in the gap space (opacity 0.4 -> 0.8 -> 0.4 over 2s).
6.  **Removal**: When a gasket is removed, the stack expands smoothly to its new free height or compressed state.

## Constraints
-   **No AI Defaults**: Avoid purple gradients, glassmorphism, or generic SaaS layouts. 
-   **No Emojis**: Use simple SVG icons or CSS shapes for UI indicators.
-   **Realistic Physics Lite**: The compression logic must feel plausible. Rubber compresses more than Metal. You can simulate this by having different 'compressibility' factors for each material type that affect how much the stack squishes.
-   **Single File**: All HTML, CSS, and JS in one file. 
-   **Responsive**: Should work on desktop. Mobile can be a simplified version or hidden if too complex. Ensure touch events are handled for drag-and-drop.
-   **Accessibility**: Ensure drag-and-drop has keyboard fallbacks (select from list, add button). Use ARIA labels for status changes.

## Acceptance criteria
-   [ ] The flanges slide in on page load with a weighted animation.
-   [ ] Users can drag at least 3 distinct gasket types from the tray into the flange gap.
-   [ ] Stacking gaskets updates the 'Total Thickness' readout in real-time using IBM Plex Mono.
-   [ ] If Total Thickness > Max Tolerance, the flanges do NOT close, and a red pulsing glow appears in the gap.
-   [ ] If Total Thickness <= Max Tolerance, the user can trigger a 'Clamp' action.
-   [ ] The 'Clamp' action triggers a screen shake effect and closes the flanges.
-   [ ] Existing gaskets in the stack visually compress (scaleY) when new ones are added and the stack exceeds free height.
-   [ ] No marketing copy, heroes, or dashboard widgets are present.
-   [ ] Typography is strictly Neue Haas Grotesk and IBM Plex Mono.
-   [ ] The color palette is strictly #F2F0ED, #2C2C2C, #D9534F (plus metallic gradients).
-   [ ] The interface works without external assets (fonts via Google Fonts CDN allowed).
-   [ ] Keyboard navigation works for adding/removing gaskets.
-   [ ] Mobile layout adapts correctly without breaking the assembly view.
