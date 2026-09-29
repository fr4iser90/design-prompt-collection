Build a raw WebGL 1.0/2.0 visualization of a phononic crystal deflecting sound waves. The scene must be a single full-screen canvas with no DOM overlays except a minimal control panel. Use a custom fragment shader to compute wave propagation and interference patterns in real-time.

**Visuals:**
- Background: #1A1A1D (deep charcoal).
- Lattice Structure: A grid of circular voids (phononic crystal) rendered as white outlines (#F2F2F2) or subtle negative space. The lattice is static.
- Wave Field: A dynamic color gradient representing acoustic pressure. Use a colormap from #1A1A1D (low pressure) to #00A8E8 (high pressure) with white highlights for peaks. The wave originates from the left, interacts with the lattice, and deflects.
- No 3D geometry for the wave itself; it is a 2D field rendered on a plane or full-screen quad.

**Interaction:**
- A single slider controls the source frequency (wavelength).
- As frequency changes, the wavelength in the shader uniform changes.
- The deflection angle of the wave through the crystal must update in real-time, simulating Bragg scattering. Higher frequencies should show more complex interference and sharper deflection angles.
- Mouse drag rotates the camera slightly around the Z-axis (2.5D effect) to inspect the lattice depth, but the primary interaction is the frequency slider.

**Technical Constraints:**
- Use raw WebGL (no Three.js) for maximum control over the fragment shader.
- The fragment shader must compute the wave equation approximation: `sin(k*x - w*t)` modulated by the lattice mask.
- The lattice mask is generated procedurally in the shader based on UV coordinates.
- Performance: Maintain 60fps on mid-range devices. Optimize shader loops.
- Typography: Use IBM Plex Sans for labels and Fira Code for numerical readouts (frequency, angle).
- UI: Minimal, floating in the bottom-right corner. Dark theme to match the canvas.

**Shader Logic:**
1. Define lattice: `float mask = step(0.1, length(fract(uv * grid) - 0.5));`
2. Define wave: `float wave = sin(dot(uv, dir) * freq - time);`
3. Combine: `float field = wave * (1.0 - mask);` (wave passes through voids, blocked by solid)
4. Add interference: `field += sin(dot(uv, dir2) * freq - time) * mask;`
5. Map to color: `vec3 color = mix(bg, accent, abs(field));`

**Deliverable:**
A single HTML file with embedded CSS and JS. No external assets except fonts. The code must be clean, commented, and ready to run.
