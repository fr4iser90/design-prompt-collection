Build a single-file HTML5 Canvas game titled "Ferromagnetic Flux". The core mechanic is a spatial puzzle where the player places magnets on a 2D grid to guide a steel ball from a start zone to a goal zone using magnetic attraction and repulsion.

**Visual Style:** Dark, technical aesthetic. Background is `#0B0C15`. The steel ball is a bright white sphere with a subtle glow. Magnets are distinct icons: Blue (`#00F0FF`) for Attraction, Red (`#FF3366`) for Repulsion. Field lines are thin, semi-transparent vectors that flow dynamically from magnet to magnet or to infinity, creating a visible "current" of force. Use `SpaceMono` for HUD text and `IBM Plex Sans` for UI labels.

**Core Loop:** 
1. **State:** The ball starts stationary at a start node. The player places magnets on empty grid cells.
2. **Action:** When the player clicks "Start", the ball becomes physical. It experiences gravity (downward) and magnetic forces from all placed magnets.
3. **Risk:** Repulsive magnets can push the ball into hazards or off-screen. Attractive magnets can trap the ball in stable orbits if not angled correctly.
4. **Reward:** The ball touches the green goal zone. 
5. **Reset:** Level resets on fail or completion.

**Input Map:**
- **Click/Drag:** Place a magnet on a grid cell. Drag existing magnets to reposition.
- **Right-Click:** Remove magnet.
- **Spacebar:** Rotate the currently selected magnet (if polarity can be rotated/angled, or toggle N/S pole if using dipole bars). For simplicity, assume point magnets where color defines polarity, but allow rotation of "dipole bar" magnets if implemented as rectangles.
- **Enter:** Start simulation.
- **R:** Reset level.

**Physics & Entities:**
- **Ball:** Mass 1. Radius 10px. Velocity vector updated every frame. Friction low (0.98).
- **Magnets:** Grid-based. Force calculation: $F = k / r^2$ (clamped to max force). Attraction pulls towards magnet center; Repulsion pushes away.
- **Hazards:** Static red rectangles. Collision ends run.
- **Goal:** Static green rectangle. Collision wins run.
- **Field Lines:** Rendered every frame. Calculate vector sum of magnetic fields at a grid of sample points. Draw short line segments in the direction of the vector. Color-code by dominant polarity nearby.

**Fail/Win:**
- **Fail:** Ball position y > canvas height (fall off) or ball intersects hazard rect.
- **Win:** Ball intersects goal rect.

**Juice:**
- **Field Pulse:** Field line opacity oscillates slightly.
- **Impact:** Screen shake on collision with hazard.
- **Success:** Particle explosion at goal.

**Constraints:**
- Single HTML file.
- No external assets.
- 60 FPS target.
- Physics must feel "floaty" but deterministic.
- Ensure field lines do not clutter the screen too much; use alpha blending.
