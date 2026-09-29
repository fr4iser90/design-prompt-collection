## Concept
Kumiko is a collaboration tool that reimagines team presence through the lens of traditional Japanese Shoji screens. Instead of digital status dots, presence is communicated through the physical metaphor of light and shadow behind paper. Active users cast moving shadows; inactive users are still; 'Do Not Disturb' users are opaque. The interface is a calm, architectural grid of lattice panels, inviting quiet focus and respectful communication.

## Primary task
The primary task is to assess team availability at a glance and initiate a conversation with minimal friction. The user should be able to see who is 'present' (active shadow), 'idle' (still shadow), or 'unavailable' (opaque) without clicking. Clicking a panel opens a chat interface, sliding the 'paper' away to reveal the conversation space.

## States
1. **Default Grid:** A responsive grid of Shoji panels. Each panel shows a team member's name and their current presence state via paper opacity and shadow movement.
2. **Chat Open:** The selected panel slides horizontally to the right, revealing a chat interface. The chat area is clean, with a paper-like background. The remaining panels dim slightly to focus attention.
3. **Do Not Disturb (DND):** The panel's paper becomes fully opaque and slightly darker. The shadow is hidden. The lattice frame may appear thicker. A small 'DND' indicator is visible.
4. **Empty State:** If no team members are present, a single, large, closed Shoji screen is displayed with an 'Invite Team' call to action.
5. **Error State:** If a chat fails to load, the panel displays a subtle 'paper tear' visual or a dark 'error' stamp, with a retry option.

## Palette
- **Paper (Background/Chat):** `#F5F0E6` (Warm, off-white, mimics washi paper)
- **Lattice (Frames/Borders):** `#4B3821` (Deep, warm brown, mimics aged wood)
- **Ink (Text/Icons):** `#2C2C2C` (Soft black, high contrast on paper)
- **Shadow (Behind Paper):** `#1A1A1A` (Deep, warm darkness, simulates the room behind the screen)
- **DND Paper:** `#E8E2D5` (Slightly darker, more opaque paper)
- **Accent (Subtle):** `#8A7B6D` (Muted taupe, for hover states or secondary text)

## Type
- **Primary:** `Genjyu Gothic` for all UI labels, names, chat messages, and headings. It provides a clean, modern, yet humanist feel that complements the traditional aesthetic.
- **Secondary:** `M PLUS 1 Code` for timestamps, status codes, and technical metadata. The monospaced font adds a layer of precision and contrast.
- **Hierarchy:** Use font weight and size to create hierarchy. Names should be prominent (16-18px), chat messages standard (14-16px), and metadata small (12px).

## Layout
- **Grid:** A responsive CSS Grid of panels. Desktop: 4-6 columns. Tablet: 3 columns. Mobile: 2 columns.
- **Panels:** Each panel is a rectangular aspect ratio (approx 3:4). The lattice frame is created using CSS borders or SVG patterns to mimic Kumiko woodwork.
- **Gutters:** Consistent 16px gutters between panels to emphasize the grid structure.
- **Chat View:** When open, the chat view takes up the space of the panel plus an adjacent column, sliding in from the left. It should have a clear header (user name, status) and a scrollable message area.

## Motion
- **Ambient Shadow:** For active users, a blurred, dark shadow moves slowly behind the paper. Use CSS `transform: translate()` and `filter: blur()` for performance. The movement should be subtle and organic, not robotic.
- **Slide Open:** Clicking a panel triggers a horizontal slide animation. The paper panel moves right, revealing the chat. Use `transform: translateX()` and `transition: transform 0.3s ease-in-out`.
- **Opacity Transitions:** Changes in presence state (e.g., user goes idle) should fade the paper opacity smoothly over 0.5s.
- **Hover:** Hovering over a panel increases the contrast of the shadow and slightly lifts the panel (subtle `transform: translateY(-2px)`).

## Constraints
- **No Status Dots:** Do not use green/yellow/red dots. Presence is purely visual via light/shadow.
- **No Standard SaaS UI:** Avoid purple glows, neon accents, heavy drop shadows, or standard 'card' designs.
- **Performance:** Use CSS for animations where possible. Avoid heavy JS loops for shadow movement.
- **Accessibility:** Ensure sufficient contrast between text and paper. Respect `prefers-reduced-motion` by disabling ambient shadow movement and simplifying transitions.
- **Single File:** All HTML, CSS, and JS must be in a single file.

## Acceptance criteria
- [ ] **Presence Visualization:** Active users show moving shadows; idle users show static shadows; DND users show no shadows and opaque paper.
- [ ] **Interaction:** Clicking a panel slides it open to reveal a functional chat interface.
- [ ] **DND State:** DND state is visually distinct (opaque, no shadow) and can be toggled.
- [ ] **Typography:** `Genjyu Gothic` and `M PLUS 1 Code` are used correctly.
- [ ] **Color Palette:** Colors match the specified hex codes exactly.
- [ ] **No Clichés:** No status dots, no purple glows, no standard SaaS visual tropes.
- [ ] **States:** All states (Default, Chat Open, DND, Empty, Error) are implemented and visually distinct.
- [ ] **Deliverable:** Single-file HTML/CSS/JS.
- [ ] **Performance:** Animations are smooth (60fps) and respect reduced motion preferences.
