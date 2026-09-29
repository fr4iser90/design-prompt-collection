## Concept
'Harmonic Chorus' is a tactile physics toy where players manipulate pendulum lengths to achieve resonant frequencies that shatter glass targets. It transforms frequency matching into a visual, physical rhythm game. The core fantasy is controlling acoustic resonance through mechanical adjustment. The game emphasizes precision timing and physical intuition over reflexes.

## Core loop
Adjust pendulum length via slider → Release pendulum (Space) → Pendulum swings → If length matches target resonance AND hits target → Glass shatters (Score+) → Next target spawns. If mismatched hit or timer expires → Fail/Reset. Loop continues until 5 shatters (Win) or 3 fails/time out (Game Over). Each successful shatter spawns a new glass target at a random horizontal distance, requiring a new length adjustment.

## Input
- **Pointer Drag**: Vertical slider on left adjusts pendulum length (100px–400px). Updates physics state immediately. Slider thumb is a circle (#E0E0E0, r=10px).
- **Space**: Releases the pendulum from rest at the adjusted length. Triggers swing animation. If already swinging, Space resets the pendulum to idle.
- **Click (Background)**: Resets the current level if in 'fail' state or to restart after win. Clicking during play does nothing.
- **No Keyboard movement**: Input is strictly slider + Space + Click. Mobile: Touch drag on slider, touch release on canvas acts as Space.

## Fail / win
- **Win**: Shatter 5 glass targets within the time limit (60 seconds total). Display 'HARMONIC MASTER' overlay in #FFD166.
- **Fail**: Timer expires OR 3 missed attempts (hitting glass without resonance or swinging past target without contact). Display 'RESONANCE LOST' overlay in #FF595E.
- **Scoring**: Score = (Shattered Count × 100) + (Frequency Accuracy Bonus). Accuracy = 100 - (|Period Error| * 10). Max accuracy bonus 50 points per shatter.

## Entities
1. **Pendulum**: Mass (circle, #E0E0E0, r=15px), String (line, #E0E0E0, width=2px), Pivot (fixed point, #E0E0E0, r=5px). Behavior: Simple harmonic motion based on length L. Period T = 2π√(L/g). g=9.8 (scaled for pixels, e.g., g=500). Angle theta calculated via theta = theta0 * cos(2πt/T).
2. **Glass Target**: Circle (stroke #FFD166, fill transparent, r=20px). Hidden property: Target Frequency (Hz) → Target Period T_target. Position: Fixed x (random between 200-600px), y = pivot.y + length_estimate. Behavior: Static until hit. Shatters on successful resonance hit.
3. **Particles**: On shatter, spawn 20 small triangles/circles (#FFD166) with radial velocity. Fade out over 500ms. Velocity random between 2-5px/frame.
4. **Sound Waves**: Expanding concentric circles (stroke #E0E0E0, opacity decreasing) emitted from pendulum mass every 100ms during swing. Radius increases by 2px/frame. Max 5 waves visible.

## Feel
- **Visual Feedback**: Pendulum string glows #FFD166 when length is within 10% of optimal resonance range. Glass vibrates subtly (offset x ±2px) when pendulum approaches. Shatter is a burst of particles and screen shake (5px, 100ms).
- **Audio Cue**: Optional Web Audio API oscillator pitch varies with pendulum length (lower length = higher pitch). 'Ping' (high freq) on shatter, 'Thud' (low freq) on miss.
- **Motion**: Pendulum swing uses easing for natural harmonic motion. Slider drag is smooth. Entrance: Pendulums swing in chaotic desync before stabilizing.

## Palette
- **Background**: #1E1E24 (Deep Charcoal)
- **Primary/UI**: #E0E0E0 (Off-White)
- **Accent/Target**: #FFD166 (Amber Gold)
- **Fail State**: #FF595E (Red, for timer low/miss)
- **Success**: #00A86B (Green, for shatter score pop-up)

## Type
- **Title**: 'ResonantSerif' (fallback: Georgia, serif) - Large, elegant, tracking-wide. Centered top.
- **HUD**: 'AudioMono' (fallback: 'Courier New', monospace) - Small, precise, left-aligned. Displays: 'LENGTH: 240px', 'FREQ: 1.2Hz', 'SCORE: 0', 'TIME: 45s'.

## Constraints
- **Tech**: HTML5 Canvas 2D, Vanilla JS. No external libraries (no Matter.js, no Phaser).
- **Performance**: 60FPS. Physics calculations in requestAnimationFrame.
- **Responsiveness**: Canvas fills viewport. Pivot centered horizontally. Slider fixed left.
- **Code**: Single HTML file. Inline CSS/JS. No images.

## Acceptance criteria
- [ ] Pendulum length adjusts smoothly via vertical slider.
- [ ] Pendulum swings with correct physics period based on length.
- [ ] Glass target shatters only when hit by pendulum with matching resonance (within tolerance).
- [ ] Mismatched hits cause bounce/miss, no shatter.
- [ ] Timer counts down; game ends on timeout or 5 shatters.
- [ ] Score updates accurately based on shatters and accuracy.
- [ ] Visual sound waves emit from pendulum.
- [ ] Palette and fonts match specification exactly.
- [ ] Fail/Win states display clear overlays with restart option.
- [ ] Screen shake occurs on shatter.
- [ ] Mobile touch input works for slider and release.

## Motion
- entrance: Pendulums swing in chaotic desync before stabilizing into the game state
- ambient: Air ripples visualize sound waves emanating from swinging masses
- interaction: Adjusting length changes swing period and frequency pitch; glass vibrates when near resonance
