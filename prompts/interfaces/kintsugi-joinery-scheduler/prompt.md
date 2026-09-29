Deliverable: single-file HTML/CSS/JS.

Build a specialized event logistics scheduler that visualizes time gaps as fractures in a ceramic surface. The interface must reject standard SaaS aesthetics in favor of a tactile, craft-focused experience inspired by Kintsugi (golden joinery).

**Visual Identity & Palette:**
Use a strict palette: Background `#1A1814` (deep charcoal/ink), Accent `#E6C229` (metallic gold for repairs), and Secondary `#8C3D1F` (rust/vermilion for active states or errors). Typography must use 'Shippori Mincho B1' for headings and 'Zen Old Mincho' for body text to evoke traditional Japanese print. Avoid Inter, Roboto, or system fonts. The background should not be flat; use subtle CSS noise or SVG filters to create a matte, paper-like texture.

**Core Mechanic: The Fracture Timeline:**
The main view is a vertical timeline representing a day. Instead of standard grid lines, render 'cracks' using jagged SVG paths where time blocks are missing. These cracks represent scheduling gaps. 

1. **Default State:** The timeline shows existing events as solid, dark panels. Gaps are visible as jagged, empty spaces with faint, dashed outlines indicating the 'fracture' edges.
2. **Interaction (Drag & Drop):** Users drag 'Event Blocks' from a sidebar into the timeline. As a block is dragged over a gap, the surface should appear to 'wet' or soften (use a slight blur or opacity change on the gap's edges). 
3. **Precision Constraint:** The block must be dropped within a 2px tolerance of the gap's boundaries. If the drop is imprecise (>2px deviation), the block snaps back or shows a 'viscous' resistance animation, and the gold line does not form. 
4. **Success State ('Set'):** When a block is correctly placed, a gold line (`#E6C229`) animates along the seam where the block meets the existing timeline. This animation should feel like liquid gold hardening—starting thin and glowing, then solidifying into a sharp, opaque line. Add a subtle 'click' sound effect (via Web Audio API or muted video) upon successful 'setting'.

**UI Structure:**
- **Header:** Minimal. Brand 'Urushi Lab' in Shippori Mincho. No navigation clutter.
- **Sidebar:** Contains draggable 'Event Blocks' (e.g., 'Keynote', 'Break', 'Workshop'). These blocks should look like raw clay tiles—matte, slightly textured.
- **Main Canvas:** The timeline. Use CSS Grid or Flexbox for layout, but overlay SVG for the crack/joinery visuals.
- **Footer:** Status indicator showing 'Fragments Remaining' or 'Repairs Complete'.

**Technical Constraints:**
- Use vanilla JS or a lightweight framework (Svelte/React) but keep it in a single file.
- Implement the 2px tolerance check using `getBoundingClientRect()` to compare the dragged element's position against the gap's defined boundaries.
- Ensure the 'gold' lines are SVG paths that animate `stroke-dashoffset` for the drawing effect.
- No external images; use CSS gradients and SVG filters for textures.
- Responsive: On mobile, the timeline becomes horizontal or scrollable, but the drag mechanic must remain touch-friendly.

**Anti-Patterns to Avoid:**
- Do not use purple gradients or glassmorphism.
- Do not use standard calendar grid lines; the 'cracks' are the visual metaphor.
- Do not make the drag-and-drop feel instant or 'snappy' in a digital way; it should feel heavy and deliberate.
- Avoid emoji; use SVG icons for any UI elements.

**Acceptance Criteria:**
1. Dragging a block into a gap with >2px error does NOT create a gold line.
2. Successful drop triggers a gold SVG path animation along the seam.
3. Background uses `#1A1814` with visible texture/noise.
4. Fonts are strictly Shippori Mincho B1 and Zen Old Mincho.
5. No standard SaaS shadows or rounded corners; use sharp, ceramic-like edges.
