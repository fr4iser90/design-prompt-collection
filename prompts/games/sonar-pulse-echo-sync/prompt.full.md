## Concept
"Echo Chamber Sync" is a high-tension rhythm-timing game where the player acts as a submarine sonar operator. The fantasy is one of precision under pressure: you must identify hidden objects in the dark water by emitting a ping and listening (visually) for the echo return. The core twist is that the "echo" is a visual expanding ring, and you must tap exactly when that ring touches a target object. It translates auditory timing into spatial geometry. The experience should feel like operating a high-stakes military instrument, where hesitation leads to failure and precision leads to mastery.

## Core loop
1. Player taps to emit a ping (ring expands from center).
2. Player watches the ring expand toward scattered targets.
3. Player taps again when the ring intersects a target.
4. If timing is correct, target is identified (locked green), score increases.
5. If timing is wrong or a hazard is hit, penalty occurs (time loss/shake).
6. Repeat until 5 targets are identified or time/hazards run out.
7. On level completion, display a brief "Sector Clear" animation before loading the next level with increased difficulty.

## Input
- **Pointer Click / Spacebar**: Triggers a ping. One ping at a time. If a ring is already expanding, tapping again attempts to register a hit on the current ring's position relative to targets.
- **Touch Support**: On mobile devices, ensure touch events are mapped correctly to prevent double-firing or scroll interference. Use `touchstart` and `touchend` appropriately. Prevent default behavior on touch events to stop page scrolling.
- No other inputs. No mouse movement required for aiming. Keyboard support is essential for desktop accessibility. Ensure focus is managed correctly so spacebar works immediately after loading.

## Fail / win
- **Fail**: 
  - Time expires (60 seconds per level, decreasing by 5 seconds per subsequent level).
  - Hit 3 "Noise Hazards" (red glitchy circles). Each hit causes a jam (2s lockout) and consumes one of 3 "Hull Integrity" points. Zero points = Game Over.
- **Win**: 
  - Identify all 5 targets in the current sector before time/hull expires.
  - Next level loads with faster ring speed (increase by 10%) and more hazards (add 1 hazard per level).
  - Infinite progression mode until failure.

## Entities
- **Player (Submarine)**: Fixed at center (0,0). Static icon drawn with simple geometric shapes (triangle/ellipse). Add a subtle idle animation (bobbing) to make it feel alive.
- **Ping Ring**: Expands from center at constant speed (e.g., 200px/s). Green stroke with a fading tail effect. The ring should have a slight glow using shadowBlur.
- **Targets**: 5 static circles scattered randomly within 50-250px radius. Pulse faintly using sine wave opacity. Identified targets turn solid green and stop pulsing. Ensure targets do not overlap each other or hazards.
- **Noise Hazards**: 3-5 red glitchy circles scattered. If the ping ring touches a hazard before a target, it triggers a "Jam" event. Hazards should have a jittery animation to signal danger. Use random offset per frame for glitch effect.
- **Particles**: Ambient bubbles rising from bottom. Spark particles on successful hit. Explosion particles on hazard hit. Particles should fade out and disappear to prevent memory leaks.

## Feel
- **Juice**: 
  - **Perfect Hit** (±3px): Bright green flash, satisfying "lock" sound (synth beep), screen slight zoom-in, particle burst. Display "PERFECT" text floating up.
  - **Good Hit** (±8px): Standard green lock, normal sound. Display "HIT" text.
  - **Miss**: Ring dissipates with a dull thud sound, red flash at ring edge, slight camera shake. Display "MISS" text in red.
  - **Hazard Hit**: Heavy screen shake, red static overlay, harsh noise sound, temporary grayscale filter. Screen shake intensity should decay over time.
- **Visuals**: Dark, deep-sea aesthetic. High contrast neon lines on dark background. CRT scanline effect optional but subtle. Vignette effect to focus attention on center. Use CSS for vignette overlay to save canvas performance.
- **Audio**: Use Web Audio API for synthesized beeps/boops. No external files. Create a simple oscillator-based sound engine for ping, hit, miss, and hazard sounds. Ensure audio context is resumed on first user interaction.

## Palette
- Background: `#001F3F` (Deep Navy)
- Primary/Success: `#00FF41` (Neon Green)
- Danger/Error: `#FF3333` (Bright Red)
- HUD Text: `#FFFFFF` (White)
- Dim/UI: `#0077BB` (Medium Blue for inactive elements)
- Ensure high contrast for accessibility.

## Type
- **Display**: Orbitron (for HUD numbers, "SONAR ONLINE", level indicators). Bold, techy. Load via Google Fonts or embed base64 if offline capability is needed, but standard link is preferred for simplicity.
- **Body/Mono**: Space Mono (for debug info, instructions, small labels). Monospaced for alignment.
- Fallback: sans-serif. Ensure font loading does not block initial render; use `font-display: swap`.

## Constraints
- Single HTML file.
- Canvas 2D context.
- No external images or audio files (synthesize audio).
- Must be playable on desktop (keyboard/mouse) and mobile (touch).
- Responsive canvas size (fit to viewport, maintain aspect ratio or fill). Handle window resize events to redraw canvas. Recalculate center point on resize.
- 60fps target. Use `requestAnimationFrame`. Delta time for physics to ensure consistent speed across refresh rates.
- No libraries (no Phaser, no Three.js).
- Code must be clean, commented, and modular where possible within the single file constraint. Use classes for Game, Entity, Particle.

## Acceptance criteria
- [ ] Game loads instantly in browser.
- [ ] Tapping creates an expanding ring from center.
- [ ] Tapping again registers a hit if ring is within tolerance of a target.
- [ ] Hit on target locks it green and increases score.
- [ ] Hit on hazard causes shake and reduces hull integrity.
- [ ] Miss causes ring to disappear and resets for next ping.
- [ ] HUD shows Time, Score, Hull Integrity, Targets Identified.
- [ ] Game ends when Hull is 0 or Time is 0.
- [ ] Game advances level when 5 targets are identified.
- [ ] Visuals match palette (Navy/Green/Red).
- [ ] Fonts are Orbitron and Space Mono.
- [ ] Responsive layout works on mobile and desktop.
- [ ] Audio synthesizes correctly without external files.
- [ ] Deliverable: single-file HTML/CSS/JS.
- [ ] Start screen displays instructions clearly.
- [ ] Game over screen shows final score and restart option.
- [ ] No console errors during gameplay.
- [ ] Touch events do not cause scrolling on mobile.

## Type pairing
Orbitron + Space Mono


## Motion
- entrance: Dark water fades in, sonar sweep rotates slowly.
- ambient: Ambient bubbles rise; targets pulse faintly when pinged.
- interaction: Ping creates a rapid expanding ring; successful hit locks the ring to target color.
