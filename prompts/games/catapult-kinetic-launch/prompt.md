Deliverable: single-file HTML/CSS/JS.

Build 'Cathedral Catapult Siege', a playable physics toy in one HTML file using Canvas 2D. The core mechanic is a manual trebuchet/catapult sling. The player controls a stone projectile attached to two ropes anchored to a fixed frame. 

Core Loop: Drag the stone backwards to load the sling. The further you drag, the higher the tension (visualized by rope color shifting from beige to red). Release to launch. If tension exceeds the rope's limit, the rope snaps (fail state for that shot). If the stone hits the castle gate or walls, score points. If it lands in the moat or misses, it's a miss. 

Input: Mouse/Touch drag on the stone entity. Release to fire. Click anywhere else to reset the stone to the sling if it has come to rest or been lost. 

Fail/Win: Fail condition: 3 rope snaps OR 5 missed shots (stone lands in moat). Win condition: Reach 1000 points. Score: 100 per gate hit, +50 per wall segment destroyed. 

Entities: 1 Player Stone (circle, radius 10px), 1 Castle Gate (rectangle target), 5 Castle Wall Segments (destructible rectangles), 2 Ropes (lines with tension physics), 1 Anchor Frame (static geometry). 

Feel: High tactile feedback. Screen shake on impact. Particle effects for dust on miss, brick shards on hit, and rope fibers on snap. Sound cues (optional but recommended via Web Audio API oscillator beeps for snap/hit). 

Visuals: Medieval aesthetic. Background: Dark slate blue (#2F4F4F) sky, beige (#F5F5DC) ground. Stone: Dark grey. Ropes: Brown (#8B4513) turning red at high tension. Castle: Grey stone texture. 

Type: Cinzel for title/HUD, Crimson Pro for instructions. 

Constraints: No external assets. All graphics drawn via Canvas API. Physics must be simple Verlet or Euler integration for projectile motion (gravity, velocity). Rope tension is a scalar value based on distance from anchor. Ensure the game is playable end-to-end in one viewport.
