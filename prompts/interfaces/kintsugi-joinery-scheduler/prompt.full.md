## Concept
Design a 'Kintsugi Joinery Scheduler' for event logistics. The core metaphor is that a fragmented schedule is a broken ceramic vessel, and the act of scheduling is the restorative art of Kintsugi (golden joinery). The interface must feel tactile, precise, and calm, rejecting the speed-optimized, sterile aesthetic of modern productivity tools. The user is not just 'filling slots'; they are repairing a timeline with gold.

## Primary task
The user's primary task is to drag 'Event Blocks' from a sidebar into 'Fracture Gaps' on a vertical timeline. The success condition is not just placement, but precision: the block must align within a 2px tolerance of the gap's edges to trigger the 'repair' animation. If the alignment is off, the repair fails, and the block must be repositioned. This enforces a deliberate, craft-like interaction pace.

## States
1. **Default (Fractured):** The timeline displays existing events as solid, dark panels. Gaps are represented by jagged SVG 'cracks' with dashed outlines. The background is a textured charcoal.
2. **Drag (Wet):** When a block is dragged, the cursor changes. The gap's edges appear to 'soften' or 'wet' (slight blur/opacity increase). The block itself may show a subtle shadow indicating it is 'floating' above the surface.
3. **Error (Misaligned):** If dropped with >2px deviation, the block shakes slightly or snaps back. The gap edges return to their 'dry' state. A subtle red/vermilion (`#8C3D1F`) flash may indicate the failure.
4. **Success (Set):** The block locks into place. A gold line (`#E6C229`) animates along the seam, starting as a thin, glowing liquid and hardening into a solid, opaque joinery line. A 'click' sound plays. The gap is now 'sealed'.

## Palette
- **Background:** `#1A1814` (Deep Charcoal). Use CSS noise or SVG turbulence filters to add a matte, paper-like texture.
- **Ink/Text:** `#E6E6E6` (Off-white) for high contrast against the dark background.
- **Accent (Gold):** `#E6C229` (Metallic Gold). Used exclusively for successful joinery lines and active state highlights.
- **Secondary (Rust):** `#8C3D1F` (Vermilion/Rust). Used for error states, warnings, or the 'raw clay' texture of unscheduled blocks.
- **Surface:** `#2A2824` (Slightly lighter charcoal) for event blocks to distinguish them from the background.

## Type
- **Display:** 'Shippori Mincho B1'. Use for the brand name 'Urushi Lab', section headers, and large time markers. Weight: 400 or 500.
- **Body:** 'Zen Old Mincho'. Use for event titles, descriptions, and UI labels. Weight: 400.
- **Constraint:** Do not use sans-serif fonts. The typography must evoke traditional Japanese print and calligraphy. Letter-spacing should be slightly increased for elegance.

## Layout
- **Header:** Fixed top. Contains 'Urushi Lab' wordmark (left) and 'Date' selector (right). Minimalist, no navigation bars.
- **Sidebar (Left):** 200px width. Contains draggable 'Event Blocks'. These blocks should look like raw clay tiles—matte, slightly textured, with sharp corners. List items: 'Keynote', 'Break', 'Workshop', 'Lunch'.
- **Main Canvas (Center):** Flexible width. The vertical timeline. Events are stacked vertically. Gaps are visible as empty spaces with jagged SVG borders.
- **Footer:** Fixed bottom. Shows 'Fragments Remaining' count and a 'Reset' button. Text is small, subtle.
- **Grid:** Use CSS Grid for the overall layout. The timeline itself can use Flexbox for vertical stacking.

## Motion
1. **Entrance:** On load, the timeline 'cracks' appear via SVG path animation (stroke-dashoffset). Dust particles (CSS animations) settle down.
2. **Drag:** The dragged block follows the cursor with slight inertia (not instant). The 'wet' effect on the gap edges uses a CSS filter blur transition.
3. **Set (Success):** The gold line animates from 0% to 100% length over 600ms. It starts with a glow (box-shadow) and ends with a solid stroke. The block 'settles' into place with a slight scale-down animation.
4. **Error:** A quick, sharp shake animation (transform: translateX) on the block.

## Constraints
- **Single File:** All HTML, CSS, and JS must be in one file.
- **No External Assets:** No images. Use SVG for cracks and gold lines. Use CSS for textures.
- **Precision Logic:** Implement a `checkAlignment()` function that compares the dragged block's `getBoundingClientRect()` with the gap's boundaries. Tolerance: 2px.
- **Sound:** Include a simple 'click' sound for success (can be a base64 encoded audio string or Web Audio API oscillator).
- **Responsive:** On screens < 768px, the sidebar collapses into a bottom drawer. The timeline remains vertical but scrolls horizontally if needed.
- **Accessibility:** Ensure drag-and-drop has keyboard alternatives (e.g., arrow keys to nudge, Enter to place).

## Acceptance criteria
1. **Visuals:** Background is `#1A1814` with visible texture. Fonts are Shippori Mincho B1 and Zen Old Mincho. No Inter/Roboto.
2. **Interaction:** Dragging a block into a gap with >2px error does NOT trigger the gold line. The block returns to its original position or shakes.
3. **Success:** Dropping within 2px tolerance triggers a gold SVG path animation along the seam. The line is `#E6C229`.
4. **States:** All four states (Default, Drag, Error, Success) are visually distinct and implemented.
5. **Code:** Single HTML file. No external CSS/JS libraries (except fonts via Google Fonts). Vanilla JS or lightweight framework.
6. **Metaphor:** The interface feels 'heavy' and 'deliberate', not 'snappy' or 'instant'. The gold lines look like joinery, not just borders.

## Type pairing
Display: Shippori Mincho B1 + Body: Zen Old Mincho
