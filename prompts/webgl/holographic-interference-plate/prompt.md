Deliverable: single-file HTML/CSS/JS.

Build a full-screen WebGL experience using Three.js (or raw WebGL) that simulates the interference pattern of two coherent light sources on a 2D plane. The visual hero is the fragment shader itself, calculating wave superposition in real-time. The background is pure black (#000000). Two point-light sources are represented as glowing orbs: one cyan (#00ffff) and one magenta (#ff00ff). 

The core mechanic is wave interference. In the fragment shader, calculate the distance from each fragment to each light source. Compute the wave amplitude for each source using a sine function based on distance and time (e.g., sin(distance * frequency - time * speed)). Sum the two amplitudes. Normalize the result to a 0-1 range. Map this value to brightness: constructive interference (sum > 0.5) should glow brightly, blending the cyan and magenta hues towards white (#ffffff) where they overlap. Destructive interference (sum < 0.5) should fade to black. 

The two light sources must be draggable. Implement raycasting or screen-space mapping to allow the user to click and drag either the cyan or magenta source. As they move, the interference fringes (the moiré-like bands) must shift and change density dynamically. When the sources are close, the fringes are wide; when far apart, the fringes become dense and fine. 

On load, the sources start at the center and explode outward to their default positions, creating a radial burst of interference. Ambiently, they drift in slow, elliptical orbits to keep the pattern alive. 

Typography is minimal and overlaid: 'HoloLab' in Futura PT (uppercase, tracking-wide) in the top-left corner in white, and a small instruction 'Drag Sources' in IBM Plex Sans in the bottom-right in grey (#666666). No UI chrome, no buttons, no panels. The canvas is the interface. Ensure the shader handles high-DPI displays correctly by adjusting the resolution uniform. The aesthetic is high-contrast, scientific, and mesmerizing, avoiding any 'fake hologram' artifacts in favor of pure optical physics.
