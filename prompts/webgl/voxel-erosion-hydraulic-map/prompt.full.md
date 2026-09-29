## Concept
Create an interactive WebGL visualization of hydraulic erosion on a procedural voxel terrain. The core thesis is "slow violence compressed into seconds": users spawn rain, and compute shaders simulate water flow, sediment transport, and deposition, carving realistic channels into the landscape. The scene is the hero; typography is minimal and functional.

## Palette
- **Background:** #1a202c (Dark Slate) - Provides high contrast for terrain highlights.
- **Terrain Rock:** #4a5568 (Slate Grey) - Base color for dry rock surfaces.
- **Water/Wetness:** #4299e1 (Blue) - Used for water volume and wet surface specular highlights.
- **Sediment:** #f6ad55 (Orange) - Used for sediment deposition and high-load water.
- **Text:** #f7fafc (Off-white) - For UI overlays.

## Type
- **Display:** Oswald (Bold, Uppercase) for the main title. Tight tracking.
- **Body:** Source Serif Pro (Regular) for instructions. Small size (12-14px).
- **Placement:** Title top-left, instructions bottom-right. Both absolute positioned over the canvas.

## Layout
- **Canvas:** Full viewport (100vw, 100vh). No margins or padding.
- **Camera:** Perspective camera, positioned at (0, 15, 15) looking at (0, 0, 0). 
- **Orbit:** Damped orbit controls. Auto-rotate speed: 0.5 deg/sec when idle.
- **UI:** Minimal. No buttons, no sliders. Interaction is purely mouse-based (click/hold).

## Motion
1. **Entrance:** Terrain starts flat (height=0). Over 2.5 seconds, interpolate heights to a Perlin noise map (octaves=4, scale=0.05) using a smoothstep easing function. Camera zooms in slightly.
2. **Ambient Erosion:** Continuous, low-rate rain on the highest peaks (height > 0.8). This creates subtle, ongoing weathering even when the user is idle.
3. **Active Erosion:** On mouse-down, spawn high-density rain at the projected world coordinates. Water particles (instanced points) flow downhill, updating the height and sediment buffers. Channels should visibly deepen within 5 seconds.
4. **Water Flow:** Particles should move along the gradient of the height buffer. They fade out when they reach the edge or evaporate.

## Constraints
- **Stack:** Three.js (r150+), GLSL shaders for simulation and rendering.
- **Buffers:** Use WebGL2 float textures for height, sediment, and water. Ping-pong between two sets of buffers.
- **Performance:** Limit particle count to 5,000. Use instanced rendering for particles. Terrain mesh should be a single draw call (PlaneGeometry with vertex displacement).
- **No UI Chrome:** No headers, footers, or cards. The canvas is the entire interface.
- **No AI Defaults:** Avoid purple glows, cream backgrounds, or generic SaaS layouts.
- **Deliverable:** single-file HTML/CSS/JS.

## Acceptance criteria
- [ ] Single HTML file loads and runs without external dependencies (except fonts).
- [ ] Terrain renders as a 128x128 grid (or equivalent resolution) with visible voxel-like or faceted structure.
- [ ] Clicking and holding the mouse spawns rain; water particles are visible and flow downhill.
- [ ] Terrain height changes visibly over time (channels deepen, peaks lower).
- [ ] Wet areas appear blue (#4299e1); dry areas appear grey (#4a5568).
- [ ] Typography uses Oswald and Source Serif Pro; no Inter/Roboto/Arial.
- [ ] Animation runs at 60fps on a standard laptop.
- [ ] No UI elements other than the title and instruction text.
- [ ] Water particles follow flow vectors, not random noise.

## Type pairing
Oswald + Source Serif Pro
