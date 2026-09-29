## Concept
An interactive material study of silver oxidation. The user experiences the tactile satisfaction of cleaning a tarnished object. The core thesis is the contrast between rough, dark sulfur-tarnish and smooth, bright polished metal. The interaction is direct: mouse drag = polishing cloth. The visual narrative moves from obscured, matte darkness to revealing, reflective clarity.

## Palette
- **Background:** `#0f0f0f` (Deep Void) - Provides maximum contrast for the silver highlights and isolates the object.
- **Silver (Polished):** `#c0c0c0` (Pure Silver) - High metalness, low roughness. Reflective and cool-toned.
- **Tarnish:** `#1a1a1a` (Sulfur Black) - High roughness, non-metallic or low-metalness appearance. Absorbs light.
- **Accent:** `#8b5a2b` (Bronze) - Used only for UI text/instructions, not on the 3D object. Provides a warm counterpoint to the cool silver.

## Type
- **Display:** 'Playfair Display' for the brand title 'Argent & Oxo'. Elegant, serif, high contrast. Color: #c0c0c0. Weight: 400. Size: 24px. Letter-spacing: 2px.
- **Body:** 'Lato' for instructions 'Drag to polish'. Clean sans-serif. Color: #8b5a2b. Small size, bottom-right corner. Weight: 300. Size: 14px. Opacity: 0.8.

## Layout
- Full-screen WebGL canvas. `width: 100vw; height: 100vh; margin: 0; overflow: hidden;`.
- Coin centered at (0, 0, 0). Camera at (0, 2, 5) looking at (0, 0, 0). Field of View: 45 degrees.
- Minimal overlay UI. No buttons, no sliders. Just the object and the cursor. UI elements are absolutely positioned with `pointer-events: none` to allow interaction with the canvas beneath.
- **Mobile:** On touch devices, the instruction text changes to 'Swipe to polish'. The brush size increases slightly to accommodate finger width.

## Motion
- **Entrance:** The coin rotates slowly on its Y-axis (0.005 rad/frame) to catch the light and reveal its shape. This rotation is dampened by a factor of 0.1 when the user is actively dragging.
- **Ambient:** Subtle camera 'breathing' – a sine wave offset on the camera's Z-position (±0.1) to keep the scene alive. Frequency: 0.5Hz.
- **Interaction:** When dragging, the rotation pauses. A 'polish' visual effect (soft white glow or particle spark) follows the cursor to provide feedback. The `DataTexture` mask updates in real-time. Particles fade out over 0.5 seconds.

## Constraints
- **Renderer:** Three.js (r150+). Use `WebGLRenderer` with `antialias: true`.
- **Material:** Must use `MeshPhysicalMaterial` or custom `ShaderMaterial` to blend two material states via a texture mask. The mask is a `DataTexture` of size 512x512, format `THREE.RedFormat` or `THREE.RGBAFormat`.
- **Lighting:** Single strong directional light (Intensity 2.0, Position 5, 5, 5). Shadows enabled (mapSize 1024x1024). No complex HDRIs; rely on the directional light for specular highlights. Ambient light intensity 0.2.
- **Performance:** The `DataTexture` update must be efficient. Use `texture.needsUpdate = true` only when the mask changes. Limit particle count to 50 active particles.
- **Ban:** Do not use standard gold/platinum materials. Do not use purple/blue tech-glow. The aesthetic is 'darkroom', not 'cyberpunk'. No external assets except fonts via Google Fonts CDN.

## Acceptance criteria
1. **Material Contrast:** Polished areas must look distinctly metallic and reflective (sharp highlights). Tarnished areas must look matte and dark. The transition must be smooth, not pixelated.
2. **Interaction:** Dragging over the coin must visibly remove the dark tarnish, revealing the silver underneath. The effect must follow the mouse path accurately. Touch support must work on mobile devices.
3. **Lighting:** A single key light must create a clear specular highlight on the polished areas that moves as the coin rotates. Shadows must be cast on the background plane if present, or self-shadowing on the coin edges.
4. **UI:** Title and instruction are present, correctly styled (Playfair/Lato), and do not obstruct the main view. Text is legible against the dark background.
5. **Code:** No external dependencies beyond Three.js. Single HTML file with embedded CSS/JS. Code must be clean, commented, and modular.
6. **Deliverable:** single-file HTML/CSS/JS.
