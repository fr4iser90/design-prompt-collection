# Risograph Overprint Archive — Extended

**Concept:**
Embrace the nostalgic, tactile charm of risograph printing. This isn't just a digital site; it's a digital artifact of analog production. The design highlights the unique color mixing (subtractive) of riso inks and the physicality of paper stock.

**Art Direction:**
- **Palette:** Dominant 'Paper White' (#f4f1ea) with accents of 'Fluoro Pink' (#ff48b0), 'Fluoro Blue' (#0077ff), and 'Fluoro Yellow' (#ffdd00) used sparingly. Black text should actually be a dark grey or deep purple created by overprinting pink and blue.
- **Typography:** Use a font like 'Courier Prime' or 'Space Mono' for metadata and captions. Headlines should be large, condensed sans-serifs (like 'Anton' or 'Oswald') but rendered with a slight texture overlay to prevent them from looking too clean.
- **Textures:** Overlay a subtle noise/grain texture on all elements. Images should be high-contrast, duotone, or tri-tone, processed to look like they went through a duplicator.

**Layout:**
- **Hero:** A massive, cropped typographic treatment of the brand name, partially obscured by a floating 'sheet' of paper with a halftone image.
- **Archive Grid:** Instead of neat cards, items are arranged in a loose, overlapping collage style. Some elements might have 'registration marks' (crop marks) in the corners.
- **Footer:** Designed to look like the bottom of a printed page, with issue numbers and print dates.

**Motion Brief:**
- **Entrance:** Headlines slide up with a 'sticker' peel effect.
- **Interaction:** Hovering over archive items causes a 'channel shift' — the pink and blue layers separate slightly (2-4px) and jitter, simulating misregistration. On click, they snap back into alignment.
- **Ambient:** Subtle grain movement (film grain) across the entire viewport to keep the page alive.

**Technical Notes:**
- Use CSS `mix-blend-mode: multiply` for ink layers.
- Use `filter: url(#grain)` or SVG noise filters for paper texture.
- Ensure accessibility by maintaining sufficient contrast even with blend modes.
