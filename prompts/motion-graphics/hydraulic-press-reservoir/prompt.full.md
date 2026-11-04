## Concept
'Pascal's Squeeze' is a 6-second looping motion graphics explainer for HydroForm, a fictional industrial design studio. The sequence visualizes Pascal's principle: how a small input force is multiplied into a massive output force via hydraulic pressure. The aesthetic is tactile, mechanical, and precise, avoiding abstract energy visuals in favor of realistic fluid dynamics and metal deformation. The goal is to make the physics of pressure multiplication visceral and rhythmic.

## Beat Sheet
1. **0.0s–1.5s (Input):**
   - **Visual:** A small piston on the left depresses into a master cylinder. The fluid is cyan (#00B4D8).
   - **Text:** 'INPUT FORCE' in Archivo Black appears top-left.
   - **Motion:** Smooth ease-in-out downward movement. Fluid level drops slightly in the master cylinder.
   - **Audio Cue (implied):** Soft hydraulic hiss.

2. **1.5s–3.5s (Transmission):**
   - **Visual:** The cyan fluid travels through a horizontal connecting line to the right. A pressure gauge (Space Mono) appears, needle swinging from 0 to 1000 PSI.
   - **Text:** 'PRESSURE MULTIPLICATION' in Space Mono below the gauge.
   - **Motion:** Fluid line pulses subtly to indicate pressure buildup. The large piston on the right begins to lift.
   - **Audio Cue (implied):** Rising pitch of hydraulic pressure.

3. **3.5s–6.0s (Output):**
   - **Visual:** The large piston slams down onto a red-hot steel billet (#FF5722). The billet squashes realistically.
   - **Text:** 'OUTPUT FORCE' in Archivo Black appears bottom-right.
   - **Motion:** Rapid downward slam (ease-in). Impact triggers a 2px screen shake and a brief spark burst. The loop resets to 0.0s.
   - **Audio Cue (implied):** Heavy metallic thud.

## Poster Frame
**Time:** ~1.5s
**Description:** The small piston is halfway depressed. The pressure gauge needle is at 50%. The title 'Pascal's Squeeze' is prominent in the top-left corner in Archivo Black. The fluid line is taut, showing the connection between the two pistons. The background is deep charcoal (#1A1A1A) with subtle noise. The composition is balanced, with the small piston on the left and the large piston on the right, ready for action.

## Palette
- **Background:** #1A1A1A (Deep Charcoal) - Provides high contrast for the fluid and metal.
- **Fluid:** #00B4D8 (Bright Cyan) - Represents the hydraulic fluid, high visibility.
- **Impact/Heat:** #FF5722 (Vibrant Orange-Red) - Used for the steel billet and spark effects, indicating heat and force.
- **Text:** #FFFFFF (White) for high readability against the dark background.

## Type
- **Display:** Archivo Black - Used for title cards ('INPUT FORCE', 'OUTPUT FORCE', 'Pascal's Squeeze'). Bold, industrial, authoritative.
- **Body/Technical:** Space Mono - Used for gauge readings, pressure values, and small labels. Monospaced, technical, precise.

## Frame
- **Aspect Ratio:** 16:9
- **Resolution:** 1920x1080 (scalable)
- **Layout:** Split composition. Left side: Small piston/master cylinder. Right side: Large piston/ram/billet. Center: Connecting fluid line and pressure gauge.

## Motion
- **Easing:** 
  - Piston movement: ease-in-out for smooth, mechanical feel.
  - Impact: ease-in for rapid acceleration, followed by abrupt stop.
  - Screen shake: 2px amplitude, 0.1s duration, random x/y offset.
- **Fluid Dynamics:** 
  - Use SVG paths or Canvas to animate fluid level changes.
  - Add subtle sloshing effect in the chambers to indicate stored energy.
- **Sparks:** 
  - Generate 10-15 small orange particles on impact, fading out quickly.

## Constraints
- **Single File:** All HTML, CSS, and JS must be in one file.
- **No External Libraries:** Use vanilla JS for animation logic (requestAnimationFrame).
- **Performance:** Ensure smooth 60fps animation.
- **Reduced Motion:** If `prefers-reduced-motion` is set, display the static poster frame.
- **No Abstract Energy:** Avoid glowing lines or particles that don't represent physical fluid or sparks.

## Layout & Responsiveness
- **Desktop:** Full 16:9 canvas centered. Split composition: Left (Input), Center (Transmission/Gauge), Right (Output).
- **Mobile:** Vertical stack or scaled-down 16:9 with increased font sizes for readability. Ensure touch targets for any interactive elements (if added) are min 44px.
- **Constraints:** Must render correctly at 1920x1080 and 375x667. Use CSS `object-fit: contain` for the canvas container.

## Motion Details
- **Fluid Sloshing:** Add subtle sine-wave oscillation to the fluid surface in the master cylinder during the Input phase to indicate stored energy.
- **Gauge Needle:** Use a spring-damper simulation for the needle swing to avoid robotic movement. Overshoot by 5% before settling.
- **Billet Deformation:** Use a mesh deformation algorithm or pre-calculated keyframes for the squash effect. The billet should widen as it compresses, maintaining volume conservation visually.
- **Sparks:** Generate 10-15 particles with random velocities, gravity, and fade-out curves. Color gradient from white-hot center to orange edges.

## Acceptance criteria
- [ ] Single HTML file with embedded CSS/JS.
- [ ] 6s loop duration, seamless reset.
- [ ] Three distinct beats with clear visual separation.
- [ ] Realistic fluid displacement (cyan #00B4D8).
- [ ] Screen shake on impact (2px, 0.1s).
- [ ] Correct typography pairing (Archivo Black + Space Mono).
- [ ] Poster frame readable at 1.5s with title visible.
- [ ] Pressure gauge animates from 0 to max.
- [ ] Steel billet deforms on impact.
- [ ] No external libraries or assets.
- [ ] Fluid level in master cylinder drops inversely proportional to slave cylinder rise.
- [ ] Gauge needle overshoots and settles realistically.
- [ ] Billet volume conservation visually maintained during squash.
- [ ] No layout shift on mobile devices.
- [ ] Code is minified-ready but readable for debugging.
