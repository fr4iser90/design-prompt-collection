## Concept
Create a high-fidelity WebGL visualization of titanium anodization. The core mechanic is a physical simulation of thin-film interference, where the color of the object is determined by the thickness of an oxide layer, which is controlled by a temperature slider. This is a 'Material Lab' aesthetic: scientific, precise, and focused on the physics of light rather than decorative effects. The user scrubs through temperatures (200°C–600°C) to watch the titanium shift from straw yellow to purple, blue, and green. The hero is the accurate, angle-dependent iridescence.

## Palette
- **Background:** #1A1A1A (Deep charcoal, matte). Provides high contrast for the metallic reflections.
- **Ink/Text:** #8A95A5 (Cool grey, readable but non-dominant).
- **Accent:** #6420B0 (Deep violet, used for the slider thumb and active states, echoing the mid-range anodized colors).
- **Material Base:** #8A95A5 (Titanium grey). 

## Type
- **Display:** Source Serif 4. Used for the title "Titanium Oxide Bloom". Large weight, tracked out slightly. Color: #8A95A5.
- **Body/Mono:** DM Mono. Used for all data readouts (Temperature, Thickness) and labels. Monospaced alignment for numbers to prevent layout shift during scrubbing. 

## Layout
- **Canvas:** Full viewport (100vw, 100vh). The camera is positioned at a 3/4 view, slightly above the plate, looking down. 
- **UI Overlay:** 
  - **Top Left:** Title "Titanium Oxide Bloom" in Source Serif 4, size 2rem.
  - **Bottom Left:** Control Panel. 
    - Label: "TEMPERATURE" (DM Mono, 0.75rem, uppercase).
    - Slider: Custom styled range input. Width 300px.
    - Value Display: "450°C" (DM Mono, 1.5rem, bold).
    - Sub-value: "~35nm Oxide" (DM Mono, 0.85rem, color #8A95A5).
- **Spacing:** Generous negative space. The UI should feel like a scientific instrument overlay, not a web app.

## Motion
- **Entrance:** 
  - The scene fades in. 
  - A 'spark' effect: A single point of light travels across the plate's surface, leaving a transient trail of color (simulated by temporarily boosting thickness in a localized area). 
  - The temperature slider animates from 200°C to 300°C over 2 seconds to show the initial 'straw' color shift.
- **Ambient:** 
  - **Thermal Shimmer:** A subtle vertex noise displacement on the plate geometry, amplitude tied to `uTemperature`. At 200°C, it's static. At 600°C, it has a slight 'waver' (frequency 5Hz, amplitude 0.0005). This mimics heat haze without distorting the shape too much.
- **Interaction:** 
  - **Scrubbing:** Dragging the slider updates `uTemperature` in real-time. 
  - **Color Response:** The shader recalculates the thin-film interference immediately. 
  - **Camera Orbit:** Allow user to orbit the camera (OrbitControls) to see the iridescence change with viewing angle. This is crucial for demonstrating thin-film physics.

## Constraints
- **Renderer:** Three.js (WebGL2 preferred). 
- **Material:** `MeshPhysicalMaterial` with `onBeforeCompile` modification. Do not use a pre-baked texture. 
- **Physics Accuracy:** 
  - Use Snell's Law for refraction angle calculation. 
  - Use standard wavelengths for RGB (650, 510, 450 nm). 
  - Refractive index (n) of TiO2 ≈ 2.4. 
  - Thickness range: 20nm (200°C) to 60nm (600°C). 
- **Performance:** Must run at 60fps. Optimize shader loops. 
- **No AI Defaults:** No purple glow, no glass morphism, no soft shadows on UI. The lighting must be hard/directional to create sharp specular highlights on the metal. 
- **Single File:** All CSS, JS, and HTML in one file. 

## Acceptance criteria
- [ ] **Visual Check:** At 200°C, the plate appears straw/yellow. At 300°C, it shifts to purple. At 400°C, blue. 
- [ ] **Physics Check:** Rotating the camera changes the hue of the plate (angle-dependent interference). 
- [ ] **UI Check:** Slider updates temperature readout instantly. No lag. 
- [ ] **Shader Check:** The iridescence is calculated in the fragment shader, not a texture map. 
- [ ] **Layout Check:** UI elements do not overlap the canvas center. 
- [ ] **Performance Check:** No frame drops during scrubbing. 
- [ ] **Code Check:** No external dependencies (CDNs allowed for Three.js). 
- [ ] **Aesthetic Check:** No generic 'fire' or 'lava' textures. The heat is implied by color, not by flame sprites.

## Type pairing
DM Mono + Source Serif 4
