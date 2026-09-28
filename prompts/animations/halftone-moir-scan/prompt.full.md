# Halftone Moiré Scan — Extended Brief

## Concept
This animation explores the physics of screen printing and optical interference. By overlapping regular grids of dots at slight angles, we create 'moiré'—a secondary pattern that is not present in the individual layers. This evokes the technical, mechanical nature of print media and creates a mesmerizing, vibrating visual field.

## Palette & Material
- **Background:** Pure White (`#FFFFFF`).
- **Inks:** Standard CMYK process colors, slightly muted for readability.
  - Cyan: `#00A0E3`
  - Magenta: `#EC008C`
  - Yellow: `#FFF200`
- **Blend Mode:** `multiply` is essential. It allows the dots to darken where they overlap, creating the illusion of depth and mixing colors.

## Visual Construction
1. **The Grids:** 
   - Create three distinct layers, each covering the full viewport.
   - Use `background-image: radial-gradient(circle, currentColor 2px, transparent 2px)` repeated to create a dot grid.
   - Set `background-size` to create a regular grid (e.g., 20px x 20px).

2. **The Rotation:**
   - Apply `transform: rotate()` to each layer.
   - **Key:** The rotation speeds must be *very close* but not identical. If they are too different, the moiré vanishes. If they are the same, the layers lock together.
   - Example: 
     - Cyan: `0deg` to `360deg` in 60s.
     - Magenta: `360deg` to `0deg` in 65s.
     - Yellow: Static or `0-360` in 120s.

3. **The Typography:**
   - The text should be static and black (or very dark grey) to provide an anchor point amidst the chaos.
   - Font: A clean, geometric sans-serif (e.g., Futura, Avant Garde) that contrasts with the organic movement of the moiré.

## Motion Design
- **Ambient:** The primary motion is the slow rotation of the background layers. This should be continuous and seamless.
- **Interaction (Optional):** On hover, the rotation speed increases, causing the moiré patterns to shift and 'vibrate' more intensely.

## Technical Constraints
- Performance: Rotating large full-screen divs can be expensive. Use `transform` and `will-change: transform`.
- Ensure the dot grid aligns perfectly at the start and end of the loop.
- Test for accessibility: The moiré can be seizure-inducing for some users if too fast. Keep rotation slow (<1deg/sec).

## Acceptance Criteria
1. Clear moiré patterns are visible and shift dynamically.
2. CMYK blending is accurate (overlaps create darker hues).
3. Text remains legible and stable against the moving background.
4. No performance jank during continuous rotation.
