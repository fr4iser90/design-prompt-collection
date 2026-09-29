## Concept
Turbine Blade Cutoff is a high-precision rhythm-timing game set in an aviation maintenance context. The player operates a laser cutter on a spinning jet engine turbine. The core fantasy is the tension of high-speed mechanical precision: you must fire the laser exactly when a rotating blade passes a static alignment guide. Miss the timing, and the engine becomes unbalanced, leading to catastrophic failure. The visual style is industrial, clean, and high-contrast, emphasizing the rotational geometry.

## Core loop
1. **Observe:** The turbine spins at a constant, increasing RPM. Blades pass a fixed red guide mark on the right.
2. **Time:** Press `Spacebar` when a blade aligns with the guide.
3. **Execute:** The laser fires. If aligned, the blade is trimmed (shortens) and speed increases. If misaligned or empty space, the turbine crashes.
4. **Progress:** Repeat until 10 blades are trimmed or the turbine crashes.

## Input
- **Spacebar:** Activates the laser cutter. 
- **Click/Touch:** Optional fallback for mobile (tap anywhere to fire).
- **R:** Restart game (after Game Over/Win).

## Fail / win
- **Fail:** The laser fires when no blade is within the alignment tolerance zone (center of the red guide line). Alternatively, if a blade is hit but the deviation is too high (cutting the base or missing the tip entirely due to lag), the rotor is considered "Unbalanced." Visual feedback: Screen shake, rotor wobbles off-center, turns red. Game Over state.
- **Win:** Successfully trim 10 blades. Visual feedback: "MAINTENANCE COMPLETE" text, confetti/sparks, static turbine slows to stop.

## Entities
1. **Turbine Rotor:** Center of canvas. Contains 12 blades. Rotates clockwise. Speed increases with each successful cut.
2. **Blades:** White rectangles extending from the center. They shorten upon successful cutting. They have a specific "tip" zone that must align with the guide.
3. **Guide Mark:** Static vertical red line (#FF0000) on the right side of the rotor's rotation path. It does not move.
4. **Laser Cutter:** Horizontal orange (#FFA500) beam that flashes briefly across the guide mark when input is detected.
5. **Particles:** Sparks emitted at the cut point on success.

## Feel
- **Visual Juice:** 
  - *Success:* Bright orange flash at the guide, white sparks fly outward, blade shortens smoothly.
  - *Fail:* Screen shake (offset canvas context), red tint overlay, rotor center oscillates wildly before stopping.
  - *Ambient:* Motion blur trails on blades increase as RPM increases. Subtle vibration of the entire canvas container at high RPM.
- **Audio (Optional):** Low hum for rotation, sharp "zap" for laser, "clunk" for miss.

## Palette
- **Background:** #0A0A0A (Deep Black)
- **Rotor/Blades:** #FFFFFF (White)
- **Guide/Laser:** #FF0000 (Red) for guide, #FFA500 (Orange) for laser/sparks
- **HUD Text:** #FFFFFF

## Type
- **Headers:** Oswald (Bold, Industrial sans-serif)
- **Body/HUD:** Lato (Light, Clean)

## Constraints
- **Single File:** HTML, CSS, JS in one file.
- **Canvas 2D:** Use `ctx.arc`, `ctx.rotate`, `ctx.translate` for rendering.
- **Performance:** 60 FPS target. Efficient particle system (pooling or simple array cleanup).
- **Tolerance:** Define a clear pixel tolerance for "alignment" (e.g., blade tip center within 10px of guide line center). This is the core skill check.
- **No Libraries:** Vanilla JS only.

## Layout & Responsiveness
- **Desktop:** The game canvas should be centered within the viewport, maintaining a 16:9 aspect ratio or fitting the window height. The HUD elements (score, status) should be absolutely positioned over the canvas top-center. The laser beam originates from the right edge and extends leftward to the guide line.
- **Mobile:** The canvas scales to fit the device width. Touch events are mapped to the laser fire action. Ensure the HUD text scales appropriately using `vmin` or `rem` units to remain readable on smaller screens. The guide line position should be calculated relative to the canvas width to ensure consistent gameplay regardless of screen size.

## Motions & Animations
- **Blade Trimming:** When a blade is successfully cut, its length should not snap instantly. Instead, use a linear interpolation (lerp) function to reduce the blade's length over approximately 200 milliseconds. This provides a satisfying visual confirmation of the cut.
- **Laser Beam:** The laser beam should appear instantly upon input and fade out over 100 milliseconds. Use a gradient or alpha channel reduction to simulate the beam dissipating.
- **Spark Particles:** Upon a successful cut, spawn 10-15 particle objects at the intersection of the blade tip and the guide line. These particles should have random initial velocities (outward from the center), slight gravity (downward acceleration), and friction (velocity decay). They should be rendered as small circles with colors ranging from white to orange.
- **Unbalance Effect:** Upon failure, the rotor's center coordinates (x, y) should be offset by a sinusoidal function. The amplitude of this oscillation should increase rapidly over 1 second, simulating violent mechanical failure, before the game state transitions to GAMEOVER.

## Acceptance criteria
- [ ] Turbine spins visibly with motion blur.
- [ ] Red guide mark is static and clearly visible.
- [ ] Spacebar fires laser.
- [ ] Hitting a blade at the guide shortens it and increments score.
- [ ] Missing the guide (firing at empty space) triggers "Unbalanced" state (shake/wobble) and Game Over.
- [ ] Reaching 10 trims triggers Win state.
- [ ] HUD updates correctly.
- [ ] Colors match palette exactly.
- [ ] Game is playable on both desktop (keyboard) and mobile (touch).
- [ ] Single-file HTML/CSS/JS deliverable.

## Type pairing
Oswald + Lato


## Motion
- entrance: Turbine spin-up from still to high RPM
- ambient: Blade motion blur increases with speed
- interaction: Successful cut emits sparks and reduces blade length
