# Abyssal Pressure Depth Scale — Extended

## Concept
Explore the concept of 'pressure' as both a physical force and a visual distortion mechanism. The interface is not just a list of data; it is a descent. As the user scrolls, they travel deeper into the water column. The UI must convey the weight of the ocean above by physically reacting to the scroll position.

## Palette
- **Surface:** `#005f73` (Deep Teal) - Bright, high visibility.
- **Mid-Depth:** `#0a9396` (Turquoise) - The zone where light begins to scatter.
- **Abyss:** `#001219` (Almost Black) - Zero visibility, high pressure.
- **Accent:** `#94d2bd` (Pale Mint) - For critical data points and highlights, mimicking bioluminescence.

## Typography
- **Display:** `Space Grotesk` (Bold) - Clean, modern, slightly technical.
- **Data:** `IBM Plex Mono` - For depth counters, pressure readings, and timestamps. Must feel instrument-grade.
- **Body:** `Lato` Light - Highly legible against dark backgrounds, thin weight to suggest fragility under pressure.

## Layout
- **Desktop:** Full-height viewport sections. Sticky sidebar showing a 'depth gauge' (vertical line with markers) that fills as user scrolls. Content cards appear sequentially in the center-right.
- **Mobile:** Single column. Depth gauge becomes a fixed top-bar progress indicator. Cards stack vertically with increased spacing to maintain readability under compression effects.

## Motion Brief
1. **Entrance:** Elements fade in with a 'water drop' ripple effect (scale up slightly from center, then settle).
2. **Ambient:** Faint particle drift (marine snow) moving slowly upward relative to the user's downward scroll, creating parallax depth.
3. **Interaction (Scroll):** 
   - `scrollY` drives `scaleY` of content containers (1.0 at top, 0.85 at bottom).
   - `blur(0px)` to `blur(2px)` on edges of cards as depth increases.
   - Background gradient interpolates between palette colors.

## Constraints
- No purple glows.
- Text must remain readable even when compressed (adjust letter-spacing or font-weight dynamically if needed).
- Avoid realistic water textures (ripples/bubbles); focus on *light refraction* and *darkness*.

## Acceptance Criteria
- Smooth scroll performance (60fps).
- Clear visual distinction between surface and abyss states.
- 'Pressure' metaphor is immediately understood through UI deformation.
