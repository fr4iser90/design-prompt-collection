# Butcher Block Grain Map — Extended Brief

## Concept
Professional knives are tools of precision, not just kitchen utensils. This concept visualizes that precision by treating the wood grain of a butcher block as a topographical map. The user doesn't just scroll; they 'navigate' the surface. When a user interacts with a knife, the interface responds as if the blade is physically cutting through the wood, revealing the product's specs beneath the grain. This reinforces the brand's message of sharpness and craftsmanship.

## Palette
- **Base:** `#E0C9A6` (Light Beech) – The wood surface.
- **Accent 1:** `#8B5A2B` (Dark Walnut) – Grain lines and shadows.
- **Accent 2:** `#333333` (Steel) – Knives, text, and UI elements.
- **Highlight:** `#FFFFFF` (White) – Revealed details under the 'cut'.

## Typography
- **Display:** *Oswald* or *Bebas Neue*. All caps, tight tracking. Evokes stamped metal or industrial labeling.
- **Body:** *Roboto Mono*. Small, technical specs (length, weight, steel type).
- **Rule:** Text should look like it's stamped onto the wood or etched into the blade.

## Layout & Structure
- **Hero:** A full-width macro shot of a butcher block. A single, large chef's knife lies diagonally. Text is aligned to the knife's edge.
- **Navigation:** Horizontal scroll. As the user scrolls, the 'grain' shifts slightly, creating parallax depth.
- **Product Cards:** 
    - Each card is a rectangular 'block' of wood grain.
    - On hover, a 'blade' SVG element slides across the card, 'cutting' it open to reveal the product details (white background, black text) underneath.
    - The cut line is thin and sharp, with a subtle shadow to give depth.
- **Footer:** Minimal. A single 'Sharpening Service' CTA styled like a stamp.

## Motion Brief
- **Entrance:** The hero image fades in, followed by the text stamping onto the screen (scale down + opacity).
- **Ambient:** None. The wood should feel static and solid.
- **Interaction:** The 'cut' animation must be instant (200ms) with a slight 'snap' easing. No slow reveals.

## Constraints
- No rustic 'farmhouse' vibes (no ferns, no chalkboards).
- The wood texture must be realistic, not cartoonish.
- The 'cut' effect should not obscure the product image completely; it should reveal it.

## Acceptance Criteria
- The wood grain texture must tile seamlessly.
- The hover 'cut' effect must be performant (use CSS transforms, not complex filters if possible).
- The brand feels professional, sharp, and grounded.
