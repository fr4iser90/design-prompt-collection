Build a high-fidelity WebGL geotechnical simulation using Three.js (r150+) and raw WebGL shaders for material honesty. Deliverable: single-file HTML/CSS/JS. The scene must depict a volumetric voxel grid representing limestone terrain, utilizing a custom CSG (Constructive Solid Geometry) approach or instanced mesh manipulation to simulate subsurface voids and surface collapse.

**Visual Thesis:**
Reject all "nature" aesthetics. This is industrial geology. The palette is strictly limited to three hex codes: `#1a1a1a` (Deep Void/Background), `#e0e0e0` (Limestone Surface/Ink), and `#ff6b6b` (Structural Stress/Accent). No gradients, no ambient occlusion baking that softens edges too much—keep the geometry sharp and readable. The lighting must be harsh and directional, simulating a single sun source entering a deep shaft, creating high-contrast shadows that emphasize the depth of the collapse.

**Technical Stack & Implementation:**
1.  **Renderer:** Three.js with `WebGLRenderer`. Enable `antialias: true` and `shadowMap.enabled = true` using `PCFSoftShadowMap`.
2.  **Geometry:** Use `InstancedMesh` for performance. Generate a 64x64x32 voxel grid. Each voxel is a `BoxGeometry(1, 1, 1)`. 
3.  **Material:** Use `MeshStandardMaterial` with `roughness: 0.9`, `metalness: 0.1`. The color should be `#e0e0e0`. Add a custom shader chunk or vertex color variation to simulate geological strata (subtle horizontal banding of grey tones) without breaking the monochrome palette.
4.  **Voxel Removal Logic:** Implement a recursive flood-fill algorithm starting from the center. When a voxel is "removed," it should not just disappear; it should trigger a localized collapse animation of neighboring voxels (gravity simulation via simple velocity updates in the animation loop) to simulate structural failure.
5.  **Interaction:** 
    -   **Orbit:** Use `OrbitControls` with damping enabled. Limit polar angle to prevent going below the ground plane.
    -   **Click:** Raycaster implementation. Clicking a surface voxel triggers a "collapse" event: the voxel and its immediate neighbors fall into the void, revealing deeper layers. Highlight the clicked voxel with `#ff6b6b` before collapse.
6.  **Atmosphere:** Implement a simple particle system for dust motes. Use `PointsMaterial` with `size: 0.05`, `color: #e0e0e0`, `transparent: true`, `opacity: 0.4`. Animate them drifting slowly upwards in the shaft area.

**UI & Typography:**
Overlay a minimal HUD using `Syne` for headers (bold, uppercase, tracking wide) and `JetBrains Mono` for data readouts (depth, voxel count, stress level). Position the HUD in the bottom-left corner, using `#e0e0e0` text on a transparent background. No boxes, no borders. The text should feel like a technical readout, not a marketing banner.

**Constraints:**
-   No external assets (textures/models). All geometry and materials must be procedural.
-   No "SaaS" chrome (no navbars, no footers, no buttons with rounded corners).
-   Performance target: 60fps on mid-range laptops. Use frustum culling and limit particle count to <500.
-   The camera must start *inside* the geometry (z=0, y=0) and animate out to a distance of 40 units over 3 seconds, easing out, as the central voxels are removed.
