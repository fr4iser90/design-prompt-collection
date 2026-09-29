Deliverable: single-file HTML/CSS/JS.

Build a team collaboration interface inspired by traditional Japanese Kumiko woodwork and Shoji screens. The primary task is managing team presence and initiating communication without intrusive notifications. The interface must feel like a physical architectural element, not a digital dashboard.

**Visual Architecture:**
The main view is a grid of rectangular panels representing team members. Each panel mimics a Shoji screen: a wooden lattice frame (Kumiko pattern) holding translucent paper. Use `#F5F0E6` for the paper, `#4B3821` for the wood lattice, and `#2C2C2C` for text and deep shadows. The background behind the grid should be a deep, warm darkness (`#1A1A1A`) to simulate the room behind the screens.

**Presence Mechanics:**
Do not use status dots. Presence is conveyed by the opacity of the paper and the visibility of shadows.
1. **Active:** The paper is semi-transparent (`opacity: 0.6`). A soft, blurred shadow of the user's avatar moves slowly behind the paper, simulating a person working in the next room.
2. **Idle:** The paper becomes more opaque (`opacity: 0.8`). The shadow is static or very faint.
3. **Do Not Disturb (DND):** The paper becomes fully opaque (`opacity: 1.0`) and slightly darker (`#E8E2D5`). No shadow is visible. The lattice frame appears heavier or thicker.

**Interaction:**
1. **Hover:** Hovering over a panel increases the contrast of the shadow behind it, making the 'presence' clearer. The cursor should change to a subtle 'peek' icon.
2. **Click (Open):** Clicking a panel triggers a 'slide open' animation. The paper panel slides horizontally to the right, revealing a high-fidelity chat interface behind it. The chat area should have a clean, paper-like background (`#F5F0E6`) with dark text (`#2C2C2C`). The chat input should be minimal, using `M PLUS 1 Code` for monospaced feel.
3. **Click (Close):** Clicking outside the chat or a 'close' button slides the panel back, restoring the Shoji view.
4. **Toggle DND:** A small, subtle toggle in the corner of each panel (visible only on hover) allows the user to set their own status to DND. This triggers the 'heavy, opaque screen' state.

**Typography:**
Use `Genjyu Gothic` for all UI labels, names, and chat messages. It should feel clean but with a slight humanist touch. Use `M PLUS 1 Code` for timestamps, status codes, and technical metadata. Ensure high contrast between text and paper.

**Layout:**
A responsive grid of panels. On desktop, 4-6 columns. On mobile, 2 columns. The grid should have consistent gutters (`16px`) to emphasize the lattice structure. The overall container should have a subtle inner shadow to suggest depth.

**Constraints:**
- No purple glows, no neon accents, no standard SaaS blue.
- No card shadows that look like floating UI elements; shadows must be 'behind' the paper.
- No emoji. Use simple geometric shapes or SVG icons for UI controls.
- The 'shadow' effect must be CSS-based (blur/opacity) for performance, not heavy JS animations.
- Ensure the 'slide open' animation is smooth (60fps) and respects `prefers-reduced-motion`.

**States to Implement:**
1. **Default Grid:** All panels visible, varying opacity/shadows.
2. **Chat Open:** One panel slid open, chat visible, other panels dimmed slightly.
3. **DND Active:** Panel fully opaque, no shadow, 'DND' label visible.
4. **Empty State:** If no team members, show a single, large, closed Shoji screen with a 'Invite Team' button in the center.
5. **Error State:** If chat fails to load, show a subtle 'paper tear' effect or a small, dark 'error' stamp on the panel.

**Acceptance Criteria:**
- [ ] Presence is communicated solely by opacity and shadow, no dots.
- [ ] Clicking a panel slides it open to reveal chat.
- [ ] DND state is visually distinct (opaque, no shadow).
- [ ] Typography uses Genjyu Gothic and M PLUS 1 Code.
- [ ] Colors match the specified palette exactly.
- [ ] No standard SaaS visual tropes (purple, neon, heavy drop shadows).
- [ ] Single-file HTML/CSS/JS deliverable.
