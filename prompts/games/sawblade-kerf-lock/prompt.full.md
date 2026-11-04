## Concept
'Sawblade Kerf Lock' is a high-stakes rhythm game simulating the precision of industrial woodworking. The player controls a table saw blade, attempting to cut through a series of wooden boards. Success depends on syncing input with the rotational timing of the blade teeth against a fixed guide mark. The difficulty escalates not by speeding up the board, but by increasing blade wobble and reducing RPM efficiency on mistakes, creating a natural, physical difficulty curve. The aesthetic is gritty, mechanical, and focused.

## Core loop
1. **Observe**: Watch the sawblade rotate and the board scroll. Identify the next tooth approaching the guide mark. Note the wobble pattern.
2. **Action**: Press SPACE when a tooth aligns perfectly with the guide mark. Anticipate the wobble offset.
3. **Outcome**: 
   - **Hit**: The tooth cuts the board. Board advances. Score +1. RPM stabilizes or slightly increases. Wood chips fly. Satisfying audio feedback.
   - **Miss**: The blade hits the wood without proper alignment. RPM drops. Wobble increases. Screen shakes. Negative audio feedback.
4. **Reset/Continue**: If not failed, wait for the next board/tooth cycle. The board resets position after a cut.
5. **End**: Fail if RPM < 60 or 5 consecutive misses. Win after 10 boards.

## Input
- **SPACE**: Attempt cut. 
- **Touch**: Tap anywhere on canvas to simulate SPACE on mobile devices.
- No other inputs. Mouse clicks do nothing on desktop.

## Fail / win
- **Fail Condition**: 
  - `rpm < 60`: The blade stalls. Display "BLADE STALL" in red Bebas Neue. Show restart prompt.
  - `consecutiveMisses >= 5`: The operator is fired. Display "TOOL DAMAGE" in red. Show restart prompt.
- **Win Condition**: 
  - `boardsCut >= 10`: Display "JOB COMPLETE" in orange. Show final score, efficiency bonus, and time taken. Show restart prompt.

## Entities
1. **Sawblade**: 
   - Canvas-drawn circle with triangular teeth. Gradient fill for metallic look.
   - Rotates clockwise. Rotation speed = `rpm / 60 * 2PI / 60` radians per frame (approx).
   - `wobbleAmplitude`: Adds noise to `x, y, rotation`. Wobble frequency increases with RPM.
2. **Board**: 
   - Rectangular shape (#f0f0f0) with wood grain texture (procedural lines). 
   - Scrolls left at constant speed. 
   - Has a "cut zone" width. Board resets to right edge after successful cut.
3. **Guide Mark**: 
   - Fixed vertical line at the blade's rightmost point. 
   - Indicates where teeth should align. Glows on hit.
4. **Particles**: 
   - Wood chips (#d4a373) spawned on hit, moving radially outward with gravity. Fade out over 1s.
   - Sparks (#ff6b35) on perfect hits. Shorter lifespan.

## Feel
- **Audio**: 
  - Loop: Low hum varying with RPM. Pitch shifts up as RPM increases.
  - Hit: Sharp, percussive "thunk". Layered with wood splitting sound.
  - Miss: Grinding metal-on-wood sound. Distorted noise.
- **Visual Juice**: 
  - **Screen Shake**: On miss, translate canvas context by random vector scaled by `missSeverity`. Decay over 0.5s.
  - **Flash**: Orange overlay on hit, red on miss. Alpha fades quickly.
  - **Wobble**: As RPM drops or misses accumulate, the blade visually vibrates more violently. Add motion blur effect if possible.
  - **Chips**: Particle system for satisfying feedback. Max 50 particles.

## Palette
- **Background**: `#1a1a1a` (Deep Charcoal)
- **Board/Blade Body**: `#f0f0f0` (Off-White/Light Gray)
- **Accent/Hit**: `#ff6b35` (Industrial Orange)
- **Fail/Warning**: `#e63946` (Safety Red)
- **Text**: `#f0f0f0` on dark, `#1a1a1a` on light overlays.
- **Good Hit**: `#ffd166` (Yellow)

## Type
- **Headings/HUD Labels**: Bebas Neue (Bold, Uppercase). Large, impactful. Letter-spacing 2px.
- **Stats/Numbers**: JetBrains Mono (Regular). Monospaced for alignment of RPM, Score, Misses.
- **Hierarchy**: 
  - Title: "SAWBLADE KERF LOCK" (Bebas, 48px)
  - HUD: "RPM: 120" (JetBrains, 18px)
  - Overlay: "JOB COMPLETE" (Bebas, 64px)

## Constraints
- **Tech**: HTML5 Canvas 2D, vanilla JS.
- **Performance**: 60 FPS. Limit particles to 50 max. Optimize draw calls.
- **Responsiveness**: Canvas scales to fit window, maintaining aspect ratio. Handle window resize events.
- **Code Structure**: 
  - `Game` object managing state.
  - `update()` loop handling physics and input.
  - `draw()` loop handling rendering.
  - Simple state machine: `START`, `PLAYING`, `GAME_OVER`, `WIN`.
  - Use classes for entities.

## Acceptance criteria
- [ ] Game renders in a single HTML file.
- [ ] Blade rotates smoothly based on RPM variable.
- [ ] Pressing SPACE triggers hit detection logic.
- [ ] Hit detection is visually accurate (tooth aligns with guide).
- [ ] Successful cut advances board and increments score.
- [ ] Miss causes screen shake, red flash, and RPM drop.
- [ ] Wobble increases visibly on consecutive misses.
- [ ] Game ends when RPM < 60 or 5 misses.
- [ ] Game ends when 10 boards are cut.
- [ ] HUD displays RPM, Misses, Boards Cut using specified fonts.
- [ ] Colors match palette exactly.
- [ ] Mobile touch input works.
- [ ] No console errors.

Deliverable: single-file HTML/CSS/JS.

## Type pairing
Bebas Neue + JetBrains Mono


## Motion
- entrance: sawblade spins up from zero RPM with metallic whine
- ambient: wood chips scatter radially on each successful cut
- interaction: screen shake proportional to miss severity; blade wobble increases on failure
