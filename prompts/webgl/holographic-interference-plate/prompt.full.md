## Concept
Create a mesmerizing, full-screen WebGL simulation of two coherent light sources intersecting on a dark plane. The goal is to visualize wave interference patterns (moiré, standing waves) through accurate physics-based fragment shading. The interaction is direct manipulation: dragging the light sources changes the interference geometry in real-time. The aesthetic is scientific, high-contrast, and abstract, focusing on the beauty of optical physics rather than decorative effects.

## Palette
- **Background**: Pure Black (#000000) to maximize contrast for the light interference.
- **Source A**: Cyan (#00ffff) representing one coherent light source.
- **Source B**: Magenta (#ff00ff) representing the second coherent light source.
- **Interference Peak**: White (#ffffff) where constructive interference is maximal and colors blend.
- **Text/UI**: White (#ffffff) for primary labels, Dark Grey (#666666) for secondary instructions.

## Type
- **Display**: Futura PT. Used for the brand name 'HoloLab'. Uppercase, wide tracking (0.1em), bold weight. Positioned top-left, 2rem from edges.
- **Body**: IBM Plex Sans. Used for the instruction 'Drag Sources'. Lowercase, regular weight, small size (0.8rem). Positioned bottom-right, 2rem from edges. Color: #666666.

## Layout
- **Canvas**: Full viewport (100vw, 100vh), fixed position, z-index 0.
- **Overlay**: Absolute positioned text elements, z-index 10, pointer-events: none (except for the canvas itself).
- **Light Sources**: Rendered as glowing sprites or calculated in the shader as point sources. They are interactive elements within the canvas space.

## Motion
- **Entrance**: On load, both light sources start at the center (0,0) and animate outward to their default positions (e.g., left and right thirds) over 1.5 seconds using an ease-out cubic function. This creates an initial 'explosion' of interference rings.
- **Ambient**: When idle, the sources drift in slow, elliptical orbits (period ~10-15 seconds) to keep the pattern dynamic and alive. The drift should be subtle, not distracting.
- **Interaction**: Users can click and drag either light source. The movement should be immediate and responsive. As sources move closer, interference fringes widen; as they move apart, fringes become dense. The color blending shifts dynamically based on proximity and phase alignment.

## Constraints
- **Renderer**: Three.js or Raw WebGL. Must use a custom fragment shader for the interference calculation.
- **Physics**: Use accurate wave superposition: `amplitude = sin(k * r1 - wt) + sin(k * r2 - wt)`. Normalize and map to color.
- **Performance**: Must run at 60fps on mid-range devices. Optimize shader complexity (avoid unnecessary loops).
- **No UI Chrome**: No headers, footers, buttons, or panels. Only the canvas and minimal text overlays.
- **No Fake Effects**: Avoid 'glitch' or 'hologram' filters. The beauty comes from the math.

## Acceptance criteria
- [ ] Single HTML file containing all CSS, JS, and shader code.
- [ ] Two distinct light sources (cyan and magenta) are visible and draggable.
- [ ] Interference pattern is visible and changes dynamically when sources are moved.
- [ ] Constructive interference results in white/bright areas; destructive results in black.
- [ ] Entrance animation plays on load (sources move from center to default).
- [ ] Ambient drift occurs when not interacting.
- [ ] Text 'HoloLab' (Futura PT) and 'Drag Sources' (IBM Plex Sans) are visible and styled correctly.
- [ ] No external dependencies other than Three.js (if used) or standard web fonts.

## Type pairing
Futura PT + IBM Plex Sans
