## Concept
'Bioluminescent Firefly Pulse' is a rhythm game where the beat is not pre-recorded but emerges from a simulated swarm of AI agents. The player must observe the chaotic flashing of fireflies, identify the emerging rhythm, and click to synchronize their own light with the swarm. The fantasy is joining a living, breathing system through precise timing. The aesthetic is dark, serene, and scientifically inspired, focusing on the beauty of emergent order from chaos.

## Core loop
Observe swarm's emergent pulse -> Click to flash in sync -> Reward: Join swarm, score points, maintain sync -> Risk: Miss timing, accumulate desyncs -> Reset: Swarm scatters on 5 desyncs or new cycle begins. The loop is tight and immediate, providing instant visual feedback for every input.

## Input
- **Mouse Click / Tap**: Triggers the player's firefly flash. The timing of this click is the sole mechanic. 
- **No keyboard controls**. The game is purely pointer-driven. 
- **Touch Handling**: Ensure `touchstart` events are used for lower latency on mobile devices. Prevent default browser actions to stop scrolling or zooming during gameplay.

## Fail / win
- **Fail**: Accumulate 5 desyncs. A desync occurs if the player clicks outside the tolerance window of the swarm's dominant beat. On fail, the swarm scatters, and the game resets to the start screen. The scatter effect should be dramatic, with fireflies moving rapidly outward before fading.
- **Win**: Successfully maintain sync for 3 consecutive swarm cycles. A cycle is defined as a period where swarm sync > 80% for 5 seconds. Winning displays a 'Swarm Joined' message and final score. The win state should trigger a celebratory pulse effect across the entire canvas.

## Entities
1. **Player Firefly**: A single white (#FFFFFF) circle. Flashes on click. Has a glow effect. Positioned centrally or following the mouse slightly for engagement.
2. **Swarm Fireflies**: 15-20 green (#AAFF00) circles. They move slowly (random walk) and flash based on a Kuramoto model-like phase oscillator system. They influence each other's phase to synchronize. Each firefly has a unique phase offset initially.
3. **HUD**: 
   - Desync Counter: 5 dots, filled red on desync. Located top-left.
   - Sync Meter: A bar showing current swarm synchronization level (0-100%). Located top-center.
   - Score: Integer count of successful syncs. Located top-right.

## Feel
- **Visual**: Dark background (#001122). Fireflies use additive blending for a bioluminescent glow. The player's flash should be a sharp, bright white burst. Swarm flashes should be softer, green glows. Use `globalCompositeOperation = 'lighter'` for the glow effect.
- **Feedback**: 
  - **Success**: Player firefly glows brighter, swarm flashes in unison with player. A subtle ring expands from the player.
  - **Fail**: Player firefly flashes red briefly, swarm scatters slightly (velocity increase). A small red 'X' or shake effect on the HUD.
- **Audio**: Optional simple synth beeps for flash (low pitch for swarm, high pitch for player). Silence is also acceptable if audio is too complex, but visual cues must be strong. If audio is included, use Web Audio API oscillators.

## Palette
- Background: #001122 (Deep Ocean Blue)
- Swarm: #AAFF00 (Electric Lime)
- Player: #FFFFFF (Pure White)
- Fail/Warning: #FF3333 (Red)
- HUD Text: #E0E0E0 (Light Gray)

## Type
- **HUD**: Gill Sans, sans-serif. Clean, readable, slightly organic feel.
- **Fallback**: Tahoma, sans-serif.
- **Size**: HUD text 16px-24px. Score larger (32px). Title text 48px.

## Constraints
- **Single File**: All HTML, CSS, JS in one file. No external libraries (no Phaser, no Three.js).
- **Canvas 2D**: Use `<canvas>` for rendering. Do not use DOM elements for game entities.
- **Performance**: Maintain 60 FPS. Limit particle count to <50. Optimize draw calls.
- **Emergent Rhythm**: Do not use a fixed timer for the beat. The beat must emerge from the AI agents' phase coupling. Implement a simple phase adjustment: `phase += speed + coupling * sum(sin(neighbor_phase - my_phase))`. Tune coupling strength for gradual sync.
- **Tolerance**: Define a clear timing window for 'sync'. E.g., if swarm peak is at t, player click must be within [t-100ms, t+100ms].

## Layout & Responsiveness
- **Desktop**: Canvas fills window. Swarm centered. HUD fixed top.
- **Mobile**: Canvas fills window. Swarm constrained to central 80% width to avoid edge touches. HUD adjusted for thumb reach (top center).
- **Orientation**: Support both portrait and landscape. Recalculate swarm bounds on resize.

## Acceptance criteria
- [ ] Game loads in a single HTML file.
- [ ] Canvas renders 15+ fireflies moving and flashing.
- [ ] Swarm flashes gradually synchronize over 10-20 seconds.
- [ ] Player click triggers a white flash.
- [ ] Clicking in sync with swarm increases score.
- [ ] Clicking out of sync increments desync counter.
- [ ] 5 desyncs trigger game over/reset.
- [ ] HUD displays desync count and sync level.
- [ ] Colors match palette: #001122, #AAFF00, #FFFFFF.
- [ ] No external assets or libraries.
- [ ] Responsive design works on mobile and desktop.
- [ ] Start and Game Over screens are functional.

## Type pairing
Gill Sans + Tahoma


## Motion
- entrance: Darkness, then first firefly flashes
- ambient: Fireflies flash in chaotic patterns, gradually syncing
- interaction: Click to make your firefly flash; must match swarm's rhythm to join
