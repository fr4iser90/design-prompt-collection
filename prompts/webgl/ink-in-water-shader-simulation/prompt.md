Build a WebGL fluid simulation using Three.js and custom fragment shaders to simulate ink diffusion in water. The scene must be the hero, occupying the full viewport. 

**Renderer Stack**: Three.js with `WebGLRenderer`. Use `WebGLRenderTarget` for ping-pong buffers to store velocity and density fields. Implement a simplified Navier-Stokes solver in GLSL fragment shaders.

**Shader Logic (Fragment)**:
1.  **Advection**: Move velocity and density fields along the flow using semi-Lagrangian advection.
2.  **Diffusion**: Apply iterative Gauss-Seidel relaxation or a simple blur pass to simulate viscosity and diffusion. Ink should spread slowly.
3.  **Projection**: Enforce incompressibility by subtracting the gradient of the pressure field from the velocity field.
4.  **Injection**: When the mouse moves, inject density (ink) and velocity (force) into the grid at the cursor position. The force vector should match mouse delta.
5.  **Rendering**: Sample the density field. Map high density to `#1A1A1A` (Sumi Ink) with alpha blending over a background of `#F8F9FA` (Water). Add subtle `#4A5568` (Shadow/Diluted Ink) for depth.

**Interaction**:
-   **Drag**: Moving the mouse injects ink. The speed and direction of the drag determine the initial velocity vector of the ink.
-   **No UI Chrome**: Do not overlay buttons or headers. The canvas is the entire experience.

**Visual Style**:
-   **Material Honesty**: The ink should look like sumi ink—matte, opaque at high density, translucent at edges.
-   **Lighting**: No complex lighting models. Use simple alpha blending for depth. The 'light' is the transparency of the water.
-   **Type**: Use `Merriweather` for the title "Ink Dissolve" and `IBM Plex Mono` for any debug stats (e.g., FPS, simulation steps) in the bottom corner. Text must be minimal and non-intrusive.

**Performance**:
-   Use half-float textures (`THREE.HalfFloatType`) for simulation buffers if supported, fallback to Float if needed.
-   Simulation grid resolution: 256x256 or 512x512 depending on performance.
-   Clear buffers on window resize.

**Constraints**:
-   No pre-baked videos.
-   No particle systems; use grid-based fluid simulation.
-   No SaaS UI elements.
-   Ensure the simulation is stable (no NaNs).

**Deliverable**: A single HTML file with embedded JS/CSS and GLSL shaders. The simulation must start with a clear water state and faint turbulence. Dragging should immediately produce visible ink trails that swirl and diffuse.
