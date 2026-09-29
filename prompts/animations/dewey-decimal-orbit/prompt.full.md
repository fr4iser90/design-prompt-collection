# Dewey Decimal Orbit — Extended

**Concept**
An abstract representation of knowledge organization. The 'orbits' represent the Dewey Decimal Classification system's broad categories. The motion is perpetual but slow, suggesting the constant, quiet work of indexing. The interaction is precise: selecting a domain pauses the universe to focus on it. This aligns with 'Library-of-the-future' by using modern data-viz principles (clean lines, high contrast) rather than skeuomorphic books.

**Palette & Type**
- **Background:** `#ffffff` (Pure white for maximum clarity).
- **Primary:** `#003366` (Deep Navy, authoritative but not black).
- **Active:** `#cc0000` (Signal Red, for immediate visual feedback).
- **Typography:** `Space Mono` or `Roboto Mono`, size 10-12px, uppercase for labels, numeric for codes.

**Layout**
- **Desktop:** Centered viewport. 3-4 concentric rings with varying radii. 
- **Mobile:** Rings scale down to fit viewport width. Tooltips appear below the rings instead of center to avoid occlusion.

**Motion Brief**
- **Structure:** Use SVG circles with `stroke-dasharray` or Canvas to draw the rings. Place text along the path using SVG `<textPath>`.
- **Rotation:** CSS `animation: rotate infinite linear` with different durations (20s, 40s, 60s).
- **Hover State:** 
  - JS event listener on ring groups.
  - Change `stroke` and `fill` to `#cc0000`.
  - Pause CSS animation via `animation-play-state: paused`.
  - Center text updates with category title.
- **Entrance:** Staggered scale-up of each ring.

**Constraints & Acceptance**
- Performance: Must maintain 60fps on mid-range devices. Use `will-change: transform` on rotating elements.
- Accessibility: Ensure hover states have clear visual distinction for low-vision users (high contrast).
- No drop shadows or blurs.
