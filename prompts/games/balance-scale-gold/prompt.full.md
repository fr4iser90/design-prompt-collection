## Concept
'Balance Scale Gold' is a tactile physics toy focused on precision placement and rotational equilibrium. Players stack gold weights on a brass balance scale to reach a target mass while maintaining near-perfect horizontal balance. The fantasy is that of a jeweler or alchemist carefully weighing precious metals. The tone is warm, metallic, and satisfying.

## Core loop
1. Select a weight from the tray. 2. Drag it to a position on the scale. 3. Release to drop it. 4. Observe the tilt and adjust or add more weights. 5. If tilt > 30°, fail (weights slide off). 6. If target mass reached and tilt < 5°, win.

## Input
- Mouse/Touch: Click a weight in the bottom tray to pick it up. Drag to position. Release to drop.
- Keyboard: Spacebar to reset the current run.
- Hover: Highlight the scale beam to indicate valid drop zones.
- Mobile: Touch drag with visual ghost of weight following finger.

## Fail / win
- Fail: The scale beam tilts beyond 30 degrees in either direction. All weights slide off the ends. Show 'Unbalanced' message.
- Win: The total mass on both sides meets the target value, and the tilt is less than 5 degrees. Show 'Perfect Balance' with a golden glow.
- Score: Calculated as (100 - abs(tilt)) * (mass_accuracy). Higher is better.

## Entities
- Player: Implicit (cursor).
- Scale: A central beam (rectangle) on a triangular fulcrum. Two pans (circles) at the ends. The beam rotates around the fulcrum.
- Weights: Circular gold discs of varying masses (1kg, 2kg, 5kg). They stack on the pans.
- Tray: A UI element at the bottom containing available weights.
- HUD: Text overlays for tilt angle, mass left/right, and target.

## Feel
- Heavy and metallic. When a weight is dropped, the beam should accelerate, overshoot slightly, and oscillate before settling (damped harmonic motion).
- The fulcrum should have a subtle, continuous micro-vibration when idle to suggest instability.
- Sound (optional): Metallic clank on drop, creak on tilt, chime on win.
- Visual feedback: The beam glows green when tilt < 5°, red when > 20°.

## Palette
- Background: #fefce8 (Warm Off-White)
- Scale Structure: #ca8a04 (Brass), #a16207 (Dark Brass)
- Weights: #f59e0b (Gold), #1e293b (Shadow)
- Text: #1e293b (Dark Slate)

## Type
- Title/HUD Numbers: Playfair Display (Serif, elegant)
- Instructions/Labels: Open Sans (Sans-serif, clean)

## Layout
- Desktop: Scale centered vertically. Tray fixed at bottom. HUD top corners.
- Mobile: Scale scaled to fit width. Tray fixed bottom. HUD stacked top.
- Responsive: Canvas resizes to window. Maintain aspect ratio for physics.

## Constraints
- Single HTML file.
- Canvas 2D for rendering.
- Vanilla JS for physics.
- No external assets (images/fonts via Google Fonts CDN allowed).
- Responsive to window resize.
- Performance: 60fps target.

## Acceptance criteria
- [ ] Game loads and displays the scale and tray.
- [ ] User can drag weights from tray to scale.
- [ ] Scale tilts based on weight position and mass.
- [ ] Tilt > 30° triggers fail state (weights slide off).
- [ ] Target mass + Tilt < 5° triggers win state.
- [ ] Spacebar resets the game.
- [ ] Physics feel is damped and realistic (overshoot).
- [ ] Colors match the palette exactly.
- [ ] Fonts are Playfair Display and Open Sans.
- [ ] Mobile touch controls work smoothly.
- [ ] No console errors.

## Motion
- entrance: The scale pans drop from above with a heavy, metallic clank.
- ambient: The central fulcrum has a subtle, continuous micro-vibration, simulating instability.
- interaction: Placing a weight causes the scale to tilt with realistic angular momentum and overshoot before settling.
