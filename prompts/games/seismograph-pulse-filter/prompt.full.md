## Concept
Create 'Seismograph Pulse Filter', a rhythm-based timing game where players act as a geophysicist filtering raw seismic data. The core fantasy is precision editing: slicing through chaotic noise to isolate meaningful earthquake signals. The interface mimics a professional oscilloscope with a dark, high-contrast aesthetic. The player's role is to maintain signal integrity by removing noise and preserving pulses, simulating the tension of real-time data analysis under pressure.

## Core loop
1. Observe scrolling waveform (noise + pulses).
2. Identify an incoming pulse.
3. Click to 'cut' the signal at the peak.
4. If timed correctly, the pulse is extracted (reward). If missed, static accumulates (risk). 
5. Repeat until 3 pulses are extracted (win) or static fills (fail).

## Input
- **Mouse/Touch**: Single click/tap anywhere on the canvas. 
- No keyboard input required.
- Input is instantaneous; no hold mechanics.
- Input must be debounced slightly to prevent accidental double-clicks from registering as two separate actions, though the primary action is a single 'cut'.

## Fail / win
- **Fail**: The 'Static' meter (bottom of screen) reaches 100%. This happens when:
  - The player clicks during pure noise (no pulse nearby).
  - The player misses the timing window of a pulse by >150ms.
  - The player allows a pulse to pass without cutting it (adds to static decay rate).
- **Win**: Successfully extract 3 clean pulses. The level ends, score is calculated based on timing accuracy (Signal-to-Noise Ratio), and the next level starts with increased scroll speed and noise density.

## Entities
1. **Waveform**: A continuous line drawn across the canvas. 
   - **Noise**: Low-amplitude, high-frequency random jitter.
   - **Pulses**: High-amplitude, narrow-width spikes. Occur every 2-4 seconds.
2. **Filter Line**: A static vertical white line in the center of the screen. This is the 'cut' point.
3. **Extracted Signals**: Clean segments stored on the right side of the screen, accumulating as the game progresses.
4. **Static Meter**: A horizontal bar at the bottom. Fills with red (#FF4500) on errors.

## Feel
- **Visuals**: High contrast. Background #1A1A1A. Waveform #FFFF00. Errors #FF4500. Success flashes #00FF00 (briefly).
- **Audio**: 
  - Ambient: Low rumble (noise).
  - Pulse Approach: Subtle rising tone.
  - Successful Cut: Sharp, high-pitched 'tick' or 'snap'.
  - Fail: Low, distorted 'buzz'.
- **Feedback**: 
  - Successful cut: The isolated pulse glows and moves to the 'Clean' stack. 
  - Miss: The waveform briefly turns red at the click point, and the static bar jumps.
  - Screen shake on critical fail.

## Palette
- Background: #1A1A1A (Dark Gray)
- Primary Signal: #FFFF00 (Yellow)
- Error/Danger: #FF4500 (Orange Red)
- Success/Clean: #00FF00 (Green, used sparingly for flashes)
- UI Text: #CCCCCC (Light Gray)

## Type
- Font: Consolas, 'Courier New', or any monospace font.
- Usage: HUD (Score, Level, Static Meter) and Title. 
- Style: Technical, minimal, uppercase for labels.

## Constraints
- Single HTML file.
- Use Canvas 2D API for rendering.
- No external libraries (no Phaser, no Three.js).
- Game must be playable on mobile (touch) and desktop (mouse).
- Performance: Maintain 60fps.

## Acceptance criteria
1. **Playable Loop**: A user can start the game, see scrolling noise, click to extract a pulse, and see the score increase.
2. **Fail State**: Missing 3 pulses or clicking during noise fills the static meter and ends the game.
3. **Win State**: Extracting 3 pulses completes the level and increases difficulty.
4. **Visual Clarity**: Pulses are visually distinct from noise (higher amplitude, narrower).
5. **Input Responsiveness**: Clicks register instantly with visual feedback.
6. **No Clutter**: HUD is minimal and does not obstruct the waveform.
7. **Mobile Support**: Touch events work identically to mouse clicks.

## Layout & Responsiveness
The game must adapt seamlessly to various screen sizes. On desktop, the canvas should maximize within the browser window, maintaining a 16:9 or 4:3 aspect ratio depending on the container, with black bars if necessary to preserve the waveform's vertical scale. On mobile devices, the canvas should fill the entire viewport, ensuring that the waveform's vertical amplitude is scaled down slightly to fit smaller screens while maintaining horizontal scrolling speed. The HUD elements (Score, Level, Static Meter) must be positioned using absolute positioning relative to the canvas container. The 'Filter Line' must always remain at the exact horizontal center (50% width). Text sizes should be dynamic, using `Math.min(window.innerWidth, window.innerHeight) * 0.05` to ensure readability on both large monitors and small phones. Ensure that touch targets are large enough for fingers, with a minimum interactive area of 44x44 pixels for any potential UI buttons (like a restart button), though the main gameplay area is the entire canvas.

## Motions & Animations
The waveform scrolling must be smooth and continuous, driven by `requestAnimationFrame`. The speed of the scroll should increase linearly with each level (e.g., Level 1: 100px/s, Level 2: 120px/s). Pulse spikes should have a subtle 'glow' effect using `ctx.shadowBlur` and `ctx.shadowColor` to make them pop against the noise. When a pulse is successfully cut, the segment should detach from the main waveform and animate to the right side of the screen, stacking in a 'Clean Signal' column with a slight bounce effect. Upon failure, the entire canvas should undergo a brief, intense shake animation (random x/y offset for 200ms) and a red vignette effect should fade in and out. The static meter should fill with a jagged, erratic animation rather than a smooth linear fill to mimic electrical interference. Background noise should have a slight parallax effect if multiple layers of noise are used, adding depth to the oscilloscope display.

## Technical Constraints
The game must run at a stable 60fps on mid-range mobile devices. Avoid heavy DOM manipulation; all rendering must occur within the Canvas 2D context. Audio must be synthesized using the Web Audio API to avoid external asset loading. The code must be contained in a single HTML file with embedded CSS and JavaScript. No external libraries are permitted. Ensure memory leaks are prevented by properly cleaning up audio contexts and event listeners if the game restarts. Use `OffscreenCanvas` if supported for performance optimization, but fallback to standard Canvas for compatibility. The game state should be managed in a simple object structure, with clear separation between update logic and render logic. Ensure that the game handles visibility changes (e.g., switching tabs) by pausing the game loop to save battery and prevent logic errors.

## Deliverable
single-file HTML/CSS/JS.

## Motion
- entrance: Line starts flat, then begins to jitter
- ambient: Line scrolls right-to-left with background noise
- interaction: Click creates a sharp 'cut' notch; clean line segments reveal hidden data
