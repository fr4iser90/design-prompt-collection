## Concept
Create an immersive WebGL experience titled "Polar Veil" that simulates the aurora borealis through procedural vertex displacement and additive blending. The hero is the shader itself, not a UI wrapper. The visual metaphor is a curtain of light reacting to solar wind, where intensity dictates both the chaotic folding of the geometry and the spectral shift from green to violet. The experience should feel ethereal, scientific, and visually striking, avoiding any photographic references in favor of pure mathematical beauty.

## Palette
- **Background (Ink):** `#0F172A` (Deep Space Blue) - Provides high contrast for the glowing elements.
- **Primary Glow (Accent):** `#00FF7F` (Spring Green) - The dominant color at low solar wind intensity.
- **Secondary Glow (Highlight):** `#8A2BE2` (Blue Violet) - The color that emerges at high intensity, representing higher energy particles.
- **UI Text:** `#FFFFFF` (White) for labels, with low opacity for secondary text.

## Type
- **Display:** `Playfair Display` for the main title or value display. Serif elegance contrasts with the raw physics.
- **Body/UI:** `Space Mono` for labels, instructions, and slider values. Monospace conveys technical precision and scientific data.
- **Hierarchy:** The UI should be minimal. A small header "POLAR VEIL" in Playfair, and a slider control in Space Mono. Text should not compete with the shader; it should frame it.

## Layout
- **Full-Screen Canvas:** The WebGL canvas occupies 100% of the viewport. No scrollbars.
- **UI Overlay:** Fixed position at the bottom-left (20px from edges). Contains:
  - Label: "SOLAR WIND INTENSITY" in Space Mono, uppercase, 12px.
  - Slider: Custom-styled range input, width 200px.
  - Value: Current intensity percentage (0-100%) in Playfair Display, 24px, right-aligned to the slider.
- **Composition:** The aurora curtain is centered in the viewport. The camera is fixed, looking directly at the plane. No orbit controls; the interaction is solely through the intensity slider.

## Motion
1. **Entrance Animation:** On load, the plane geometry starts flat (horizontal) and animates to a vertical orientation over 2 seconds using an ease-out cubic function. This simulates the "curtain" rising.
2. **Ambient Noise:** The vertex shader uses a time-based noise offset to create a continuous, slow-drifting motion, simulating the natural flow of the atmosphere even when the user is not interacting.
3. **Interaction Response:** As the user adjusts the slider, the `uIntensity` uniform updates. This causes:
   - Increased amplitude of vertex displacement (deeper folds).
   - Shift in fragment color from green to violet.
   - Slight increase in noise frequency to simulate turbulence.
   - The transition should be smooth but responsive, with no lag.

## Constraints
- **Renderer:** Three.js (r150+).
- **Geometry:** `THREE.PlaneGeometry(100, 100, 200, 200)`. High vertex count is required for smooth displacement.
- **Material:** `THREE.ShaderMaterial` with `transparent: true` and `blending: THREE.AdditiveBlending`.
- **Shaders:**
  - **Vertex:** Implement 3D Perlin noise. Displace `position.y` and `position.z` based on noise value * `uIntensity`. Pass noise value and UV to fragment.
  - **Fragment:** Mix colors based on noise value and `uIntensity`. Apply alpha fade at edges. Ensure additive blending works correctly by setting background color to match the scene background.
- **Performance:** Optimize noise functions. Avoid complex loops in fragment shader.
- **No Textures:** All visuals must be procedurally generated.
- **No Lighting:** Do not add ambient or directional lights. The shader is self-lit.
- **Responsive:** Handle window resize events to update camera aspect ratio and renderer size.

## Acceptance criteria
- [ ] The aurora curtain renders with visible vertex displacement, not just a flat plane.
- [ ] The color shifts smoothly from green (#00FF7F) to violet (#8A2BE2) as the slider increases.
- [ ] Additive blending is active; overlapping parts of the curtain appear brighter.
- [ ] The entrance animation correctly rotates the plane from horizontal to vertical.
- [ ] The slider controls the intensity in real-time without frame drops.
- [ ] The UI uses Space Mono and Playfair Display correctly.
- [ ] The background is solid #0F172A.
- [ ] No external images or textures are loaded.
- [ ] The code is self-contained and runs in a modern browser without errors.

## Type pairing
Space Mono + Playfair Display
