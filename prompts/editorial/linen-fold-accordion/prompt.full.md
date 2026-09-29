## Concept
The project is a digital editorial experience for a culinary publication called "Mise en Place." The central design metaphor is the "folded linen napkin." Unlike rustic, crumpled paper aesthetics, this design emphasizes the crisp, geometric precision of a professionally starched cloth. The layout is structured as a series of vertical folds, where scrolling and interacting with the page mimics the physical act of unfolding a napkin to reveal nested chapters of content. The goal is to create a tactile, high-end reading experience that feels like handling fine table linen, focusing on chef precision, cleanliness, and craft.

## Palette
The color scheme is minimal and sophisticated, evoking the materials of a professional kitchen and dining room:
- **Background (`#f5f5f0`)**: A warm, off-white linen color. This serves as the primary canvas, representing the clean cloth. It should have a subtle texture to avoid looking like flat digital white.
- **Ink (`#2c2c2c`)**: A deep charcoal for all primary text. This provides high contrast against the linen background while maintaining a softer feel than pure black.
- **Accent (`#a89f91`)**: A muted taupe/stone color. This is used for "creases" (dividers), secondary text, metadata, and interactive states. It represents the shadow of the fold and the natural tone of the linen fibers.

## Type
Typography is the primary voice of the design, balancing elegance with readability:
- **Headlines**: `Playfair Display`. Use this serif font for all major headings, section titles, and pull-quotes. Its high contrast and elegant curves evoke traditional culinary arts and fine dining menus.
- **Body & UI**: `Work Sans`. Use this clean, geometric sans-serif for body text, navigation, metadata, and interactive elements. Its neutrality ensures readability and complements the serif headlines without competing.
- **Hierarchy**: Establish a clear scale. Hero titles should be large (e.g., 4rem+), section headers medium (2.5rem), and body text standard (1.125rem). Use letter-spacing adjustments to enhance the "typeset" feel.

## Layout
The layout is a vertical stack of "folded" sections:
1. **Hero**: A full-viewport section with the brand name "Mise en Place" centered. The background features a subtle CSS-generated linen texture. The entrance animation simulates the cloth unfolding.
2. **Chapter Folds**: Below the hero, content is divided into horizontal bands. Each band is separated by a "crease" line—a thin, sharp border in the accent color. 
3. **Content Grid**: Inside each unfolded section, use a spacious, single-column or two-column grid (depending on viewport width). Avoid dense multi-column layouts. Use generous whitespace to let the content breathe. Include high-quality images of food preparation (steam, steel, hands) with a slight desaturation to harmonize with the palette.
4. **Pull-Quotes**: Use large, italicized Playfair Display text for "Chef's Notes," breaking the flow of the body text to create visual rhythm.

## Motion
Motion is used to reinforce the physical metaphor of the napkin:
1. **Entrance**: The hero section unfolds diagonally on load. Use `clip-path` or `transform: rotateX` with `perspective` to create a 3D unfolding effect. Text fades in with a slight upward drift.
2. **Ambient Ripple**: The edges of the content containers have a very subtle, slow oscillation in `box-shadow` or `transform: skew` to mimic fabric weight in a draft. This should be barely perceptible (opacity 0.1–0.3) to maintain calmness.
3. **Accordion Unfold**: Clicking a "crease" line expands the section below it. 
   - **Mechanic**: JavaScript toggles a class that animates `max-height` or `height`. 
   - **Visuals**: The crease line thickens or darkens to `#2c2c2c` when active. The content slides down with a weighted easing curve (e.g., `cubic-bezier(0.4, 0, 0.2, 1)`) to simulate the resistance of stiff cloth.

## Constraints
- **Single File**: All HTML, CSS, and JS must be contained in one file.
- **No Libraries**: Use vanilla JavaScript and CSS. No external frameworks like React or Vue. No heavy animation libraries.
- **Responsive**: The fold mechanism must adapt to mobile screens. On small viewports, the layout should remain a vertical accordion, but the visual "crease" metaphor must persist.
- **Performance**: Animations must be GPU-accelerated (use `transform` and `opacity`). Avoid layout thrashing.
- **Accessibility**: All interactive elements (creases) must be keyboard accessible. Use ARIA attributes (`aria-expanded`, `role="button"`). Ensure color contrast meets WCAG AA standards.
- **Anti-Patterns**: No rustic wood textures, no muddy earth tones, no dense newspaper columns, no heavy 3D shadows, no emoji.

## Acceptance criteria
- [ ] The page loads with a diagonal unfolding animation for the hero section.
- [ ] The background has a subtle linen texture, not a flat color.
- [ ] Typography uses Playfair Display for headings and Work Sans for body text.
- [ ] The color palette strictly adheres to `#f5f5f0`, `#2c2c2c`, and `#a89f91`.
- [ ] Clicking a "crease" line expands the section below it with a smooth, weighted animation.
- [ ] The "crease" line changes visual state (color/thickness) when the section is expanded.
- [ ] The ambient ripple effect is present but subtle (not distracting).
- [ ] The layout is responsive and functional on mobile devices.
- [ ] All interactive elements are keyboard accessible.
- [ ] The code is contained in a single HTML file with no external dependencies (except fonts).
- [ ] The design avoids rustic/farmhouse clichés and maintains a crisp, professional aesthetic.
