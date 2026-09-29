Build a Three.js scene featuring a single, high-poly silver coin (or plate) centered in the viewport. The scene must use a PBR metallic workflow. The coin starts fully covered in a dark, rough sulfur-tarnish (color #1a1a1a, roughness 0.8). The core interaction is 'scrubbing': when the user clicks and drags over the coin, a custom fragment shader mask removes the tarnish, revealing polished silver (color #c0c0c0, roughness 0.1) underneath.

**Scene & Material:**
- **Geometry:** A cylinder (radius 2, height 0.2) with high segments (64x64) or a custom extruded coin shape. Add slight bevels to edges to catch light. Ensure normals are smoothed for continuous reflection.
- **Material:** `MeshPhysicalMaterial` or custom `ShaderMaterial`. 
  - Base color: Polished Silver (#c0c0c0).
  - Metalness: 1.0.
  - Roughness: Dynamic. Base is 0.1 (polished). Tarnished areas have roughness 0.8 and color shift to #1a1a1a.
  - **Shader Mask:** Use a `DataTexture` (e.g., 512x512) initialized to black (tarnished). When the mouse moves, draw white circles into this texture. Use this texture in the fragment shader to `mix()` between tarnished and polished properties. Implement bilinear filtering for smooth edges.
- **Lighting:** Single key light (DirectionalLight) from top-left, intensity 2.0, casting sharp shadows. One weak fill light (AmbientLight, intensity 0.2) to preserve contrast. No environment map (or a very dark, simple studio env) to emphasize the material's own reflectivity and the roughness change.

**Interaction:**
- Implement raycasting to detect mouse position on the coin surface.
- On `mousemove` + `mousedown` (or hover if desired), update the `DataTexture` at the UV coordinates. Use a soft falloff brush (Gaussian) to simulate cloth pressure.
- Add a subtle 'friction' effect: particles or a slight glow at the brush cursor position to indicate polishing action.
- Support touch events for mobile compatibility, mapping touch coordinates to UVs.

**Layout & UI:**
- Minimalist full-screen canvas. Responsive resize handler.
- Top-left: Title 'Argent & Oxo' in Playfair Display, color #c0c0c0. Font-size 24px, letter-spacing 2px.
- Bottom-right: Instruction 'Drag to polish' in Lato, color #8b5a2b (subtle accent). Font-size 14px, opacity 0.8.
- No other UI chrome. Hide cursor over canvas to enhance immersion.

**Technical Constraints:**
- Use `THREE.WebGLRenderer` with `antialias: true` and `powerPreference: 'high-performance'`.
- Ensure the `DataTexture` is updated efficiently (only on mouse move, not every frame if static).
- The coin should have a slow, idle rotation (ambient motion) that pauses or slows when the user interacts.
- Colors: Background #0f0f0f (near black). Silver #c0c0c0. Tarnish #1a1a1a. Accent #8b5a2b (for UI text only, not on the coin).
- Deliverable: single-file HTML/CSS/JS.
