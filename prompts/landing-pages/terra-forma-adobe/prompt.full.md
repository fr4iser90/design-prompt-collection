# Terra Forma Adobe — Extended

## Concept
Terra Forma is an architectural studio specializing in sustainable adobe construction. The landing page must reflect the warmth, weight, and timelessness of adobe bricks. The design language is 'arid-minimal': sparse, high-contrast, and grounded in natural materials.

## Palette
- **Sand**: #E6DCCF (Background)
- **Clay**: #8D7B68 (Accents, Borders)
- **Umber**: #4A3B32 (Text, Structural Lines)
- **Shadow**: #2C241E (Deep Shadows)

## Typography
- **Display**: Futura PT Book (Geometric, clean, contrasts with organic textures)
- **Body**: Lato Light (Readable, neutral)
- **Hierarchy**: Large, bold headings. Ample line-height.

## Layout
- **Hero**: Full-bleed image of an adobe wall with long, sharp shadows cast by the sun. Overlay text: 'Built from the Earth' in Futura, left-aligned, large scale.
- **Navigation**: Fixed top, transparent background, links in Umber. Hover state: underline in Clay.
- **Sections**:
  1. **Material Origin**: Two-column layout. Left: Text describing adobe sourcing. Right: Texture close-up of adobe brick. Parallax scroll effect on texture.
  2. **Structural Integrity**: Diagram-style section. Minimalist line drawings of adobe brick structures in Umber. Interactive hover: reveals cross-section details.
  3. **Project Gallery**: Masonry grid of project photos. Images have a slight sepia tone. Hover: image scales slightly, reveals project name in Clay.
- **Footer**: Minimal. Contact info in Umber. Small logo in Clay.

## Motion
- **Entrance**: Hero image fades in slowly (2s). Text slides up with fade.
- **Scroll**: Parallax effect on background textures (slower scroll speed than foreground).
- **Interaction**: Hover effects on links and images are subtle (scale 1.02, color shift to Clay).
- **Heat Haze**: Subtle CSS filter `blur(1px)` on background elements that increases on scroll to simulate heat distortion.

## Constraints
- No cards. Use whitespace and lines to separate sections.
- No purple or neon colors.
- Images must have high contrast and clear shadows.
- Responsive: Mobile layout stacks columns, maintains large typography scale.

## Acceptance Criteria
- Palette strictly adheres to earth tones.
- Typography is geometric sans-serif.
- No card components.
- Heat haze effect is visible but subtle.
- Long shadows are prominent in hero image.
