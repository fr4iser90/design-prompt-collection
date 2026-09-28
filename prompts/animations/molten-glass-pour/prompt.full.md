# Molten Glass Pour — Extended

**Concept:**
"Liquid Light." This animation captures the ethereal beauty of glass in its fluid state. It contrasts the hardness of finished glass with the fluidity of its origin. The focus is on how light behaves when passing through a moving, varying-density medium.

**Palette:**
- **Hot Core:** `#ffffff` (Pure white, emissive)
- **Transition Zone:** `#ffcc00` to `#ff9900` (Amber/Orange glow)
- **Cool Glass:** `#f0f8ff` (AliceBlue/Transparent white) or `#a0c4d4` (Pale cyan tint)
- **Background:** `#111111` (Deep black to maximize contrast with emissive glass)

**Material & Texture:**
- **Molten Glass:** High IOR (1.5-1.6), smooth surface, high reflectivity.
- **Emission:** Intensity decreases over time/distance from source.
- **Background:** Dark, textured stone or metal to provide refraction distortion context.

**Motion Design:**
1.  **Source:** Glass oozes slowly from a pipe or ladle.
2.  **Flow:** A thick, continuous ribbon of glass falls. It twists slightly due to internal currents.
3.  **Cooling:** As it falls, the color shifts from white to amber. The surface tension creates rounded drips.
4.  **Interaction:** The glass hits a lower pool (or just fades out). Ripples propagate slowly due to high viscosity.

**Technical Implementation:**
- **Three.js:** Use `EffectComposer` with `UnrealBloomPass` for the glow.
- **Refraction:** Use a `CubeCamera` or `Reflector` to capture the background and apply it to the glass material with a normal map for distortion.
- **Fluid Sim:** For web performance, use a simplified metaball approach or a pre-baked Lottie/Sequence if true fluid sim is too heavy. Alternatively, use `GPGPU` fluid simulation.
- **Shaders:** Custom fragment shader to mix emissive color based on "temperature" variable (mapped to UV y-coordinate).

**Constraints Checklist:**
- [ ] Viscosity must be high (slow movement).
- [ ] Refraction must be noticeable (distort background).
- [ ] No particles or bubbles; pure liquid.
- [ ] Lighting must be dramatic, focused on the glass.

**Acceptance Criteria:**
The viewer should feel the heat and the slow, heavy gravity of the material. The light refraction should be the star of the show.
