Deliverable: single-file HTML/CSS/JS.

Build a Three.js WebGL scene featuring a single, high-fidelity glass bubble as the sole hero element. The scene must feel like a darkroom study of artisan glassblowing, focusing entirely on material honesty and light behavior.

**Scene Setup:**
- Background: Deep void (#1A1A1A). No gradients, no stars, no environment map clutter. Use a simple dark backdrop to maximize contrast for refraction.
- Camera: Perspective camera, positioned at z=5, looking at origin. Enable OrbitControls but restrict polar angle to prevent flipping upside down. Damping enabled for smooth motion.
- Lighting: One strong key light (DirectionalLight, color #F4F1EA, intensity 2.0) positioned high and to the right. One weak fill light (AmbientLight, color #88CCEE, intensity 0.2) to cool the shadows. No point lights.

**Material & Geometry:**
- Geometry: IcosahedronGeometry (detail 4) or SphereGeometry (widthSegments 64, heightSegments 64). Smooth shading.
- Material: MeshPhysicalMaterial. Set transmission: 1.0, roughness: 0.1, metalness: 0.0, thickness: 1.5, ior: 1.5. Color: #88CCEE (light cyan tint). Enable clearcoat: 1.0, clearcoatRoughness: 0.1.
- Caustics: Simulate caustics using a custom shader pass or a projected texture on a floor plane (invisible mesh with additive blending) that reacts to the light source position and the glass geometry's normal map. Alternatively, use a simple light cookie or projected noise texture on the floor that animates based on the glass's deformation.

**Interaction (The Core Mechanic):**
- Implement a 'stretch' mechanic. On mouse down, capture the intersection point on the glass. On mouse move, apply a vertex displacement in the direction of the mouse movement relative to the camera plane.
- The displacement should be smooth and viscous. Use a spring-damper system in the vertex shader or CPU-side vertex manipulation to simulate the 'pull' of hot glass.
- As the glass stretches, the 'thickness' property of the material should decrease in the stretched area (simulate thinning walls). This can be done by adjusting the `thickness` uniform or using a custom shader that modifies the transmission depth based on vertex displacement magnitude.
- On mouse up, the glass should slowly relax back to its original spherical shape, but with a slight residual deformation (memory effect) that fades over 5 seconds.

**Typography & UI:**
- Minimal UI. Title 'Vitreous Studio' in Playfair Display, white (#F4F1EA), top-left, fixed position, font-size 1.5rem, letter-spacing 0.05em.
- Subtitle 'Drag to stretch' in Lato, light gray (#88CCEE), bottom-center, opacity 0.6, font-size 0.9rem.
- No buttons, no sliders, no chrome. The canvas is the interface.

**Technical Constraints:**
- Use Three.js r150+ via CDN.
- Single HTML file. All CSS in <style>, all JS in <script type="module">.
- Ensure 60fps on mid-range laptops. Limit vertex count to <10k.
- Handle window resize gracefully.
- No external assets (textures/models). All procedural.
