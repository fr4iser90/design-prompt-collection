# Spice Mill Grind Torque — Extended

## Concept
This design focuses on the mechanical action of grinding and the sensory result (aroma/flavor). The 'torque' refers to the power of the grinder and the intensity of the spice. The aesthetic is 'dark kitchen'—sleek, black, metallic. The core interaction is the 'grind' producing the text, linking the action to the result.

## Palette
- **Base:** Matte Black (#111111) for the background, with a subtle brushed metal overlay.
- **Grinder:** Dark Grey (#2d2d2d) with metallic highlights (#444).
- **Spice/Text:** Light Sand/Tan (#d4a373) for the ground spice particles and headline text. This color represents 'freshly ground' spices.
- **Secondary:** Light Grey (#a3a3a3) for body text.

## Typography
- **Display:** A bold, heavy sans-serif (e.g., 'Impact' or 'Oswald') to convey power and torque.
- **Body:** A clean, technical sans-serif for specs.

## Layout
- **Hero:** Centered. Grinder at the top 1/3. 'Text accumulation' area at the bottom 1/3. Middle is empty space where particles fall.
- **Content:** Sections below feature 'spice profiles' with data bars (intensity, aroma).
- **Footer:** Black, with sand-colored accents.

## Motion Brief
1. **Entrance:** Grinder fades in. Particles begin to fall slowly.
2. **Scroll:** As the user scrolls down, the grinder rotates clockwise. The speed of rotation is proportional to scroll speed. Particles fall faster.
3. **Interaction:** 
   - **Hover:** Hovering over the grinder makes it spin slightly faster.
   - **Scroll:** Particles accumulate at the bottom. As they accumulate, they form the headline text (via CSS masking or SVG path reveal).

## Constraints
- **No Colorful Jars:** Avoid red, green, or blue spice jars. Stick to the black/sand palette.
- **No Earthy Greens:** Avoid any green tones.
- **Particle Physics:** Particles should fall with a slight 'gravity' feel, not just linear motion.
- **Text Formation:** The text formation from particles should be clear and legible, not messy.

## Acceptance Criteria
- The grinder rotation must be smooth and tied to scroll.
- The particle effect must be performant (use CSS animations or simple JS canvas).
- The 'sand' color must be distinct from 'rust' or 'orange'.
- The overall feel should be 'powerful' and 'aromatic'.
