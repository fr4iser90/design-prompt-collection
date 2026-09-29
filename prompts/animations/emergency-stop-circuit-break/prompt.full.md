# Emergency Stop Circuit Break — Extended

## Concept
This animation explores the visceral tension of industrial safety protocols. It visualizes the transition from high-energy potential to controlled, silent zero-state. The aesthetic is "utility brutalism" — functional, heavy, and unadorned. The focus is on the mechanical certainty of the disconnect.

## Palette
- **Safety Red:** `#D0021B` (The button head, active warning lights)
- **Live Copper:** `#B87333` fading to `#FF5722` glow (Internal busbars)
- **Steel Faceplate:** `#2B2B2B` to `#555555` (Background, housing)
- **Status White:** `#F2F2F2` (Text, highlights)
- **Arc Flash:** `#E0F7FA` (Brief, sharp blue-white)

## Layout & Composition
- **Desktop:** Centered composition. The E-Stop takes up 60% of the vertical height. The steel faceplate has subtle brushed metal texture (horizontal lines). 
- **Mobile:** Tighter crop on the button head and the gap between contacts. Status text moves to the bottom 20%.
- **Depth:** Shallow depth of field is minimal; the mechanism should look sharp and technical, like a macro photograph of a control panel.

## Motion Brief
1. **Idle State:** The copper busbars pulse gently (opacity 0.8–1.0) with a slow sine wave, indicating live current. The red button is raised.
2. **Compression (0.0s – 1.2s):** The button head moves down 15px. The red rubber bezel around the base compresses and wrinkles realistically. The copper glow intensifies slightly due to 'pressure'.
3. **The Break (1.2s – 1.25s):** 
   - The button hits the bottom of its travel.
   - Internal contacts separate. A jagged, short-lived arc of blue-white light flashes between the contacts.
   - The copper glow cuts to black instantly.
   - The status text changes via a hard cut (no fade).
4. **Lockout (1.25s – End):** The button remains depressed. A small secondary latch (visible on the side) clicks into place (rotate 90 degrees) to indicate the lock. The scene is static and cold.

## Technical Constraints
- Use SVG for the vector mechanics to ensure crisp lines at any resolution.
- CSS filters or SVG `<feGaussianBlur>` for the arc flash glow.
- Avoid excessive particles; the 'danger' should come from the light, not debris.
- Ensure the red color is accessible against the dark steel background (contrast ratio > 4.5:1).

## Acceptance Criteria
- The 'snap' must feel mechanically heavy, not like a digital toggle.
- The transition from 'Live' (warm/orange) to 'Off' (cold/dark) must be unmistakable.
- No brand logos; generic industrial aesthetic.
