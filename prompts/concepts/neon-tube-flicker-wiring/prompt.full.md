# Neon Tube Flicker Wiring — Extended

## Concept
Capturing the allure of urban nightlife. Typography is not written; it's wired. Each letter is a complex glass tube filled with noble gas. The motion focuses on the 'ignition' sequence—how light travels through a physical conduit—and the inherent instability of electrical systems. It's a study in light, shadow, and imperfection.

## Palette
-   **Night**: `#050505` (Near-black, urban night sky)
-   **Neon Pink**: `#ff0055` (Vivid, glowing, classic sign color)
-   **Neon Cyan**: `#00ffff` (Cool, electric, complementary accent)
-   **Tube Glass**: `#333333` (Dark grey, unlit tube outline)

## Typography
-   **Font**: A script or rounded sans-serif font with continuous strokes (e.g., *Pacifico* or *Bebas Neue* with rounded caps). Avoid serif fonts; neon tubes are continuous.
-   **Style**: Stroke-based. Text should be represented as outlines initially.

## Layout
-   **Desktop**: Large, centered sign. Perspective tilt to show the 'mounting'.
-   **Mobile**: Smaller, centered. Focus on the glow effect.

## Motion Brief
1.  **Entrance**: 'Ignition' sequence. Light travels along the SVG stroke (`stroke-dashoffset`) to fill the letter.
2.  **Ambient**: Once lit, the letter maintains a base brightness with a slow, subtle pulsing (glow intensity variation).
3.  **Imperfection (Flicker)**:
    -   Randomly, one letter in the word will flicker (opacity drop to 20% then back to 100%) several times rapidly.
    -   This simulates a failing electrode.
4.  **Interaction**: Hovering a letter might cause it to flicker more intensely or change color.

## Constraints
-   Glow must be soft and atmospheric, not harsh pixelation.
-   Flickering should be rare enough to not cause eye strain, but frequent enough to feel 'real'.
-   Use SVG for precise stroke control.

## Acceptance Criteria
-   The 'ignition' feels like electricity flowing, not just a fade-in.
-   Glow creates a realistic ambient light effect on the background.
-   Imperfections add character, not noise.
