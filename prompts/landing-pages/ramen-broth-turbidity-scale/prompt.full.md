# Ramen Broth Turbidity Scale — Extended Brief

## Concept
Most food landing pages rely on static, high-saturation photography. This concept leverages the *physics* of ramen broth—specifically its emulsion state—to create an immersive, sensory experience. The user journey mirrors the cooking process: starting with clear water and ending with rich, opaque tonkotsu. This conveys the brand's promise of depth and time without showing a single ingredient list in the hero.

## Palette
- **Base:** `#F5F5F0` (Bone White) – Clean, sterile start.
- **Accent 1:** `#D4A373` (Pork Bone Broth) – Warm, creamy, opaque.
- **Accent 2:** `#5C4033` (Dark Soy/Tare) – Deep, rich contrast.
- **Neutral:** `#2C2C2C` (Charcoal) – For text and fine lines.

## Typography
- **Display:** *Cormorant Garamond* or similar high-contrast serif. It evokes tradition and elegance.
- **UI/Body:** *Inter* or *Helvetica Neue* (thin/light weight). It provides the 'lab precision' contrast to the organic broth.
- **Rule:** Never use bold weights for body text. Let the whitespace breathe.

## Layout & Structure
- **Hero:** Full viewport. Centered text: "Patience in a Bowl." Background: A slow-motion loop of steam rising against a dark background (inverted for contrast) or light background with dark steam opacity. 
- **Scroll Interaction:** As the user scrolls, a CSS variable controls the `backdrop-filter: blur()` and `opacity` of a beige layer overlaying the content. 
    - 0-20% scroll: Clear, sharp text.
    - 50% scroll: Milky, softened text, warmer background.
    - 100% scroll: Rich, opaque background, text in high-contrast white or dark brown.
- **Product Grid:** Minimalist. Each flavor is represented by a color swatch that matches its broth turbidity (e.g., Shoyu = transparent amber; Miso = cloudy orange).

## Motion Brief
- **Entrance:** Text fades in with a slight upward drift (buoyancy).
- **Ambient:** Subtle particle system (steam) rising from the bottom center. Use low-opacity white circles with blur.
- **Interaction:** Hovering over a flavor card increases its 'temperature' (slight scale up + increased blur on the background behind the card).

## Constraints
- No rustic textures (wood, burlap).
- No 'chef' caricatures.
- Keep the UI sterile and modern; the warmth comes from color and opacity, not ornamentation.

## Acceptance Criteria
- The scroll transition from clear to opaque must be smooth (60fps).
- The steam effect must not distract from readability.
- The brand feels premium, scientific, and warm simultaneously.
