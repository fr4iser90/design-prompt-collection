## Concept
'Cathedral Catapult Siege' is a physics-based toybox game where the player operates a medieval catapult. The focus is on the tactile sensation of tension and release. It is not a tower defense; it is a manual engineering challenge. The player must judge the power and angle of each shot to destroy castle structures without breaking the equipment.

## Core loop
1. **Load**: Drag the stone projectile backwards from the sling anchor point. This increases the 'Tension' variable.
2. **Risk**: If Tension > MaxTension, the rope snaps upon release (or immediately if dragged too far), resulting in a 'Snap' fail.
3. **Launch**: Release the mouse/touch. The stone is launched with velocity proportional to Tension and direction opposite to the drag vector.
4. **Impact**: The stone follows a parabolic trajectory (gravity applied). 
5. **Result**: 
   - Hit Gate/Wall: Score points, destroy segment, screen shake, particles.
   - Miss/Moat: Count as miss, dust cloud.
   - Snap: Count as snap, rope break visual.
6. **Reset**: Stone returns to sling or new stone is loaded. Game ends if fail conditions met or win score reached.

## Input
- **Pointer Down/Drag**: Grab the stone. Move pointer to set angle and power (distance from anchor).
- **Pointer Up**: Release stone. Calculate velocity vector based on displacement.
- **Click (non-stone)**: Reset stone position to sling if it is stationary or off-screen.
- **Keyboard**: 'R' to reset game state.

## Fail / win
- **Fail**: 
  - 3 Rope Snaps: The mechanism breaks completely. Game Over.
  - 5 Misses: Stone lands in the moat (y > groundLevel) or off-screen. Game Over.
- **Win**: 
  - Score >= 1000 points. 
  - Score breakdown: Gate Hit = 100 pts. Wall Segment Destroyed = 50 pts. 
  - Win Screen: 'Siege Successful' with final score.

## Entities
- **Player Stone**: Circle, radius 10px. Color: #555555. Physics: position, velocity, gravity.
- **Sling Ropes**: Two lines connecting stone to anchor points. Color: #8B4513. Visual cue: Color lerps to #FF0000 as tension approaches limit.
- **Anchor Frame**: Static triangular structure on the left. Color: #8B4513.
- **Castle Gate**: Central target rectangle. Color: #666666. Health: 1 hit.
- **Castle Walls**: 5 rectangular segments surrounding the gate. Color: #777777. Health: 1 hit each.
- **Moat**: Area below ground level. Color: #2F4F4F (darker). 
- **Ground**: Static line. Color: #F5F5DC.

## Feel
- **Tension**: Visual feedback is critical. Ropes must stretch and change color. 
- **Impact**: 
  - Hit: Screen shake (amplitude 5px, duration 200ms). Brick particles (small squares) explode from impact point. 
  - Snap: Sharp visual break in rope line. Dust puff at anchor.
  - Miss: Dust cloud at landing point.
- **Audio**: Use Web Audio API for simple synthesized sounds. 
  - Snap: High-pitched noise burst.
  - Hit: Low-frequency thud.
  - Launch: Whoosh sound (filtered noise).

## Palette
- **Sky/Background**: #2F4F4F (Dark Slate Gray)
- **Ground/Stone Base**: #F5F5DC (Beige)
- **Wood/Ropes**: #8B4513 (Saddle Brown)
- **Danger/Tension**: #FF4500 (Orange Red) for high tension warning.
- **Text**: #F5F5DC

## Type
- **Display**: Cinzel (Google Fonts) for Title and Score. Bold, medieval serif.
- **Body**: Crimson Pro (Google Fonts) for Instructions and HUD details. Elegant, readable serif.
- **Fallback**: Serif.

## Constraints
- **Single File**: All HTML, CSS, JS in one file. No external images.
- **Canvas 2D**: Use `<canvas>` for rendering. No WebGL.
- **Physics**: Simple Euler integration. `vy += gravity; y += vy; x += vx;`. 
- **Performance**: 60fps target. Limit particles to 100 max.
- **Responsive**: Canvas should resize to fit window, maintaining aspect ratio or scaling logically.
- **No Libraries**: Vanilla JS only.

## Acceptance criteria
- [ ] Game loads and displays a catapult, stone, and castle.
- [ ] Dragging the stone changes the rope angle and visual tension.
- [ ] Releasing the stone launches it in a parabolic arc.
- [ ] Hitting the gate/walls destroys them and adds score.
- [ ] Over-dragging causes a 'Snap' event (rope breaks, no launch or weak launch).
- [ ] Missing the castle (landing in moat) counts as a miss.
- [ ] Game Over triggers after 3 snaps or 5 misses.
- [ ] Win triggers at 1000 points.
- [ ] Screen shake occurs on impact.
- [ ] Particles are generated on hit/snap/miss.
- [ ] Text uses Cinzel/Crimson Pro.
- [ ] Colors match the specified palette.
- [ ] No console errors.

## Type pairing
Cinzel + Crimson Pro


## Motion
- entrance: Stone block slides onto sling with gravity drop and dust puff
- ambient: Sling ropes sway gently in wind; distant castle banners flutter
- interaction: Drag to pull sling back; release triggers elastic snap and stone arc
