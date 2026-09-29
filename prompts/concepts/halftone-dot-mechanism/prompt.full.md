# Halftone Dot Mechanism — Extended

## Concept
A study in the mechanics of screen printing. The interface treats digital imagery as a physical screen, allowing the user to manipulate the angle and size of the halftone dots. This reveals the image clarity or obscures it, mimicking the imperfections and textures of mass-media print.

## Palette
- **Newsprint:** `#f4f4f0` (Background)
- **Ink:** `#1a1a1a` (Text & Dots)
- **Spot Color:** `#ff3366` (Accents, registration marks)

## Typography
- **Display:** A bold, tight-tracking grotesque sans-serif. Large scale.
- **Body:** A readable, neutral sans-serif, smaller size, high line-height.

## Layout
- **Desktop:** Two-column split. Left: Headline and descriptive text. Right: The interactive halftone image container.
- **Mobile:** Stacked. Image above text, interaction via touch-and-hold.

## Motion Brief
- **Idle:** Dots are static at 15° angle, small size.
- **Hover (Image):** Angle shifts to 45°. Dot radius increases by 20%. 
- **Hover (Headline):** Triggers the image interaction remotely for better UX on mobile.
- **Click:** Toggles between Black/White and CMYK color separation view (dots change color based on RGB values).

## Constraints
- No blurring effects; use CSS `mask-image` or SVG patterns for the halftone.
- Maintain strict grid alignment for typography.
- Performance: Use `will-change: transform` on the image container.

## Acceptance Criteria
- Image is clearly legible when dots are large/rotated, abstract when small/straight.
- Registration marks are always visible and do not rotate.
- No external libraries required for the dot pattern (SVG/CSS preferred).
