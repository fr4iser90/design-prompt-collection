## Concept
Aeris is a task management tool that replaces abstract priority lists with visceral spatial resistance. Tasks are represented as pneumatic bubbles on a canvas. Priority is not a number in a column; it is physical pressure. High-priority tasks are inflated, heavy, and push low-priority tasks out of the way. The user interacts with the queue by physically manipulating the pressure of each task, creating a dynamic, living hierarchy that reflects the user's intent through force and space.

## Primary task
The user's primary task is to organize their workload by adjusting the 'pressure' (priority) of tasks. They do this by dragging bubbles vertically: up to inflate (increase priority), down to deflate (decrease priority). The system automatically reorganizes the layout based on these physical forces, ensuring that high-priority tasks are prominent and low-priority tasks are tucked away. The user can also click to select a task and edit its details in a side panel.

## States
- **Default:** The canvas is populated with bubbles in equilibrium. High-pressure bubbles float near the top, vibrating slightly. Low-pressure bubbles sink to the bottom. The right panel shows 'No Task Selected'.
- **Selection:** A bubble is clicked. It gains a thick cyan stroke and a crosshair. The right panel populates with the task's title, a priority slider (synced with pressure), and a 'Delete' button. The selected bubble stops vibrating.
- **Empty:** The canvas is empty. A faint, dashed outline of a bubble is centered with the text 'INFLATE TO START' in Oswald. The right panel is disabled.
- **Error:** If a user tries to save a task with an empty title, the bubble flashes red and shakes. The right panel shows an error message 'Title Required'.

## Palette
- **Background:** #1a1a1a (Deep Industrial Dark) - Main canvas and app background.
- **Ink:** #f0f0f0 (Off-White) - Text, strokes, and UI elements.
- **Accent (High Pressure):** #00e5ff (Cyan) - Used for high-priority bubbles, selection strokes, and active states.
- **Alert (Critical):** #ff4d4d (Red) - Used for critical priority (>90), errors, and delete actions.
- **Panel:** #222222 (Dark Gray) - Background for the right-side details panel.
- **Hairline:** #333333 (Dark Gray) - Borders for panels and dividers.

## Type
- **Display:** Oswald (Google Fonts). Used for the 'AERIS' wordmark, task titles in the panel, and the 'INFLATE TO START' prompt. Uppercase, bold, tight tracking.
- **Body:** Barlow (Google Fonts). Used for task descriptions, labels, and inputs. Regular weight, standard tracking.
- **Hierarchy:** Oswald is strictly for headers and key identifiers. Barlow is for all readable content. No other fonts.

## Layout
- **Chrome:** Top bar, 60px height. Left: 'AERIS' wordmark (Oswald, 24px). Right: 'Pressure Gauge' (0-100 PSI) and 'Add Task' button (Oswald, uppercase).
- **Canvas:** Fills the remaining viewport width minus the right panel. Background #1a1a1a. No grid lines.
- **Right Panel:** Fixed width 240px, full height below chrome. Background #222. Border-left 1px solid #333. Contains 'Task Details' section (Title input, Priority slider, Description textarea) and 'Actions' section (Delete button).
- **Density:** Calm. No widget soup. The canvas is the primary interface. The panel is secondary, only active when a task is selected.

## Motion
- **Entrance:** New tasks spawn as 2px dots. They rapidly expand to their target radius using an elastic easing function (overshoot then settle). Duration: 300ms.
- **Ambient:** High-pressure bubbles (>70) vibrate with a random jitter of 0.5px per frame. Low-pressure bubbles (<20) have a slow downward drift (gravity) until they hit the bottom or another bubble.
- **Interaction:** 
  - **Drag:** While dragging, the bubble's radius changes in real-time based on vertical delta. Adjacent bubbles are compressed (radius decreases) by the dragging bubble's force.
  - **Release:** On release, the bubble settles into its new equilibrium position. If it collides with another bubble, both bounce slightly (spring-back).
  - **Selection:** Clicking a bubble adds a 'pop' sound effect (optional) and updates the panel instantly.

## Constraints
- **Tech:** Single HTML file. Use vanilla JS or a lightweight physics engine (e.g., matter.js) embedded via CDN. No build steps.
- **Performance:** Must handle 50+ bubbles at 60fps. Use `requestAnimationFrame` for the render loop.
- **No AI Defaults:** No purple glows, no cream backgrounds, no serif fonts, no card grids. The aesthetic is industrial, precise, and physical.
- **Accessibility:** Keyboard navigation for adding/selecting tasks (Tab to cycle bubbles, Enter to select, Arrow keys to adjust priority).

## Acceptance criteria
- [ ] **Visual:** Background is #1a1a1a. Fonts are Oswald and Barlow. No system fonts.
- [ ] **Physics:** Dragging a bubble up increases its radius and pushes neighbors away. Dragging down decreases radius and allows neighbors to move in.
- [ ] **Hierarchy:** High-pressure bubbles float to the top. Low-pressure bubbles sink to the bottom.
- [ ] **Selection:** Clicking a bubble updates the right panel with editable fields. The panel is disabled when no task is selected.
- [ ] **Empty State:** When no tasks exist, 'INFLATE TO START' is visible in the center.
- [ ] **Error:** Saving an empty title triggers a red flash and shake on the bubble.
- [ ] **Motion:** New tasks spawn with an elastic overshoot. High-pressure bubbles vibrate.
- [ ] **Performance:** 50 bubbles render smoothly without lag.
- [ ] **Chrome:** 'AERIS' wordmark is visible. No marketing hero or navigation clutter.

## Type pairing
Oswald (Display) + Barlow (Body)
