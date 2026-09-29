## Concept
Circuit Breaker Arc Timing is a high-stakes rhythm-timing game where the player acts as an electrician closing high-voltage breakers. The core tension comes from the visual representation of danger: an electric arc that oscillates between two terminals. The player must time their click to close the breaker exactly when the arc is at its minimum length (the safe gap). This creates a 'wait for the shrink' loop where precision is rewarded and hesitation or greed is punished. The game emphasizes focus and reflexes, simulating the dangerous precision required in electrical work.

## Core loop
1. **Wait**: Observe the arc oscillating between terminals. The arc length pulses sinusoidally. The speed of oscillation increases with each level.
2. **Risk**: Decide when to click. Clicking too early (arc too long) causes a shock (fail). Clicking too late (arc growing again) misses the window (retry). The 'safe zone' is visually indicated by a faint green outline that appears only when the arc is within the success threshold.
3. **Reward**: Successful click closes the breaker, lights a green LED, and advances to the next circuit. A satisfying 'clunk' sound plays.
4. **Reset**: On fail, the screen flashes red and resets to the start of the current circuit. On win, the game ends with a score summary.

## Input
- **Mouse Click / Touch Tap**: Attempts to close the breaker. The timing of this input relative to the arc's oscillation phase determines success or failure. Input must be debounced slightly to prevent accidental double-clicks from registering as two separate attempts.

## Fail / win
- **Fail**: The arc length at the moment of click exceeds the 'safe threshold'. The screen flashes orange (#FF5500), a 'SHOCK' message appears in large Bebas Neue font, and the run resets to the beginning of the current circuit. Three fails end the game entirely, returning to the title screen.
- **Win**: Successfully close 5 circuits. The game displays the final score and a 'CIRCUITS SECURED' message. A confetti-like particle effect of yellow sparks fills the screen.
- **Score**: Each successful close awards points based on the precision of the timing (how close the arc was to its minimum length). Perfect timing yields maximum points. Bonus points are awarded for completing a circuit without any fails.

## Entities
- **Arc**: A jagged, glowing line between two terminals. Its length oscillates between a minimum (safe) and maximum (danger) value. The oscillation frequency and amplitude increase with each circuit. The arc should have a 'noise' effect to make it look unstable.
- **Terminals**: Two static rectangular blocks at the top and bottom of the canvas. The arc connects them. They should have a metallic gradient.
- **Breaker Switch**: A rectangular UI element below the terminals. It starts in the 'OFF' position. On success, it snaps to 'ON' and glows green. The snap animation should be quick and mechanical.
- **HUD**: Displays current circuit number (1-5), score, and remaining lives (fails). Positioned at the top of the canvas.

## Feel
- **Visuals**: High contrast. Dark background (#111111). The arc is bright yellow (#FFFF00) with a blur/glow effect. Danger zones are highlighted in orange (#FF5500). The breaker switch is industrial gray with green/red indicators. Use shadowBlur in Canvas 2D for the glow.
- **Feedback**: 
  - **Success**: Mechanical 'clunk' sound (synthesized via Web Audio API if possible, or visual cue), green LED flash, screen shake.
  - **Fail**: Loud 'zap' sound, screen flash orange, 'SHOCK' text overlay.
  - **Ambient**: The arc flickers slightly even when stable, adding to the tension. The background should have a subtle vignette.

## Palette
- **Background**: #111111 (Deep Charcoal)
- **Arc/Safe**: #FFFF00 (Electric Yellow)
- **Danger/Fail**: #FF5500 (High-Voltage Orange)
- **Success**: #00FF00 (Neon Green)
- **Text/UI**: #FFFFFF (White)

## Type
- **Title**: Bebas Neue (Bold, Uppercase)
- **Body/HUD**: Space Mono (Regular, Monospace)
- **Constraint**: Do not use Inter, Roboto, Arial, or system-ui. Fonts must be loaded via Google Fonts CDN. Ensure font loading is handled gracefully so text doesn't shift.

## Layout & Responsiveness
- **Desktop**: Canvas is centered horizontally and vertically. Max width 800px. Aspect ratio maintained.
- **Mobile**: Canvas fills the viewport width. Height adjusts to maintain aspect ratio or fills height with letterboxing if necessary. Use `env(safe-area-inset-*)` for padding on notched devices.
- **Resize**: Listen to `window.resize` and update canvas dimensions and internal scaling factors.

## Constraints
- Single HTML file.
- Canvas 2D for rendering.
- No external images or audio files (use Web Audio API for sounds if needed, otherwise visual-only).
- Responsive to window resize.
- Must be playable on desktop and mobile.
- Code must be clean, commented, and modular.

## Acceptance criteria
- [ ] Game loads with a start screen showing the title and instructions.
- [ ] Clicking starts the first circuit.
- [ ] The arc oscillates visibly between two terminals.
- [ ] Clicking when the arc is short closes the breaker and advances to the next circuit.
- [ ] Clicking when the arc is long triggers a fail state (shock).
- [ ] The game ends after 5 successful circuits or 3 fails.
- [ ] Score is displayed and updates on each successful close.
- [ ] Fonts are Bebas Neue and Space Mono.
- [ ] Colors match the palette exactly.
- [ ] Code is self-contained in one HTML file.
- [ ] Responsive layout works on mobile and desktop.
- [ ] Deliverable: single-file HTML/CSS/JS.

## Type pairing
Stencil + Verdana


## Motion
- entrance: Breaker panel, switches off
- ambient: Electricity arcs between terminals; arc distance pulses with voltage
- interaction: Click to close breaker; must close when arc is within safe gap
