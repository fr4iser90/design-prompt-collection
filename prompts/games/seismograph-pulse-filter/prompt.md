Build a single-file HTML5 Canvas game titled 'Seismograph Pulse Filter'. The goal is to extract clean earthquake signals from raw seismic noise by clicking at the precise moment a pulse peaks. Visual style is a dark oscilloscope (#1A1A1A background) with bright yellow (#FFFF00) signal lines and red (#FF4500) failure states. Use Consolas or a monospace font for HUD elements. 

Core Mechanics: A waveform scrolls continuously from right to left. It consists of random noise mixed with distinct 'pulse' events (sharp spikes). The player must click (mouse down or touch) exactly when a pulse reaches the center 'filter' line. A successful click 'cuts' the noise, isolating the pulse into a clean segment on the right side of the screen. A missed click (too early/late) or clicking during pure noise adds 'static' to the filter bar. 

Fail Condition: If the static bar fills up (10 misses or 5 seconds of unfiltered noise exceeding a threshold), the screen flashes red and the game ends. 

Win Condition: Successfully extract 3 clean pulses. Each clean extraction increases the 'Signal-to-Noise Ratio' score. After 3 pulses, the level ends, and speed increases. 

Input: Single click/tap anywhere on the canvas. 

Entities: 
1. Player Input: A vertical white line in the center of the canvas. 
2. Waveform: Generated via Perlin noise + sine wave bursts. 
3. Filter Bar: A progress bar at the bottom showing 'Static' vs 'Clean'. 

Feel: When a pulse is successfully cut, play a sharp 'tick' sound and flash the pulse segment green briefly. When failing, shake the canvas slightly and turn the waveform red. Ensure the pulse shape is distinct from noise (high amplitude, narrow width).

Layout & Responsiveness: The game must be fully responsive. On desktop, the canvas should fill the window with a fixed aspect ratio maintained via letterboxing if necessary, ensuring the waveform remains legible. On mobile, the canvas should occupy the full viewport, with touch targets optimized for thumb reach. The HUD elements (Score, Level, Static Meter) should be positioned in the top corners and bottom center, avoiding overlap with the central waveform path. Ensure text scales appropriately using viewport units (vw/vh) or dynamic font sizing to remain readable on small screens. The 'Filter Line' must remain perfectly centered horizontally regardless of screen size.

Motions & Animations: The waveform should scroll at a constant velocity that increases per level. Pulse spikes should have a slight 'glow' effect using shadowBlur to distinguish them from background noise. Upon a successful cut, the isolated pulse should animate smoothly to the right side of the screen, stacking vertically in a 'Clean Signal' column. Upon failure, the entire canvas should undergo a brief, intense shake animation (random x/y offset for 200ms) and a red vignette effect should fade in and out. The static meter should fill with a jagged, erratic animation rather than a smooth linear fill to mimic electrical interference.

Constraints: The game must run at a stable 60fps on mid-range mobile devices. Avoid heavy DOM manipulation; all rendering must occur within the Canvas 2D context. Audio must be synthesized using the Web Audio API to avoid external asset loading. The code must be contained in a single HTML file with embedded CSS and JavaScript. No external libraries are permitted. Ensure memory leaks are prevented by properly cleaning up audio contexts and event listeners if the game restarts.

Acceptance Criteria: 1. The game starts immediately upon load or after a simple 'Start' tap. 2. Clicking exactly on the pulse peak registers as a success with visual and audio feedback. 3. Clicking on noise or missing the pulse adds static. 4. The game ends when static reaches 100%. 5. The game advances to the next level after 3 successful cuts. 6. The interface is intuitive with no on-screen tutorials required beyond the initial visual cues. 7. The game is playable on both iOS Safari and Chrome Desktop without modification.

Deliverable: single-file HTML/CSS/JS.
