# Code Canvas Dev Tool — Extended

## Concept
'Code Canvas' allows developers to build UIs by writing descriptive comments. The landing page demonstrates this magic. The hero section is divided: Left side is a code editor with realistic syntax. Right side is a blank canvas. As the user scrolls or interacts, lines of code 'execute' and generate corresponding UI elements on the right.

## Palette
- **Editor BG**: #282a36 (Dracula Background)
- **Cyan**: #8be9fd (Keywords, Active Code)
- **Pink**: #ff79c6 (Strings, Highlights)
- **Green**: #50fa7b (Comments)

## Type Pairing
- **Code**: 'JetBrains Mono' or 'Fira Code'. Ligatures enabled.
- **UI**: A clean sans-serif (e.g., 'Inter') for the generated UI elements to contrast with the code.

## Layout
- **Desktop**: Split screen. Left 50% Code, Right 50% Preview.
- **Mobile**: Stacked. Code on top, Preview below. Code scrolls horizontally.

## Motion Brief
1. **Typewriter**: Code appears line-by-line as the user scrolls into view.
2. **Transformation**: When a comment line is 'typed', a corresponding UI widget (button, input, card) fades in on the right side, matching the color scheme.
3. **Cursor**: A blinking cursor at the end of the code block adds realism.

## Constraints Checklist
- [ ] Code must be valid-looking and relevant.
- [ ] UI elements must align with code lines.
- [ ] Dark mode only. High contrast for code readability.

## Acceptance Criteria
- The 'magic' of the tool is visually communicated.
- The developer aesthetic is authentic, not cartoonish.
- Smooth scroll-driven animation.
