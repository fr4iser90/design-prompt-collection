## Concept
The 'Vacuum Plunge Timer' is a specialized interface for cryo-blast food preservation, designed for professional kitchens or high-end home labs. The core metaphor is the vacuum chamber: as air is removed, the visual space physically compresses. This is not a decorative background but a functional representation of pressure. The design language is 'Chef Precision': sterile, industrial, and cold. It avoids all rustic or organic tropes (no wood, no green, no warm tones). The goal is to make the act of waiting for a vacuum seal feel visceral and mechanical.

## Primary task
The user must set a duration for the vacuum cycle and initiate the process. The interface should present a single, clear input for time (minutes/seconds) and a prominent 'Engage' action. Once engaged, the user monitors the progress via the visual compression and the countdown. The task is complete when the timer hits zero and the 'Release' action becomes available. There are no secondary settings or complex configurations; this is a single-purpose tool.

## States
1. **Default (Idle)**: The depth gauge circle is open. The background gradient is relaxed (large radius). Particles drift slowly upward. The timer displays the last set value or 00:00. The 'Engage' button is active if a time > 0 is set.
2. **Active (Compressing)**: The timer counts down. The background gradient within the gauge circle compresses radially inward, darkening the center. Particles move faster. The 'Engage' button is disabled. A subtle cyan glow pulses on the gauge border.
3. **Complete (Sealed)**: The gradient is fully compressed (darkest center). The timer reads 00:00. The 'Engage' button is replaced by a 'Release' button. Particles cease or dissipate.
4. **Error**: If the user attempts to engage with a time of 0, the gauge border flashes red (#FF3333 - use sparingly, distinct from cyan) and shakes slightly. A small text error appears: 'Set Duration'.
5. **Empty**: If the timer hasn't been used, display a subtle placeholder state in the timer readout.

## Palette
- **Background/Deep Space**: `#0A1128` (Deep Cryo Blue). Used for the main body and the center of the compressed gauge.
- **Accent/Pressure**: `#00F0FF` (Cyan). Used for active states, timer numbers, button borders, and particle highlights. 
- **Structure/Text**: `#E0E1DD` (Off-White/Linen). Used for labels, static text, and inactive borders. 
- **Error**: `#FF3333` (Red). Used only for error states.
- **Glass/Overlay**: `rgba(224, 225, 221, 0.1)`. Used for subtle dividers or inactive button backgrounds.

## Type
- **Display**: `Space Grotesk`. Use for the 'SubZero' wordmark, the main timer numbers (large, bold), and section headers. It provides a geometric, modern feel that is technical but not robotic.
- **Body/Data**: `JetBrains Mono`. Use for all labels ('MIN', 'SEC', 'PRESSURE'), button text, and smaller readouts. This reinforces the 'instrument panel' aesthetic. 
- **Hierarchy**: The timer numbers should be the largest element (approx 8rem-12rem). Labels should be small (0.75rem) and uppercase. The wordmark should be small and unobtrusive.

## Layout
- **Container**: Full viewport height. Flexbox centering for the main gauge.
- **Gauge Component**: A perfect circle centered on the screen. Diameter approx 60-70% of viewport height. 
- **Chrome**: 
  - Top-Left: 'SubZero' wordmark.
  - Top-Right: Status indicator (e.g., 'CHAMBER SEALED' or 'READY').
  - Bottom-Center: Controls (Time Input + Engage Button).
- **Gauge Interior**: 
  - The background is a radial gradient starting from a lighter blue at the edge to `#0A1128` at the center. 
  - The timer numbers are overlaid on the center of the gauge.
  - Particles are rendered within the gauge bounds, moving from bottom to top.
- **Controls**: A horizontal row below the gauge. Time input (stepper style) and the 'Engage' button. The button should be large and tactile.

## Motion
1. **Entrance**: On load, the entire UI scales from `scale(1.2)` and `opacity(0)` to `scale(1)` and `opacity(1)` over 0.8s with an `ease-out` curve. This mimics the camera zooming out or the chamber closing.
2. **Ambient**: Particles (small 2-4px circles, color `#E0E1DD` with low opacity) spawn at the bottom of the gauge and float upward, fading out as they reach the top. Speed is slow (2-3s per particle). 
3. **Interaction (Engage)**: When 'Engage' is clicked, the radial gradient's inner stop moves from 0% to 50% (or more) over the duration of the timer. This creates a 'tunnel' effect. The 'Engage' button itself should have a 'press' effect (scale down slightly).
4. **Completion**: When the timer hits zero, the gradient snaps to full compression. A 'Release' button fades in. The ambient particles stop spawning.
5. **Error**: Shake animation on the gauge border (translateX ±5px, 0.1s duration, 3 iterations).

## Constraints
- **No Rustic Elements**: No wood textures, no serif fonts, no warm colors.
- **No Marketing**: Do not include hero text, feature lists, or testimonials. This is a tool.
- **Performance**: Use `requestAnimationFrame` for particle animation. Ensure the gradient compression is efficient (CSS variables or Canvas).
- **Accessibility**: Ensure high contrast between text and background. Buttons must have focus states. 
- **Single Task**: Do not add navigation, settings, or history. 
- **Visuals**: The 'compression' must be perceptible. It should not just be a color change, but a spatial change in the gradient's focal point or radius.
- **Fonts**: Load Google Fonts for Space Grotesk and JetBrains Mono. Do not use system fallbacks for the primary design.

## Acceptance criteria
- [ ] Interface loads with a 'sucked-in' entrance animation (scale 1.2 -> 1).
- [ ] Main visual is a circular gauge centered on the screen.
- [ ] Background gradient inside the gauge compresses radially inward when the timer is active.
- [ ] Particles drift upward in the gauge during idle and active states.
- [ ] 'Engage' button triggers the compression and countdown.
- [ ] Timer counts down using JetBrains Mono.
- [ ] 'Release' button appears only when the timer reaches 00:00.
- [ ] Error state flashes red and shakes if 'Engage' is clicked with 0 time.
- [ ] Colors are strictly `#0A1128`, `#00F0FF`, `#E0E1DD` (plus red for error).
- [ ] Typography is Space Grotesk (Display) and JetBrains Mono (Data).
- [ ] No green, brown, or rustic visual elements are present.
- [ ] The UI remains legible during maximum compression.

## Detailed Layout Specifications
**Desktop (>768px):**
- **Body**: `display: flex; justify-content: center; align-items: center; height: 100vh; background: #0A1128; overflow: hidden;`
- **Gauge Container**: `position: relative; width: 70vmin; height: 70vmin; border-radius: 50%; border: 2px solid rgba(224, 225, 221, 0.2); overflow: hidden;`
- **Gauge Canvas**: `position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;`
- **Timer Overlay**: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2; text-align: center;`
- **Controls**: `position: absolute; bottom: 5vh; left: 50%; transform: translateX(-50%); display: flex; gap: 1rem; align-items: center; z-index: 3;`
- **Header**: `position: absolute; top: 2rem; left: 2rem; right: 2rem; display: flex; justify-content: space-between; z-index: 3;`

**Mobile (<=768px):**
- **Gauge Container**: `width: 85vmin; height: 85vmin;`
- **Controls**: `flex-direction: column; bottom: 2rem; width: 90%;`
- **Header**: `top: 1rem; left: 1rem; right: 1rem;`
- **Wordmark**: `font-size: 1rem;`
- **Timer**: `font-size: 4rem;` (scaled down from desktop 8rem)

## Detailed Motion & Interaction Logic
**1. Particle System (Canvas 2D):**
- **Class Particle**: Properties: `x, y, vx, vy, size, opacity, life`.
- **Spawn**: Random `x` within gauge width, `y` at bottom. `vy` negative (upward). `vx` small random value for drift.
- **Update**: `y += vy; x += vx; opacity -= decay;`.
- **State Modifiers**: 
  - *Idle*: `vy` = -0.5, `decay` = 0.01.
  - *Active*: `vy` = -2.0, `decay` = 0.02. Color shifts slightly towards cyan.
  - *Complete*: No new spawns. Existing particles fade out quickly.
- **Rendering**: `ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI*2); ctx.fillStyle = rgba(224, 225, 221, opacity); ctx.fill();`

**2. Compression Gradient (CSS Variables):**
- Use a CSS variable `--compression-level` (0 to 1).
- **Gradient**: `background: radial-gradient(circle at center, #0A1128 calc(var(--compression-level) * 50%), #1A2A4A 100%);`
- **JS Update**: On each frame of the timer, calculate `progress = (totalTime - currentTime) / totalTime`. Set `document.documentElement.style.setProperty('--compression-level', progress);`.
- **Visual Effect**: As `--compression-level` increases, the dark center expands, pushing the lighter blue to the edges, creating the 'plunge' effect.

**3. Timer Logic:**
- **Input**: Two number inputs or steppers for Minutes and Seconds. Min 0, Max 99.
- **Validation**: If `minutes === 0 && seconds === 0`, trigger Error State.
- **Countdown**: Use `setInterval` or `requestAnimationFrame` with timestamp delta for accuracy.
- **Display**: Format as `MM:SS`. Pad with zeros.

**4. Error State:**
- **Trigger**: Click 'Engage' with 0 time.
- **Action**: Add class `.shake` to gauge container. Remove after 300ms.
- **Visual**: Border color changes to `#FF3333`. Text 'SET DURATION' appears below controls in red.

## Accessibility & Performance
- **ARIA**: `role="timer"` on the timer display. `aria-live="polite"` for status changes.
- **Focus**: Visible focus rings on inputs and buttons (`outline: 2px solid #00F0FF;`).
- **Performance**: Use `will-change: transform, opacity` on animated elements. Limit particle count to max 50 to maintain 60fps on mobile.
- **Contrast**: Ensure text `#E0E1DD` on `#0A1128` meets WCAG AA standards (it does).

## Deliverable
A single HTML file containing all CSS in `<style>` and JS in `<script>`. No external assets other than Google Fonts links. Code must be clean, commented, and ready to run in a browser.
