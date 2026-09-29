## Concept
Create an interactive WebGL visualization of bismuth dendrite growth. The core thesis is to reveal the mathematical beauty of crystallography through a tangible, scrubable physical process. Unlike generic particle systems, this simulation must be grounded in the visual logic of metallurgical cooling: fast cooling creates dense, fine structures, while slow cooling creates sparse, thick structures. The visual hook is the iridescent oxide layer that appears on the crystal surfaces, simulated via shader-based thin-film interference. The experience should feel scientific yet artistic, inviting users to explore the relationship between thermodynamic conditions and morphological outcomes.

## Palette
- **Background:** `#0F0F12` (Deep Charcoal) - Provides high contrast for the iridescent crystals. This dark backdrop ensures the vibrant colors of the oxide layer pop.
- **Ink/Text:** `#E0E0E0` (Light Gray) - For UI labels and headings. Ensures readability without being harsh.
- **Accent:** `#FF6B35` (Burnt Orange) - Used for the primary iridescent hue and UI active states. This color anchors the visual identity.
- **Secondary Iridescence:** Blend `#FF6B35` with procedural blues/purples in the shader to simulate oxide thickness variations. The shader should dynamically shift hues based on the Fresnel effect.

## Type
- **Headings:** `Cormorant Garamond` (Serif) - Elegant, scientific journal aesthetic. Use for the main title 'Bismuth Dendrite Growth'.
- **UI/Labels:** `Space Mono` (Monospace) - Technical, precise, readable for data values (e.g., "Cooling Rate: 0.5"). Use for the slider label and current value display.
- **Hierarchy:** Title top-left, small caption below. Slider bottom-center or right. Minimal footprint. Ensure text does not obstruct the central view of the crystal.

## Layout
- **Canvas:** Full viewport, fixed position, z-index 0. The canvas should resize dynamically with the window.
- **UI Overlay:** Absolute positioned, pointer-events none for container, auto for controls. This allows interaction with the 3D scene while keeping UI accessible.
- **Controls:** A single range slider styled minimally. Label: "Cooling Rate". Value display updates in real-time. The slider should have a custom track and thumb to match the aesthetic.
- **No SaaS Chrome:** No headers, footers, or navigation bars. The experience is the scene. Remove any default browser margins or padding.

## Motion
1. **Entrance:** On load, the dendrite cluster scales from 0.01 to 1.0 over 2 seconds using an ease-out cubic function. Branches appear to "grow" from the center. This animation should trigger automatically upon page load.
2. **Ambient:** Slow, continuous rotation of the entire cluster (or camera orbit) to catch light and reveal iridescence changes. Speed: 0.001 rad/frame. This ensures the user sees the full 3D nature of the object even without interaction.
3. **Interaction:** Slider input triggers immediate visual changes.
   - **Fast Cooling:** Increase instance density, decrease branch length/thickness, increase high-frequency noise in vertex displacement. The crystal should look finer and more chaotic.
   - **Slow Cooling:** Decrease instance density, increase branch length/thickness, smooth vertex displacement. The crystal should look more structured and robust.
   - Transition should be smooth (lerp uniforms) to avoid popping. Use linear interpolation for numeric values and spherical linear interpolation for orientations if applicable.

## Constraints
- **Stack:** Three.js (r150+). Single HTML file. Use CDN links for Three.js if necessary, but ensure no CORS issues.
- **Performance:** Use `InstancedMesh` for all crystal branches. Max 5000 instances for smooth 60fps on mid-range devices. Optimize shader complexity to maintain frame rate.
- **Shader:** Custom `ShaderMaterial`. No standard materials. Must implement iridescence via normal/view dot product. Include proper lighting calculations within the shader.
- **No External Assets:** All geometry generated procedurally. No textures loaded from URL. All fonts should be loaded via Google Fonts or embedded if possible, but standard web fonts are acceptable if they match the style.
- **Interaction:** OrbitControls enabled. Damping enabled for smoothness. Ensure controls are responsive on both desktop (mouse) and mobile (touch).

## Acceptance criteria
- [ ] Single HTML file runs locally without CORS errors.
- [ ] Three.js scene renders a central cluster of instanced geometry.
- [ ] Custom shader displays iridescence that changes with viewing angle.
- [ ] Slider controls 'Cooling Rate' and visibly changes branch density/thickness.
- [ ] Entrance animation scales the cluster from 0.01 to 1.0.
- [ ] OrbitControls allow user to rotate and zoom the scene.
- [ ] Typography uses Cormorant Garamond and Space Mono.
- [ ] Background color is exactly #0F0F12.
- [ ] No SaaS-style UI chrome (headers, footers, buttons) present.
- [ ] The scene is responsive and works on mobile devices.
- [ ] Performance remains stable at 60fps during interaction.
