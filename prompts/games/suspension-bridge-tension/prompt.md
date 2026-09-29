Build a playable physics toy called Tensile Integrity. The player constructs a bridge truss on a Canvas 2D viewport. 

**Core Mechanics:**
1. **Construction Mode:** Click empty space to place a node (anchor point). Drag from one node to another to create a beam. Beams are rigid constraints. Nodes are small circles. 
2. **Simulation Mode:** Press Space to activate physics. Gravity applies. Wind force applies horizontally (oscillating). A car entity (rectangle) drives across the top deck nodes. 
3. **Stress Visualization:** Each beam has a stress value (0.0 to 1.0+). Color beams based on stress: Teal (#4ECDC4) for low stress, Yellow for medium, Red (#FF6B6B) for critical. If stress > 1.0, the beam breaks (removes constraint, nodes fall).
4. **Fail/Win:** If the car falls off the screen or the bridge deck collapses (nodes fall below a threshold Y), the run fails. If the car crosses safely, score is calculated: (Car Weight * Distance) / (Number of Beams). 

**Input Map:**
- Left Click: Place node / Select beam.
- Drag from node: Create beam.
- Right Click: Delete node/beam.
- Space: Toggle Simulation (Play/Pause).
- R: Reset current bridge.

**Visuals:**
- Background: Dark #1A1A1A.
- Grid: Subtle faint grid lines for alignment.
- Nodes: White circles with black outlines.
- Beams: Lines colored by stress.
- Wind: Translucent white vector lines moving left-to-right.
- Car: Simple black rectangle with wheels.

**HUD:**
- Top Left: Mode Indicator (BUILD/SIM).
- Top Right: Score, Beam Count, Max Stress.
- Font: Oswald for headers, IBM Plex Mono for numbers.

**Physics Engine:**
Implement a simple Verlet integration or Box2D-lite style constraint solver. 
- Nodes have position, old position, mass.
- Beams have rest length, stiffness.
- Solve constraints iteratively (e.g., 10 iterations per frame).
- Apply gravity (0.5 px/frame^2).
- Apply wind force to nodes exposed to wind.

**Constraints:**
- Single HTML file.
- No external libraries (no Box2D, no Matter.js). Write the solver.
- Must be playable in one sitting.
- Clear visual feedback for stress.
- Fail state must be immediate and obvious.
