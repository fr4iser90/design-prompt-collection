Build a single-file HTML asset studio for 'Lithium Cathode Plate', a 2D sprite pack by ION CELL. The visual truth is industrial battery hardware: brushed aluminum plates, precise terminal contacts, and internal lithium-blue emission that reacts to voltage. Use Canvas 2D for rendering. No stick figures, no flat neon glows, no primitive shapes. 

**Style Bible:**
- **Materials:** Brushed aluminum (grainy metallic gradient, #4B4B4B to #2A2A2A), anodized casing (#0A0A0A), glowing electrolyte (#00E5FF with additive blending).
- **Edge Language:** Hard bevels on plate edges (1px highlight top-left, 1px shadow bottom-right). Terminal contacts are cylindrical with specular highlights.
- **Silhouette:** Readable at 64px. Plates are rectangular with rounded corners (4px radius). Terminals protrude from top/bottom.
- **Light:** Internal emission only. No external light sources. Glow intensity maps to voltage (0-100%).

**Inventory (Production Set):**
1. **Hero Plate Idle:** 4 frames (64x64px). Subtle internal pulse.
2. **Hero Plate Charge:** 8 frames (64x64px). Rising glow intensity, terminal sparks.
3. **Hero Plate Discharge:** 8 frames (64x64px). Fading glow, electrolyte bubbles escaping.
4. **Terminal Contacts:** 4 variants (16x16px). Positive/Negative, clean/dirty.
5. **Electrolyte Bubbles:** 6 frames (8x8px). Rising, fading.
6. **UI Plates:** 3 frames (32x32px). Low/Med/High charge indicators.
7. **VFX Sparks:** 4 frames (16x16px). White-blue sparks at terminals.

**Viewer UX:**
- **Filmstrip:** Horizontal scroll of all frames. Click to select.
- **Voltage Slider:** Range 0-100. Drives global emission brightness and animation speed (higher voltage = faster pulse).
- **Poster Frame:** @1.5s shows the full atlas grid with the hero plate at 50% voltage.
- **Downloads:** 'Download PNG Atlas' (single image with all frames), 'Download SVG' (vector outlines for terminals/plates).

**Type:**
- **Display:** Chakra Petch (bold, industrial).
- **Body:** IBM Plex Mono (technical labels).

**Constraints:**
- Single HTML file. No external assets.
- Canvas 2D only. No WebGL.
- Sprites must be generated procedurally or embedded as base64. No external image CDNs.
- Ensure bevels are visible at 64px. No flat colors.
- Voltage slider must update sprite rendering in real-time.

**Layout & Responsiveness:**
- **Desktop:** Fixed sidebar (250px) for inventory and controls. Main canvas area centers the sprite at 4x scale. Filmstrip spans full width below canvas.
- **Mobile:** Stack layout. Canvas scales to fit width. Filmstrip becomes horizontal scrollable touch area. Controls collapse into an accordion menu to save vertical space.
- **Grid:** CSS Grid for main layout. Flexbox for filmstrip items. Ensure touch targets are min 44x44px for mobile interaction.

**Motion & Interaction Details:**
- **Slider Feedback:** As the voltage slider is dragged, the canvas background subtly shifts hue from deep black to a faint blue tint (#001111) to simulate ambient light spill. The slider thumb itself should have a metallic texture matching the plate.
- **Frame Selection:** When a frame is clicked in the filmstrip, it zooms slightly (1.1x) with a 150ms ease-out transition. The selected frame gets a glowing #00E5FF border.
- **Animation Loop:** Use requestAnimationFrame. The internal pulse frequency is calculated as `baseFreq * (voltage / 50)`. At 100% voltage, the pulse is rapid and intense; at 0%, it is nearly static.
- **Spark Logic:** Sparks only render on the 'Charge' frames when voltage > 80%. They are small, jagged white lines radiating from terminal tips, fading out over 3 frames.

**Acceptance Criteria:**
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
