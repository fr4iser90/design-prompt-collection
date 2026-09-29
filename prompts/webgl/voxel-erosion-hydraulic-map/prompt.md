Build a single-file HTML/CSS/JS WebGL experience featuring a 128x128 voxel terrain undergoing real-time hydraulic erosion. Use Three.js with custom GLSL shaders for the core simulation. The scene must be the hero; no UI chrome overlays the canvas except minimal typography.

**Core Simulation (Compute Shader Logic):**
Implement a ping-pong buffer system for terrain height, sediment, and water volume. 
1. **Rain Spawn:** On mouse interaction, inject water volume into the height buffer at the projected UV coordinates. 
2. **Flow Calculation:** For each voxel, calculate water flow to 4 neighbors based on height + water level difference. Distribute water and sediment proportionally.
3. **Evaporation:** Reduce water volume by a constant factor (e.g., 0.95) each frame to prevent infinite flooding.
4. **Deposition:** If water carries less sediment than its capacity, deposit excess sediment into the height buffer, raising the terrain.

**Rendering & Materials:**
- **Terrain Mesh:** Use an InstancedMesh of cubes (voxels) or a high-res PlaneGeometry with vertex displacement from the height buffer. For performance, prefer a PlaneGeometry with 128x128 segments and a custom ShaderMaterial.
- **Shading:** Implement a tri-planar or normal-based lighting model. 
  - Base color: Slate grey (#4a5568) for rock.
  - Wetness: Mix in deep blue (#2b6cb0) where water volume > 0.01. Use a fresnel effect on wet surfaces to simulate specular reflection.
  - Sediment: Mix in orange-brown (#f6ad55) where sediment load is high.
- **Lighting:** Directional light from top-left (0.5, 1.0, 0.5) with soft shadows disabled for performance. Use ambient occlusion baked into the vertex shader based on neighbor height differences.

**Interaction:**
- **Orbit:** Allow slow, damped orbit controls (auto-rotate when idle).
- **Erosion:** Click and hold to spawn rain. The intensity of rain should correlate with mouse hold duration or a fixed high rate. Visualize water flow with small, semi-transparent blue particles (instanced points) that follow the gradient of the height buffer.

**Typography & Layout:**
- **Font:** Oswald (bold, uppercase) for title "HYDRAULIC EROSION" in top-left. Source Serif Pro for a small caption "Click to rain" in bottom-right.
- **Color:** Text in #f7fafc with a subtle text-shadow for readability against the dark terrain.
- **Layout:** Full-screen canvas. Text overlays are absolute positioned, pointer-events: none.

**Deliverable:** single-file HTML/CSS/JS.

**Constraints:**
- No external assets except fonts via Google Fonts.
- No SaaS UI elements (buttons, cards, navbars).
- Performance target: 60fps on mid-range hardware. Use half-float textures for buffers if needed.
- Avoid particle spam; water particles must follow flow vectors, not random noise.
- Ensure the erosion process is visible: channels should deepen over 5-10 seconds of continuous rain.
