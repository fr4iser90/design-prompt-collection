## Concept
Marble Run Architect is a top-down physics puzzle toy where the player acts as an engineer drawing paths for glass marbles. The fantasy is precision engineering meets playful chaos. The player draws smooth tracks to guide marbles from a top spawner to collection cups at the bottom, navigating around static hazards and moving blockers. The focus is on the tactile satisfaction of drawing lines and watching the emergent physics of rolling objects.

## Core loop
1. **Draw:** User clicks and drags to create a track segment. 
2. **Release:** User presses Space to drop marbles from the top. 
3. **Navigate:** Marbles roll down, following the drawn tracks and bouncing off obstacles. 
4. **Collect:** Marbles land in cups. 
5. **Reset:** If all marbles are collected, the level ends. If a marble is lost, the run fails or requires a retry.

## Input
- **Mouse Down:** Start a new track segment. 
- **Mouse Move:** Extend the current track segment. The track should smooth out sharp angles (e.g., using quadratic curves or simple point averaging). 
- **Mouse Up:** Finalize the current track segment. 
- **Right-Click:** Remove the most recently drawn track segment. 
- **Space:** Trigger the marble spawner. 
- **R:** Reset the current level (clear tracks, reset marbles).

## Fail / win
- **Fail:** Any marble falls off the bottom edge of the canvas without entering a cup, or touches a red 'shatter' hazard. The run ends immediately. 
- **Win:** All marbles released in the current batch are successfully collected in the cups before the timer runs out. 
- **Score:** Based on the number of marbles collected and the time remaining.

## Entities
1. **Marbles:** 
   - Visual: Small circles with a radial gradient to simulate glass. 
   - Physics: Affected by gravity. Collide with tracks and hazards. 
   - Behavior: Spawn at top center. 
2. **Tracks:** 
   - Visual: Thick white lines (#ECF0F1) with rounded ends. 
   - Physics: Static colliders. Marbles bounce off them with some energy loss. 
3. **Hazards:** 
   - **Shatter Zones:** Static red rectangles (#E74C3C). Instant fail for the marble. 
   - **Blockers:** Moving blue rectangles (#3498DB) that oscillate horizontally. Marbles bounce off them. 
4. **Cups:** 
   - Visual: Yellow U-shapes (#F1C40F) at the bottom. 
   - Behavior: Sway gently when idle. Detect marble entry.

## Feel
- **Physics:** Simple but satisfying. Use circle-line collision detection. Marbles should feel heavy but bouncy. 
- **Visual Feedback:** 
   - When a marble hits a track, it should slightly compress (scale down) and then bounce. 
   - When a marble enters a cup, the cup should pulse or glow. 
   - When a marble shatters, a particle effect (red shards) should appear. 
- **Audio:** Optional subtle clinking sounds for collisions and a success chime for collection.

## Palette
- Background: #2C3E50 (Dark Slate) 
- Tracks: #ECF0F1 (White) 
- Hazards: #E74C3C (Red) 
- Marbles: #3498DB (Blue) 
- Cups: #F1C40F (Yellow)

## Type
- Title: Bungee (Bold, playful) 
- HUD: Nunito Sans (Clean, readable)

## Constraints
- Single HTML file. 
- No external libraries (pure JS/Canvas). 
- Responsive canvas size. 
- Performance: Maintain 60fps with up to 50 marbles and 20 track segments.

## Acceptance criteria
- [ ] User can draw tracks by clicking and dragging. 
- [ ] Tracks are rendered as smooth white lines. 
- [ ] Pressing Space releases marbles. 
- [ ] Marbles obey gravity and collide with tracks. 
- [ ] Marbles fail if they fall off-screen or hit red hazards. 
- [ ] Marbles win if they enter yellow cups. 
- [ ] Right-click erases the last track. 
- [ ] HUD displays score and timer. 
- [ ] Visual style matches the specified palette and fonts.

## Type pairing
Bungee + Nunito Sans


## Motion
- entrance: Marbles drop in from top with gravity acceleration
- ambient: Collection cups gently sway like wind chimes when idle
- interaction: Mouse drag draws a thick, smooth white track line that marbles roll along
