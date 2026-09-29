# Microfilm Focus Reader

Create a landing page for 'Retrospect', a historical newspaper archive. The interface mimics a physical microfilm reader: content is initially out-of-focus (blurred) and becomes sharp only when the user 'aligns' the view.

**Core Mechanics:**
1. **Scroll-to-Focus**: As the user scrolls, specific text blocks transition from `filter: blur(8px)` to `blur(0px)`. The focus point follows the scroll position, creating a 'scanning' effect.
2. **Scanline Overlay**: A subtle, horizontal CRT-style scanline overlay (CSS `repeating-linear-gradient`) moves slowly downward, simulating a projector beam.
3. **Grayscale Only**: Strictly monochrome palette (`#1a1a1a` to `#ffffff`). No color accents.

**Visual Rules:**
- Use a serif font (e.g., 'Merriweather' or 'Playfair Display') that mimics newspaper print.
- Headings should have a slight 'ink spread' effect (text-shadow) when in focus.
- Background is dark gray (`#1a1a1a`), text is off-white (`#d4d4d4`).

**Deliverable:**
HTML/CSS/JS with 3 text sections that focus/blur based on viewport position. Include a 'reset focus' button that blurs everything again.
