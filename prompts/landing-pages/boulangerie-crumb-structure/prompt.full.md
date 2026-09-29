# Boulangerie Crumb Structure — Extended

## Concept
The core metaphor is the "crumb structure" of sourdough bread—its irregular, airy, yet structured interior. The website layout should reflect this organic geometry. Instead of rigid grids, use a masonry-like structure that feels handmade and light. The color palette evokes the varying stages of baking: raw flour, fermentation bubbles, golden crust, and dark rye. The tone is quiet, premium, and deeply tactile.

## Palette
- **Flour White:** #F5F5DC (Background, whitespace)
- **Toasted Crust:** #D2B48C (Accents, borders, buttons)
- **Rye Dark:** #8B4513 (Text, footer, high-contrast elements)
- **Air:** Transparent/White overlays

## Typography
- **Display:** *Cormorant Garamond* or *Playfair Display*. Use large sizes (clamp 3rem–6rem) with tight leading to mimic density.
- **Body:** *Lato* or *Open Sans* in light weight. Generous line height for readability.
- **Rule:** Never use all-caps for body text. Headings can be small-caps for elegance.

## Layout
- **Desktop:** A split-screen hero. Left: Large serif heading "Air. Time. Flour." Right: Vertical slice of macro bread texture. Below: A staggered grid of "Today's Bakes" cards, each with a different aspect ratio mimicking bread slices.
- **Mobile:** Stacked. Hero image becomes background with text overlay. Cards become full-width with horizontal scroll snap.

## Motion Brief
- **Entrance:** The hero text rises like dough proofing (ease-out cubic-bezier). The background image slides in from the right.
- **Ambient:** A very slow, continuous horizontal pan on the macro bread textures (120s duration) to create a sense of slow time/fermentation.
- **Interaction:** Hovering over a product card slightly zooms the image and increases the contrast of the crust color.

## Constraints & Acceptance
- No rustic farmhouse clichés (no wood planks, no chalkboards, no burlap).
- Focus on the *interior* texture of bread, not just the exterior crust.
- Fast load times: Optimize images for web (WebP).
- Accessible contrast ratios for all text.

## Variants
- **Variant A (Light Mode):** Dominant Flour White with subtle beige textures.
- **Variant B (Dark Mode):** Deep Rye background with warm, glowing accent lights (like an oven light).
