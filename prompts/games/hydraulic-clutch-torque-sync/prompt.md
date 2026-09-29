Deliverable: single-file HTML/CSS/JS.

Build a playable rhythm-timing game titled 'Hydraulic Clutch Torque Sync' using Canvas 2D. The player operates a heavy industrial transmission. The core mechanic is matching a visual hydraulic pressure wave to the rotational phase of a flywheel to engage gears without shearing teeth.

**Visuals & Layout:**
1. **Background:** Dark industrial slate (#0B111A) with subtle grid lines (#1A2530).
2. **Flywheel:** A large, heavy circle in the center. It rotates clockwise. Speed increases as the game progresses. Use motion blur trails to indicate speed.
3. **Pressure Wave:** A sine-wave-like oscillating line or fluid column on the left side. It pulses rhythmically. The color shifts from #00FFCC (low pressure) to #FF5500 (high pressure).
4. **HUD:** Top bar displays current RPM (large Bebas Neue) and Gear Indicator (IBM Plex Mono). Bottom bar shows a 'Clutch Engaged' status light.

**Core Loop:**
1. The flywheel spins at a base RPM. The pressure wave oscillates at a fixed frequency (e.g., 1 Hz).
2. The player must hold the Spacebar to 'engage' the clutch. This connects the hydraulic system to the flywheel.
3. While held, the pressure builds. The goal is to release the Spacebar exactly when the pressure wave hits its peak (the red zone) AND the flywheel's marker aligns with a 'Shift Gate' (a visual notch on the flywheel rim).
4. If successful, the gear shifts, RPM jumps, and the screen shakes slightly with a satisfying 'clunk' visual effect.
5. If failed (released too early/late or missed the gate), the clutch shears. Red sparks fly, a grinding noise plays (visualized as jagged lines), and the run ends.

**Input:**
- **Spacebar:** Hold to build pressure/engage. Release to attempt shift.
- **R:** Restart game.

**Fail Condition:**
- Releasing outside the 'Perfect' or 'Good' timing window relative to the pressure peak.
- Releasing when the flywheel marker is not within the Shift Gate arc.
- Result: 'CLUTCH SHEARED' overlay. Game Over.

**Win/Score:**
- Score is based on RPM reached. Each successful shift increases RPM by 500-1000.
- Win condition: Reach 5000 RPM. Display 'TRANSMISSION OPTIMAL' in green (#00FFCC).

**Entities:**
- **Flywheel:** Rotating object with a visible marker (white dot).
- **Pressure Wave:** Oscillating visual element.
- **Shift Gate:** A highlighted arc on the flywheel rim that moves or stays fixed depending on difficulty.

**Feel/Juice:**
- **Screen Shake:** On successful shift, shake the canvas context slightly.
- **Particles:** Emit orange sparks on shear, cyan sparks on perfect shift.
- **Audio Cues:** Use Web Audio API for simple synthesized sounds: low hum for idle, rising pitch for pressure build, sharp 'clunk' for success, harsh noise for failure.

**Constraints:**
- No external assets. All graphics drawn via Canvas API.
- Use `requestAnimationFrame` for smooth animation.
- Ensure the timing window is fair but challenging (approx 100ms for 'Perfect').
- Code must be self-contained in one HTML file.
