# Magnetic Ferrofluid Kerning — Extended

## Concept
This concept explores the tension between rigid digital typography and organic, fluid physics. By applying ferrofluid dynamics to text, we create a tactile, almost hazardous visual experience. The text feels alive, reactive, and slightly unstable, drawing the user in with the promise of physical interaction.

## Art Direction
- **Palette:**
  - `#0a0a0a`: Background (pure dark to absorb light).
  - `#2b2b2b`: Base text color (dark, but distinguishable from bg).
  - `#ffffff`: Highlight spikes (specular reflection on the liquid peaks).
  - `#444444`: Shadow/depth inside the fluid curves.
- **Typography:**
  - Must be extremely heavy weight. Thin fonts will break under deformation. 
  - Recommended: `"Helvetica Now Display", "Arial Black", sans-serif` with `font-weight: 900`.
  - Tight letter-spacing initially to allow room for expansion.

## Technical Approach
1.  **SVG Filter Method (Lightweight):**
    - Use `feTurbulence` to generate noise.
    - Use `feDisplacementMap` to shift pixels based on a mask centered on the mouse position.
    - Combine with `feGaussianBlur` and `feColorMatrix` to sharpen the 'spikes'.
2.  **Canvas/WebGL Method (High Fidelity):**
    - Render text to a texture.
    - Apply a vertex shader that displaces vertices towards the mouse coordinate with a falloff function.
    - Add a normal map effect to simulate the liquid surface reflecting a virtual light source.

## Motion Brief
- **Idle:** Text is static, matte, and flat.
- **Hover (Approach):**
    - Radius of influence: ~100px.
    - As cursor enters radius, the nearest edge of the letter begins to bulge towards the cursor.
    - Intensity increases exponentially with proximity.
    - **The Spike:** At the closest point, the geometry creates a sharp, conical spike. This should look like the liquid is being pulled into a needle point.
- **Hover (Exit):**
    - The spike retracts. The liquid overshoots the original boundary slightly (elasticity), then settles.
    - Duration: 400ms with `cubic-bezier(0.68, -0.55, 0.27, 1.55)` easing for the snap-back.
- **Group Behavior:**
    - If two letters are close and one is heavily deformed, the adjacent letter should subtly bulge in the opposite direction (conservation of volume).

## Constraints & Acceptance Criteria
- **No Pixelation:** The edges must remain smooth. Avoid hard-edged displacement.
- **Performance:** On mobile, disable the spike effect and use a simple scale/translate towards touch instead.
- **Readability:** The text must remain legible. Deformation should not destroy the letterform identity.
- **Accessibility:** Provide a static version for users with vestibular disorders.

## Variants
- **A (Spiky):** High frequency, sharp spikes (high magnetic strength).
- **B (Blobby):** Low frequency, rounded bulges (low magnetic strength, higher viscosity).
