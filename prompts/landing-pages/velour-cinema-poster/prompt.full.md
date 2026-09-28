# Velour Cinema Poster — Extended

## Concept
'Velour' is a neo-noir thriller. The landing page mimics a high-end movie poster. The key visual element is the interplay of light and shadow. The title is the protagonist. It is lit by a single source that moves with the user, casting dramatic, elongated shadows. The background is textured with faint film grain and diagonal light leaks.

## Palette
- **Night**: #0f0f0f (Background)
- **Gold**: #d4af37 (Title, Highlights)
- **Shadow Brown**: #5d4037 (Deep shadows, secondary text)

## Type Pairing
- **Display**: A high-contrast serif (e.g., 'Bodoni Moda' or 'Playfair Display') with tight tracking. All caps.
- **Body**: A clean, condensed sans-serif for dates and CTAs (e.g., 'Oswald' or 'Bebas Neue').

## Layout
- **Hero**: Full screen. Title centered. Light beams are fixed background layers.
- **Bottom**: Three-column layout for 'Synopsis', 'Cast', 'Showtimes'. Minimalist icons.

## Motion Brief
1. **Parallax Shadow**: The text-shadow on the title follows the mouse cursor inversely (light source moves, shadow moves opposite). Use `box-shadow` or `text-shadow` with large blur values.
2. **Light Leaks**: Subtle animated gradients that sweep across the screen every 10 seconds, like a projector flicker.
3. **Entrance**: Letters 'fade in' from darkness, with the shadow arriving slightly after the letters, creating a sense of weight.

## Constraints Checklist
- [ ] Avoid cliché noir clichés (fedora hats, rain) unless abstracted.
- [ ] Text must remain readable against the dark background.
- [ ] Performance: Limit the number of animated gradients.

## Acceptance Criteria
- The page feels cinematic and immersive.
- The motion is subtle but adds depth.
- The brand 'Velour' feels luxurious and mysterious.
