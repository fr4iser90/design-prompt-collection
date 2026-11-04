## Concept
The 'Volcanic Geothermal Kit' (MAGMA CORE) is a production-ready 2D game asset pack designed for high-intensity platformer or action games. The core thesis is 'Dynamic Heat': static lava textures are banned in favor of animated flow tiles and interactive heat-distortion masks. The kit provides a cohesive visual language for destruction and environmental hazards, ensuring that player, props, and VFX share a unified palette and lighting model. The deliverable is a single-file HTML asset studio that allows developers to preview, animate, and export these assets directly.

## Palette
- **Core Dark**: #111827 (Background, UI chrome, shadow bases)
- **Lava Core**: #EF4444 (High-heat centers, health bar fill, active hazards)
- **Lava Edge**: #F97316 (Cooling edges, glow, secondary highlights)
- **Ash Grey**: #4B5563 (Smoke, debris, inactive UI elements)
- **Ember Yellow**: #FCD34D (Sparks, particle tips, critical warnings)
- **Text**: #F3F4F6 (Primary text), #9CA3AF (Secondary text)

## Type
- **Display**: Bebas Neue (Used for pack title, section headers, and large data readouts. Must be uppercase, tracking 0.05em.)
- **Body/Data**: Courier Prime (Used for asset names, frame counts, hex codes, and download buttons. Monospaced for technical precision.)

## Layout
The studio is a single-page application with a fixed header and a scrollable main content area. 
1. **Header**: Contains the 'MAGMA CORE' logo (SVG), pack title, and global controls (Heat Shimmer Toggle, Export Buttons).
2. **Grid System**: A 3-column grid for asset categories (Terrain, Characters, VFX/UI). Each cell contains a preview canvas and metadata.
3. **Filmstrip Viewer**: A horizontal scrollable area at the bottom for detailed animation inspection. Selected assets expand here with frame-by-frame controls.
4. **Poster Frame**: A dedicated section showing the full atlas layout as a static image, updated dynamically.
5. **Responsive Behavior**: On screens narrower than 768px, the 3-column grid collapses to 1 column. The sidebar controls move to a fixed bottom bar. The filmstrip viewer becomes full-width with swipe support. Touch targets for all buttons and toggles must be at least 44x44px to ensure accessibility on mobile devices.

## Motion
- **Entrance**: Lava bubbles rise from the bottom of the viewport and pop with a small ember splash effect (CSS keyframes or Canvas particles). Asset cards fade in with a staggered delay (50ms increment) using `opacity: 0` to `1` and `transform: translateY(20px)` to `0`.
- **Ambient**: Slow, heavy smoke plumes drift across the background (low opacity, blurred). Heat shimmer effect applies a subtle sine-wave distortion to lava tiles when enabled.
- **Interaction**: Clicking an asset triggers a 'select' state with a glowing border (#F97316). Clicking the 'Erupt' button initiates a full-screen particle system (embers, ash) that decays over 3 seconds. Hovering over tiles reveals a tooltip with dimensions and frame count. Particle effects should use additive blending for embers to enhance the glow effect.

## Constraints
- **No External Assets**: All graphics must be generated via Canvas 2D API or inline SVG. No image URLs.
- **Readability**: Silhouettes must be distinct at 32x32px. Use strong contrast between lava (#EF4444) and background (#111827).
- **Tileability**: Lava flow tiles must have matching left/right edges for seamless tiling.
- **Performance**: Animation loops must use `requestAnimationFrame`. Particle counts capped at 200 for the eruption effect. Ensure the main thread is not blocked during asset generation.
- **No Clichés**: No stick figures, no primitive cubes/spheres as heroes, no flat Kenney-style clones without depth. Use gradients and noise for material honesty.

## Acceptance criteria
- [ ] Single HTML file loads without errors.
- [ ] Contains at least 8 distinct assets: 3 lava tiles, 2 ash sheets, 1 player sprite, 1 hazard, 1 UI plate.
- [ ] Lava tiles animate in a 4-frame loop.
- [ ] Ash clouds animate in a 6-frame loop.
- [ ] 'Download PNG Atlas' button generates a valid sprite sheet image.
- [ ] 'Download SVG' button generates a valid SVG file.
- [ ] Heat Shimmer toggle visibly distorts lava tiles.
- [ ] 'Erupt' button triggers a particle effect that fades out.
- [ ] Fonts Bebas Neue and Courier Prime are correctly applied.
- [ ] No external image CDN links are present.
- [ ] Layout is responsive on mobile and desktop.
- [ ] Touch targets are accessible (min 44x44px).

## Pack type
2D Game Kit (Sprites, Tiles, VFX, UI)

## Style bible
- **Materials**: Viscous lava with gradient cores; particulate ash with soft edges; metallic UI with beveled highlights.
- **Edge Language**: Sharp, jagged edges for hazards; smooth, flowing curves for lava; crisp, geometric lines for UI.
- **Light**: Top-down ambient light with strong emissive properties for lava. Shadows are dark and soft.
- **Silhouette Rules**: High contrast between hot elements and cool background. Silhouettes must remain readable even when partially obscured by smoke.

## Inventory
1. **Lava Flow Tile A** (64x64px, 4 frames, animated)
2. **Lava Flow Tile B** (64x64px, 4 frames, animated, different flow pattern)
3. **Lava Flow Tile C** (64x64px, 4 frames, animated, edge transition)
4. **Ash Cloud Sheet** (128x128px, 6 frames, animated)
5. **Ash Puff Sheet** (64x64px, 4 frames, animated, small debris)
6. **Heat Distortion Mask** (256x256px, static, grayscale)
7. **Player Sprite** (48x48px, 4 frames idle, 4 frames walk)
8. **Geyser Hazard** (64x64px, 4 frames, animated eruption)
9. **UI Health Bar** (200x32px, static, lava fill gradient)
10. **UI Button Frame** (120x40px, static, beveled metal)

## Download
- **PNG Atlas**: A single sprite sheet containing all animated frames laid out in a grid. Generated via Canvas `toDataURL`.
- **SVG**: Vector outlines of static UI elements and the heat distortion mask. Generated via inline SVG serialization.

## Viewer
- **Filmstrip**: Horizontal scroll for animation inspection. Click to play/pause. Supports touch swipe on mobile.
- **Orbit**: Not applicable (2D). Instead, use 'Zoom' slider to inspect pixel details.
- **Kit Grid**: Main view shows all assets in a grid. Hover to see metadata.
- **Poster Frame**: A static view of the full atlas layout, updated in real-time. Useful for quick visual reference.

## Technical Implementation Notes
- Use `<canvas>` elements for rendering animated sprites. Each asset should have its own canvas context for isolation.
- Implement a simple state machine for the animation loop to handle play/pause states.
- For the 'Heat Shimmer', apply a CSS `filter: url(#shimmer)` referencing an SVG filter defined in the document, or use a canvas-based displacement map if higher fidelity is required.
- Ensure the 'Download' functions create a temporary link element, trigger the download, and then clean up the object URL to prevent memory leaks.
- The 'Erupt' effect should overlay a new canvas on top of the existing content with `pointer-events: none` to allow interaction with underlying elements if needed, or block interaction for the duration of the effect.
- All CSS should be embedded in a `<style>` tag. All JavaScript in a `<script>` tag. No external dependencies except for Google Fonts if necessary, but ideally use system fonts or embedded base64 fonts if strict offline capability is required. However, the prompt specifies Bebas Neue and Courier Prime, so include the Google Fonts link in the head.

## Deliverable
Deliverable: single-file HTML/CSS/JS.

## Type pairing
Bebas Neue + Courier Prime
