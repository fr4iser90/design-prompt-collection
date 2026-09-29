Create a WebGL scene using Three.js (r150+) that renders a morphing liquid metal sphere. Deliverable: single-file HTML/CSS/JS. The scene must feature a high-gloss chrome material that reflects a dynamic environment map (e.g., a generated cube map or HDR). The core mechanic is vertex displacement driven by a simulated magnetic field controlled by mouse position.

**Visuals & Materials:**
- Use `MeshPhysicalMaterial` or a custom `ShaderMaterial` to achieve a mercury-like finish. Set `metalness: 1.0`, `roughness: 0.1`, and `clearcoat: 1.0`.
- Implement a high-resolution IcosahedronGeometry (detail level 5+) to ensure smooth displacement without faceting artifacts.
- The environment map should be a neutral studio HDR or a procedurally generated gradient cube map to provide distinct highlights and reflections that shift as the geometry deforms.
- Background must be a solid deep charcoal (#1A1A1A) to maximize contrast with the chrome highlights (#E0E0E0, #BDBDBD).

**Vertex Displacement Logic:**
- In the vertex shader, displace vertices along their normal based on a distance function from a 'magnetic source' point (mapped from mouse coordinates to 3D space).
- Formula: `displacement = amplitude * pow(1.0 - distance / radius, exponent)`. 
- Use noise (simplex or perlin) added to the displacement magnitude to create organic, non-repeating spike patterns rather than perfect cones.
- The mouse position controls the `magneticSource` vector. Moving the mouse closer to the sphere increases `amplitude` and `radius` of influence, creating sharp spikes. Moving away relaxes the geometry back to a smooth sphere.

**Interaction & Motion:**
- **Entrance:** Animate the `amplitude` from 0 to 0.5 over 2 seconds using an ease-out-cubic curve, causing the sphere to erupt into spikes upon load.
- **Interaction:** Track mouse `x,y` normalized to [-1, 1]. Map this to a 3D vector on the sphere's surface or slightly outside it. Update the uniform `uMouse` every frame. Add a slight lag (lerp) to the mouse uniform for fluid, heavy-metal feel.
- **Ambient:** Apply a slow, low-frequency sine wave to the base radius of the sphere to simulate a 'breathing' idle state when the mouse is not moving. Frequency: 0.5Hz, Amplitude: 0.02.

**Constraints:**
- No UI chrome, headers, or footers. The canvas is the entire viewport.
- Typography: Use Bebas Neue for a minimal title 'FERRO' in the bottom-left corner, white (#E0E0E0), 12px, uppercase, letter-spacing 0.1em. Use Source Code Pro for a small status line 'MAGNETIC FIELD: ACTIVE' in #BDBDBD, 10px, bottom-left below the title.
- Performance: Ensure 60fps on mid-range devices. Use `requestAnimationFrame`. Dispose of geometries/materials if re-initializing.
- Lighting: Use two directional lights (one key, one rim) to enhance the metallic reflections. No ambient light to keep shadows deep.

**Technical Stack:**
- Three.js via CDN (unpkg or cdnjs).
- Vanilla JS for mouse tracking and animation loop.
- CSS for full-screen canvas reset.
