# Solar Flare Corona Visualization

Create a dark, immersive visualization of a star's corona. 

**Visual Rules:**
1.  **Background:** Deep void black (`#050505`). No stars, just the star's glow.
2.  **Core:** A pulsing white-hot center (`#ffffff` to `#ffd700`).
3.  **Plasma Loops:** Use WebGL or Canvas to render magnetic field lines as glowing plasma arcs. Colors shift from deep red (`#ff4500`) at the base to bright yellow/white at the peaks.
4.  **Interaction:** Users drag to manipulate magnetic poles. As poles come closer, magnetic pressure builds (visualized by tightening field lines). Release to trigger a 'flare'—a particle burst that expands and fades.
5.  **Atmosphere:** Add a subtle heat-haze distortion shader around the high-energy zones.
6.  **Typography:** Minimal, monospace data readouts (Temperature, Magnetic Flux) in faint grey (`#666`) at corners. Use JetBrains Mono or IBM Plex Mono.

**Deliverable:** Single HTML/JS file with shader-based plasma effect.
