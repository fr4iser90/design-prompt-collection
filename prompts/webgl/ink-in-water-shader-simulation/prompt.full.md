## Concept
Create a real-time, GPU-accelerated fluid simulation that visualizes ink diffusing in water. The core experience is the tactile interaction of dragging a mouse to inject ink into a simulated fluid medium, observing the resulting turbulence and slow diffusion. This is a technical showcase of shader programming and fluid dynamics, not a marketing page. The visual aesthetic is inspired by traditional Japanese sumi-e (ink wash painting) and the physics of ink in water.

## Palette
-   **Water (Background)**: `#F8F9FA` (Off-white, clean, high key).
-   **Ink (High Density)**: `#1A1A1A` (Deep black, sumi ink).
-   **Ink (Low Density/Shadow)**: `#4A5568` (Cool grey, for diluted ink and depth cues).
-   **UI/Text**: `#1A1A1A` (Minimal, high contrast against water).

## Type
-   **Display**: `Merriweather` (Serif, elegant, traditional feel). Use for the title "Ink Dissolve".
-   **Monospace**: `IBM Plex Mono` (Technical, clean). Use for any debug information (FPS, resolution) in the bottom-right corner. Keep font size small (12px) and opacity low (0.5) to avoid distraction.

## Layout
-   **Full Viewport Canvas**: The WebGL canvas occupies 100% of the viewport. No margins, no padding.
-   **Overlay Text**: 
    -   Title "Ink Dissolve" in `Merriweather`, centered or top-left, with `mix-blend-mode: difference` or low opacity to blend with the ink.
    -   Debug stats in `IBM Plex Mono` at bottom-right.
-   **No Chrome**: No navigation bars, buttons, or footers. The interaction is purely via mouse/touch on the canvas.

## Motion
-   **Entrance**: The simulation starts with a clear water state. Apply a very faint, slow noise-based turbulence to the velocity field to give it life without visible ink.
-   **Interaction (Drag)**: 
    -   Mouse movement calculates a delta vector.
    -   Inject density (ink) at the cursor position.
    -   Inject velocity (force) proportional to the mouse delta.
    -   The ink should swirl and follow the flow, creating turbulent patterns.
-   **Ambient (Diffusion)**: 
    -   Ink naturally diffuses over time (viscosity/diffusion rate).
    -   Velocity decays slowly to prevent infinite spinning.
    -   The system seeks equilibrium (clear water) if left alone.

## Constraints
-   **Renderer**: Three.js. Use `WebGLRenderer` with `alpha: true` if needed, but preferably opaque background for performance.
-   **Simulation**: Implement a simplified Navier-Stokes solver in GLSL fragment shaders. Use ping-pong buffers for state storage (velocity, pressure, density).
-   **Shaders**: 
    -   `advect`: Moves quantities along the velocity field.
    -   `diffuse`: Spreads quantities (ink, velocity).
    -   `project`: Makes the velocity field divergence-free (incompressible).
    -   `display`: Renders the density field to the screen.
-   **Performance**: Target 60 FPS. Use `HalfFloatType` for simulation textures if supported. Simulation resolution: 256x256 or 512x512.
-   **Stability**: Ensure no NaNs in the simulation. Clamp values if necessary.
-   **No Particles**: This is a grid-based fluid simulation, not a particle system.
-   **No Pre-baked Content**: All motion must be real-time.

## Acceptance criteria
-   [ ] The canvas fills the entire viewport.
-   [ ] Dragging the mouse injects black ink that swirls realistically.
-   [ ] The ink diffuses slowly over time when not interacting.
-   [ ] The simulation runs at 60 FPS on a mid-range device.
-   [ ] The background is `#F8F9FA` and ink is `#1A1A1A`.
-   [ ] No UI elements block the interaction area.
-   [ ] The simulation is stable (no artifacts, NaNs, or crashes).
-   [ ] The code is contained in a single HTML file with embedded JS and GLSL.
-   [ ] The title "Ink Dissolve" is visible in `Merriweather`.
-   [ ] Debug stats (FPS) are visible in `IBM Plex Mono`.
