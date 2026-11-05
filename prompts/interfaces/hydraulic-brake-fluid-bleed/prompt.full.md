## Concept
'Bleed Logic' is a specialized utility interface for automotive technicians to visualize and simulate the hydraulic brake bleeding process. It adopts an 'instrument panel' aesthetic, prioritizing clarity, precision, and functional feedback over decorative elements. The core metaphor is a live schematic where the user interacts directly with the hydraulic system's geometry.

## Primary task
The user's primary task is to remove air bubbles from a simulated brake line by manipulating a virtual bleed valve. The success metric is clearing all bubbles from the tubing into the catch cup without triggering alignment errors.

## States
1. **Default (Sealed):** The system is closed. Bubbles drift slowly within the tube due to simulated buoyancy. The bleed valve is closed. Status displays 'SYSTEM SEALED'.
2. **Active (Bleeding):** The user drags the valve handle. Fluid flow is visualized via a moving gradient or displacement of bubbles. Status displays 'BLEEDING ACTIVE' with a real-time bubble count.
3. **Success (Clear):** All bubbles have entered the catch cup and popped. Status displays 'SYSTEM CLEAR'. A 'Reset Simulation' button appears.
4. **Error (Misaligned):** If the drag interaction deviates from the valve's valid path, the handle turns red, and a toast notification 'VALVE MISALIGNED' appears in the status log. Interaction halts until corrected.

## Palette
- **Background:** #111111 (Deep Charcoal) - Provides high contrast for schematic lines.
- **Ink:** #F0F0F0 (Off-White) - Used for schematic strokes, text, and bubble fills.
- **Accent:** #FF4400 (Safety Orange) - Used exclusively for the interactive valve handle and active state indicators.
- **UI Elements:** #333333 (Dark Gray) - For borders, dividers, and inactive UI elements.
- **Error:** #FF3333 (Red) - For error states only.
- **Success:** #00FF00 (Bright Green) - For final success state only.

## Type
- **Display:** Space Grotesk (Medium/Bold). Used for the 'Caliper' wordmark, section headers ('HYDRAULIC SCHEMATIC', 'STATUS LOG'), and key metrics. It conveys a modern, technical, slightly industrial feel.
- **Body/Mono:** IBM Plex Mono. Used for all data readouts (bubble count, pressure levels, timestamps), labels, and error messages. This reinforces the diagnostic tool nature.
- **Hierarchy:** Small font sizes (12-14px) for body, 18-24px for headers. Tight line-heights (1.2) to maintain density.

## Layout
- **Grid:** A 2-column layout. Left sidebar (250px fixed width) for controls/status. Right main area (flex-grow) for the SVG canvas.
- **Sidebar:** Contains the 'Caliper' logo at the top, followed by 'Status Log' (scrollable), 'Bubble Count', and 'Reset' button. Separated by 1px #333333 borders.
- **Canvas:** Centered SVG element. Padding around the SVG to prevent clipping. The SVG itself should fill the available space while maintaining aspect ratio.
- **Density:** High information density but low visual noise. Use whitespace strategically to separate functional zones. No card containers; use borders and background color shifts to define areas.

## Motion
1. **Entrance:** On load, the SVG paths draw themselves from left to right over 1.5 seconds using `stroke-dasharray` and `stroke-dashoffset` CSS animations. This establishes the 'schematic' context immediately.
2. **Ambient:** Bubbles (white circles) drift upward and slightly left with a sinusoidal wobble when the system is sealed. This indicates they are present and trapped.
3. **Interaction:** 
   - **Valve Drag:** The valve handle follows the cursor smoothly. 
   - **Fluid Push:** When the valve is dragged open, bubbles in the adjacent tube segment accelerate towards the outlet. A subtle 'wave' effect (opacity gradient moving right) can enhance the sense of fluid displacement.
   - **Pop:** When a bubble enters the catch cup, it scales up (1.0 to 1.5) and fades out (opacity 1 to 0) over 200ms. This provides clear feedback that the task step is complete.

## Constraints
- **No Marketing Chrome:** Do not include 'Hero' sections, large images, or persuasive copy. The interface is a tool.
- **No Generic Dials:** Avoid circular gauge metaphors. Use the linear schematic as the primary visualization.
- **Strict Colors:** Do not introduce additional colors beyond the palette. No gradients on text or borders.
- **Responsive:** The SVG must scale down gracefully on smaller screens, potentially stacking the sidebar below the canvas on mobile, but maintaining the schematic's readability.
- **Performance:** Use CSS transforms for animations where possible. Limit the number of DOM elements for bubbles (e.g., max 10-15).
- **Accessibility:** Ensure the valve handle is keyboard accessible (arrow keys to move). Provide ARIA labels for status changes.

## Acceptance criteria
- [ ] The interface loads with a dark background (#111111) and white schematic lines (#F0F0F0).
- [ ] The 'Caliper' brand is visible in Space Grotesk in the top-left.
- [ ] The SVG diagram draws itself on load (1.5s animation).
- [ ] Bubbles are visible in the tubing and drift slowly when static.
- [ ] The bleed valve handle is draggable and colored #FF4400.
- [ ] Dragging the valve causes bubbles to move towards the catch cup.
- [ ] Bubbles 'pop' (scale/fade) when entering the catch cup.
- [ ] The bubble count decreases in real-time as bubbles pop.
- [ ] When all bubbles are cleared, the status changes to 'SYSTEM CLEAR'.
- [ ] A 'Reset' button is visible and functional after clearing.
- [ ] If the valve is dragged out of bounds, an error state is triggered.
- [ ] No Inter, Roboto, or Arial fonts are used.
- [ ] No cards with shadows or rounded corners are used for the main layout.
- [ ] The interface feels like a diagnostic tool, not a marketing site.

## Type pairing
Display: Space Grotesk (Medium) + Body: IBM Plex Mono (Regular)
