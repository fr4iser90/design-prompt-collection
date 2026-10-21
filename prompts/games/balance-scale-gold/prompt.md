Deliverable: single-file HTML/CSS/JS.

Build 'Balance Scale Gold', a playable physics toy using Canvas 2D. The player stacks gold weights on a brass balance scale. The core mechanic is rotational equilibrium: every weight placed adds torque based on its mass and distance from the fulcrum. The scale tilts dynamically. If the tilt exceeds 30 degrees, the run fails as weights slide off. If the player reaches a target mass on both sides while keeping the tilt under 5 degrees, they win with a score based on precision.

Visuals: Warm, metallic aesthetic. Background #fefce8. Scale structure in #ca8a04 and #a16207. Weights are shiny gold (#f59e0b) with dark shadows (#1e293b). Use Playfair Display for the title and HUD numbers, Open Sans for instructions. The scale should feel heavy: implement angular momentum so the beam overshoots slightly before settling. Add a subtle micro-vibration to the fulcrum when idle to suggest instability.

Input: Click a weight from the tray (bottom of screen), drag it to the scale, release to drop. Spacebar resets the current run. The drag interaction should feel magnetic but precise.

Physics: Simple 2D rigid body simulation for the beam. Torque = Mass * Distance. Calculate net torque to determine angular acceleration. Apply damping to simulate friction. Collision detection for weights sliding off the edge when tilt > 30°.

HUD: Display current tilt angle (degrees) and total mass on each side. Show target mass. Use a 'Perfect' indicator when tilt < 5° and target mass is met.

Layout: Desktop centers the scale with tray below. Mobile stacks HUD top, scale middle, tray bottom. Ensure touch targets are 44px min.

Motions: Beam oscillates with damped harmonic motion. Weights bounce slightly on impact. Glow pulses on win.

Constraints: No external libraries. All physics logic in vanilla JS. Ensure the game is playable in one viewport. The fail state must be immediate and visual (weights sliding off). The win state must be satisfying (glow effect on the scale). Acceptance: Loads correctly, drag works, physics accurate, win/fail triggers, responsive.
