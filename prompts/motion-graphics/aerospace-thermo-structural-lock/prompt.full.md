## Concept
The Thermal Lockup is a 6-second technical explainer loop demonstrating how thermal expansion affects aerospace structural integrity. It visualizes the transition from a cold, loose state to a hot, locked state. The aesthetic is 'hard geometry'—strict, precise, and devoid of organic or chaotic elements. It feels like a high-end engineering simulation or a blueprint coming to life. The focus is on the mechanical interaction between the rivet and the surrounding plate, highlighting the critical moment where thermal expansion causes a structural lock.

## Beat sheet
- **0.0s–1.5s (Cold State):** The structural frame draws in via stroke animation. The rivet is centered. The text 'THERMAL LOCK' appears below. The scene is static and cold. This is the poster frame. The background grid fades in first, followed by the structural lines.
- **1.5s–3.0s (Heat Wave):** A subtle heat gradient (cyan glow) passes across the metal surface. The structure expands visibly along its axes. Use scale transforms or path morphing to simulate expansion. The movement should feel heavy and material, not floaty. The temperature readout in the corner increments from 20°C to 450°C.
- **3.0s–4.5s (Lockup):** The expansion hits the tolerance limit. A 'lock indicator' (a small geometric shape or text change) turns bright cyan (#06B6D4). The structure snaps into a final, locked position. This snap should be sharp and decisive. The status text changes from 'EXPANDING' to 'LOCKED'.
- **4.5s–6.0s (Cool Down):** The heat gradient fades. The structure remains in the locked state. The loop resets smoothly to the cold state at 6.0s. The temperature readout decreases back to 20°C, and the status text resets to 'COLD'.

## Poster frame
At 1.5s, the screen shows a single titanium rivet centered on a dark background (#0F172A). The rivet is rendered in light slate (#E2E8F0) with thin, precise strokes. It glows faintly cyan (#06B6D4) at the edges. Below the rivet, the text 'THERMAL LOCK' is aligned precisely in Space Grotesk. Small technical data readouts in JetBrains Mono are visible but secondary. The composition is balanced, minimal, and instantly readable as a technical spec. The grid lines are faintly visible, providing context for the scale.

## Palette
- **Background:** #0F172A (Deep Navy) - Provides high contrast for the technical elements.
- **Structure/Ink:** #F8FAFC (White) and #E2E8F0 (Light Slate) - Used for the main geometry and primary text.
- **Secondary/Dim:** #94A3B8 (Cool Gray) - Used for grid lines, secondary text, or inactive states.
- **Accent/Heat:** #06B6D4 (Cyan) - Used for the heat gradient, lock indicator, and active states. This is the only saturated color.

## Type
- **Display:** 'Space Grotesk' for the main title 'THERMAL LOCK'. Bold weight, uppercase, tight tracking. It should feel modern and technical.
- **Mono:** 'JetBrains Mono' for all technical data readouts (temperature, tolerance, status). Regular weight, small size. It adds authenticity to the engineering aesthetic.

## Frame
- **Aspect Ratio:** 16:9
- **Layout:** Centered composition. The rivet is the focal point. Text is aligned below or to the side, adhering to a strict grid. 
- **Style:** Minimalist, high-contrast, technical. No gradients except for the heat effect. No shadows except for the subtle glow of the heat/lock state.

## Motion
- **Entrance:** Stroke animation for the structural frame. It should draw itself in smoothly over the first 1.5s.
- **Ambient:** Heat gradient shifts across the metal surface. This is a subtle color shift and glow effect, not a particle system.
- **Interaction:** Expansion joints snap into alignment at peak temp. This is a sharp, decisive movement that conveys mechanical precision.
- **Loop:** The animation loops seamlessly. The cool down phase should transition smoothly back to the cold state.

## Constraints
- **Deliverable:** Single-file HTML/CSS/JS.
- **Performance:** Must run at 60fps. Use CSS transforms and opacity for animations where possible.
- **Accessibility:** Respect `prefers-reduced-motion`. If enabled, show the static poster frame only.
- **No External Libraries:** Pure HTML/CSS/JS. No React, Vue, GSAP, etc.
- **No Generic Tropes:** No rockets, no stars, no space backgrounds. Focus on material science.

## Acceptance criteria
- [ ] The animation is exactly 6 seconds long and loops seamlessly.
- [ ] The poster frame at 1.5s is legible and matches the description (rivet centered, 'THERMAL LOCK' text, cyan glow).
- [ ] The heat gradient is subtle and passes across the structure during the 1.5s–3.0s beat.
- [ ] The expansion is visible and feels mechanical, not floaty.
- [ ] The lock indicator turns cyan at 3.0s–4.5s and the structure snaps into place.
- [ ] The typography uses Space Grotesk and JetBrains Mono correctly.
- [ ] The color palette is strictly adhered to.
- [ ] The code is a single HTML file with embedded CSS and JS.
- [ ] `prefers-reduced-motion` is respected.
- [ ] The layout is responsive and centers correctly on mobile and desktop.
- [ ] The temperature readout updates dynamically in sync with the animation beats.
