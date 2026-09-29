Deliverable: single-file HTML/CSS/JS.

Build a WebGL scene using Three.js (via React Three Fiber or vanilla) featuring a procedural river delta terrain. The core visual is a high-resolution heightmap mesh (2048x2048 vertices) generated via recursive fractal noise, modified by a real-time erosion shader. 

**Visual Thesis:** 
A geological survey visualization. The terrain must have a readable silhouette from a distance (large delta branches) and fine detail on approach (tributary channels, sediment ridges). Use a custom GLSL shader for the terrain material. Do not use standard PBR materials; instead, use a custom lighting model that emphasizes height-based color banding and ambient occlusion in the channels. 

**Palette & Material:**
- Background: #1A1B1E (deep void, no stars, pure black-blue).
- Terrain Base: #4A5568 (slate grey, representing bedrock).
- Sediment/Highlight: #D69E2E (ochre, representing silt deposits in high-flow areas).
- Water: Transparent, slightly reflective, using a simple normal map for ripples. Water level is fixed; terrain rises above it.

**Interaction & Mechanics:**
1. **Camera:** OrbitControls enabled. Initial state: Zoomed out to see the entire delta. Entrance animation: Camera dollies from z=500 to z=50 over 3 seconds with ease-in-out.
2. **Erosion Slider:** A UI slider (bottom-center, minimal, IBM Plex Mono label "Viscosity") controls a uniform `uViscosity` in the fragment shader. 
   - Low Viscosity (0.0): Fast flow, shallow wide channels, less silt deposit.
   - High Viscosity (1.0): Slow flow, deep narrow channels, heavy silt deposit (more #D69E2E).
   - The shader must recalculate the heightmap displacement based on this uniform in real-time. Use a noise-based erosion function where `height = baseNoise - (flowStrength * viscosityFactor)`.
3. **Lighting:** A single directional light that slowly rotates around the scene (ambient motion) to cast dynamic shadows in the channels, enhancing depth perception.

**Typography & UI:**
- Title: "Deltaic Fractal Erosion" in Cormorant Garamond, white, top-left, fixed.
- Slider Label: "Viscosity" in IBM Plex Mono, small, grey.
- No other UI chrome. No buttons, no menus.

**Technical Constraints:**
- Use `THREE.PlaneGeometry` with high segments.
- Implement the erosion logic in the vertex shader for performance, or use a compute shader if using raw WebGL. If using R3F, use `useFrame` to update uniforms.
- Ensure the mesh is double-sided or correctly oriented.
- Performance target: 60fps on mid-range laptops. Use LOD or reduce vertex count if necessary, but maintain silhouette integrity.
- No post-processing bloom or depth of field; rely on shader-based fog for distance fading.

**Anti-Cliche:**
- Do not make it look like a video game map. It must look like a scientific visualization.
- No green grass textures. Only rock and silt colors.
- No water physics simulation (no waves crashing). Water is a static plane with a subtle normal map animation.
