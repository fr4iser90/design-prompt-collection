# Neon Tube Ignition Logic — Extended

## Concept
This animation visualizes the physical process of electrical ignition within neon gas tubes, applied to typography. It combines the vintage aesthetic of sign-making with modern digital signal logic. The goal is to make the text feel like it has weight, temperature, and a physical presence in a dark space. The 'logic' aspect comes from the sequential, circuit-driven nature of the reveal.

## Art Direction
- **Palette:**
  - `#121212`: Deep void background.
  - `#333333`: Unlit tube outline (very faint).
  - `#ff6b6b`: Primary ignition color (warm red/white mix).
  - `#ffffff`: Core filament intensity (sharp inner highlight).
  - `#4a4a4a`: Circuit trace (inactive).
- **Typography:**
  - Do not use standard fonts. The text must be rendered as SVG paths with rounded stroke caps and uniform stroke width (approx. 8-12px depending on view size) to simulate glass tubing.
  - Letter spacing should be tight, as if bent from a single continuous tube where possible, or segmented with clear 'bends'.

## Layout
- **Desktop:** Centered horizontal word or short phrase (e.g., "POWER", "IGNITE", "ON AIR"). Circuit trace extends horizontally beyond the text, fading out.
- **Mobile:** Vertical stack or smaller font size, circuit trace vertical or wrapping.

## Motion Brief
1.  **Entrance (The Ignition):**
    - A 'spark' travels along the circuit trace at 60fps.
    - Upon reaching a letter, the letter remains dark for 50ms.
    - **Flicker Phase:** 3-5 rapid flashes (opacity 0.1 -> 0.8 -> 0.1 -> 0.5 -> 0.2) over 200-300ms. This mimics the gas struggling to ionize.
    - **Stable State:** The letter floods with color. The `filter: drop-shadow` expands from 0px to 15px blur.
    - Sequential delay: Each letter starts its ignition 150ms after the previous one finishes flickering.
2.  **Ambient (The Buzz):**
    - Stable letters have a subtle 'breath' animation: `scale(1.001)` and opacity oscillation between 0.9 and 1.0.
    - Randomized micro-flickers: Every 4-8 seconds, one random letter flickers once (very brief, low intensity) to maintain the 'live' feel.
3.  **Interaction:**
    - **Hover:** The hovered word's glow radius increases by 50%. The color shifts slightly warmer.
    - **Click:** Simulates a power cut. All lights fade to the unlit gray state over 1 second. Click again to re-trigger the full ignition sequence.

## Constraints & Acceptance Criteria
- **No Purple Glow:** Avoid standard cyberpunk purple/neon. Use warm white, red, or blue depending on the 'gas' type.
- **Performance:** Use CSS `filter` and `transform` for animations. Avoid heavy JS loops for individual particles.
- **Accessibility:** Respect `prefers-reduced-motion`. If set, show static lit text immediately without flicker.
- **Contrast:** Ensure the unlit state is barely visible but present to guide the eye during the reveal.

## Variants
- **A (Red Gas):** Warm, urgent, classic 'ON AIR'.
- **B (Blue Gas):** Cold, technical, 'SYSTEM ONLINE'.
- **C (White Gas):** Pure, clean, 'FOCUS'.
