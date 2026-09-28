# Magnetic Morph Wordmark — Extended Brief

**Concept**: Move beyond simple hover effects. This is about *tension* and *release*. The typography should feel like it has mass and elasticity. It conveys a brand that is solid yet adaptable.

**Palette**:
*   Canvas: Off-White (#f0f0f0)
*   Typography: Deep Black (#111111)
*   Interaction Cue: Electric Blue (#0055ff)

**Typography**:
*   Custom SVG Wordmark: "FLUX" or "MAGNET". The letters should be geometric with no loose serifs to maintain clarity during distortion.

**Layout**:
*   Centered, large-scale wordmark. Plenty of whitespace to allow for the "magnetic pull" movement without clipping.

**Motion Brief**:
*   **Idle**: Static, perfect alignment.
*   **Hover/Move**: Real-time calculation of cursor distance to each letter's center.
    *   Calculate vector from letter center to cursor.
    *   Apply vector scaled by a proximity factor.
    *   Apply a slight rotation based on the angle of the pull.
*   **Leave**: Spring-back animation.

**Constraints**:
*   Do not break the baseline. The "pull" should feel like the letter is being tugged, not just floating.
*   Performance: Optimize calculations to avoid lag during rapid mouse movement.
*   No purple glows or generic fade-ins.

**Acceptance Criteria**:
*   The distortion feels organic, not robotic.
*   The spring-back animation is satisfying (not too slow, not too bouncy).
*   Works smoothly on trackpads and mice.
