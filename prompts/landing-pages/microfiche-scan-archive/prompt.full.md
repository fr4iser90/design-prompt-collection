# Microfiche Scan Archive — Extended

## Concept
"MicroSearch" bridges the gap between physical paper archives and digital search. The design evokes the tactile, mechanical experience of using a microfiche reader—the glow of the screen, the scanlines, the focus adjustment. It’s a nostalgic yet high-tech take on information retrieval. The black-and-white palette emphasizes the binary nature of data: present or absent. The "scanline" effect adds a layer of retro-tech authenticity without being cheesy.

## Palette
- **Void Black:** #000000 (Background)
- **Paper White:** #ffffff (Primary Text)
- **Scan Grey:** #cccccc (Secondary Text, Borders)
- **Reader Amber:** #ffb703 (Interactive Accent, Search Bar Glow) - *Note: Use sparingly.*

## Typography
- **Headings:** "Archivo Black" or "Anton". Heavy, imposing, like library signage.
- **Body/UI:** "Roboto Mono" or "Courier New". Functional, machine-like.
- **Search Input:** Large, monospaced font, green or amber on black.

## Layout
- **Hero:** Full-screen black background. Centered search bar with a CRT glow effect. The search bar border should look like a physical slot.
- **Results:** Displayed as "cards" that look like microfiche slides—small, rectangular, with a small preview image and dense text.
- **Navigation:** Simple top bar, white text, no background.

## Motion
- **Scanline:** A slow, continuous horizontal scanline moving down the screen (opacity low, 5-10%).
- **Search Interaction:** When typing, the text should flicker slightly like a CRT. On submit, a "focus" blur-to-sharp transition reveals the results.
- **Hover:** Search bar glows brighter. Cards lift slightly (but no shadow, just scale).

## Constraints Checklist
- [ ] No color images.
- [ ] No soft shadows.
- [ ] Scanline effect must not cause visual discomfort (keep opacity low).
- [ ] Search bar must be prominent and functional.
- [ ] Fonts must be legible against high contrast.

## Acceptance Criteria
- The page feels like a high-end, retro-futuristic library.
- The search interaction is the core experience.
- The black-and-white aesthetic is stark and clean.
