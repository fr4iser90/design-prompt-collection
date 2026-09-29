# Asphalt Lane Marking Reveal — Extended

## Concept
This concept brings the aesthetic of urban infrastructure into digital typography. It simulates the process of road marking application, using the physicality of paint on rough surfaces to create a sense of permanence and direction. Ideal for navigation interfaces, transit apps, or wayfinding systems.

## Palette
- **Asphalt Base:** `#4A4A4A` (Dark gray, low saturation)
- **Traffic Yellow:** `#FCC419` (High visibility, warm)
- **Paint White:** `#FFFFFF` (Cool white for text contrast)
- **Shadow:** `#2B2B2B` (Subtle depth in asphalt pits)

## Typography
- **Display Font:** `Montserrat` ExtraBold or `Arial Black`. Wide, legible, road-sign inspired.
- **Case:** All Caps.
- **Size:** Large, filling the height of the yellow line.

## Layout
- **Desktop:** Horizontal strip across the middle of the viewport. Text flows left-to-right.
- **Mobile:** Text may need to stack or scale down. Ensure the "paint" line remains thick enough (min 8px) to be visible.

## Motion Brief
1. **Pre-state:** Asphalt texture is static. Text is invisible (opacity 0). Yellow line stroke-dash is 0.
2. **Action:** 
   - Yellow line draws L->R over 2s.
   - **Easing:** Linear for the spray, but with a slight acceleration at the start.
   - **Masking:** Use an SVG mask that expands with the line to reveal the white text underneath.
   - **Texture:** Apply a `feDisplacementMap` filter with low frequency to the yellow line edges, making them look uneven and bonded.
   - **Heat Haze:** Animate the `feTurbulence` seed value slowly to create a shimmering heat effect above the yellow paint.
3. **Post-state:** The line is fully drawn. Text is crisp. Heat haze continues subtly.

## Constraints
- **Texture Load:** Use a tiled PNG for asphalt to keep file size low.
- **Contrast:** Ensure the yellow line has a 1px dark border or shadow if the asphalt is too light in areas.
- **No Glow:** Avoid neon glows; this is matte paint, not light.

## Acceptance Criteria
- The line looks like it's *on* the surface, not above it.
- The text reveal feels synchronized with the paint application.
- The overall vibe is industrial and rugged.
