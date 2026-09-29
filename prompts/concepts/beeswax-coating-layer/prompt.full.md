# Beeswax Coating Layer — Extended

## Concept
This concept explores the tactile quality of beeswax finishes on wood or paper. It visualizes the process of applying a protective, warming layer to a raw, cold substrate. The interface acts as a material simulator where the 'state' of the surface (raw vs. finished) is determined by user interaction, representing care, preservation, and warmth.

## Palette
- **Raw Substrate:** #1a120b (Deep Espresso/Charcoal)
- **Mid-Wax:** #8b5a2b (Rich Amber)
- **Highlight/Thin Wax:** #d4a373 (Golden Honey)
- **Text:** #ffffff (White, with blend-mode effects to interact with the wax color)

## Typography
- **Display:** *Cormorant Garamond* or *EB Garamond*. High contrast serif. The serifs should appear 'softened' or 'blurred' by the wax layer.
- **Body:** *Lato* or *Source Sans Pro*. Clean, sans-serif, used for technical labels or instructions.

## Layout
- **Desktop:** A central card-like element representing a wood panel. The wax layer is an overlay with CSS `backdrop-filter` and opacity masks.
- **Mobile:** Full-screen overlay. The wax 'pours' from the top of the screen as the user scrolls down.

## Motion Brief
1. **Entrance:** The substrate is visible. A single drop of liquid wax hits the center and spreads.
2. **Ambient:** Slow, subtle movement of the specular highlights on the wax surface, simulating a light source moving slightly.
3. **Interaction:** Hovering or scrolling increases the 'coating' percentage. As it increases, the dark substrate becomes more obscured by the warm amber glow. At 100%, the text becomes fully legible through the translucent wax.

## Constraints Checklist
- [ ] No flat colors for the wax; must use gradients and opacity to simulate translucency.
- [ ] The 'melt' transition must be smooth (easing-out).
- [ ] Text readability must remain high even at partial wax coverage.
- [ ] No standard SaaS buttons; use 'Pour' or 'Apply' text links.

## Acceptance Criteria
- The material feels warm and organic.
- The transition between 'raw' and 'finished' is visually distinct.
- The code uses CSS variables for the wax color to allow easy theming (e.g., different wax tints).
