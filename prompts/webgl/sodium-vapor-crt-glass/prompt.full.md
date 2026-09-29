## Concept
Create a hyper-realistic material study of a vintage sodium-vapor CRT tube. The core thesis is 'Light as Physical Matter.' Instead of a static neon sign, we simulate the slow, physical warming of gas inside a glass envelope. The user controls the thermodynamic state via a scrubber, watching the transition from cold, inert vacuum to vibrant, ionized plasma. This is not a cyberpunk aesthetic; it is an industrial, scientific observation of phase change.

## Palette
- **Void:** `#0F0C0B` (Background, non-reflective matte). Represents the vacuum of the studio.
- **Cold State:** `#330000` to `#FF7A00` (Gradient for gas emission). The dull red of a cooling filament.
- **Hot State:** `#FFD700` (Peak sodium emission). The iconic yellow-orange glow.
- **Structure:** `#1E1E1E` (Glass rim, UI text, filament metal). Low-contrast dark grey to keep focus on the light.

## Type
- **Display/Labels:** Chakra Petch. Geometric, tech-adjacent but not overly sci-fi. Use uppercase for labels like 'WARMUP CYCLE'.
- **Data/Mono:** IBM Plex Mono. For real-time telemetry readouts (Temperature, Voltage, Gas Density).
- **Hierarchy:** UI is secondary. The 3D canvas is the hero. UI should be minimal, floating at the bottom, with low opacity (0.7) to not distract from the light study.

## Layout
- **Canvas:** Full viewport (100vw, 100vh).
- **Object:** The CRT tube is centered, slightly angled (20 degrees on Y-axis) to catch rim light on the glass curvature.
- **Control:** A single horizontal range input at the bottom center. Width 40%. Custom styling: track is `#1E1E1E`, thumb is `#FF7A00` with a glow effect.
- **Readouts:** Small monospace text above the slider showing current state values.

## Motion
1. **Entrance:** The scene starts black. Over 3 seconds, the glass edges fade in (opacity 0 to 1). The internal filament begins a faint, pulsing red glow (0.1 intensity). 
2. **Ambient:** Even when idle, the gas has a slow, low-frequency noise animation simulating convection currents. The glass surface has a constant, subtle refraction distortion (noise-based UV offset) to simulate heat haze.
3. **Interaction:** Scrubbing the slider updates the `uWarmupFactor` uniform.
   - **Visual Response:** Color interpolates from Red to Yellow. Intensity increases exponentially.
   - **Physical Response:** Vertex displacement increases on the glass mesh (simulating thermal expansion). The internal 'gas' particles (noise texture) move faster and become more turbulent.
   - **Bloom:** Bloom threshold lowers as warmup increases, making the glow bleed into the void.

## Constraints
- **Renderer:** Three.js (r150+). Use `MeshPhysicalMaterial` for the glass with `transmission: 1`, `roughness: 0.05`, `thickness: 0.5`.
- **Shader:** Custom fragment shader for the internal gas volume. Do not use standard sprites. Use 3D Simplex Noise in the fragment shader to create volumetric density.
- **Post-Processing:** Essential. Use `EffectComposer` with `RenderPass`, `UnrealBloomPass`, and `OutputPass`.
- **Performance:** Limit bloom resolution to half-screen. Use `lowp` precision in shaders where possible.
- **No SaaS Chrome:** No headers, footers, or navigation bars. The UI is strictly the control mechanism.

## Acceptance criteria
1. **Visual Fidelity:** The glass must look like glass (refraction visible when background elements pass behind, though background is void, so edge highlights are critical).
2. **Light Logic:** At 0% warmup, the scene is barely visible (dark red). At 100%, the scene is brightly lit by the tube itself, casting light onto the (implied) floor or surrounding dust particles.
3. **Interaction:** The slider must smoothly interpolate the color and intensity. No popping or hard cuts.
4. **Thermal Effect:** Visible vertex jitter/displacement on the glass mesh at high warmup levels (>80%).
5. **Typography:** Chakra Petch and IBM Plex Mono are loaded via Google Fonts. Text is crisp and legible against the dark background.
6. **Performance:** Maintains >50 FPS on a standard laptop GPU. No frame drops when scrubbing rapidly.
