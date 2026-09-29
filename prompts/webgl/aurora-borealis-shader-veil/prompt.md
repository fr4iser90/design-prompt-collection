Build a WebGL scene using Three.js to render a dynamic aurora borealis effect. The core visual is a high-resolution plane geometry (200x200 vertices) that acts as a curtain. Use a custom ShaderMaterial to handle vertex displacement and fragment coloring. Do not use textures; rely entirely on procedural generation.

**Vertex Shader Logic:**
Implement a 3D Perlin noise function. Use time uniform `uTime` and a scalar `uIntensity` (0.0 to 1.0) to drive displacement along the Y and Z axes. The noise should create rolling, wave-like folds that mimic the fluid motion of charged particles. As `uIntensity` increases, the amplitude of the displacement should increase, creating deeper, more chaotic folds. Use a secondary noise layer with higher frequency for subtle surface jitter.

**Fragment Shader Logic:**
The color gradient must shift based on the `uIntensity` parameter and the local vertex height. Base color is deep space blue (#0F172A). At low intensity, the aurora glows in vibrant green (#00FF7F). As intensity rises, shift the hue towards violet (#8A2BE2). Use additive blending (`THREE.AdditiveBlending`) to allow overlapping layers to brighten naturally, simulating light emission. Apply a soft alpha fade at the edges of the plane to prevent hard clipping. Use `varying` variables to pass noise values from vertex to fragment shader to modulate color intensity per pixel.

**Interaction & UI:**
Overlay a minimalist UI in the bottom-left corner. Use `Space Mono` for the label "SOLAR WIND INTENSITY" and `Playfair Display` for the value percentage. Create a custom HTML range slider that maps directly to the `uIntensity` uniform. When the user drags the slider, the shader updates in real-time. Ensure the slider track is styled with a thin line (#00FF7F) and a circular thumb (#8A2BE2) to match the aesthetic. No other UI elements should obstruct the view.

**Camera & Composition:**
Position the camera at (0, 0, 50) looking at the origin. The plane should be centered. On load, animate the plane from a flat, horizontal state to a vertical, standing curtain over 2 seconds using a simple lerp in the animation loop or a CSS transform on the canvas container if using R3F. The background of the canvas should be the solid deep blue (#0F172A). No lighting objects are needed as the material is emissive/shaded via shader.

**Constraints:**
- Use `THREE.PlaneGeometry` with high segment count for smooth displacement.
- Shader must be efficient; avoid complex loops.
- Ensure the code is self-contained in a single HTML file or clear component structure.
- Do not use any external libraries other than Three.js.
- The effect must be performant at 60fps on mid-range hardware.
