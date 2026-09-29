## Concept
'Hydraulic Clutch Torque Sync' is a high-stakes rhythm-timing game where the player acts as a heavy machinery operator. Instead of abstract musical notes, the timing mechanic is grounded in physical fluid dynamics: matching the peak of a hydraulic pressure wave to the rotational phase of a massive flywheel to engage gears. The fantasy is one of precision engineering under pressure. The visual language is industrial, dark, and tactile, emphasizing weight and inertia.

## Core loop
1. **Observe:** The flywheel spins at a current RPM. A hydraulic pressure wave oscillates on the side. A 'Shift Gate' (target arc) is visible on the flywheel rim.
2. **Act:** Player holds `Spacebar` to engage the clutch. This causes the pressure wave to build amplitude and frequency slightly, simulating hydraulic load.
3. **Time:** Player must release `Spacebar` when two conditions are met simultaneously:
   - The pressure wave is at its peak (visualized by color shift to #FF5500).
   - The flywheel's marker is within the Shift Gate arc.
4. **Result:**
   - **Success:** Gear shifts. RPM increases. Screen shakes. Cyan sparks emit. Next gear becomes available.
   - **Failure:** Clutch shears. Red sparks. Grinding visual noise. Game Over.
5. **Reset:** Press `R` to restart.

## Input
- **Spacebar:** Primary action. Hold to build pressure/engage clutch. Release to attempt gear shift.
- **R:** Restart game from initial state.
- **Mouse/Touch:** Not required for core mechanic, but canvas should be responsive to window resize.

## Fail / win
- **Fail:** Releasing the clutch outside the acceptable timing window (either pressure peak or flywheel alignment). This triggers a 'Shear' state: the flywheel stops abruptly, red jagged lines (sparks) explode from the center, and a 'CLUTCH SHEARED' message appears. The run ends.
- **Win:** Successfully shifting through 5 gears to reach 5000 RPM. A 'TRANSMISSION OPTIMAL' message appears in #00FFCC. The flywheel spins smoothly at high speed.
- **Score:** Primary metric is final RPM. Secondary metric is number of 'Perfect' shifts (tighter timing window).

## Entities
1. **Flywheel:**
   - **Visual:** Large circle, dark grey (#1A2530) with metallic highlights. A bright white marker dot on the rim.
   - **Behavior:** Rotates clockwise. Speed increases with each gear shift. Motion blur effect increases with speed.
   - **Shift Gate:** A semi-transparent arc (cyan #00FFCC) on the rim indicating the valid engagement zone.
2. **Pressure Wave:**
   - **Visual:** A sine wave or vertical fluid column on the left. Color interpolates from #00FFCC (low) to #FF5500 (high).
   - **Behavior:** Oscillates at a base frequency (e.g., 1 Hz). Amplitude increases when clutch is held.
3. **Particles:**
   - **Cyan Sparks:** Emit on successful shift.
   - **Red Sparks:** Emit on failure.
   - **Smoke:** Subtle grey smoke trails from the clutch area during engagement.

## Feel
- **Weight:** The flywheel should feel heavy. Acceleration and deceleration should not be instant. Use easing functions for RPM changes.
- **Tension:** As pressure builds, the background grid should subtly pulse or vibrate. The sound pitch rises.
- **Impact:** Successful shifts must feel 'snappy'. Use a short, sharp screen shake (offset x/y by random small values for 100ms). Failure should feel 'grinding' and chaotic.
- **Audio:** Use Web Audio API oscillators. Low frequency hum for idle. Rising sawtooth wave for pressure build. Short noise burst for shear. Clean sine 'ping' for perfect shift.

## Palette
- **Background:** #0B111A (Deep Industrial Black)
- **Grid/Structure:** #1A2530 (Slate Grey)
- **Safe/Success:** #00FFCC (Hydraulic Cyan)
- **Danger/High Pressure:** #FF5500 (Warning Orange)
- **Text/Markers:** #FFFFFF (White)
- **Shear/Fail:** #FF0000 (Bright Red)

## Type
- **Display:** Bebas Neue (or similar condensed sans-serif) for RPM and Title. Large, bold, uppercase.
- **Body/HUD:** IBM Plex Mono (or similar monospace) for Gear Number, Status, and Instructions. Small, precise, technical.

## Constraints
- **Single File:** All HTML, CSS, and JS must be in one file.
- **No Assets:** No external images, fonts (use system fallbacks if web fonts fail), or audio files. Synthesize audio.
- **Performance:** Maintain 60 FPS. Use `requestAnimationFrame`. Optimize particle counts.
- **Responsive:** Canvas should resize to fit the window while maintaining aspect ratio or scaling appropriately.
- **Fairness:** The timing window must be generous enough to be learnable but tight enough to be challenging. Start with a 200ms window for 'Good' and 100ms for 'Perfect'.

## Acceptance criteria
1. **Playability:** Game can be started, played, and failed/restarted without errors.
2. **Mechanic:** Holding Spacebar visibly increases pressure wave amplitude/color. Releasing at peak + gate alignment results in RPM increase.
3. **Fail State:** Releasing at wrong time results in immediate game over with visual feedback (sparks, message).
4. **Win State:** Reaching 5000 RPM displays win message.
5. **Visuals:** Flywheel rotates smoothly with motion blur. Pressure wave oscillates. Colors match palette.
6. **Input:** Spacebar and R keys function correctly.
7. **Code:** No external dependencies. Clean, commented JS.
8. **Performance:** No significant frame drops during particle effects.

## Type pairing
Bebas Neue + IBM Plex Mono


## Motion
- entrance: Heavy flywheel inertia spin-up with motion blur
- ambient: Hydraulic fluid pulses visibly in transparent hoses
- interaction: Clutch engagement causes screen shake and gear-mesh sound
