Deliverable: single-file HTML/CSS/JS.

Build a high-fidelity WebGL material study using Three.js (r150+) that simulates the phase change of molten bronze cooling into solid metal. The scene must be dominated by the material itself, not UI chrome. Use a custom ShaderMaterial or heavily modified MeshPhysicalMaterial to handle thermal emission and grain growth dynamically.

**Visual Thesis:**
The object is a smooth, amorphous blob (low-poly sphere with high subdivision or metaball-like geometry) centered in the viewport. It starts at 100% heat (white-hot incandescence) and cools to 0% (matte, dull bronze). The cooling process is driven by a single user-controlled parameter: 'Cooling Rate'.

**Material & Shader Logic:**
1. **Thermal Emission:** Use a custom fragment shader to map temperature (0.0 to 1.0) to color emission. 
   - Temp > 0.8: White-hot core (#FFFFFF) fading to bright yellow (#FFF0A0).
   - Temp 0.4–0.8: Glowing orange/red (#FF4500 to #8B0000).
   - Temp < 0.4: Transition to base bronze color (#D9A555) with increasing roughness.
   - Temp 0.0: Fully solid, matte bronze with visible micro-grain texture.
2. **Grain Structure:** Implement a procedural noise function (Simplex or Perlin) in the fragment shader. The 'scale' of this noise is inversely proportional to the Cooling Rate. 
   - Slow Cooling Rate: Large, coarse grain patterns (visible crystal structure).
   - Fast Cooling Rate: Fine, tight grain patterns (smooth, glassy appearance).
   - Blend this noise into the roughness and normal map channels to create physical depth.
3. **Heat Haze:** Apply a post-processing distortion pass (or vertex displacement) that fades out as temperature drops below 0.5. This simulates air refraction around hot metal.

**Lighting & Environment:**
- Use a single strong Key Light (DirectionalLight) from the top-left to highlight the surface curvature and grain.
- Use a weak Ambient Light (#0F0C0B) to maintain deep shadows.
- No environment map reflections; rely on PBR roughness/metalness changes to convey the state change.
- Background: Solid dark charcoal (#0F0C0B) to isolate the object.

**Interaction:**
- A single horizontal slider (styled minimally, IBM Plex Mono) controls 'Cooling Rate' (0.1 to 10.0).
- Moving the slider does NOT instantly change the temperature. It changes the *speed* at which the temperature variable decreases over time.
- Visual feedback: As you scrub, the grain size changes immediately, but the color cools at the new rate.

**Typography & UI:**
- Title: 'Molten Bronze Solidification' in Cormorant Garamond, large, top-left, white (#FFFFFF), opacity 0.9.
- Subtitle: 'Foundry & Flux | Material Study' in IBM Plex Mono, small, below title, color #4A3B2C.
- Slider Label: 'Cooling Rate (°C/s)' in IBM Plex Mono, bottom-center, white.
- No other UI elements. No buttons, no menus.

**Technical Constraints:**
- Use Three.js via CDN (unpkg or cdnjs).
- All CSS/JS inline in a single HTML file.
- Optimize for 60fps on mid-range devices.
- Ensure the shader compiles without errors in Chrome/Firefox.
- The object must rotate slowly on its Y-axis (0.005 rad/frame) to show all angles.
