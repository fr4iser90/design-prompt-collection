## Concept
A sensory study of hot glass. The user interacts with a floating glass bubble as if it were still molten. Dragging the cursor stretches the geometry, thinning the walls and altering how light refracts through the material. The focus is on the physicality of light and glass, not on UI or marketing. The scene is a dark void, isolating the object to highlight caustics and refraction.

## Palette
- **Background:** #1A1A1A (Deep Void) - Provides maximum contrast for light transmission.
- **Glass Tint:** #88CCEE (Cool Cyan) - Subtle coloration that shifts with thickness and light angle.
- **Light/UI:** #F4F1EA (Warm White) - Used for the key light and typography to create a warm/cool interplay with the glass.

## Type
- **Display:** Playfair Display. Used for the brand name 'Vitreous Studio'. Elegant, serif, high contrast. Fixed top-left.
- **Body:** Lato. Used for the instruction 'Drag to stretch'. Clean, sans-serif, low contrast. Fixed bottom-center.
- **Hierarchy:** The type is secondary to the visual. It should not distract from the material study.

## Layout
- **Canvas:** Full viewport (100vw, 100vh). No margins, no borders.
- **UI Overlay:** Absolute positioning. Top-left for title, bottom-center for hint. Pointer-events: none on UI elements to allow interaction with the canvas beneath.
- **Floor:** An invisible plane at y=-2 to catch caustics. No visible geometry for the floor, only the light pattern.

## Motion
- **Entrance:** The glass bubble scales from 0 to 1 with an elastic ease-out. It settles into a slow, continuous rotation (0.5 deg/sec) around the Y-axis.
- **Ambient:** Caustics on the floor plane ripple slowly, driven by a noise function in the shader. The light intensity subtly pulses (±5%) to simulate heat shimmer.
- **Interaction:** 
  - **Drag:** When the user drags, vertices near the cursor are displaced outward. The displacement is weighted by distance from the cursor (falloff).
  - **Thinning:** As vertices move outward, the local 'thickness' decreases. This is passed to the shader to increase transparency and change the refraction index locally.
  - **Relaxation:** On release, vertices spring back to their original positions with damping. The glass retains a slight 'memory' of the stretch for 3-5 seconds before fully resetting.

## Constraints
- **Stack:** Three.js (r150+). Single HTML file. No build steps.
- **Performance:** Target 60fps. Use `MeshPhysicalMaterial` with `transmission`. Avoid heavy post-processing. Use simple shaders for caustics.
- **Geometry:** SphereGeometry with 64x64 segments. Total vertices < 5000.
- **Interaction:** Only mouse drag. No touch gestures required (but should not break on touch).
- **No:** No buttons, no sliders, no environment maps (HDRI), no external textures. All procedural.

## Acceptance criteria
- [ ] Single HTML file loads and renders a glass sphere in a dark void.
- [ ] Glass sphere refracts light and shows caustics on the floor.
- [ ] Dragging the mouse stretches the glass sphere smoothly.
- [ ] Stretched areas appear thinner (more transparent/refractive).
- [ ] Glass relaxes back to sphere shape after release.
- [ ] Typography is visible and matches the specified fonts/colors.
- [ ] No console errors.
- [ ] Runs at 60fps on a standard laptop.
