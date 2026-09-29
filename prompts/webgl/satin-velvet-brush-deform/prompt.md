Build a single-file HTML/CSS/JS WebGL experience using Three.js (r150+) that renders a photorealistic velvet cushion as the sole hero element. The scene must demonstrate advanced anisotropic shading and soft-body physics interaction. 

**Scene Setup:**
- Renderer: WebGLRenderer with `antialias: true`, `alpha: false`, and `outputColorSpace: SRGBColorSpace`. Enable `toneMapping: ACESFilmicToneMapping` with exposure 1.2.
- Camera: PerspectiveCamera, FOV 45, positioned at (0, 0, 5). No orbit controls; camera is static to maintain focus on material deformation.
- Lighting: Single key directional light (intensity 3.0, color #d4c5d8) from top-left (5, 5, 5). Ambient light (intensity 0.2, color #1a121b) to preserve deep shadows. No fill lights; rely on material reflection for depth.

**Geometry & Material:**
- Mesh: A rounded box geometry (2x2x0.5 units) with high segment count (64x64x16) to allow smooth deformation. 
- Material: Custom ShaderMaterial or MeshPhysicalMaterial with `anisotropy` enabled (anisotropy: 1.0, anisotropyRotation: 0). Base color #5c3a5d. Roughness 0.4. 
- Nap Direction: Implement a tangent space calculation in the shader. The 'nap' direction should be a vector field stored in a vertex attribute or calculated via normal mapping. 
- Embossed Text: Use a displacement map or vertex displacement in the shader to create hidden typography ('VELVET & VOID') that is only visible when the nap direction aligns with the light source (Fresnel effect).

**Physics & Interaction:**
- Soft-Body Simulation: Implement a simple spring-mass system or use `Cannon-es` / `Rapier` for soft-body physics. The cushion vertices should react to mouse drag with inertia and damping. 
- Interaction Logic: On `pointermove`, cast a ray to the mesh. If intersecting, apply a force vector to nearby vertices based on mouse velocity. 
- Nap Rotation: As the mesh deforms, update the `anisotropyRotation` or tangent vectors in the shader uniform to simulate the brushing of fibers. The specular highlight should shift dramatically as the user drags, revealing the embossed text.
- Entrance Animation: On load, animate a 'wind' effect across the nap direction (left to right) over 2 seconds using a noise function in the shader.

**UI & Typography:**
- Overlay: Minimal HTML overlay. Title 'Brush & Nap' in Ogg Display, color #d4c5d8, positioned bottom-left. Subtitle in Lora, color #5c3a5d.
- Background: Solid color #1a121b.

**Deliverable:** single-file HTML/CSS/JS.
