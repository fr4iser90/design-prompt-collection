Implement a raw WebGL 1.0 application rendering a single parametric surface mesh. No Three.js, no R3F. Use raw WebGL buffers and custom shaders. The hero is the mathematical function itself: a continuous ribbon defined by parametric equations for a Mobius strip that morphs into a hyperbolic paraboloid.

**Geometry & Shader:**
Create a high-resolution grid (128x128 vertices). In the vertex shader, calculate position based on uniform `u_twist` (range 0.0 to 1.0, mapping to 180-360 degrees). 
- Base: Mobius strip equation.
- Morph: As `u_twist` increases, interpolate towards a figure-8 immersion/hyperbolic paraboloid profile.
- Normals: Calculate analytical normals in the vertex shader for smooth lighting; do not use flat shading.
- Displacement: Add a small amplitude (0.05 units) noise-based displacement along the normal vector, driven by `u_time`, to create a 'breathing' organic tension effect.

**Fragment Shader (Material Honesty):**
Do not use standard Lambert. Use a custom Fresnel-based shading model.
- Base Color: Interpolate between `#00ffaa` (cyan-green) and `#ff00aa` (magenta) based on the local surface normal's Y-component or curvature approximation.
- Self-Intersection Detection: In the fragment shader, approximate depth testing or use a stencil buffer logic to identify where the ribbon passes through itself. When intersection is detected (based on depth difference threshold), shift color to pure white `#ffffff` or bright red `#ff0000` to highlight topological singularity. This must be visible only during high-twist states.
- Background: Clear color `#1a1a1a`. No gradients, no ambient occlusion post-processing. Light source is a single directional light from top-left, hardcoded in shader.

**Interaction:**
- A single HTML range input (styled minimally with `accent-color: #00ffaa`) controls `u_twist`.
- Label the slider "Twist Factor: [value]°" using Space Mono.
- Orbit controls: Implement simple mouse-drag rotation around the Y-axis. No zoom. No pan.

**Typography & Layout:**
- Header: "Mobius Dynamics" in DM Serif Text, large, centered, top 10%, color `#ffffff`, opacity 0.8.
- Footer: Mathematical formula for the current state displayed in Space Mono, bottom 10%, color `#00ffaa`, small size.
- No buttons, no navigation, no chrome. The canvas fills 100vw/100vh. UI elements are overlaid with absolute positioning, pointer-events: none (except slider).

**Constraints:**
- Must run at 60fps on integrated graphics. Optimize vertex count.
- No external libraries. Vanilla JS.
- Handle window resize by updating canvas dimensions and projection matrix.
- Ensure the transition between Mobius and figure-8 is continuous; no popping artifacts.
