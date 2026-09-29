## Concept
The core thesis is the tension between rigid urban grids and organic growth. The scene is a procedural city block generator that visualizes density as a direct, manipulable parameter. Unlike typical 'smart city' renders that hide complexity behind glossy surfaces, this scene exposes the raw geometry. The user interacts with a density slider that controls the extrusion height of instanced buildings. At low density, the scene is a wireframe skeleton; at high density, it becomes a solid, shadowed mass. The transition reveals the structural logic of the city.

## Palette
- **Background/Ground:** #0F172A (Slate 900). Provides deep contrast for the wireframes.
- **Building Solid:** #334155 (Slate 700). Matte, non-reflective, technical.
- **Accent/Wireframe:** #38BDF8 (Sky 400). Used for wireframe lines, UI accents, and subtle window lights. High visibility against the dark background.
- **Lighting:** White (#FFFFFF) directional light for sharp shadows. Cyan hemisphere light for ambient fill.

## Type
- **Display:** Syne. Used for the title 'Lattice City Fabric'. Bold, uppercase, tight tracking. Color: #38BDF8. Position: Top-left, fixed, z-index 10.
- **UI/Body:** Space Grotesk. Used for the slider label 'DENSITY' and any numerical readouts. Monospace-like, technical. Color: #334155. Position: Bottom-center, fixed.
- **No other fonts.** Avoid Inter, Roboto, Arial.

## Layout
- **Viewport:** 100% width and height. No scrollbars.
- **Canvas:** Fills the entire viewport. No margins.
- **UI Overlay:**
  - **Title:** Fixed top-left, 2rem from edges.
  - **Slider:** Fixed bottom-center, 2rem from bottom. Custom styled range input. Track color #334155, thumb color #38BDF8. Width: 300px.
  - **No headers, footers, or navigation bars.** The canvas is the hero.

## Motion
1. **Entrance (0-2s):** 
   - All buildings start at scale Y = 0.1 (flat).
   - Wireframe lines are fully visible (opacity 1).
   - Animate scale Y to 0.5 (default density) over 2 seconds using ease-out-cubic.
   - Simultaneously, fade wireframe opacity to 0.5.
2. **Interaction (Slider):**
   - As the user drags the slider, update the target density value.
   - In the render loop, lerp current instance scale Y towards the target scale Y (factor 0.1).
   - Update wireframe opacity: `opacity = 1 - normalizedHeight`. When buildings are tall, wireframes are faint; when flat, wireframes are bright.
3. **Ambient (Window Lights):**
   - A shader-based effect on the building material or a separate instanced mesh of small planes.
   - Random flicker using `sin(time * randomSeed)` to simulate lights turning on/off in windows.
   - Subtle, not distracting. Intensity 0.2-0.5.

## Constraints
- **Stack:** Three.js (r150+), vanilla JS, CSS.
- **Performance:** Use `InstancedMesh` for all buildings. Target 1000+ instances. Use `OrthographicCamera` for consistent scale.
- **Geometry:** Procedural BoxGeometry. No external models.
- **Materials:** MeshStandardMaterial for solids, LineBasicMaterial or ShaderMaterial for wireframes. No MeshPhysicalMaterial (too heavy).
- **Lighting:** HemisphereLight + DirectionalLight. Enable shadows (PCFSoftShadowMap).
- **No SaaS Chrome:** No buttons, no cards, no gradients, no blur. Minimal UI only.
- **Code Quality:** Modular, ES6 classes. No global scope pollution.

## Acceptance criteria
- [ ] Scene loads with a 2-second entrance animation where buildings extrude from flat to 50% height.
- [ ] Slider controls density from 0 to 1. Buildings scale Y smoothly (lerp) without jitter.
- [ ] Wireframe opacity inversely correlates with building height (visible when flat, faint when tall).
- [ ] Uses InstancedMesh for buildings (check console: no 'too many draw calls' warnings).
- [ ] OrthographicCamera with OrbitControls (damping enabled).
- [ ] Typography: Syne for title, Space Grotesk for UI. No system fonts.
- [ ] Colors: #0F172A bg, #334155 buildings, #38BDF8 accents. No purple, no cream.
- [ ] Window light flicker is visible but subtle (not strobing).
- [ ] Runs at 60fps on a mid-range laptop (Chrome, 1080p).
- [ ] Single HTML file with embedded CSS/JS. No external assets.

## Type pairing
Syne + Space Grotesk
