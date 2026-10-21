## Concept
Create an immersive WebGL experience that visualizes the metallurgical process of bronze solidification. The core thesis is 'Material Science as UI': the user interacts with the physical properties of the material (cooling rate) to observe changes in its visual state (color, grain, roughness). The scene is a minimalist studio setting where the only hero is the morphing metal blob. The transition from liquid-like incandescence to solid, grainy bronze must be physically plausible and visually striking.

## Palette
- **Background:** #0F0C0B (Deep Charcoal) - Provides high contrast for the glowing metal.
- **Primary Metal (Hot):** #FFF0A0 to #FF4500 (Incandescent Yellow to Orange) - Used for thermal emission.
- **Primary Metal (Cold):** #D9A555 (Bronze) - The base color of the solidified material.
- **Accent/UI:** #4A3B2C (Dark Brown) - Used for secondary text and inactive UI elements.
- **Text:** #FFFFFF (White) - For primary readability.

## Type
- **Display:** Cormorant Garamond. Use for the main title. Weight 300 or 400. Large size (clamp(2rem, 5vw, 4rem)). Letter-spacing -0.02em.
- **Body/Mono:** IBM Plex Mono. Use for all labels, slider values, and technical data. Weight 400. Small size (0.875rem). Letter-spacing 0.05em.
- **Hierarchy:** Title top-left, UI controls bottom-center. No navigation bars or footers.

## Layout
- **Canvas:** Full viewport (100vw, 100vh). Fixed position, z-index 0.
- **Overlay:** Absolute positioned divs for text and controls, z-index 10. Pointer-events: none for text, auto for controls.
- **Title Block:** Top-left, 2rem padding from edges.
- **Control Block:** Bottom-center, 2rem padding from bottom. Horizontal slider width 300px.
- **Responsive:** On mobile, reduce title size and slider width to 80% of viewport.

## Motion
1. **Entrance:** The metal blob scales from 0 to 1 over 1.5 seconds with an ease-out-quart curve. Simultaneously, it starts at temperature 1.0 (white-hot).
2. **Ambient Cooling:** The temperature variable decreases over time based on the current 'Cooling Rate'. The visual color shifts smoothly through the thermal spectrum.
3. **Grain Evolution:** As the temperature drops, the procedural noise scale in the shader adjusts. If the user changes the cooling rate mid-process, the grain size updates immediately to reflect the new rate's theoretical outcome.
4. **Heat Haze:** A subtle vertex displacement or post-process distortion is active when temp > 0.5. It fades out linearly as temp approaches 0.5.
5. **Rotation:** The object rotates slowly around the Y-axis (0.005 radians per frame) to showcase the 3D form and lighting interactions.

## Constraints
- **Stack:** Three.js (r150+), vanilla JavaScript, CSS.
- **File Structure:** Single HTML file. All CSS in <style>, all JS in <script>.
- **Performance:** Use a low-poly base geometry (SphereGeometry with 64x64 segments) to keep vertex count manageable. Use custom shaders for complex effects instead of heavy post-processing chains.
- **No External Assets:** All textures must be procedural (generated in shader). No image files.
- **Lighting:** One DirectionalLight (intensity 2.0, position [5, 5, 5]) and one AmbientLight (intensity 0.2, color #0F0C0B).
- **Interaction:** Only one input: the cooling rate slider. No orbit controls (camera is fixed). No zoom.

## Acceptance criteria
- [ ] The page loads with a black background and a white-hot blob in the center.
- [ ] The blob cools down over time, changing color from white to yellow to orange to dull bronze.
- [ ] The surface roughness increases as the object cools.
- [ ] A slider labeled 'Cooling Rate' is visible at the bottom.
- [ ] Adjusting the slider changes the speed of the cooling process.
- [ ] Adjusting the slider also changes the visible grain size on the surface (slow = coarse, fast = fine).
- [ ] The title 'Molten Bronze Solidification' is visible in Cormorant Garamond.
- [ ] The code is contained in a single HTML file with no external dependencies other than Three.js CDN.
- [ ] The animation runs at 60fps on a standard laptop.
- [ ] The heat haze effect is visible when the object is hot and disappears when cool.
