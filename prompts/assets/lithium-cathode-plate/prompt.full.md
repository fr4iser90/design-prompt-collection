## Concept
ION CELL presents 'Lithium Cathode Plate', a 2D sprite pack for sci-fi UI and game assets. The fantasy is industrial energy storage: robust, brushed-metal battery plates with precise terminal contacts and internal lithium-blue emission. The core mechanic is voltage control: a slider adjusts the sprite's glow intensity and animation speed, simulating charge/discharge cycles. This is not a generic laser pack; it is a tactile, material-honest asset set. The studio interface itself should feel like a piece of engineering software, with sharp lines, monospace data, and a dark, utilitarian aesthetic.

## Palette
- **#0A0A0A:** Anodized casing, deep shadows, background.
- **#4B4B4B:** Brushed aluminum mid-tone, plate body.
- **#2A2A2A:** Brushed aluminum shadow, bevel depth.
- **#00E5FF:** Lithium emission, electrolyte glow, active state.
- **#FFFFFF:** Terminal specular highlights, spark cores.
- **#1A1A1A:** UI chrome, borders.
- **#001111:** Ambient glow tint on background when voltage is high.

## Type
- **Display:** Chakra Petch (700). Used for pack title, section headers. Industrial, sharp.
- **Body:** IBM Plex Mono (400). Used for labels, voltage values, frame counts. Technical, precise.
- **Hierarchy:** Title is 24px, Headers 18px, Labels 12px, Data 10px. Ensure high contrast against the dark background.

## Layout
- **Header:** ION CELL logo (text-based), pack title, voltage slider (horizontal, styled as a physical knob).
- **Main Viewer:** Canvas 2D area (800x600px). Displays the selected sprite frame at 4x scale. Background is #0A0A0A with a subtle grid.
- **Filmstrip:** Horizontal scrollable list of all frames below the viewer. Each thumbnail is 64x64px. Selected frame has a #00E5FF border.
- **Sidebar:** Inventory list (counts, types), download buttons (PNG Atlas, SVG), style bible summary.
- **Mobile Layout:** On screens < 768px, the sidebar moves to the bottom or becomes a collapsible drawer. The canvas width is 100% of the viewport. The filmstrip remains horizontal but scrolls with touch inertia.

## Motion
- **Entrance:** Sprite sheet slides up from bottom. Terminal sparks animate briefly.
- **Ambient:** Internal glow pulses slowly (1Hz) at 50% voltage. Pulse speed increases with voltage.
- **Interaction:** Voltage slider rotation (or drag) updates emission brightness (0-100% opacity of #00E5FF) and frame speed (1x to 4x). Sparks appear at terminals when voltage > 80%.
- **Micro-interactions:** Hovering over filmstrip thumbnails brightens them slightly. Clicking a download button triggers a brief 'processing' state with a spinner icon before the file downloads.

## Pack type
2D sprite pack. Includes idle, charge, discharge animations, terminals, bubbles, UI plates, VFX.

## Style bible
- **Materials:** Brushed aluminum (grainy gradient, #4B4B4B to #2A2A2A), anodized casing (#0A0A0A), glowing electrolyte (#00E5FF).
- **Edge Language:** Hard bevels (1px highlight top-left, 1px shadow bottom-right). Terminals are cylindrical with specular highlights.
- **Silhouette:** Readable at 64px. Rectangular plates with 4px rounded corners. Terminals protrude.
- **Light:** Internal emission only. No external light. Glow intensity maps to voltage.

## Inventory
1. **Hero Plate Idle:** 4 frames (64x64px). Subtle pulse.
2. **Hero Plate Charge:** 8 frames (64x64px). Rising glow, sparks.
3. **Hero Plate Discharge:** 8 frames (64x64px). Fading glow, bubbles.
4. **Terminal Contacts:** 4 variants (16x16px). Pos/Neg, clean/dirty.
5. **Electrolyte Bubbles:** 6 frames (8x8px). Rising, fading.
6. **UI Plates:** 3 frames (32x32px). Low/Med/High charge.
7. **VFX Sparks:** 4 frames (16x16px). White-blue sparks.

## Download
- **PNG Atlas:** Single image containing all frames in a grid. Transparent background.
- **SVG:** Vector outlines for plates and terminals. No raster images.
- **JSON:** Metadata for frame counts, dimensions, animation speeds.

## Viewer
- **Filmstrip:** Horizontal scroll. Click to select frame.
- **Voltage Slider:** Range 0-100. Drives emission brightness and animation speed.
- **Poster Frame:** @1.5s shows full atlas grid with hero plate at 50% voltage.
- **Real-time Update:** Slider changes sprite rendering immediately.

## Constraints
- Single HTML file. No external assets.
- Canvas 2D only. No WebGL.
- Sprites generated procedurally or embedded as base64.
- Bevels visible at 64px. No flat colors.
- Voltage slider updates sprite in real-time.
- No stick figures, no flat neon glows, no primitive shapes.

## Acceptance criteria
- [ ] Single HTML file loads without errors.
- [ ] Canvas 2D renders sprites with brushed aluminum bevels.
- [ ] Voltage slider adjusts glow intensity and animation speed.
- [ ] Filmstrip displays all frames correctly.
- [ ] Download PNG Atlas generates a valid image file.
- [ ] Download SVG generates a valid vector file.
- [ ] Type pairing is Chakra Petch + IBM Plex Mono.
- [ ] Colors match palette (#0A0A0A, #4B4B4B, #00E5FF).
- [ ] Sprites are readable at 64px.
- [ ] No external asset CDNs used.
- [ ] Mobile layout stacks correctly and remains usable.
- [ ] Real-time voltage updates are smooth (60fps).
- [ ] All interactive elements have accessible focus states.
- [ ] The generated atlas is correctly aligned with no bleeding between frames.
