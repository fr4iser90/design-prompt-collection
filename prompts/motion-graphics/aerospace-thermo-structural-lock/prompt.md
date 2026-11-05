Deliverable: single-file HTML/CSS/JS.

Create a 6-second looping motion graphic explaining thermal locking in aerospace structures. The visual style is strict, technical, and minimal—resembling a high-end engineering schematic or a CAD viewport. Avoid generic rocketry tropes; focus entirely on material science and mechanical precision.

**Visual Composition:**
Center stage is a simplified, abstract representation of a titanium rivet or joint assembly. Use hard geometry: straight lines, perfect circles, and sharp angles. The background is a deep, matte navy (#0F172A). The structure itself is rendered in light slate (#E2E8F0) with thin, precise strokes. Add a subtle, faint grid overlay in #1E293B to enhance the blueprint feel. The rivet head should be a perfect circle, with the shank extending downwards, intersecting with a horizontal plate element. Ensure all lines are crisp and anti-aliased.

**Typography:**
Use 'Space Grotesk' for the main title 'THERMAL LOCK' and 'JetBrains Mono' for technical data readouts (e.g., temperature, tolerance). Text must be crisp, high-contrast, and aligned to a strict grid. The title should be centered below the graphic, with a letter-spacing of 0.1em. The data readouts should be positioned in the top-left and bottom-right corners, updating dynamically during the animation.

**Color Palette:**
- Background: #0F172A (Deep Navy)
- Structure/Ink: #F8FAFC (White) and #E2E8F0 (Light Slate)
- Secondary/Dim: #94A3B8 (Cool Gray)
- Accent/Heat: #06B6D4 (Cyan)

**Motion Sequence (6s Loop):**
1. **0.0s–1.5s (Cold State):** The structural frame draws itself in via stroke animation. The rivet is centered. The text 'THERMAL LOCK' appears below. The scene is static and cold. This is the poster frame. The stroke-dashoffset animation should be linear.
2. **1.5s–3.0s (Heat Wave):** A subtle heat gradient (cyan glow) passes across the metal surface. The structure expands visibly along its axes. Use scale transforms or path morphing to simulate expansion. The movement should feel heavy and material, not floaty. The temperature readout should increment rapidly.
3. **3.0s–4.5s (Lockup):** The expansion hits the tolerance limit. A 'lock indicator' (a small geometric shape or text change) turns bright cyan (#06B6D4). The structure snaps into a final, locked position. This snap should be sharp and decisive, using a cubic-bezier easing function for impact.
4. **4.5s–6.0s (Cool Down):** The heat gradient fades. The structure remains in the locked state. The loop resets smoothly to the cold state at 6.0s. The temperature readout decreases.

**Technical Constraints:**
- Use CSS animations or requestAnimationFrame for smooth 60fps performance.
- Ensure the freeze-frame at 1.5s is legible and aesthetically complete.
- No external libraries. Pure HTML/CSS/JS.
- Respect `prefers-reduced-motion`: if enabled, show the static poster frame only.
- Layout must be responsive, centering the graphic on both desktop and mobile viewports.
