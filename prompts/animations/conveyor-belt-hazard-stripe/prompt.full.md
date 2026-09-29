# Conveyor Belt Hazard Stripe — Extended

## Concept
This animation captures the relentless, rhythmic nature of automated logistics. It’s not about speed, but about consistency. The 'signal' is the hazard stripe itself—a visual beat in the mechanical drum. The aesthetic is clean, high-contrast, and utilitarian.

## Palette
- **Belt:** `#1A1A1A` (Deep charcoal/black rubber)
- **Hazard Stripe:** `#FFD700` (Standard safety yellow, high saturation)
- **Gate/Scanner:** `#808080` (Brushed aluminum/silver)
- **Laser:** `#FF0000` (Thin, intense red line)
- **Counter Text:** `#FFFFFF` (White, monospace)

## Layout & Composition
- **Angle:** 30-degree diagonal perspective. The belt occupies the central diagonal band.
- **Foreground:** The scanner gate is fixed in the center-right, overlapping the belt. It should look heavy and stationary, contrasting with the moving belt.
- **Background:** Flat dark space. No depth cues other than the belt's motion.

## Motion Brief
1. **Loop:** The belt and stripes move at a constant velocity (e.g., 50px/s). The pattern repeats every 2 seconds.
2. **Interaction:** 
   - When the leading edge of a yellow stripe crosses the red laser beam, the laser line displaces vertically by 5px using a `spring(1, 80, 10, 0)` easing curve.
   - Simultaneously, the white digital counter on the gate flickers. It should look like a mechanical flip-counter or a sharp LED digit change.
3. **Ambient:** Add a very subtle vibration to the gate frame (1-2px, high frequency) to imply nearby heavy machinery, but keep it so faint it’s almost subliminal.

## Technical Constraints
- Use CSS `background-position` animation for the belt/stripes for performance.
- Use JS/CSS keyframes for the laser bounce and counter update, synced to the stripe position.
- Ensure the 'seam' of the loop is invisible.

## Acceptance Criteria
- The eye should naturally track the stripes as they pass the gate.
- The 'detection' moment must be crisp and clearly readable.
- No extraneous UI elements; only the belt, gate, laser, and counter.
