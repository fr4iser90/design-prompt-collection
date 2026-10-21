Build a single-file HTML/CSS/JS game: Vault Clearance. Deliverable: single-file HTML/CSS/JS.

Concept: A precision timing game simulating pole vault physics. The player controls an athlete running towards a crossbar. The core mechanic is converting horizontal momentum into vertical lift via a flexible pole. The challenge is the 'elastic window': releasing too early yields low height; releasing too late causes the pole to snap or the athlete to fall short. Mid-air rotation is required to clear the bar without knocking it down.

Core Loop: 
1. Start: Athlete runs automatically from left to right.
2. Plant: Player holds Mouse Down to plant the pole. The pole begins to bend (load). A visual 'tension meter' fills. 
3. Release: Player releases Mouse Up. The stored elastic energy converts to vertical velocity. The release angle is determined by the bend amount and timing.
4. Rotate: While airborne, player uses Left/Right Arrow keys to rotate the athlete's body. The goal is to get the hips over the bar before the legs.
5. Result: If the body clears the bar without touching it, score increases. If the bar falls or the athlete hits the ground before clearing, the run ends.

Input Map:
- Mouse Down: Plant pole and begin bending.
- Mouse Up: Release pole and launch.
- Arrow Left/Right: Rotate athlete mid-air (counter-clockwise/clockwise).
- Spacebar: Restart after fail.

Fail Conditions:
- Bar Knockdown: Any part of the athlete or pole touches the crossbar, causing it to fall.
- Pole Snap: Holding the plant too long (over-bending) causes the pole to break (visual fracture) and the athlete to fall.
- Short Fall: Athlete lands on the mat but did not clear the bar height.

Win/Score:
- Score = Bar Height cleared. 
- Consecutive successful clears increase the bar height by 0.5m increments.
- Game Over screen shows total height cleared and best attempt.

Entities:
- Athlete: Represented as a simplified rigid body (circle for head, lines for limbs) with a rotation pivot at the hips.
- Pole: A flexible line drawn using quadratic Bezier curves. The control point moves based on bend amount. Color shifts from #E0E0E0 to #FFD700 as tension increases.
- Crossbar: A horizontal line at a fixed Y-position. Has a small radius for collision detection.
- Landing Mat: A rectangular area below the bar. Athlete must land here.
- Track: Static ground line.

Feel & Juice:
- Visuals: Minimalist, high-contrast. Background #2F4F4F. Athlete/Pole #E0E0E0. Bar #FFD700. 
- Motion: Smooth easing on the run. The pole bend should feel 'heavy' and elastic, not instant. Use a spring simulation for the pole's return to straight.
- Feedback: Screen shake on bar knockdown. Particle burst on successful clear. 
- Audio: Simple synthesized sounds. A rising pitch tone while holding (tension), a 'whoosh' on release, a 'thud' on landing, a 'crack' on snap.

Technical Constraints:
- Use HTML5 Canvas 2D API.
- No external libraries (no Phaser, no Matter.js). Implement simple physics manually.
- Physics: Gravity constant. Velocity integration. Collision detection: Circle-Rectangle for athlete vs bar, Line-Rectangle for pole vs bar.
- State Machine: States: RUNNING, PLANTING, AIRBORNE, LANDED, GAME_OVER.
- Responsive: Canvas scales to fit window, maintaining aspect ratio.
- Performance: 60fps target. Use requestAnimationFrame.

Implementation Details:
- The pole bend is calculated based on the duration of the Mouse Down hold. 
- Release velocity vector is calculated based on the pole's angle at release and the stored energy.
- Rotation is applied to the athlete's drawing context transform.
- Collision detection must be precise. The bar is thin. Use a small bounding box for the bar.
- The 'Snap' mechanic: If hold time > max_threshold, trigger snap state. Pole breaks into two pieces. Athlete loses vertical velocity.
