# Glass Blown Syllable Expansion — Extended

## Concept
Explore the duality of glass: brittle when cold, fluid when hot. In this kinetic type study, typography is not static ink but a physical material that reacts to thermal energy. The user's cursor is the furnace. Words are 'blown' into existence, swelling under pressure and heat, revealing hierarchy through physical mass and light emission.

## Palette
-   **Void**: `#0a0a0a` (Deep black, background)
-   **Molten Core**: `#ff4500` (Orange-red, peak heat glow)
-   **Cool Glass**: `#87ceeb` (Light blue-white, refracted light highlights)
-   **Base Type**: `#ffffff` (Solid, white, cold state)

## Typography
-   **Font**: A high-contrast serif (e.g., *Playfair Display* or *Cormorant Garamond*) or a geometric sans with thin strokes that can 'melt' convincingly. Avoid bold weights; thin strokes emphasize the 'blowing' effect.
-   **Hierarchy**: Large display type for the main word. Smaller supporting text remains static/cold to emphasize the active word's energy.

## Layout
-   **Desktop**: Centered viewport. Main word in center. Cursor acts as a radial heat field.
-   **Mobile**: Tap to trigger the 'blow' animation on the tapped word.

## Motion Brief
1.  **Entrance**: Words fade in as solid, cold objects.
2.  **Interaction (Heat)**:
    -   Cursor proximity increases a `heat` variable (0.0 to 1.0) for each letter.
    -   `scale`: `1 + (heat * 0.3)`
    -   `color`: Lerp from `#fff` to `#ff4500` based on heat.
    -   `blur`: Slight blur at peak heat to simulate softness.
3.  **Interaction (Cool)**:
    -   Heat decays exponentially when cursor moves away.
    -   Scale and color return to base state with a 'settle' spring animation.

## Constraints
-   No heavy WebGL if possible; use CSS `filter` and `transform` for performance.
-   Text must remain legible even at peak expansion.
-   Avoid pixelation; use vector text (SVG or high-res DOM).

## Acceptance Criteria
-   Smooth, organic expansion that feels like air pressure, not just scaling.
-   Realistic cooling lag (glass doesn't snap cold instantly).
-   High visual contrast between hot (glowing, large) and cold (sharp, small) states.
