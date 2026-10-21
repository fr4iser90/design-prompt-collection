## Concept
Vault Clearance is a single-screen, physics-based precision game. It simulates the counter-intuitive mechanics of pole vaulting, specifically the conversion of horizontal kinetic energy into vertical potential energy via an elastic pole. The player must master the timing of the plant and release to maximize height, while managing mid-air rotation to clear a crossbar. The aesthetic is minimalist and athletic, focusing on clean lines and clear feedback.

## Core loop
1. **Run**: The athlete automatically sprints from left to right along a track.
2. **Plant**: The player presses and holds the mouse button to plant the pole. The pole begins to bend, storing elastic energy. A visual indicator (color shift or meter) shows the tension level.
3. **Release**: The player releases the mouse button. The stored energy converts to vertical velocity, launching the athlete upwards and forwards. The trajectory depends on the bend amount and release timing.
4. **Rotate**: While airborne, the player uses arrow keys to rotate the athlete's body. The goal is to position the body so that the hips clear the bar before the legs.
5. **Clear/Fail**: If the athlete clears the bar without touching it, the score increases, and the bar height rises for the next attempt. If the bar is knocked down or the athlete fails to clear, the run ends.

## Input
- **Mouse Down**: Plant pole and begin bending. The longer held, the more the pole bends (up to a snap threshold).
- **Mouse Up**: Release pole and launch. The release point determines the initial launch vector.
- **Arrow Left**: Rotate athlete counter-clockwise mid-air.
- **Arrow Right**: Rotate athlete clockwise mid-air.
- **Spacebar**: Restart game after a fail state.

## Fail / win
- **Fail**: 
  - **Bar Knockdown**: The athlete or pole collides with the crossbar, causing it to fall. 
  - **Pole Snap**: Holding the plant too long exceeds the pole's elastic limit, causing it to break. The athlete falls short.
  - **Short Fall**: The athlete lands on the mat but did not clear the bar height.
- **Win/Score**: 
  - Score is based on the height of the bar cleared. 
  - Each successful clear increases the bar height by 0.5 meters.
  - The game continues until a fail occurs. The final score is the highest bar height cleared.

## Entities
- **Athlete**: A simplified rigid body. Head (circle), Torso (line), Limbs (lines). Has a rotation pivot at the hips. Color: #E0E0E0.
- **Pole**: A flexible line drawn using quadratic Bezier curves. The control point of the curve moves based on the bend amount. Color transitions from #E0E0E0 to #FFD700 as tension increases. If snapped, it breaks into two segments.
- **Crossbar**: A horizontal line at a fixed Y-position. Has a small radius for collision detection. Color: #FFD700.
- **Landing Mat**: A rectangular area below the bar. Color: #2F4F4F (slightly lighter than background).
- **Track**: A static ground line. Color: #E0E0E0.

## Feel
- **Visuals**: Minimalist, high-contrast. Background #2F4F4F. Elements are clean and geometric. 
- **Motion**: Smooth easing on the run. The pole bend should feel 'heavy' and elastic, using a spring simulation for the return to straight. The athlete's rotation should be fluid.
- **Feedback**: Screen shake on bar knockdown. Particle burst on successful clear. Visual crack effect on pole snap.
- **Audio**: Simple synthesized sounds. A rising pitch tone while holding (tension), a 'whoosh' on release, a 'thud' on landing, a 'crack' on snap. 

## Palette
- **Background**: #2F4F4F (Dark Slate Gray) - Provides high contrast for the athlete and bar.
- **Accent**: #FFD700 (Gold) - Used for the crossbar and high-tension pole states. Signals importance and danger.
- **Neutral**: #E0E0E0 (Light Gray) - Used for the athlete, pole (low tension), and track. Clean and readable.

## Type
- **Display**: Oswald - Bold, condensed, athletic. Used for the title, score, and height indicators.
- **Body**: Lato - Clean, readable sans-serif. Used for instructions and UI text.

## Constraints
- **Tech**: HTML5 Canvas 2D API. No external libraries (no Phaser, no Matter.js). Implement simple physics manually.
- **Physics**: Gravity constant. Velocity integration. Collision detection: Circle-Rectangle for athlete vs bar, Line-Rectangle for pole vs bar.
- **State Machine**: States: RUNNING, PLANTING, AIRBORNE, LANDED, GAME_OVER.
- **Responsive**: Canvas scales to fit window, maintaining aspect ratio.
- **Performance**: 60fps target. Use requestAnimationFrame.
- **Complexity**: Keep the physics simple but accurate enough to feel 'real'. The pole bend should be visually distinct and impactful.

## Acceptance criteria
- [ ] Game runs in a single HTML file without external dependencies.
- [ ] Athlete runs automatically from left to right.
- [ ] Holding mouse plants pole and bends it visually.
- [ ] Releasing mouse launches athlete with velocity based on bend.
- [ ] Arrow keys rotate athlete mid-air.
- [ ] Collision detection works: hitting bar causes fail.
- [ ] Over-holding causes pole to snap (visual break).
- [ ] Score increases on successful clear.
- [ ] Bar height increases after each clear.
- [ ] Game Over screen shows final score.
- [ ] Spacebar restarts the game.
- [ ] Visuals match the specified palette (#2F4F4F, #FFD700, #E0E0E0).
- [ ] Text uses Oswald and Lato fonts.

## Type pairing
Oswald + Lato


## Motion
- entrance: Athlete sprints along track, pole vibrates slightly with each stride
- ambient: Pole bends progressively as vertical height increases (dynamic bezier curve)
- interaction: Release sends athlete in a parabolic arc; bar vibrates if grazed
