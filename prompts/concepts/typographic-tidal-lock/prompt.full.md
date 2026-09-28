# Typographic Tidal Lock — Extended Brief

**Concept**: Visualize hierarchy through orbital mechanics. The most important information is closest to the "core" and thus moves fastest and appears largest. This creates a dynamic, hypnotic focal point.

**Palette**:
*   Deep Space Blue (#1a1a2e) - Background
*   Nebula Blue (#16213e) - Secondary orbits
*   Gravity Well (#0f3460) - Inner orbits
*   Starburst (#e94560) - Highlight for key words only

**Typography**:
*   Display: Space Grotesk or similar geometric sans.
*   The text content should be relevant to the "gravity" theme (e.g., "MASS", "PULL", "ORBIT", "VELOCITY").

**Layout**:
*   **Desktop**: Centered circular arrangement. 3-5 distinct orbit rings.
*   **Mobile**: Simplify to 2 rings. Reduce text length to prevent overlapping.

**Motion Brief**:
*   **Continuous**: Infinite rotation loops. Use `animation: spin Xs linear infinite`.
*   **Depth**: Apply `transform-style: preserve-3d` on the container. Tilt the container slightly (-10deg X) to see the elliptical path.
*   **Parallax**: As the container tilts, the front text should appear larger than the back text (natural 3D perspective).

**Constraints**:
*   Avoid heavy JS for animation; use CSS keyframes for performance.
*   Ensure text is not mirrored when it rotates to the back side (use `backface-visibility: hidden` and duplicate elements if necessary for seamless looping).

**Acceptance Criteria**:
*   Smooth 60fps rotation without jitter.
*   Clear visual hierarchy between inner and outer rings.
*   Responsive sizing that maintains the circular shape.
