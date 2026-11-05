## Concept
Develop a WebGL simulation of thermokarst collapse, a geological process where permafrost thaws and causes the ground to subside. The core thesis is material honesty: the visual difference between frozen ice and thawed mud must be distinct and physically plausible. The user interacts with a temperature slider to trigger this collapse, revealing the instability of the terrain. This is not a generic landscape viewer; it is a specific visualization of ground failure.

## Palette
- **Background/Sky:** `#2B2D42` (Deep Slate Blue) - Represents the cold, overcast sky and deep shadows.
- **Ice/Surface:** `#8D99AE` (Cool Grey) - The primary color of the frozen tundra surface.
- **Accent/Warning:** `#EF233C` (Vivid Red) - Used for the UI slider thumb and critical stability indicators, symbolizing heat and danger.
- **Mud/Thawed:** `#1A1B26` (Near Black) - The color of the wet, collapsed ground.

## Type
- **Display:** 'Darker Grotesque' for the title "THERMOKARST COLLAPSE" and section headers. It should be bold and condensed.
- **Body/Data:** 'JetBrains Mono' for all numerical readouts (Temperature, Stability, Depth). This reinforces the scientific, data-driven nature of the simulation.

## Layout
- **Canvas:** Full viewport (100vw, 100vh). No margins or padding.
- **UI Overlay:** Fixed position bottom-left. Contains the temperature slider and data readouts. 
- **Slider Design:** A thin horizontal track (2px height) in `#8D99AE`. The thumb is a small circle (12px) in `#EF233C`. 
- **Data Readout:** Positioned above the slider. Format: `TEMP: -10.0°C | STABILITY: 100%`. 
- **Title:** Top-left corner, small, subtle, in `#8D99AE`.

## Motion
1. **Entrance:** The camera starts at a low angle, close to the ground, and slowly orbits around the center of the terrain while pulling back slightly. This establishes the scale and the pristine, frozen state.
2. **Ambient:** A particle system simulates wind-blown snow. Particles are white (`#FFFFFF`) with low opacity. They move horizontally across the screen. When they intersect with 'thawed' terrain (detected via a mask in the shader), they fade out and drop, simulating absorption.
3. **Interaction:** As the user drags the temperature slider from -10°C to +10°C:
   - **0°C to -2°C:** No visual change. 
   - **-2°C to 0°C:** Subtle shimmer on the ice surface (increased specular intensity).
   - **0°C to +5°C:** The terrain begins to slump. Specific noise-driven zones (ice lenses) lose height. The material transitions from `#8D99AE` to `#1A1B26`. The edges of the depressions become sharp and irregular.
   - **+5°C to +10°C:** Complete collapse of the ice lenses. The terrain is now a muddy, uneven surface. The stability percentage drops to near zero.

## Constraints
- **Renderer:** Three.js (r150+). Use `WebGLRenderer` with `antialias: true`.
- **Performance:** Target 60fps. Use a custom shader for terrain deformation to avoid CPU-side geometry updates. 
- **Geometry:** PlaneGeometry with 256x256 segments. 
- **Lighting:** One DirectionalLight (sun) and one HemisphereLight. Enable shadow maps for the terrain.
- **No Post-Processing:** Do not use bloom, depth of field, or color grading. The visual impact must come from the geometry and material changes.
- **No Generic Assets:** Do not use stock textures. Generate all noise and patterns procedurally in the shader.

## Acceptance criteria
- [ ] The terrain is a 256x256 vertex mesh.
- [ ] A temperature slider exists and controls a uniform `uTemperature`.
- [ ] When `uTemperature` > 0, specific areas of the terrain visibly subside (Y-position decreases).
- [ ] The material color transitions from `#8D99AE` to `#1A1B26` as the terrain thaws.
- [ ] The material roughness increases (becomes less shiny) as the terrain thaws.
- [ ] Snow particles are visible and move across the screen.
- [ ] Snow particles fade out when over thawed terrain.
- [ ] The UI uses 'Darker Grotesque' and 'JetBrains Mono'.
- [ ] The scene runs at 60fps on a standard laptop.
- [ ] No external libraries other than Three.js are used.
- [ ] The code is contained in a single HTML file.
