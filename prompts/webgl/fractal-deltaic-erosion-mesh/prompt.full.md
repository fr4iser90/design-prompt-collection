## Concept
Create a WebGL-based geological survey visualization titled "Deltaic Fractal Erosion." The scene features a massive, procedurally generated river delta terrain. The core innovation is the real-time manipulation of erosion parameters via a UI slider, which dynamically alters the terrain's heightmap and material distribution. This transforms abstract geological data into a tangible, navigable landscape where users can observe how water viscosity affects channel formation and sediment deposition.

## Palette
- **Background:** `#1A1B1E` (Deep Void). A solid, dark blue-black background to isolate the terrain and enhance contrast.
- **Terrain Base:** `#4A5568` (Slate Grey). Represents the bedrock and high-elevation areas.
- **Sediment Accent:** `#D69E2E` (Ochre). Used for silt deposits in low-lying, high-flow areas. This color should blend smoothly with the base color based on height and flow intensity.
- **Water:** Transparent with a slight blue tint (`rgba(100, 150, 255, 0.3)`), using a normal map for subtle surface ripples.
- **UI Text:** White (`#FFFFFF`) for titles, Grey (`#A0AEC0`) for labels.

## Type
- **Display Font:** Cormorant Garamond. Used for the main title "Deltaic Fractal Erosion." Elegant, serif, high-contrast. Size: 24px, fixed top-left.
- **Body/UI Font:** IBM Plex Mono. Used for the slider label "Viscosity" and any numerical readouts. Technical, monospaced. Size: 12px, fixed bottom-center.
- **Hierarchy:** Clear separation between the artistic title and the functional UI. No other text elements.

## Layout
- **Canvas:** Full-screen WebGL canvas.
- **Title:** Fixed position, top-left, 20px padding.
- **Slider:** Fixed position, bottom-center, 20px from bottom. Minimalist design: a thin line track with a small circular thumb. Label above the track.
- **No Chrome:** No headers, footers, or navigation bars. The canvas is the hero.

## Motion
1. **Entrance Animation:** 
   - Duration: 3 seconds.
   - Action: Camera starts at z=500 (satellite view) and dollies to z=50 (ground level) with an ease-in-out curve. 
   - Effect: Reveals the scale of the delta from a global perspective to a detailed survey view.
2. **Ambient Motion:**
   - Sun Angle: A directional light slowly rotates around the Y-axis (0.001 rad/frame) to cast dynamic shadows, enhancing the perception of depth in the channels.
   - Water Ripples: Subtle normal map animation on the water plane to simulate flow.
3. **Interaction:**
   - Slider Scrubbing: Moving the "Viscosity" slider updates the `uViscosity` uniform in the terrain shader.
   - Visual Feedback: 
     - Low Viscosity: Channels become wider and shallower; less ochre silt.
     - High Viscosity: Channels become deeper and narrower; more ochre silt.
     - The transition should be smooth and immediate, driven by the shader's noise functions.

## Constraints
- **Stack:** Three.js (via React Three Fiber or vanilla JS). Single-file HTML/CSS/JS.
- **Geometry:** `THREE.PlaneGeometry` with 2048x2048 segments. Use `BufferGeometry` for performance.
- **Shader:** Custom GLSL vertex and fragment shaders. 
  - Vertex Shader: Displaces vertices based on fractal noise and erosion logic influenced by `uViscosity`.
  - Fragment Shader: Colors based on height and flow intensity. Blends `#4A5568` and `#D69E2E`. Adds simple Lambertian lighting.
- **Performance:** Must maintain 60fps. If performance drops, reduce segment count to 1024x1024 but maintain silhouette integrity.
- **No Post-Processing:** No bloom, DOF, or SSAO. Use fog for distance fading.
- **No Physics Engine:** Erosion is shader-based, not simulation-based.

## Acceptance criteria
- [ ] Single-file HTML/CSS/JS deliverable.
- [ ] WebGL canvas renders a procedural river delta terrain.
- [ ] Terrain uses a custom GLSL shader for height displacement and coloring.
- [ ] "Viscosity" slider updates shader uniforms in real-time.
- [ ] Changing viscosity visibly alters channel depth and silt distribution.
- [ ] Camera entrance animation zooms from z=500 to z=50 over 3 seconds.
- [ ] Directional light rotates slowly to cast dynamic shadows.
- [ ] Typography uses Cormorant Garamond for title and IBM Plex Mono for UI.
- [ ] Palette matches specified hex codes (#1A1B1E, #4A5568, #D69E2E).
- [ ] No SaaS chrome, buttons, or menus.
- [ ] Performance is smooth (no significant frame drops during slider interaction).
