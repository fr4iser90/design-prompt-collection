Implement a playable single-file HTML game titled 'Gimbal Lock'. The core mechanic is a 3-axis gyroscope simulation rendered in 2D Canvas using rotation matrices (quaternions preferred for smoothness, but Euler angles acceptable if gimbal lock is the explicit mechanic). The player controls a laser emitter mounted on a spinning rotor.

**Visuals:** Dark void background (#0F0F1A). The gyroscope consists of three concentric rings (gimbals) representing X, Y, Z axes. The innermost rotor is the laser source. Rings are thin, metallic strokes (#00FF9D). The laser beam is a solid line (#00FF9D) with a glowing tip. The target is a moving square (#FF0055) that drifts across the screen. HUD text uses 'GridMono' (monospace, small, sparse). Title uses 'OrbitDisplay' (geometric sans, bold).

**Mechanics:** 
1. **RPM:** The rotor spins automatically. RPM starts at 100 and decays over time. Low RPM (<20) causes severe instability (wobble). High RPM (>80) stabilizes the beam. Press 'Shift' to boost RPM (consumes a 'Fuel' meter).
2. **Rotation:** Drag mouse/touch horizontally to rotate the outer gimbal (Yaw). Drag vertically to rotate the middle gimbal (Pitch). The inner gimbal (Roll) rotates automatically due to conservation of angular momentum when the outer axes are moved (precession). 
3. **Aiming:** The laser points in the direction of the rotor's spin axis. The player must counter-intuitively move gimbals to keep the beam on the target because moving one axis causes the other to drift (gyroscopic precession).
4. **Hit:** Click when the beam intersects the target. Precision is calculated by the distance of the beam center to the target center at the moment of click. 

**Fail/Win:** 
- **Fail:** If RPM drops below 10, the gyroscope collapses (game over). If the beam misses the target for more than 3 consecutive seconds, the target 'locks' and the game ends. 
- **Win:** Survive as long as possible. Score = (Targets Hit × 100) + (Average Precision × 10). 

**Constraints:** 
- Use `requestAnimationFrame`. 
- Implement 3D projection to 2D screen coordinates manually (no Three.js). 
- Handle window resize. 
- No external assets. 
- Ensure the 'precession' effect is visible: when dragging Y, the X axis must visibly drift.
- Add a 'Fuel' bar that depletes on Shift boost and regenerates slowly when not boosting. 

**Acceptance Criteria:** 
- [ ] Game starts with a spin-up animation.
- [ ] Dragging rotates gimbals visibly.
- [ ] Precession effect is observable (dragging one axis moves the other).
- [ ] Laser beam follows rotor orientation.
- [ ] Target moves randomly.
- [ ] Clicking on target registers a hit.
- [ ] RPM decays and causes wobble.
- [ ] Shift boosts RPM.
- [ ] Game over triggers on RPM < 10 or miss > 3s.
- [ ] Score displays on game over.
