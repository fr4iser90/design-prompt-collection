## Concept
'Ferro Fluid' is a WebGL experience centered on the tactile beauty of liquid metal. The hero element is a high-gloss chrome sphere that behaves as if subjected to a powerful, user-controlled magnetic field. Unlike typical particle systems, this uses vertex displacement on a high-poly mesh to create organic, heavy, and physically plausible morphing effects. The goal is to evoke the sensation of touching mercury—cold, heavy, and reactive. The interaction is direct: mouse position dictates the magnetic pole's location and strength, pulling the metal into sharp spikes or allowing it to relax into a smooth, breathing orb.

## Palette
- **Background:** #1A1A1A (Deep Charcoal) - Provides a void-like depth that makes the chrome reflections pop.
- **Primary Highlight:** #E0E0E0 (Bright Silver) - The specular highlights on the metal surface.
- **Secondary Tone:** #BDBDBD (Mid-Grey) - Used for secondary reflections and UI text.
- **Ink:** #FFFFFF (White) - For primary typography.

## Type
- **Display:** Bebas Neue. Used for the title 'FERRO'. Style: Uppercase, 12px, letter-spacing 0.1em, color #E0E0E0. Positioned bottom-left, 20px from edges.
- **Body:** Source Code Pro. Used for the status indicator 'MAGNETIC FIELD: ACTIVE'. Style: 10px, color #BDBDBD, positioned directly below the title. Monospace font reinforces the 'engineering/physics' theme.

## Layout
- Full-screen canvas (100vw, 100vh). No scrollbars.
- Typography is overlaid absolutely in the bottom-left corner, ensuring it does not obstruct the central interaction zone.
- The sphere is centered in the viewport (0,0,0). Camera is positioned at (0, 0, 5) looking at the origin.
- No navigation, no buttons, no chrome. The entire interface is the 3D scene.

## Motion
- **Entrance:** On load, the sphere starts as a perfect sphere. Over 2 seconds, a magnetic pulse animates the displacement amplitude from 0 to 0.5, causing the surface to erupt into chaotic spikes. Easing: `easeOutCubic`.
- **Interaction:** Mouse movement updates a `uMouse` uniform. The vertex shader calculates the distance from each vertex to the `uMouse` projected vector. Closer vertices are displaced outward along their normals. The displacement is smoothed using a power function to create sharp peaks. A lerp factor of 0.1 is applied to the mouse uniform to create a heavy, fluid lag.
- **Ambient:** When the mouse is idle for >1 second, a low-frequency sine wave (0.5Hz) modulates the base radius of the sphere, creating a subtle 'breathing' effect. This ensures the scene is never static.

## Constraints
- **Stack:** Three.js (r150+), Vanilla JS, CSS.
- **Geometry:** IcosahedronGeometry with detail level 5 (approx. 20k triangles) to ensure smooth deformation without visible facets.
- **Material:** MeshPhysicalMaterial with `metalness: 1.0`, `roughness: 0.1`, `clearcoat: 1.0`, `clearcoatRoughness: 0.1`. Use an environment map (PMREMGenerator with a RoomEnvironment or a generated HDR) for realistic reflections.
- **Shader:** Custom vertex shader modification via `onBeforeCompile` or a full ShaderMaterial to handle displacement. The displacement must be calculated in the vertex shader for performance.
- **Performance:** Must maintain 60fps. Avoid heavy post-processing. Use simple directional lights (2) instead of complex area lights.
- **No UI:** No buttons, sliders, or headers. The mouse is the only input.

## Acceptance criteria
- [ ] Scene renders a chrome sphere that reflects the environment map clearly.
- [ ] Mouse movement causes the sphere to deform towards the cursor, creating visible spikes.
- [ ] Moving the mouse away causes the sphere to relax back to a smooth shape.
- [ ] Entrance animation shows the sphere morphing from smooth to spiked over 2 seconds.
- [ ] Idle state shows a subtle breathing motion.
- [ ] Typography 'FERRO' and status text are visible in the bottom-left, using Bebas Neue and Source Code Pro respectively.
- [ ] Background is solid #1A1A1A.
- [ ] No console errors related to WebGL context or shader compilation.
- [ ] Interaction feels heavy and fluid, not jittery (lerp applied to mouse input).

## Type pairing
Bebas Neue + Source Code Pro
