Deliverable: single-file HTML/CSS/JS.

Build 'Pulse Fix', a high-stakes medical rhythm game using Canvas 2D. The screen is a black void with a bright green (#00FF00) ECG line scrolling from right to left. The core mechanic is timing: the player must click (or press Space) exactly when the line hits the peak of a QRS complex (the sharp upward spike). 

Visuals: The background is pure black. The ECG line is drawn as a continuous path. Normal heartbeats are smooth sine-like waves. Arrhythmias (V-Fib) are chaotic, jagged noise. Successful shocks turn the line temporarily smooth and bright white before returning to green. Failed shocks or missed beats cause the line to turn red (#FF0000) and degrade toward a flat line (asystole). 

Game Loop: The game starts with a stable rhythm. Every 5-10 seconds, the rhythm shifts to a new 'arrhythmia pattern' (different frequency, amplitude, or chaos level). The player must shock the peaks. If they shock during the T-wave or baseline, it counts as a miss. If they miss a peak, the 'Stability Meter' drops. If Stability hits 0, the game ends (Flatline). If they survive 30 seconds of increasing difficulty, they win.

Input: Single pointer click or Spacebar. No hold mechanics. Instant feedback. 

HUD: Minimal. Top-left: 'STABILITY' bar (green to red). Top-right: 'TIME' remaining (Courier New). Center-bottom: 'SHOCK' button visual cue that pulses with the beat. 

Technical: Use requestAnimationFrame. Store ECG points in an array. Shift array every frame. Draw path. Detect collision between click time and peak time (within 150ms window). Implement state machine: 'Stable', 'Arrhythmia', 'Shock', 'Flatline'. 

Style: Futura for UI labels, Courier New for data readouts. No images, no external assets. Pure code-generated waveforms. Ensure the 'QRS' spike is visually distinct (sharp, tall) from the rest of the wave so players can predict it.
