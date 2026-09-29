## Concept
Create a minimalist, high-precision WebGL visualization of topological deformation. The subject is a single continuous parametric surface that morphs between a standard Mobius strip (180° twist) and a figure-8 immersion (360° twist). The core thesis is "Topology without Breaking": showing how a surface can change its embedding in 3D space while maintaining continuity. The visual focus is on the mathematical beauty of the deformation, highlighting self-intersections and curvature changes through shader-driven color and lighting, not decorative effects.

## Palette
- **Background**: `#1a1a1a` (Deep Charcoal) – Provides high contrast for the glowing ribbon.
- **Primary Accent**: `#00ffaa` (Electric Mint) – Used for the ribbon's base color at low curvature/twist states and UI accents.
- **Secondary Accent**: `#ff00aa` (Neon Magenta) – Used for the ribbon's base color at high curvature/twist states.
- **Alert/Intersection**: `#ffffff` (Pure White) – Used specifically to highlight self-intersection points in the fragment shader.
- **Text**: `#ffffff` (White) and `#00ffaa` (Electric Mint) for hierarchy.

## Type
- **Heading**: `DM Serif Text` – Elegant, high-contrast serif for the brand title "Mobius Dynamics". Weight: Regular. Size: 4rem+. Tracking: -0.02em.
- **UI/Labels**: `Space Mono` – Monospaced, technical feel for the twist factor slider, mathematical formulas, and data readouts. Weight: Regular. Size: 0.8rem - 1rem.
- **Hierarchy**: The title is dominant but transparent (opacity 0.8) to not obscure the 3D scene. The formula at the bottom is small and precise, acting as a technical caption.

## Layout
- **Canvas**: Full viewport (100vw x 100vh). Absolute position, z-index 0.
- **Header**: Centered horizontally, top 10%. Contains only the title.
- **Control Panel**: Centered horizontally, bottom 15%. Contains the slider and the dynamic formula display.
- **Formula Display**: Directly below the slider. Updates in real-time to show the parametric equation variant being rendered (e.g., "r(u,v) = [cos(u) + v/2 cos(u/2)]...").
- **No Chrome**: No headers, footers, navbars, or cards. The UI floats over the WebGL context.

## Motion
- **Entrance**: The ribbon scales from 0 to 1 over 1.5 seconds with an `ease-out-cubic` timing function. Simultaneously, the twist factor animates from 0 to 0.5 (90 degrees) to reveal the structure.
- **Ambient**: A subtle vertex displacement using a simple sine-wave noise function along the surface normal. Amplitude: 0.05 units. Frequency: 2.0. Speed: slow (0.5 rad/s). This gives the surface a "living" membrane quality.
- **Interaction**: 
    - **Scrubbing**: Dragging the slider updates `u_twist` uniformly. The transition must be smooth and immediate (no easing on input, direct mapping).
    - **Rotation**: Click-and-drag on the canvas rotates the camera around the Y-axis. Inertia is disabled for precision. Sensitivity: 0.005 rad/px.

## Constraints
- **Renderer**: Raw WebGL 1.0/2.0 context. No Three.js, no Babylon.js.
- **Shaders**: 
    - Vertex Shader: Must handle parametric equation calculation and normal calculation analytically.
    - Fragment Shader: Must implement a custom Fresnel effect for edge glow and a depth-difference heuristic for self-intersection detection.
- **Performance**: Target 60fps. Grid resolution 128x128 is sufficient. Do not use compute shaders or transform feedback.
- **Compatibility**: Must work in latest Chrome/Firefox/Safari. Handle context loss gracefully (reload).
- **Math**: The transition from Mobius to Figure-8 must be mathematically valid. Use a linear interpolation of the twist angle parameter in the parametric equation.

## Acceptance criteria
- [ ] The canvas renders a continuous ribbon without visible seams or tearing.
- [ ] The ribbon visually transforms from a single-twist (Mobius) to a double-twist (Figure-8) when the slider is moved from left to right.
- [ ] Self-intersection points are clearly visible as bright white/red highlights only when the twist factor exceeds 270 degrees.
- [ ] The surface normals are smooth; no faceting is visible on the curved surface.
- [ ] The background is exactly `#1a1a1a` and does not change.
- [ ] The typography uses DM Serif Text for the title and Space Mono for the slider/formula.
- [ ] No external CSS frameworks or JS libraries are loaded.
- [ ] The application handles window resizing without stretching the 3D model (aspect ratio correction).
- [ ] The slider interaction is smooth with no lag or stuttering during morphing.
- [ ] The initial load displays the Mobius strip at 180 degrees twist.

## Type pairing
Space Mono + DM Serif Text
