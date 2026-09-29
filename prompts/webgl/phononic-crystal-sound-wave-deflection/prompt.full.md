## Concept
Create an interactive scientific visualization of a phononic crystal lattice deflecting acoustic waves. The core thesis is to make invisible acoustic physics visible and manipulable. The scene is a 2D field rendered in WebGL, where a custom fragment shader computes wave propagation and interference patterns in real-time. The user controls the source frequency, which alters the wavelength and thus the deflection angle of the wave through the crystal, demonstrating Bragg scattering principles. The visual style is precise, scientific, and minimal, avoiding abstract 'sound wave' clichés in favor of a rigorous simulation of wave-particle interaction within a defined geometric structure.

## Palette
- **Background:** #1A1A1D (Deep Charcoal) - Represents the void or low-pressure region.
- **Ink/Structure:** #F2F2F2 (Off-White) - Used for the lattice outlines and UI text.
- **Accent:** #00A8E8 (Electric Blue) - Used for high-pressure regions and wave peaks.
- **Gradient:** The wave field uses a colormap from #1A1A1D to #00A8E8, with #F2F2F2 highlights for maximum pressure peaks.

## Type
- **Display/Labels:** IBM Plex Sans. Clean, technical, readable. Used for UI labels like 'Frequency', 'Angle'.
- **Monospace/Data:** Fira Code. Used for numerical readouts (e.g., '12.5 kHz', '45°').
- **Hierarchy:** Small, unobtrusive UI. The canvas is the hero. Text is secondary, providing context without cluttering the view.

## Layout
- **Canvas:** Full-screen, fixed position, z-index 0.
- **UI Panel:** Floating in the bottom-right corner, z-index 10. Background: rgba(26, 26, 29, 0.8) with backdrop-filter: blur(4px). Border: 1px solid rgba(242, 242, 242, 0.1).
- **Controls:** A single range slider for frequency. A text display for the current frequency and calculated deflection angle.
- **No Header/Footer:** The visualization is immersive. No navigation or branding clutter.

## Motion
- **Entrance:** The wave source activates immediately, emitting a ripple effect that travels across the lattice from left to right.
- **Ambient:** Continuous, slow propagation of the wave field. The interference patterns shift subtly as time progresses, showing steady-state behavior.
- **Interaction:** Dragging the frequency slider changes the `uFreq` uniform in the shader. This alters the wavelength, causing the deflection angle of the wave through the crystal to change in real-time. The UI updates the numerical readout instantly.
- **Camera:** Mouse drag allows slight rotation around the Z-axis (2.5D tilt) to inspect the lattice depth, but the primary interaction is the frequency slider.

## Constraints
- **Renderer:** Raw WebGL (no Three.js). Use a full-screen quad and a custom fragment shader.
- **Shader:** Must compute wave propagation using `sin(k*x - w*t)` modulated by a procedural lattice mask. The lattice is a grid of circular voids.
- **Performance:** 60fps target. Optimize shader loops. Use `mediump` precision.
- **No External Assets:** Fonts via Google Fonts CDN. No images or 3D models.
- **No SaaS Chrome:** No headers, footers, or marketing copy. Pure visualization.

## Acceptance criteria
- [ ] The canvas renders a full-screen WebGL context.
- [ ] A phononic crystal lattice (grid of voids) is visible.
- [ ] A wave field propagates from left to right, interacting with the lattice.
- [ ] The wave field is colored using the specified palette (#1A1A1D to #00A8E8).
- [ ] A slider controls the frequency, and the wave pattern changes in real-time.
- [ ] The deflection angle of the wave changes visibly with frequency.
- [ ] UI displays current frequency and angle in Fira Code.
- [ ] No Three.js or other heavy libraries are used.
- [ ] The code is a single HTML file with embedded CSS/JS.
- [ ] Performance is smooth (60fps) on mid-range devices.
