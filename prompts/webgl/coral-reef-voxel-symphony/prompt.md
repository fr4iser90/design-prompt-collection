Deliverable: single-file HTML/CSS/JS using React Three Fiber (R3F) and Three.js.

Build an underwater procedural terrain visualization where the landscape is a coral reef generated from audio frequency data. The scene must feel like a living ecosystem, not a chart. Use a dark abyssal background (#051018) with cyan (#00F0FF) and coral red (#FF7E67) accents.

**Scene Composition:**
- **Terrain:** A grid-based voxel reef. Each voxel represents a coral polyp. Height and density are driven by low-frequency audio bands (bass/sub-bass). Use instanced meshes for performance.
- **Materials:** Implement custom subsurface scattering (SSS) for the coral voxels to simulate translucent organic tissue. The material should glow internally when audio intensity peaks. Use a standard PBR material for the seabed with high roughness.
- **Lighting:** A single directional light simulating sunlight from above, filtered through water. Add volumetric fog (exponential) to create depth and light rays. Caustics should be simulated via a moving noise texture projected onto the seabed.
- **Camera:** Orbit controls enabled. Initial position: low angle, looking up at the reef. Smooth damping.

**Audio Integration:**
- Use the Web Audio API. If no audio file is provided, simulate a low-frequency sine wave sweep.
- Map frequency bins (0-200Hz) to voxel height (0-10 units) and color interpolation (cyan to coral red).
- The transition should be smooth, using linear interpolation (lerp) to avoid jitter.

**UI/UX:**
- Minimal HUD. Title "Reef Acoustic" in Syne (bold, uppercase) and frequency data in Space Mono (small, monospace).
- Position UI elements in the bottom-left corner, semi-transparent.
- No buttons or complex controls. The interaction is purely visual and audio-driven.

**Technical Constraints:**
- Use `@react-three/fiber` and `@react-three/drei`.
- Implement a custom shader material for the coral voxels to handle SSS and audio-driven color changes efficiently.
- Ensure 60fps on mid-range devices by limiting voxel count to 10,000 instances.
- Handle window resize gracefully.

**Visual Style:**
- Dark, moody, and immersive.
- Focus on light and material honesty. The water should feel dense and the coral should feel organic.
- Avoid bright, flat colors. Use depth cues (fog, shadows) to create atmosphere.
