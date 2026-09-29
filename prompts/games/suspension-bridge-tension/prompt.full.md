## Concept
Tensile Integrity is a structural engineering toy focused on the physics of failure. Players build bridge trusses using rigid-body constraints and test them against dynamic loads (wind, traffic). The goal is to create a stable structure with minimal materials. The core tension is between structural integrity and material efficiency.

## Core loop
1. **Build:** Place nodes and connect beams in Build Mode.
2. **Test:** Press Space to activate physics (gravity, wind, car load).
3. **Observe:** Watch stress colors change. Beams turn red and snap if overloaded.
4. **Iterate:** If the bridge fails, reset (R) and rebuild with a stronger or more efficient design. If it succeeds, score is calculated based on efficiency.

## Input
- **Left Click:** Place a new node. If clicking an existing node, start drag.
- **Drag:** From one node to another to create a beam (constraint).
- **Right Click:** Delete a node or beam.
- **Space:** Toggle Simulation. In Build Mode, physics are paused. In Sim Mode, physics run.
- **R:** Reset the current bridge structure (clear all nodes/beams).
- **Mouse Wheel:** Zoom in/out (optional, if space allows).

## Fail / win
- **Fail:** The car entity falls off the bottom of the screen, or the bridge deck (top row of nodes) collapses below a certain Y threshold. Simulation stops, "FAIL" displays in red.
- **Win:** The car reaches the right side of the screen. "PASS" displays. Score is calculated: (Car Weight * Distance Traveled) / (Number of Beams Used). Higher score is better.

## Entities
- **Node:** Circle (r=5). Mass=1. Anchored nodes (first/last column) are static. Others are dynamic.
- **Beam:** Line connecting two nodes. Has rest length. Color changes with stress. Breaks if stress > 1.0.
- **Car:** Rectangle (20x10). Mass=5. Moves horizontally at constant velocity across the top nodes. Applies downward force to the node it is currently over.
- **Wind:** Horizontal force applied to all dynamic nodes. Oscillates sinusoidally (sin(time)). Visualized as moving lines.

## Feel
- **Juice:** When a beam breaks, play a small particle effect (sparks) and a snap sound (optional, or visual flash). 
- **Stress Color:** Smooth interpolation between Teal (#4ECDC4) and Red (#FF6B6B) based on stress ratio.
- **Wind:** Subtle background motion. Vector lines flow left-to-right.
- **UI:** Minimalist. Dark theme. High contrast.

## Palette
- **Background:** #1A1A1A (Dark Gray)
- **Primary Accent (Low Stress):** #4ECDC4 (Teal)
- **Danger Accent (High Stress):** #FF6B6B (Red)
- **Text/Nodes:** #FFFFFF (White)
- **Grid:** #333333 (Dark Gray)

## Type
- **Headers:** Oswald (Bold, Uppercase)
- **Data/Numbers:** IBM Plex Mono (Regular)
- **Never use:** Inter, Roboto, Arial, system-ui.

## Constraints
- **Single HTML File:** All CSS, JS, HTML in one file.
- **No External Libraries:** Implement the physics solver manually (Verlet integration or similar).
- **Canvas 2D:** Use HTML5 Canvas for rendering.
- **Performance:** Must run at 60fps with up to 100 nodes.
- **Responsive:** Canvas should resize to window, but maintain aspect ratio or scale.

## Acceptance criteria
- [ ] Can place nodes and connect beams in Build Mode.
- [ ] Can delete nodes/beams with Right Click.
- [ ] Space toggles physics simulation.
- [ ] Gravity applies to nodes.
- [ ] Wind force applies horizontally.
- [ ] Car moves across the bridge and applies load.
- [ ] Beams change color based on stress (Teal -> Red).
- [ ] Beams break if stress > 1.0.
- [ ] Bridge collapse triggers Fail state.
- [ ] Car crossing triggers Win state and Score calculation.
- [ ] R resets the bridge.
- [ ] Fonts are Oswald and IBM Plex Mono (or similar expressive faces, no system defaults).
- [ ] Colors match the palette exactly.
- [ ] Code is self-contained in one HTML file.

## Type pairing
Oswald + IBM Plex Mono


## Motion
- entrance: Truss nodes pulse in sync with load bearing
- ambient: Wind shear visualized as translucent vector lines flowing over structures
- interaction: Cable tension turns from teal to red as stress exceeds yield point
