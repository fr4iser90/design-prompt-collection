## Concept
"Laser Alignment Pulse Lock" is a rhythm-based precision game focused on optical physics simulation. The player acts as an optical engineer attempting to phase-lock a laser beam into a vibrating crystal lattice. The core tension comes from matching the firing timing to the crystal's resonant frequency. Unlike standard rhythm games that use audio cues, this relies entirely on visual wave synchronization.

## Core loop
1. **Observe:** The crystal lattice at the top oscillates horizontally and pulses in opacity. A visual sine-wave indicator (optional HUD line) shows the current phase. 
2. **Act:** The player clicks to fire a vertical laser beam from the bottom. 
3. **Check:** The game checks if the crystal's sine wave value is near zero (the "neutral" or "resonant" phase). 
4. **Result:** 
   - **Success:** Beam passes through, crystal stabilizes, score increases, next crystal appears with higher frequency. 
   - **Fail:** Beam deflects, crystal shatters, life lost. 
5. **Reset:** New crystal appears after a short delay.

## Input
- **Left Mouse Click:** Fires the laser pulse. 
- **No keyboard input required.** 
- Input must be debounced slightly to prevent accidental double-fires during the animation lockout.

## Fail / win
- **Fail Condition:** The player loses a life if the laser is fired outside the "Lock Zone" (sine value > 0.15 or < -0.15). 
- **Life System:** Start with 3 lives. When lives reach 0, display "SYSTEM FAILURE" and a "RESTART" button. 
- **Win Condition:** There is no hard "win" screen, but achieving a score of 10 triggers a "Master Engineer" badge effect (gold text) and increases difficulty cap.

## Entities
1. **Laser Emitter:** Static rectangle at bottom center. 
2. **Crystal Lattice:** Central geometric shape (hexagon/diamond) at top center. 
   - **Behavior:** Oscillates X position: `x = centerX + Math.sin(time * speed) * amplitude`. 
   - **Visuals:** Color shifts from dark blue to bright cyan as it approaches the lock zone. 
3. **Laser Beam:** Vertical line drawn from emitter to target. 
   - **Success State:** Solid white line, glows. 
   - **Fail State:** Red jagged line, disappears quickly. 
4. **Particles:** White triangular shards spawn on crystal shatter.

## Feel
- **Timing Window:** The "Lock Zone" is visually indicated by the crystal turning bright white. The window shrinks as the frequency increases. 
- **Feedback:** 
   - **Success:** Screen flash (white overlay, 50ms opacity fade). Sound: High-pitched chime (Web Audio API oscillator). 
   - **Fail:** Screen shake (canvas translation jitter). Sound: Low-pitched buzz (Web Audio API sawtooth). 
- **Difficulty Curve:** 
   - Level 1: Frequency = 1.0 Hz. Window = ±0.2. 
   - Level 5: Frequency = 2.5 Hz. Window = ±0.1. 
   - Max Level: 10. 

## Palette
- **Background:** #000000 (Pure Black) 
- **Primary UI/Text:** #FFFFFF (White) 
- **Success/Laser:** #00FFFF (Cyan) or #FF00FF (Magenta) 
- **Danger/Fail:** #FF0000 (Red) 
- **Crystal Idle:** #333333 (Dark Grey)

## Type
- **Font:** 'Space Mono', monospace. 
- **Usage:** 
   - HUD (Lives, Score): 16px, top-left. 
   - Game Over Title: 40px, centered. 
   - Instructions: 12px, bottom-center, fading out after first click.

## Constraints
- **Single File:** All HTML, CSS, and JS must be in one file. 
- **No Libraries:** Use vanilla JS and Canvas 2D API. 
- **Performance:** Maintain 60FPS. Use `requestAnimationFrame`. 
- **Responsiveness:** Canvas should resize to fit the window, maintaining a 16:9 aspect ratio or full viewport with letterboxing. 
- **Accessibility:** High contrast. No reliance on color alone (use shape changes for success/fail).

## Acceptance criteria
1. [ ] Game loads with a black canvas and a vibrating crystal at the top. 
2. [ ] Clicking fires a laser beam from the bottom. 
3. [ ] Hitting the crystal when it is "bright/centered" results in a success state (score +1, new crystal). 
4. [ ] Hitting the crystal when it is "dim/side" results in a fail state (life -1, shatter animation). 
5. [ ] Lives decrease visibly in the HUD. 
6. [ ] Game Over screen appears when lives = 0. 
7. [ ] Restart button resets score, lives, and difficulty. 
8. [ ] No external assets (images/fonts) are loaded via URL. 
9. [ ] The timing window feels progressively harder (frequency increases). 
10. [ ] Code is clean, commented, and runs without console errors.

## Type pairing
Display: Space Mono (HUD) + Body: Raleway (UI)


## Motion
- entrance: Laser calibration sweep across lattice
- ambient: Crystal lattice pulsates with resonance glow
- interaction: Pulse lock causes chromatic aberration flare
