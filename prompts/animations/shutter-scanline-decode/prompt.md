# Shutter Scanline Decode

Create a kinetic typography animation where text appears through a rolling horizontal scanline, simulating a CRT monitor decoding a signal from static.

**Visual Rules:**
- Background: Very dark green-black (#1a2b1a) or pure black with a subtle green phosphor texture.
- Type: Monospace font (e.g., 'Courier New', 'VT323') with a slight glow.
- The Reveal Mechanism: 
  - Above the scanline: Text is sharp, bright green (#4af626), and stable.
  - Below the scanline: Text is distorted, noisy, or invisible (static).
  - The Scanline itself: A bright, thin horizontal band of light that moves downwards (or upwards) repeatedly.
- Static/Noise: Use a CSS animated noise texture or SVG turbulence to create the 'unresolved' signal below the line.

**Motion Brief:**
- **Entrance:** The scanline sweeps down the screen. As it passes each row of text, the noise 'freezes' into the final character.
- **Loop:** The scanline can loop continuously. Text above the line stays sharp. Text below resets to noise.
- **Interaction:** Clicking or hovering 'pauses' the scanline at that Y-position, fully revealing the text in that band.

**Deliverable:**
- CSS Keyframes for the scanline movement.
- SVG filter for the noise/blur effect on the 'unrevealed' text.
- Blend modes (`mix-blend-mode: screen` or `overlay`) to integrate the glow with the background.
