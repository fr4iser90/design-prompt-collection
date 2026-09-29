# Heat Haze Text Warp — Extended

## Concept
This concept captures the visual noise of a hot day. The air itself is unstable. Text, which is usually static and reliable, becomes unstable and hard to read unless the environment (the cursor) is calm. It’s a study in clarity vs. chaos, mediated by temperature (movement).

## Palette
- **Sun Bleached (`#FFFDF7`):** The background. It should feel glaringly bright.
- **Dust Mote (`#E6DCCD`):** Subtle noise overlay color.
- **Clay Ink (`#B8A995`):** The text color. Not black, but a warm, faded grey-brown.
- **Heat Wave (`#FFFFFF`):** The highlight color for sharp edges when settled.

## Typography
- **Display:** A heavy, geometric sans-serif. The weight helps the distortion effect read clearly.
- **Spacing:** Tight tracking. The distortion works best when letters are close enough to bleed into each other slightly.

## Layout
- **Center Stage:** A single word or phrase centered in the viewport. No other UI elements to distract from the effect.
- **Negative Space:** Massive white space to emphasize the isolation and the 'heat' of the center.

## Motion Brief
1. **Idle State:** Low-frequency, high-amplitude turbulence. The text looks like it's seen through a mirage.
2. **Interaction (Cursor Move):** Increases the frequency of the turbulence. The text shimmers violently.
3. **Interaction (Cursor Still):** After 500ms of no movement, the turbulence amplitude decreases to zero. The text snaps into sharp focus.
4. **Ambient:** A very slow, global drift of the heat wave from left to right.

## Constraints
- Do not use blur filters. Use displacement maps for accurate refraction.
- The effect must be performant. Use `requestAnimationFrame` to update SVG filter parameters.
- The text must remain readable even at peak distortion.

## Acceptance Criteria
- The distortion must look like air refraction, not a liquid warp.
- The transition from 'hot' (distorted) to 'cool' (sharp) must be smooth and responsive.
