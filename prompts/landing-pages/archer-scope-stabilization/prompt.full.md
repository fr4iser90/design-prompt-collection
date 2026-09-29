# Archer Scope Stabilization — Extended Brief

## Concept
Archery is about stillness and focus. This landing page for 'SteadyHand' translates that physiological state into digital interaction. The hero section is a first-person view through a scope. The user must 'steady' their hand to see the product clearly.

## Art Direction
- **Color Palette:**
  - Primary: Night Vision Green `#00FF41` (UI elements, crosshairs, active text).
  - Background: Void Black `#050505`.
  - Secondary: Charcoal `#333333` (inactive UI, blurred text placeholders).
  - Highlight: Soft Lime `#80FF91` (success states, sharp focus indicators).
- **Typography:**
  - Display: 'Space Grotesk' or 'Rajdhani'. Clean, technical, slightly futuristic.
  - Body: 'Inter' (used sparingly, mostly for specs). Keep letter-spacing tight.
- **Visual Elements:**
  - Circular vignette (scope shape) in the center.
  - Crosshair lines: Thin, glowing green.
  - Depth of Field: Heavy Gaussian blur on background images until interaction.

## Layout & Structure
1. **Hero:** 100vh. A blurred image of a bow or arrow tip. A green crosshair sits in the center. Text 'FOCUS' is blurred out. 
2. **The Wind (Features):** Scroll down reveals wind patterns (animated SVG lines) that push content elements, requiring 'stability' to read.
3. **Specs:** A grid of technical data. Each spec card is initially dark/grey, lighting up green on hover.

## Motion Brief
- **Entrance:** The scope 'opens' (iris transition) revealing the blurred world.
- **Ambient:** A subtle 'breathing' animation. The entire scope container scales up and down by 1% and translates slightly on X/Y axes (sinusoidal) to simulate a heartbeat.
- **Interaction:**
  - **Stabilize:** On `mousedown`/`touchstart` or continuous scroll down, apply a CSS transition to `filter: blur()` reducing from 10px to 0px over 0.8s. Stop the breathing animation. 
  - **Lock:** When blur is 0, the crosshair turns solid white/green, and the 'Shop Now' button becomes clickable.
  - **Release:** On `mouseup`/`scroll-stop`, blur returns to 10px over 2s. Breathing resumes.

## Technical Constraints
- Use `will-change: filter, transform` for smooth blur transitions.
- Ensure the 'breathing' shake doesn't cause layout shifts.
- Mobile: Tap to stabilize for 3 seconds.

## Acceptance Criteria
- The interaction feels physical and rewarding.
- High contrast between the green UI and black background.
- No cartoonish archery clipart; keep it abstract and technical.
