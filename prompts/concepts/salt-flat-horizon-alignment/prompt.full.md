# Salt Flat Horizon Alignment — Extended

## Concept
This concept explores the disorienting beauty of the Salar de Uyuni or Bonneville Salt Flats, where the white crust reflects the sky so perfectly that the horizon disappears. The design metaphor is 'alignment through clarity.' UI elements do not compete; they sit on a single, flat plane. Depth is conveyed solely through shadow length and subtle scaling, not z-index stacking.

## Palette
- **Bone White (`#F5F5F0`):** The primary ground surface.
- **Pale Ash (`#E0D8D0`):** The sky/upper gradient.
- **Dust Grey (`#8A857C`):** Text and shadow bases.
- **Shadow Blue-Grey (`#6E7A8A`):** Long, soft shadows (simulated atmospheric scattering).

## Typography
- **Display:** A geometric sans-serif with very high x-height and light weights (e.g., 'Neue Haas Grotesk Text Light' or similar). Letter-spacing is wide (+0.1em).
- **Body:** A monospaced font for data points, evoking surveying markers.

## Layout
- **Desktop:** Full-bleed viewport. Content is anchored to the center vertical axis. Elements are spaced generously.
- **Mobile:** The horizon line moves to the top 1/3rd, allowing shadows to fill the lower 2/3rds, creating a sense of weightlessness.

## Motion Brief
1. **Entrance:** The horizon line draws itself from left to right. Elements fade in from the 'sky' (top) and settle onto the 'flat' (center) with a soft bounce.
2. **Ambient:** Dust particles drift laterally. The heat haze at the bottom edge shimmering subtly.
3. **Interaction:** Hovering over a text block causes its shadow to stretch toward the user (perspective shift). The element itself remains static; only the shadow moves, creating a parallax-like effect without moving the content.

## Constraints
- No dark backgrounds. This must be a light-mode concept.
- No boxes or borders. Elements must appear to float on the ground.
- Shadows must be long and soft, not drop-shadows of 5px.

## Acceptance Criteria
- The horizon line must be crisp but subtle.
- Shadow perspective must mathematically align with a light source at the zenith (top-center).
