## Concept
'Pulse Fix' is a rhythm-action medical simulation. The player acts as a defibrillator operator. The screen displays a scrolling ECG waveform. The goal is to deliver electrical shocks precisely on the QRS complex (the sharp spike of a heartbeat) to convert chaotic arrhythmias into a stable rhythm. It is a test of visual pattern recognition and timing precision, not just reflexes.

## Core loop
1. Observe the scrolling ECG line. 
2. Identify the upcoming QRS spike (the sharp, tall peak). 
3. Click/Press Space exactly as the spike passes the 'Shock Zone' (center of screen). 
4. If timed correctly: The line flashes white, stabilizes for a few beats, and the 'Stability' meter increases. 
5. If timed incorrectly (too early/late) or missed: The line turns red, stability drops, and the arrhythmia worsens. 
6. Survive 30 seconds of escalating difficulty to win. 

## Input
- **Pointer Click**: Triggers shock.
- **Spacebar**: Triggers shock.
- No other inputs. No hold-to-charge. Instant action.

## Fail / win
- **Fail**: Stability meter reaches 0%. The ECG line becomes a flat horizontal line (asystole). Game Over screen appears with 'FLATLINE' in red.
- **Win**: Timer reaches 0 seconds (30s survival). Game Over screen appears with 'STABILIZED' in green. Score is calculated by accuracy % and combo streak.

## Entities
- **ECG Line**: A continuous path drawn on Canvas. Composed of segments. Normal: Smooth sine wave. Arrhythmia: Perlin-noise-modified sine wave with sharp spikes. 
- **QRS Spike**: The specific target within the waveform. Visually distinct (taller, sharper). 
- **Shock Zone**: A vertical translucent band in the center of the screen where the click must occur relative to the spike's position. 
- **Stability Meter**: A horizontal bar at the top. Decreases on miss, increases on hit. 
- **Timer**: Countdown from 30s.

## Feel
- **Visual Juice**: On a successful shock, the entire screen flashes white for 2 frames. The ECG line briefly glows bright white before returning to green. 
- **Audio (Optional/Simulated)**: If audio is implemented, use a sharp 'zap' sound on hit, a dull 'thud' on miss. If no audio, use visual shake on miss.
- **Difficulty Curve**: Starts with regular 60 BPM. Every 5 seconds, BPM increases or chaos factor increases (more noise, less predictable spikes). 
- **Feedback**: Clear distinction between 'Hit' (White/Green) and 'Miss' (Red). 

## Palette
- **Background**: #000000 (Pure Black)
- **Primary Line**: #00FF00 (Neon Green) for stable/normal state.
- **Danger/Flatline**: #FF0000 (Red) for low stability or flatline.
- **Shock/Highlight**: #FFFFFF (White) for the spike peak and shock flash.
- **UI Text**: #00FF00 or #FFFFFF.

## Type
- **Headers/Labels**: Futura (or similar geometric sans-serif). Bold, uppercase.
- **Data/Numbers**: Courier New (monospace). For timer, stability %, and score. Ensures alignment and 'medical terminal' aesthetic.

## Constraints
- Single HTML file. No external libraries (no Phaser, no Three.js).
- Canvas 2D API only.
- Must run at 60FPS.
- Waveform generation must be procedural (math-based), not pre-recorded audio analysis.
- No images. All visuals drawn via code.

## Acceptance criteria
- [ ] ECG line scrolls continuously from right to left.
- [ ] Clicking exactly on the QRS spike increases stability and flashes white.
- [ ] Clicking off-beat decreases stability and turns line red.
- [ ] Stability meter hits 0 -> Game Over (Flatline).
- [ ] Timer hits 0 -> Game Over (Win).
- [ ] Difficulty increases over time (faster/chaotic waves).
- [ ] Uses Futura and Courier New fonts.
- [ ] No external assets or libraries.

## Type pairing
Futura + Courier New


## Motion
- entrance: ECG line starts flat, then begins erratic scrolling.
- ambient: Green line scrolls smoothly; spikes are bright white.
- interaction: Click triggers a screen flash and 'zap' effect; successful hit smooths the line temporarily.
