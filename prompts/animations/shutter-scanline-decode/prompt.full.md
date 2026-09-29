# Shutter Scanline Decode — Extended

## Concept
This animation captures the specific aesthetic and mechanical rhythm of analog video transmission. It treats text not as instant data, but as a signal being resolved by a physical beam. The 'decode' process creates anticipation and a sense of technical precision, fitting for cybersecurity, retro-gaming, or data-science interfaces.

## Art Direction
- **Palette:**
  - `#000000`: Deep void.
  - `#001100`: Subtle green tint for the 'off' state.
  - `#4af626`: Classic phosphor green (bright, saturated).
  - `#00ff41`: Slightly different green for the scanline highlight.
- **Typography:**
  - Monospaced fonts are essential for the grid-like alignment of scanlines. 
  - Add a slight `text-shadow: 0 0 5px #4af626` to simulate phosphor bloom.
  - Optional: Apply a slight curvature to the container using `perspective` and `rotateX` to mimic a convex CRT screen.

## Technical Implementation
1.  **Layering:**
    - **Layer 1 (Base):** The final sharp text, but clipped or masked.
    - **Layer 2 (Noise):** An animated SVG turbulence or PNG sequence of static noise, covering the text.
    - **Layer 3 (Scanline):** A gradient div (transparent -> bright green -> transparent) moving via `transform: translateY()`.
2.  **The Masking Logic:**
    - Use `clip-path: inset(...)` or a complex mask-image on the noise layer.
    - The mask should be 'open' below the scanline (showing noise) and 'closed' above it (hiding noise, revealing sharp text underneath).
    - *Alternative:* Use a `mask-image` with a gradient that moves. Where the mask is white, show sharp text. Where black, show noise.

## Motion Brief
- **Continuous Scan:**
    - Duration: 1.5s to 3s per sweep.
    - Easing: `linear` (constant speed, mechanical).
    - At the bottom, it instantly resets to the top.
- **Signal Stability (Ambient):**
    - Add a very subtle horizontal jitter (1px) to the entire text container every 2-3 seconds to simulate sync drift.
    - Occasional 'glitch' bars (horizontal slices of the text shifting horizontally) for 100ms.
- **Interaction:**
    - **Hover:** The scanline pauses at the mouse Y-coordinate. The text below the paused line remains noisy, but the text above is fully resolved. 
    - **Click:** 'Locks' the resolution. The entire text becomes sharp. A 'LOCKED' or 'SYNCED' status indicator appears.

## Constraints & Acceptance Criteria
- **No Heavy JS:** The scanline movement should be CSS-only for performance. Noise can be a static repeating background animated with `background-position`.
- **Contrast:** Ensure the green text is readable against the dark background. Use `font-weight: bold`.
- **Reduced Motion:** Disable the scanline sweep and show static sharp text.

## Variants
- **A (Green CRT):** Classic terminal look.
- **B (Amber CRT):** Warmer, softer, `#ffb000`.
- **C (Glitch Art):** More aggressive noise, chromatic aberration on the scanline edges.
