# Glyph Foundry Typespecimen — Extended

## Concept
'Glyph' is a new grotesque typeface. The landing page is not a marketing page; it is a tool. The user is invited to play with the typeface immediately. The hero section is a giant text input area styled to look like a massive headline. Below, a control panel allows tweaking of variable font axes. The aesthetic is 'Swiss Style' taken to its logical extreme: pure function, no ornament.

## Palette
- **Paper**: #ffffff (Background)
- **Ink**: #000000 (Primary Type)
- **Marking**: #ff5722 (Interactive Elements, Sliders, Active State)

## Type Pairing
- **Display**: 'Glyph' (the product). A versatile neo-grotesque.
- **UI**: A monospaced font (e.g., 'Space Mono') for labels and values to reinforce the 'tool' aesthetic.

## Layout
- **Hero**: Centered, massive 'GLYPH' text. Input field spans full width.
- **Controls**: Fixed bottom bar or floating panel with three sliders: Weight (100-900), Width (75-125%), Slant (0-12deg).
- **Grid**: Visible hairline grid (1px #e0e0e0) that aligns all elements.

## Motion Brief
1. **Input**: As the user types, letters appear with a slight 'stamping' effect (scale down from 1.1 to 1.0).
2. **Sliders**: Changing a slider updates the font axes in real-time. The transition should be instant but smooth (CSS `transition: font-variation-settings 0.1s ease`).
3. **Hover**: Interactive elements get a 2px solid #ff5722 border. No shadows.

## Constraints Checklist
- [ ] Must use `font-variation-settings` or equivalent variable font technique.
- [ ] No images or illustrations. Pure typography.
- [ ] High contrast for accessibility.
- [ ] Mobile: Controls stack vertically. Text size adjusts to fit.

## Acceptance Criteria
- The typeface looks premium and versatile.
- The interaction feels precise and tactile.
- The design communicates 'professional tool' rather than 'art gallery'.
