# Ledger Punch Card Holes — Extended

**Concept:**
'Punch Logic' processes vast amounts of data quickly. The brand leans into the 'origin story' of computing. The landing page uses the punch card as a UI metaphor: the user 'selects' services by interacting with the grid of holes. It conveys reliability, speed, and deep technical roots.

**Palette:**
- `#F5F5DC` (Card Stock): Background.
- `#333333` (Ink/Punch): Text, punched holes, borders.
- `#D32F2F` (Priority Red): Error states, 'critical' data points, or the main CTA.
- `#E0E0C0` (Shadow Beige): Subtle depth for the 'card' edges.

**Typography:**
- **All Text:** 'IBM Plex Mono'. Weight 400 or 700. All-caps for headers. Sentence case for body.
- **Font Size:** Small to medium. Dense information is part of the aesthetic.

**Layout:**
- **Hero:** A large, full-width representation of a punch card. The top row has the company name 'PUNCH LOGIC' in bold. Below, a grid of circles (holes). Some are filled dark, some are light. A 'reader' beam (a thin, moving horizontal line) scans the holes, revealing text like 'FAST', 'RELIABLE', 'SCALABLE' as it passes over specific 'punched' columns.
- **Services:** A grid of 'cards'. Each card has a header (e.g., "BATCH PROCESSING") and a row of 10 holes. The user can click holes to 'select' features, which updates a 'total cost' or 'speed' metric at the bottom (simulated interaction).
- **Stats:** Large numbers in a 'data field' style, with leading zeros (e.g., "004,500 TPS").
- **Footer:** A simple perforated line. 'Print' button styled as a 'Punch' button.

**Motion:**
- **Scanner Beam:** A horizontal line (light grey or red) moves vertically down the hero section, repeating. As it passes a 'punched' hole, that hole flashes or changes color, and a word appears/disappears.
- **Hover:** Hovering over a 'punch hole' in the services section makes it 'pop out' slightly (transform: scale(1.1)) and turns red. Clicking it toggles its state (filled/unfilled).

**Constraints Checklist:**
- [ ] No images. Only CSS shapes and text.
- [ ] The 'holes' must be perfectly circular and aligned in a strict grid.
- [ ] The background must have a subtle paper texture (very light noise).

**Acceptance Criteria:**
The page should feel like a piece of vintage computing hardware brought to life. It is playful but serious, leveraging nostalgia for technical competence.
