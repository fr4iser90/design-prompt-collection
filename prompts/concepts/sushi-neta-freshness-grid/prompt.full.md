# Sushi Neta Freshness Grid — Extended

**Concept:**
Capture the obsessive precision of a master sushi chef (*itamae*). This is not about the beauty of the fish, but the *science* of its freshness. The interface is a tool, not a menu. It conveys cleanliness, cold, and exactitude.

**Palette:**
- `#F0F4F8` (Glacier White): Background. Clean, sterile.
- `#003366` (Deep Ocean Blue): Primary text, fresh data indicators.
- `#FF5E5E` (Alert Red): Degradation warnings, expired items.
- `#C0C0C0` (Silver): Borders, secondary text, inactive states.

**Typography:**
- Headings: 'Helvetica Neue' Bold – stark, direct.
- Body/Data: 'Roboto Mono' – for timestamps, temperatures, and scores. Digits must be tabular.

**Layout:**
- Desktop: 3x3 or 4x4 grid of Neta tiles. A sidebar for 'Global Stats' (e.g., '3 Items Critical').
- Mobile: Scrollable vertical list. Each item is a full-width card with the timeline visible.

**Motion Brief:**
1. **Entrance:** Staggered fade-in of tiles. Grid lines draw themselves.
2. **Ambient:** Freshness bars decrease very slowly (e.g., 1% every 10s). A subtle 'pulse' on items nearing expiration.
3. **Interaction:** 
   - Hover: Tile lifts slightly (transform: translateY(-2px)). Detailed graph slides up from the bottom of the tile.
   - Click: Opens a modal with the full lifecycle chart of that specific fish.

**Constraints:**
- No photographic food images. Use abstract, geometric representations of fish shapes.
- No warm colors except for alerts. Everything else is cold.
- The grid must feel rigid and organized.
- No decorative icons; use functional data viz elements.

**Acceptance Criteria:**
- The freshness logic is visually clear (Blue -> Red).
- The interface feels cold and professional.
- Text is legible at small sizes.
- Motion is smooth and non-distracting.
