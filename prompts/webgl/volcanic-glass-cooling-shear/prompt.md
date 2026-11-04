Deliverable: single-file HTML/CSS/JS.

Build a raw WebGL raymarching scene featuring a massive, jagged obsidian shard centered in the viewport. The scene must use a custom fragment shader (no Three.js primitives for the hero object) to render the glass via Signed Distance Fields (SDF). The visual core is the interplay between the cold, reflective black surface and the molten orange interior revealed by procedural fracturing.

**Shader Logic & Materials:**
Implement a raymarcher with a minimum of 64 steps. The base SDF is a complex, irregular polyhedron (use `max` of several rotated boxes or a noise-displaced sphere) to simulate a natural volcanic shard. The material is 'Obsidian': high specular reflection (Fresnel), low diffuse, and a deep black base color (#050505). 

**Fracture Mechanism:**
Introduce a uniform `uStress` (0.0 to 1.0). Use a 3D Voronoi noise function to generate crack patterns. When `uStress` > threshold, the SDF surface is displaced inward along the Voronoi cell boundaries. Inside these cracks, render an emissive material (#ff4500) that mimics molten lava. The crack width should scale with `uStress`. Add a 'cooling' effect: as cracks widen, the edges near the surface should darken towards #2b2b2b, while the deep center remains bright orange.

**Lighting & Atmosphere:**
Use a single directional light source from the top-left to highlight the glassy facets. Add a subtle ambient occlusion term to deepen the crevices. Implement a post-processing bloom pass (or simple emissive accumulation in the fragment shader) to make the molten cracks glow against the dark background. The background should be a void black (#050505) with a very faint, slow-moving noise gradient to suggest heat haze.

**Interaction & UI:**
Overlay a minimal UI in the bottom-left corner. Use Oswald (Condensed Heavy) for the label 'TENSILE STRESS' and Fira Mono for the value display (e.g., '042 MPa'). The slider must be a custom-styled input range that updates `uStress` in real-time. As the slider moves, the camera should slightly zoom in (reduce FOV or move camera position closer) to emphasize the detail of the fracturing. 

**Entrance Animation:**
On load, animate `uStress` from 0.0 to 0.1 and a `uMelt` uniform from 1.0 to 0.0 over 1.5 seconds. This creates the effect of the shard cooling from a molten blur into solid glass.

**Constraints:**
- No external libraries for the rendering core (raw WebGL2 preferred).
- No SaaS chrome, headers, or footers. The canvas is the hero.
- Performance: Must maintain 60fps on mid-range GPUs. Optimize the SDF by using sphere tracing bounds.
- Type: Load Oswald and Fira Mono via Google Fonts. Do not use system fonts.
- Colors: Strictly adhere to #050505 (bg), #ff4500 (molten), #2b2b2b (cooling edge).
