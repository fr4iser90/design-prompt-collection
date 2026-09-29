## Concept
"Ferromagnetic Flux" is a tactile spatial puzzle where invisible forces become visible. Players manipulate magnetic fields on a grid to steer a steel ball through hazardous environments. The satisfaction comes from watching the dynamic field lines bend and flow as magnets are placed, predicting the ball's trajectory before launching it.

## Core loop
1. **Preparation:** Player views a static grid with Start, Goal, and Hazards. 
2. **Placement:** Player drags Blue (Attractive) and Red (Repulsive) magnets onto grid cells. Real-time field lines visualize the resulting force vector field.
3. **Simulation:** Player presses Enter. The steel ball activates, subject to gravity and calculated magnetic forces.
4. **Outcome:** If the ball reaches the Goal, the level is cleared. If it hits a Hazard or leaves the screen, the run fails.
5. **Iteration:** Player adjusts magnet placement and retries.

## Input
- **Mouse Left Click/Drag:** Place a new magnet or move an existing one. Snaps to grid center.
- **Mouse Right Click:** Remove magnet under cursor.
- **Spacebar:** If a magnet is selected/hovered, toggle its polarity (Blue <-> Red) or rotate dipole orientation.
- **Enter:** Start the physics simulation (ball becomes dynamic).
- **R:** Reset the level to initial state.

## Fail / win
- **Win Condition:** The ball's center enters the bounding box of the Green Goal Zone. 
- **Fail Condition:** 
  - The ball's Y position exceeds the canvas bottom (fall out).
  - The ball's center enters the bounding box of any Red Hazard Zone.
- **Score:** Time elapsed from Start to Win (lower is better) + Magnet Count (fewer is better).

## Entities
1. **Steel Ball (Player):** 
   - Visual: White circle, radius 10px, with a subtle drop shadow.
   - Physics: Mass = 1.0. Velocity vector $(v_x, v_y)$. Gravity $g = 0.5$ px/frame². Friction $0.99$.
   - State: Static until simulation starts.
2. **Magnets (Tools):**
   - Visual: Square icons (20x20px). Blue (`#00F0FF`) for Attraction, Red (`#FF3366`) for Repulsion. Small 'N'/'S' or '+'/'-' label.
   - Behavior: Static position on grid. Exerts force on ball.
   - Force Model: $F = C / (r^2 + \\epsilon)$. Direction: Vector from Ball to Magnet (Attraction) or Magnet to Ball (Repulsion).
3. **Hazards:**
   - Visual: Red rectangles (`#FF3366` with low opacity fill, solid border).
   - Behavior: Static collision boundaries.
4. **Goal:**
   - Visual: Green rectangle (`#00FF88` with low opacity fill, solid border).
   - Behavior: Static win boundary.
5. **Field Lines (Visualizer):**
   - Visual: Thin lines (1px) colored by local field strength/dominance.
   - Behavior: Computed every frame based on all magnets. Drawn at a lower Z-index than the ball but above the background grid.

## Feel
- **Visual Feedback:** Field lines should animate with a slight "flow" (offsetting dash arrays) to suggest energy. 
- **Audio (Optional):** Humming sound that changes pitch based on ball speed. Click sound for magnet placement.
- **Juice:** 
  - *Snap:* Magnets snap to grid with a slight elastic bounce.
  - *Launch:* Ball accelerates visibly from rest.
  - *Fail:* Screen shake (0.5s) and red flash on hazard collision.
  - *Win:* Green pulse and particle burst at goal.
- **Readability:** Contrast is key. Dark background ensures field lines and bright ball are visible. Hazards and Goal must be distinct from Magnets.

## Palette
- **Background:** `#0B0C15` (Deep Space Dark)
- **Attraction/Magnet-N:** `#00F0FF` (Cyan Electric)
- **Repulsion/Magnet-S:** `#FF3366` (Magenta Alert)
- **Ball:** `#FFFFFF` (Pure White)
- **Goal:** `#00FF88` (Neon Green)
- **Grid Lines:** `#1A1C29` (Subtle Dark Gray)
- **Field Lines:** Alpha-blended Cyan/Magenta based on dominance.

## Type
- **HUD/Score:** `SpaceMono` (Monospace, technical feel).
- **UI Labels/Instructions:** `IBM Plex Sans` (Clean, readable sans-serif).
- **Hierarchy:** Title large, HUD small, Instructions medium.

## Constraints
- **Tech:** HTML5 Canvas 2D context. No WebGL.
- **Performance:** Field line calculation must be optimized (e.g., calculate only at grid intersections, not every pixel). Target 60 FPS.
- **Scope:** Single HTML file. No external libraries (no p5.js, no Matter.js). Implement basic vector math manually.
- **Determinism:** Physics must be consistent across frames to allow precise puzzle solving.
- **Responsive:** Canvas should scale to fit window, maintaining aspect ratio or filling space.

## Acceptance criteria
- [ ] Ball moves under influence of gravity and magnets.
- [ ] Blue magnets pull ball; Red magnets push ball.
- [ ] Field lines are visible and update when magnets are moved.
- [ ] Right-click removes magnets.
- [ ] Enter key starts simulation; R key resets.
- [ ] Collision with Red Hazard triggers fail state (shake/reset).
- [ ] Collision with Green Goal triggers win state (particles/score).
- [ ] Ball falls off screen triggers fail state.
- [ ] UI displays current level, time, and magnet count.
- [ ] No external assets or libraries used.
- [ ] Code is contained in a single HTML file.

## Type pairing
SpaceMono + IBM Plex Sans


## Motion
- entrance: field lines animate from center outward, revealing the grid topology.
- ambient: field lines pulse with frequency proportional to magnet strength and proximity.
- interaction: drag magnets with elastic snap to grid points; release triggers field recalculation.
