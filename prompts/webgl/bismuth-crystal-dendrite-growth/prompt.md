Build a single-file WebGL experience using Three.js that simulates the growth of bismuth dendrites. The scene must feature a central cluster of instanced geometry representing crystal branches, rendered with a custom shader material that simulates iridescence based on surface normals and viewing angle.

**Core Mechanics:**
1. **Geometry:** Use `InstancedMesh` for performance. Generate a recursive branching structure (L-system or similar) where each branch is a tapered box or cylinder. The base structure should be dense but allow for parameterization. Ensure the geometry generation algorithm supports dynamic regeneration or scaling without memory leaks.
2. **Shader Material:** Implement a custom `ShaderMaterial`. 
   - **Vertex Shader:** Apply displacement based on a 'growth' uniform (0.0 to 1.0) to animate the branches extending outward from the center. Include noise functions to add organic irregularity to the branch tips.
   - **Fragment Shader:** Calculate iridescence using the dot product of the view vector and surface normal. Map this to a color gradient (thin-film interference simulation) using the provided palette (#FF6B35, #E0E0E0, #0F0F12) blended with procedural noise for oxide variation. Ensure smooth color transitions across the surface.
3. **Interaction:** A single UI slider labeled 'Cooling Rate'.
   - **Low Cooling Rate (Slow):** Sparse, thick, long branches. Low instance count or high scale on fewer instances. The visual result should feel like slow crystallization.
   - **High Cooling Rate (Fast):** Dense, fine, short branches. High instance count, smaller scale, higher frequency noise in displacement. The visual result should feel like rapid quenching.
   - Update uniforms and instance matrices in real-time via `requestAnimationFrame` or on slider input. Ensure smooth interpolation between states to prevent popping.
4. **Camera:** Use `OrbitControls` for user exploration. Initial position should frame the dendrite cluster centrally. Enable damping for smooth movement. Set min/max distance to prevent clipping or losing the subject.
5. **Lighting:** Use a combination of ambient light and a directional light to highlight the iridescent surfaces. Shadows are optional but should be soft if enabled. Add a subtle point light to enhance specular highlights on the crystal facets.

**Visual Style:**
- Background: Deep charcoal (#0F0F12).
- Typography: Cormorant Garamond for headings, Space Mono for UI labels. Minimalist UI overlay.
- No SaaS chrome. The canvas is the hero.

**Deliverable:** single-file HTML/CSS/JS.
