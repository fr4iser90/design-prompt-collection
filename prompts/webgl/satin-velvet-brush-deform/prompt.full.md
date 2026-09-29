## Concept
Create an immersive WebGL experience centered on a single, photorealistic velvet cushion. The core thesis is 'Tactile Visibility': the material's appearance (sheen, color depth, hidden text) is entirely dependent on the user's physical interaction (dragging) which simulates brushing the nap of the fabric. This is not a product configurator; it is a material study. The scene must feel heavy, soft, and responsive.

## Palette
- **Background:** `#1a121b` (Deep Void) - Provides maximum contrast for the velvet's sheen.
- **Material Base:** `#5c3a5d` (Satin Plum) - The base color of the velvet fabric.
- **Highlight/Text:** `#d4c5d8` (Pale Lilac) - Used for the specular highlights and the revealed embossed typography.

## Type
- **Display:** Ogg Display. Use for the main title 'Brush & Nap'. Weight: Regular. Color: #d4c5d8. Position: Bottom-left, fixed. Letter-spacing: 0.05em.
- **Body:** Lora. Use for the subtitle 'Anisotropic Soft-Body Study'. Weight: Light. Color: #5c3a5d. Position: Below title.
- **Constraint:** No system fonts. No sans-serif UI elements.

## Layout
- **Canvas:** Full viewport (100vw, 100vh). The cushion is centered in the camera view.
- **UI Overlay:** Absolute positioned HTML elements over the canvas. Pointer-events: none for the overlay container, except for any potential (but discouraged) info buttons. The canvas must receive all pointer events.
- **Composition:** The cushion occupies approximately 60% of the vertical screen height. Negative space is used to emphasize the lighting falloff.

## Motion
1.  **Entrance (Wind):** On load, a noise-based displacement wave travels from left to right across the nap direction uniform over 2 seconds. This simulates the fabric 'settling' or being brushed into place.
2.  **Ambient (Breathing):** A slow, low-frequency sine wave (0.5Hz) applied to the vertex positions to simulate the cushion breathing or settling under its own weight. Amplitude: 0.02 units.
3.  **Interaction (Brushing):** 
    -   **Deformation:** Mouse drag applies a force to the soft-body mesh. Vertices move with inertia and spring back when released.
    -   **Nap Rotation:** The drag vector influences the `anisotropyRotation` uniform in the shader. Dragging horizontally rotates the tangent vectors, shifting the specular highlight. Dragging vertically compresses the mesh, changing the Fresnel angle.
    -   **Reveal:** The embossed text 'VELVET & VOID' is defined by a displacement map. It becomes visible only when the local nap direction aligns with the light vector (dot product > 0.8). This requires dynamic tangent space updates.

## Constraints
-   **Stack:** Three.js (r150+). No React/Vue. Vanilla JS.
-   **Performance:** Maintain 60fps on mid-range laptops. Use `InstancedMesh` if multiple cushions were present (but keep to one for focus). Optimize shader loops.
-   **Physics:** Use a simplified spring-mass system in JS or a lightweight physics engine (Rapier/Cannon) for the soft body. Do not use heavy GPU physics if it complicates the single-file requirement.
-   **Shaders:** Must use custom shaders or heavily modified MeshPhysicalMaterial to achieve true anisotropy. Standard Lambert/Phong is insufficient.
-   **No SaaS Chrome:** No headers, footers, navbars, or buttons. The canvas is the product.
-   **Deliverable:** single-file HTML/CSS/JS.

## Acceptance criteria
-   [ ] Single HTML file loads without external dependencies (CDN links for Three.js are allowed).
-   [ ] The cushion visually deforms when the mouse is dragged across it.
-   [ ] The specular highlight shifts direction in response to the drag, proving anisotropic shading.
-   [ ] Hidden typography ('VELVET & VOID') is revealed only under specific lighting/nap angles.
-   [ ] The background is strictly #1a121b.
-   [ ] Fonts are Ogg Display and Lora (loaded via Google Fonts or embedded).
-   [ ] No console errors related to WebGL context loss or shader compilation.
-   [ ] The entrance animation (wind) plays once on load.
