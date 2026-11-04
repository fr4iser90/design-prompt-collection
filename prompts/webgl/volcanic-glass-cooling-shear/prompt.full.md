## Concept
The project is a technical showcase of procedural fracture simulation using Raymarched Signed Distance Fields (SDF) in raw WebGL. The subject is a single, massive shard of volcanic glass (obsidian). The narrative is one of 'rapid cooling stress': the viewer controls the tensile stress applied to the material, causing it to crack and reveal the molten core within. This is not a physics simulation of rigid bodies, but a shader-based illusion of material failure driven by noise fields.

## Palette
- **Void Black (#050505)**: Background and base material color. Represents the cold, solidified glass.
- **Molten Orange (#ff4500)**: Emissive color for the cracks and the initial 'melted' state. Represents the trapped thermal energy.
- **Cooling Grey (#2b2b2b)**: The color of the crack edges as they cool down from the center. Provides depth and realism to the fracture.

## Type
- **Display**: Oswald (Condensed Heavy). Used for the primary label 'TENSILE STRESS'. The condensed nature fits the vertical, jagged aesthetic of the shard.
- **Mono**: Fira Mono. Used for the numerical readout (e.g., '075 MPa'). Provides a technical, scientific instrument feel.
- **Placement**: Bottom-left overlay, floating above the canvas. No boxes or backgrounds behind the text, just text-shadow for legibility.

## Layout
- **Canvas**: Full viewport (100vw, 100vh). The shard is centered but slightly offset to the right to allow UI space.
- **UI**: Fixed position bottom-left. Slider is horizontal, 200px wide. Label above slider, value to the right of slider.
- **Camera**: Perspective camera, FOV 45. Initial position z=5. Target is the center of the shard.

## Motion
1.  **Entrance (1.5s)**: The shader starts with `uMelt = 1.0` (high blur, high emissive) and `uStress = 0.0`. Animate `uMelt` to 0.0 and `uStress` to 0.1. This simulates the glass solidifying from a lava flow.
2.  **Ambient**: A slow, sine-wave pulse on the emissive intensity of the cracks (frequency 0.5Hz) to simulate breathing/heat radiation.
3.  **Interaction**: 
    -   **Slider**: Maps 0-100 to `uStress` 0.0-1.0.
    -   **Camera Zoom**: As `uStress` increases, interpolate camera Z from 5.0 to 3.5. This draws the viewer into the fracture.
    -   **Crack Propagation**: The Voronoi noise threshold is lowered as `uStress` increases, causing more cells to break and wider gaps.

## Constraints
-   **Renderer**: Raw WebGL2. No Three.js, no Babylon.js. Use a single fullscreen quad and a fragment shader for the entire scene.
-   **Performance**: Raymarching must be optimized. Use a bounding sphere for the shard to skip empty space. Max 64 march steps.
-   **No Chrome**: No navigation bars, no logos, no footers. The UI is strictly the stress control.
-   **No Particles**: Do not use particle systems for sparks. The 'glow' must come from the emissive shader term.
-   **Fonts**: Must load Oswald and Fira Mono. Fallback to sans-serif/monospace only if fonts fail.

## Acceptance criteria
-   [ ] The scene renders a distinct, jagged black shard shape (not a smooth sphere or cube).
-   [ ] Moving the slider causes visible, glowing orange cracks to appear and widen on the surface.
-   [ ] The cracks follow a Voronoi-like pattern (polygonal cells), not random noise.
-   [ ] The camera zooms in slightly as the slider value increases.
-   [ ] The entrance animation shows a transition from blurry/orange to sharp/black over ~1.5 seconds.
-   [ ] The text 'TENSILE STRESS' is visible in Oswald font.
-   [ ] The numerical value updates in real-time as the slider moves.
-   [ ] The background is pure #050505 with no gradients or images.
-   [ ] The code is a single HTML file with embedded CSS and JS.
-   [ ] No external WebGL libraries are used (check for `three.js` or `babylon.js` imports).
