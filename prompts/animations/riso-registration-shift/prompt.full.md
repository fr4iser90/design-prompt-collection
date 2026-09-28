# Riso Registration Shift — Extended Brief

## Concept
This animation captures the specific aesthetic of Risograph printing: the unpredictable, charming error of layer misalignment. Unlike digital glitches, Riso errors are physical, mechanical, and rhythmic. The goal is to evoke the feeling of holding a freshly printed zine where the ink hasn't quite dried or the drum skipped a beat.

## Palette & Material
- **Background:** `#F2F2F0` (Warm Paper). Must have a noise overlay (opacity 5-10%) to simulate paper fibers.
- **Ink 1:** `#FF4000` (Fluorescent Orange). High saturation, high energy.
- **Ink 2:** `#00FFFF` (Fluorescent Cyan). High saturation, high contrast against orange.
- **Blending:** Critical. Must use `multiply` blend mode. When Orange and Cyan overlap, the result should be a deep, muddy violet, not a bright blue/green.

## Typography & Layout
- **Font:** Heavy, grotesque sans-serif (e.g., Helvetica Black, Roboto Black, or a custom Riso-friendly typeface). Avoid thin weights; the type needs mass to show the 'ghosting' and separation clearly.
- **Composition:** Centered, monumental. The text should bleed off the edges or be cropped tightly to feel like a poster crop.
- **Elements:** Two identical layers of the same text/shape. Layer A is Orange. Layer B is Cyan.

## Motion Design
- **Mechanism:** Simulate two rollers. 
- **Keyframes:**
  - `0%`: Offset (X: 10px, Y: -5px). 
  - `25%`: Offset (X: -5px, Y: 10px).
  - `50%`: Perfect Alignment (X: 0, Y: 0). Hold for 0.5s.
  - `75%`: Offset (X: 15px, Y: 5px).
  - `100%`: Offset (X: 10px, Y: -5px).
- **Easing:** Use `steps()` or sharp `cubic-bezier` to mimic mechanical snapping. Avoid smooth sine waves; it should feel like a machine clicking.

## Technical Constraints
- Use CSS `transform: translate3d()` for performance.
- Ensure the blend modes work in dark mode (invert background to dark grey if needed, but keep inks bright).
- Loop must be seamless.

## Acceptance Criteria
1. The overlap creates a third distinct color (dark/violet).
2. The motion feels mechanical, not floaty.
3. Paper grain is visible but subtle.
4. Text remains legible even when misaligned.
