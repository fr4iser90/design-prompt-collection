# Ledger Line Justification — Extended

**Concept**
Capture the satisfying resolution of chaos into order, specifically within the context of archival indexing. This animation visualizes the process of 'cleaning up' a rough draft into a final record. It relies on the aesthetic of 'north light'—cool, diffuse, shadowless illumination that emphasizes clarity and truth. The movement is horizontal and vertical, driven by strict grid logic.

**Palette & Type**
- **Background:** `#f4f4f0` (Off-white paper, slightly warm but neutral). 
- **Text:** `#1a1a1a` (Ink black). 
- **Guides/Accents:** `#8c92a3` (Steel blue-grey, used for alignment markers).
- **Typography:** A high-legibility monospace (e.g., IBM Plex Mono or Courier Prime) or a sturdy serif (e.g., Caslon) with tight leading.

**Layout**
- **Desktop:** A centered column of 8-10 lines of text. Left margin is fixed; right margin is the target justification point.
- **Mobile:** The column widens to full bleed with adjusted margins. Text size remains readable but less dense.

**Motion Brief**
- **Entrance:** Text lines slide in from off-screen left with varying delays (staggered 50ms).
- **Justification Sequence:** 
  - Each line animates its `width` or `text-align: justify` effect using `transform: scaleX()` on individual word spans for smoother performance, or CSS `justify-content` if using flexbox.
  - Easing: `cubic-bezier(0.25, 1, 0.5, 1)` (Smooth ease-out). 
  - Duration: 600ms per line.
- **Ambient:** A very slow, almost imperceptible drift of the paper texture (CSS background-position loop).
- **Interaction:** On hover, the specific line's background flashes faintly with `#e8e9eb` and a small index number (01, 02...) fades in on the left.

**Constraints & Acceptance**
- Must use CSS transforms for animation (no layout thrashing).
- No purple gradients or neon glows.
- The 'snap' to grid must feel tactile but not jarring.
- Reduced motion: Static justified state immediately on load.
