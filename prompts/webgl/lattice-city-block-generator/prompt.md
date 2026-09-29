Deliverable: single-file HTML/CSS/JS.

Build a WebGL scene using Three.js (r150+) that visualizes a procedural city block. The scene must be the primary focus, occupying 100% of the viewport. No SaaS chrome, headers, or footers. The aesthetic is raw, technical, and precise—rejecting 'smart city' gloss for honest geometry.

**Scene Composition:**
Generate a 20x20 grid of city blocks. Each block contains 4-16 buildings. Buildings are simple rectangular prisms (BoxGeometry) with varying heights and footprints. Use InstancedMesh for performance (target 500-2000 instances). The ground plane is a dark, matte surface (#0F172A) with a subtle grid overlay (#334155) to establish scale.

**Materials & Lighting:**
1. **Wireframe Layer:** A separate InstancedMesh or LineSegments layer renders the edges of the buildings in bright cyan (#38BDF8). This layer is visible during the entrance and fades out as buildings solidify.
2. **Solid Layer:** The main buildings use a MeshStandardMaterial with low roughness (0.4) and metalness (0.1). Color is dark slate (#334155). 
3. **Lighting:** Use a HemisphereLight (sky: #38BDF8, ground: #0F172A, intensity: 0.5) and a DirectionalLight (color: #FFFFFF, intensity: 1.5, position: [50, 100, 50]) to cast sharp shadows. Enable shadow maps (PCFSoftShadowMap).

**Interaction (Parameter Scrub):**
Implement a custom UI slider (bottom center, minimal design, Space Grotesk font) labeled 'DENSITY'. 
- **Min (0.0):** Buildings are collapsed (height = 0.1), appearing as flat footprints. Wireframes are prominent.
- **Max (1.0):** Buildings are fully extruded to their procedural max height. Wireframes are hidden.
- **Transition:** As the slider moves, update the instance matrix scale Y for each building. Use a smooth interpolation (lerp) for the height change to avoid jitter. The wireframe opacity should inversely correlate with height (opacity = 1 - normalizedHeight).

**Entrance Animation:**
On load, all buildings start at height 0.1. Over 2 seconds, animate them to a default density of 0.5. Simultaneously, draw the wireframe lines using a dash offset animation (if using LineSegments) or fade them in/out. After 2 seconds, the scene settles into an interactive state.

**Ambient Motion:**
Add a subtle 'window light' effect. Use a custom shader or a second InstancedMesh of small planes on the building faces that flicker randomly (using a time-based noise function in the shader). This adds life without clutter.

**Camera:**
Use an OrthographicCamera for a clean, technical look. Position at [50, 50, 50] looking at [0, 0, 0]. Allow orbit controls (OrbitControls) with damping enabled. Limit zoom to prevent clipping through the ground.

**Constraints:**
- No external assets (textures, models). All geometry procedural.
- No purple gradients, no glassmorphism, no blur effects.
- Performance: Must run at 60fps on mid-range laptops. Use InstancedMesh exclusively for buildings.
- Code structure: Clean, modular JS. No global variables. Use ES6 classes for CityGenerator, SceneManager, and UIController.

**Typography:**
- Title: 'Lattice City Fabric' in Syne (bold, uppercase, #38BDF8). Top-left, fixed.
- Slider Label: 'DENSITY' in Space Grotesk (monospace, #334155). Bottom-center.
- No other text. Keep the UI minimal.
