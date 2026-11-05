Deliverable: single-file HTML/CSS/JS. Build a WebGL scene using Three.js (r150+) that simulates thermokarst collapse in a boreal tundra environment. The scene must be the primary visual focus, occupying 100% of the viewport, with a minimal UI overlay for the temperature control.

**Scene Composition & Geometry:**
Generate a high-resolution procedural terrain mesh (256x256 vertices) using a combination of Simplex noise for large-scale undulations and fractal Brownian motion (fBm) for micro-detail. The terrain represents frozen ground. Use a custom vertex shader to handle displacement. The displacement logic must be driven by a uniform `uTemperature` (range 0.0 to 1.0). 

**Material & Shader Logic:**
Implement a custom ShaderMaterial that blends between two distinct surface states based on `uTemperature` and local displacement magnitude.
1. **Frozen State (Temp < 0.3):** High specular reflectivity, low roughness. Color palette: `#8D99AE` (ice) with subtle noise for frost patterns. Use a Fresnel effect to enhance edge highlights.
2. **Thawed State (Temp > 0.3):** As temperature rises, specific areas (pre-defined 'ice lens' zones via noise mask) must collapse. The displacement function should subtract height in these zones, creating irregular depressions. The material transitions to a dark, wet mud (`#2B2D42`) with high roughness and low specular. 
3. **Transition Zone:** Between 0.3 and 0.7, interpolate the normal maps to simulate slumping edges. 

**Interaction & Animation:**
- **Control:** A single horizontal slider (UI overlay) controls `uTemperature`. 
- **Deformation:** When the slider moves, the terrain vertices must smoothly interpolate their Y-position. Use a smoothstep function in the shader to prevent popping. 
- **Ambient Particles:** Implement a GPU particle system for wind-blown snow. Particles should only spawn above the terrain and fade out as they hit the 'thawed' (dark) areas, simulating absorption into mud. 
- **Camera:** OrbitControls enabled, but constrained to a polar angle range (0.1 to 1.2 radians) to maintain a horizon view. Initial camera position should be low and close to the ground to emphasize scale.

**Lighting:**
Use a directional light (sun) with a cool color temperature (`#E0F7FA`) and low intensity to simulate overcast arctic conditions. Add a hemisphere light with sky color `#8D99AE` and ground color `#2B2D42`. Enable shadows for the terrain to accentuate the depth of the thermokarst depressions.

**UI & Typography:**
- Font: 'Darker Grotesque' for labels, 'JetBrains Mono' for data readouts.
- Overlay a minimal HUD in the bottom-left corner displaying: "TEMP: [value]°C", "STABILITY: [percentage]%".
- The slider should be styled as a thin, precise line with a red accent (`#EF233C`) for the thumb.

**Constraints:**
- No post-processing bloom or depth of field; rely on material honesty.
- Ensure 60fps on mid-range devices by optimizing the particle count (max 5000) and using instanced meshes if necessary.
- The terrain must not look like a generic heightmap; the 'collapse' must feel structural, with sharp edges where ice melts.
