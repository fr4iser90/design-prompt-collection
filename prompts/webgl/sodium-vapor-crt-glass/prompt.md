Build a Three.js scene featuring a single, isolated CRT glass envelope (vacuum tube) centered in a void. The hero is the material interaction: PBR glass with internal volumetric emission that simulates sodium-vapor ionization. 

**Renderer & Materials:**
Use Three.js with `WebGLRenderer` (antialias: true, physicallyCorrectLights: true). The glass envelope is a custom ShaderMaterial extending MeshPhysicalMaterial or a raw GLSL shader handling transmission, roughness (0.05), and thickness. Inside the glass, implement a volumetric raymarching pass or a layered emission mesh that reacts to a uniform `uWarmupFactor` (0.0 to 1.0).

**Lighting & Color Logic:**
- Background: #0F0C0B (near-black, non-pure black to allow glass edge definition).
- Key Light: None external. The light source is the gas itself.
- Color Transition: Map `uWarmupFactor` to a color gradient:
  - 0.0: Dull, dark red (#330000), low intensity.
  - 0.5: Deep orange (#FF7A00), medium intensity, visible plasma swirls.
  - 1.0: Bright sodium yellow (#FFD700), high intensity, bloom enabled.
- Use `UnrealBloomPass` from post-processing to enhance the glow at higher warmup levels.

**Geometry:**
- Model a cylindrical glass tube with rounded ends (LatheGeometry or imported GLTF). 
- Inside, place a simplified filament structure (thin cylinder or torus) that glows based on the warmup factor.

**Interaction:**
- Implement a horizontal slider (HTML/CSS overlaid, minimal UI) labeled 'Warmup Cycle'.
- On scrub, update `uWarmupFactor`. 
- **Thermal Effect:** As `uWarmupFactor` increases, add a subtle vertex displacement noise (Perlin/Simplex) to the glass geometry to simulate thermal expansion. 
- **Gas Simulation:** Inside the shader, use 3D noise texture scrolling to simulate the migration of gas particles. At low warmup, particles are slow and dark. At high warmup, they are fast, bright, and turbulent.

**Typography & UI:**
- Font: Chakra Petch for labels (uppercase, tracking 0.1em). IBM Plex Mono for numerical readouts (e.g., 'TEMP: 2400K', 'VOLTAGE: 12kV').
- Position UI at the bottom center. Text color: #1E1E1E with a subtle glow when active.

**Constraints:**
- No external textures except noise maps generated in shader.
- No ambient light. The scene must be lit solely by the emissive gas and minimal rim lighting for glass edge visibility (use a dim blue-grey rim light #1E1E1E).
- Performance: Optimize raymarching steps for 60fps on mid-range GPUs. Use a low-resolution render target for the volumetric pass and upscale.
