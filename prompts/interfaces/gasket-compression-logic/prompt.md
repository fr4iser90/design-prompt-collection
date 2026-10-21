Build a single-view interface for 'SealTech', a mechanical seal configuration tool. The aesthetic is 'soft-machine': calm, industrial, utilizing aluminum, porcelain, and gasket textures. Avoid steampunk clichés; aim for high-precision modern engineering.

**Layout & Structure**
The interface is split into two primary zones: a 'Component Tray' (left or top) and the 'Assembly View' (center). The background is `#F2F0ED` (Porcelain White). The primary text is `#2C2C2C` (Graphite). Error states use `#D9534F` (Leak Red). On desktop, the tray is a fixed 300px sidebar on the left, while the assembly view occupies the remaining flexible space. On mobile, the tray collapses into a bottom sheet or horizontal scrollable strip, and the assembly view scales down to fit the viewport width, maintaining aspect ratio for the flanges.

**Typography**
Use 'Neue Haas Grotesk' for UI labels and 'IBM Plex Mono' for numerical data (thickness, tolerance). Do not use Inter or Roboto. Type should feel technical and precise. Headings are uppercase, tracking 0.05em. Data values are tabular-nums.

**The Assembly View (Core Mechanic)**
1. **Flanges**: Two heavy, metallic plates (rendered with subtle gradients to imply aluminum/steel) slide in from the left and right to form the container. They have a fixed inner gap height (e.g., 10mm). The flanges have bolt holes on the outer edges for visual realism.
2. **Gaskets**: The tray contains draggable gasket elements. Types: Rubber (soft, dark grey, high compressibility), Graphite (layered, black, medium compressibility), Metal (thin, silver, low compressibility). Each has a defined thickness and material property.
3. **Stacking**: Users drag gaskets into the flange gap. Snap zones are indicated by subtle dashed lines.
4. **Compression Logic**: 
   - When a gasket is dropped, it snaps into the stack.
   - **Visual Feedback**: The existing layers in the stack must visually compress (scale down vertically) to accommodate the new total height if the total thickness exceeds the natural free-height of the stack but is still within the flange gap. This mimics real-world squish. The compression factor is material-dependent (Rubber squishes more than Metal).
   - **Tolerance Check**: If Total Thickness > Flange Gap, the flanges cannot close. Show a 'Gap Error'. The flanges remain open, and a red pulsing glow appears in the gap space. The glow should have a blur radius of 10px and pulse opacity from 0.3 to 0.7 over 2 seconds.
   - **Success State**: If Total Thickness <= Flange Gap (and >= minimum compression threshold), the flanges clamp shut with a 'clunk' (screen shake effect) and the seal is 'Valid'. The shake should be 4px amplitude, 100ms duration.

**States**
- **Default**: Empty flange gap. Prompt: 'Drag gasket to begin.'
- **Selection**: Hovering over a gasket in the tray highlights it with a 1px border in `#2C2C2C`.
- **Assembly**: Gaskets are stacked. Numbers update in real-time. The 'Total Thickness' readout is large and centered below the gap.
- **Error (Gap)**: Red glow, flanges open, text: 'OVERPRESSURE: REMOVE LAYER'. The 'Clamp' button is disabled.
- **Success**: Flanges clamped, green/neutral indicator, text: 'SEAL VALID'. The 'Clamp' button changes to 'Reset'.

**Motion Details**
- **Entrance**: Flanges slide in with weight (ease-out cubic, 1.2s duration).
- **Ambient**: If in 'Gap Error' state, the red glow pulses slowly (2s cycle). If idle, the flanges have a subtle metallic sheen animation moving across them every 10s.
- **Interaction**: Dragging a gasket shows a ghost preview with 50% opacity. Dropping it triggers a small bounce/settle animation (scaleY 1.1 -> 1.0). If compression occurs, existing layers smoothly scale Y over 0.3s.

**Constraints**
- No marketing hero text above the tool.
- No card grids. The UI elements ARE the parts.
- Use hairlines for borders, not drop shadows.
- Single HTML file with embedded CSS/JS.
- Ensure the 'squish' effect is visible but not exaggerated cartoonishly.
- Handle edge cases: removing a gasket from the middle of the stack (recalculate compression for layers above/below).
- Keyboard accessibility: Tab through tray items, Enter to add to stack, Backspace to remove last.

Deliverable: single-file HTML/CSS/JS.
