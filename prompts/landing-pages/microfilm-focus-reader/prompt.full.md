# Microfilm Focus Reader — Extended

## Concept
Retrospect offers access to millions of historical documents. The design challenge is to make 'reading' feel like 'discovering'. The microfilm aesthetic evokes the tactile, mechanical process of history retrieval. Blur represents the obscured past; focus represents the moment of understanding. This creates a deliberate, slow-paced user journey that values content over speed.

## Art Direction
**Palette:**
- **Projector Dark**: `#1a1a1a` (Background)
- **Paper White**: `#d4d4d4` (Main text)
- **Highlight White**: `#ffffff` (Focused text, interactive elements)
- **Scanline Gray**: `rgba(255, 255, 255, 0.05)`

**Typography:**
- **Headings**: 'Playfair Display' or 'Libre Baskerville'. Large, bold, with tight leading to mimic newspaper columns.
- **Body**: 'Courier New' or a high-readability serif for long-form text. Must be legible even when slightly blurred.

**Texture:**
- **Paper Grain**: A very subtle noise overlay on the text elements themselves.
- **Vignette**: Darker edges on the viewport to simulate the circular lens of a microfilm reader.

## Layout
**Hero Section:**
- A large, blurred headline: "HISTORY IN FOCUS".
- Below it, a 'reader' frame with a visible 'lens' border (rounded rectangle with inner shadow).
- Instruction text: "Scroll to focus".

**Content Sections:**
- Three distinct article excerpts.
- Each excerpt has a 'date stamp' in the corner (monospace, small).
- The text block is contained within a 'card' that has a slight drop shadow, making it look like a physical piece of film.

## Motion Design
1. **Entrance**: The screen starts fully black, then the 'lens' turns on (fade-in from center).
2. **Scroll Interaction**:
   - Use Intersection Observer to detect when an element enters the middle 50% of the viewport.
   - As it enters, transition `blur` from 10px to 0px over 0.8s (ease-out).
   - As it leaves, transition `blur` from 0px to 5px (not full blur, just softer).
   - Add a slight `scale` effect (0.98 to 1.0) to simulate the lens zooming in.
3. **Ambient Scanline**: A horizontal line moves down the screen every 4 seconds, resetting at the top. This adds a 'live' feel.

## Constraints Checklist
- [ ] Blur effect must not cause performance lag (use `will-change: filter` sparingly or CSS-only if possible).
- [ ] Text must be accessible (screen readers ignore visual blur).
- [ ] No color other than grayscale.
- [ ] Must work on mobile (tap to focus/unfocus sections).

## Acceptance Criteria
- The transition from blur to sharp is smooth and satisfying.
- The 'scanline' effect is subtle, not distracting.
- The layout feels dense and informative, like a real newspaper page.
