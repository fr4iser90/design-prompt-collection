Build a single-file HTML tool surface for 'Aeris Air Pressure Task Queue'. The interface must reject standard list/kanban metaphors in favor of a physical, pneumatic simulation where task priority is visualized as air pressure.

**Visual & Layout:**
- **Background:** Deep industrial dark (#1a1a1a). No gradients, no glow.
- **Typography:** Oswald for headers/labels (uppercase, tight tracking), Barlow for body/task text. High contrast (#f0f0f0).
- **Chrome:** Minimal top bar with 'AERIS' wordmark (Oswald, bold) and a 'Pressure Gauge' indicator (0-100 PSI). No navigation clutter.
- **Canvas:** The main area is a `<canvas>` element filling the viewport below the chrome. It renders the task bubbles.
- **Panels:** A slim right-side panel (200px wide) for 'Task Details' and 'Controls'. It uses hairline borders (#333) and solid backgrounds (#222). No drop shadows.

**Core Mechanics (Physics):**
- **Bubbles:** Tasks are circles. Radius = base_size + (priority * scale_factor). Priority ranges 0-100.
- **Pressure:** High priority (>70) bubbles have a cyan (#00e5ff) stroke and a subtle inner glow. Critical (>90) bubbles pulse red (#ff4d4d).
- **Collision:** Bubbles repel each other. Force is proportional to the sum of their pressures. High-pressure bubbles push low-pressure bubbles away.
- **Gravity:** Low-pressure bubbles (<20) sink to the bottom of the canvas. High-pressure bubbles float to the top.
- **Interaction:** 
  - **Drag:** Click and drag a bubble. Dragging *up* increases pressure (inflates). Dragging *down* decreases pressure (deflates). 
  - **Release:** On release, the bubble settles into its new equilibrium position based on its new pressure, colliding with neighbors.
  - **Click:** Clicking a bubble selects it, updating the right-side 'Task Details' panel.

**States:**
- **Default:** Bubbles float in equilibrium. Ambient vibration for high-pressure tasks.
- **Selection:** Selected bubble has a thicker stroke and a crosshair overlay. Details panel shows title, priority slider, and 'Delete' button.
- **Empty:** If no tasks, show a centered, faint outline of a bubble with text 'INFLATE TO START' in Oswald.
- **Error:** If a task name is empty, the bubble turns red and shakes slightly on save.

**Motion:**
- **Entrance:** New tasks spawn as 2px dots, then rapidly expand to their target radius with a slight overshoot (elastic easing).
- **Ambient:** High-pressure bubbles vibrate (jitter position by 0.5px). Low-pressure bubbles sink slowly.
- **Interaction:** Dragging compresses adjacent bubbles (they shrink slightly). Release causes a spring-back collision animation.

**Constraints:**
- Use vanilla JS or a lightweight physics library (e.g., matter.js) but keep it self-contained.
- No external assets except Google Fonts (Oswald, Barlow).
- Performance: Must handle 50+ bubbles at 60fps.
- No marketing hero. The tool is the hero.

**Acceptance Criteria:**
- [ ] Dragging a bubble up visibly increases its radius and pushes neighbors away.
- [ ] High-pressure bubbles float to the top; low-pressure bubbles sink to the bottom.
- [ ] Selected bubble updates the right-side panel with editable fields.
- [ ] Empty state shows 'INFLATE TO START' prompt.
- [ ] Typography is Oswald/Barlow, not system fonts.
- [ ] Colors match #1a1a1a, #f0f0f0, #00e5ff, #ff4d4d exactly.
