## Concept
Gimbal Lock is a physics-based aiming puzzle. You control a high-speed gyroscope with a laser emitter. The challenge is not just aiming, but managing the counter-intuitive physics of precession: rotating one axis causes the perpendicular axis to drift. You must keep the laser beam locked on a moving target while maintaining rotor RPM to prevent instability.

## Core loop
1. **Observe:** Target moves; beam drifts due to precession/wobble.
2. **Adjust:** Drag mouse to rotate gimbals. Counteract precession.
3. **Stabilize:** Use Shift to boost RPM if wobble is too high (costs Fuel).
4. **Fire:** Click when beam is aligned with target.
5. **Result:** Score based on precision and hits. RPM decays. Repeat until fail.

## Input
- **Mouse/Touch Drag:** 
  - Horizontal drag: Rotates Outer Gimbal (Yaw).
  - Vertical drag: Rotates Middle Gimbal (Pitch).
- **Click/Tap:** Fires laser (checks hit detection).
- **Shift Key:** Boosts RPM (increases stability, drains Fuel).
- **Space:** Restart (if game over).

## Fail / win
- **Fail:** 
  1. RPM < 10: Gyroscope collapses. Game Over.
  2. Miss Timer: If beam is not on target for > 3 seconds, Target Locks. Game Over.
- **Win:** Endless mode. Score accumulates. High score saved to localStorage.
- **Score Formula:** `(Hits * 100) + (Precision * 10)`. Precision is 0-10 based on beam center to target center distance (0 = perfect).

## Entities
1. **Gyroscope:** 
   - **Outer Ring:** Yaw axis. Rotates with horizontal drag.
   - **Middle Ring:** Pitch axis. Rotates with vertical drag.
   - **Inner Rotor:** Roll axis. Spins rapidly (RPM). Direction = Laser direction. Affected by precession from Outer/Middle rotation.
2. **Laser Beam:** Line from center of screen outward in rotor's spin axis direction. Color #00FF9D.
3. **Target:** Square moving in 2D projection space. Color #FF0055.
4. **HUD:** 
   - RPM Meter (Bar or Text).
   - Fuel Meter (Bar).
   - Score.
   - Miss Timer (visual warning if > 2s).

## Feel
- **Precession:** When dragging, the non-dragged axis must visibly rotate in the opposite direction (or perpendicular) depending on spin direction. This is the core "puzzle" feel.
- **Wobble:** At low RPM, add sine-wave noise to the rotor's orientation. The beam should jitter.
- **Hit Feedback:** Screen flash (#00FF9D) and particle burst on hit. Sound (optional oscillator beep).
- **Fail Feedback:** Gyroscope rings spin out of control, turn #FF0055, then stop.

## Palette
- **Background:** #0F0F1A (Deep Void)
- **Primary (Gyroscope/Laser):** #00FF9D (Neon Green)
- **Danger (Target/Fail):** #FF0055 (Hot Pink)
- **HUD Text:** #FFFFFF (White, low opacity for non-critical)

## Type
- **Display:** 'OrbitDisplay' (or similar geometric sans, e.g., 'Rajdhani', 'Orbitron'). Bold, uppercase for Title/Game Over.
- **Body/HUD:** 'GridMono' (or 'Space Mono', 'IBM Plex Mono'). Small, monospaced for RPM, Score, Fuel.

## Constraints
- **Single File:** HTML/CSS/JS in one file.
- **No Libraries:** Pure Vanilla JS. No Three.js. Implement basic 3D->2D projection (orthographic or weak perspective) manually.
- **Performance:** 60 FPS. Use `requestAnimationFrame`.
- **Responsiveness:** Canvas fills window. Handle resize.
- **State:** Use a simple state object `{ rpm, fuel, yaw, pitch, roll, score, state }`.

## Acceptance criteria
- [ ] **Visuals:** Rings are distinct. Laser is visible. Target moves.
- [ ] **Physics:** Dragging Yaw causes Pitch to drift (precession). This must be noticeable.
- [ ] **Input:** Drag rotates rings. Click fires. Shift boosts.
- [ ] **Decay:** RPM decreases over time. Wobble increases as RPM drops.
- [ ] **Fail State:** Game ends when RPM < 10 or Miss Timer > 3s.
- [ ] **Scoring:** Score updates on hit. Precision affects score.
- [ ] **Restart:** Can restart game after fail.
- [ ] **Code Quality:** No console errors. Clean structure.
- [ ] **Precession Logic:** If spin is clockwise, dragging Yaw Right should cause Pitch to drop (or rise, depending on convention, but it must be consistent and visible).

## Motion
- entrance: Gimbal rings spin up with increasing RPM
- ambient: Precession wobble increases as angular momentum decays
- interaction: Dragging rotates inner rings, causing counter-rotation on outer rings
