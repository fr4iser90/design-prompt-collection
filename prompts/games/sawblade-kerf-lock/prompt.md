Build 'Sawblade Kerf Lock', a single-viewport Canvas 2D rhythm game focused on industrial precision. The core fantasy is operating a table saw with extreme timing accuracy. The experience must feel tactile, heavy, and dangerous.

Visuals: Dark industrial background (#1a1a1a) with subtle vignette. A large, detailed circular sawblade rotates clockwise on the left-center. A light wood board (#f0f0f0) scrolls from right to left. A vertical white guide line marks the cut zone. A fixed 'guide mark' indicator shows the ideal alignment point for a tooth. Use Bebas Neue for HUD titles and JetBrains Mono for stats. Ensure high contrast for readability.

Core Mechanic: The blade rotates at a variable RPM. The player must press SPACE exactly when a sawblade tooth aligns with the guide mark while the board is in the cutting zone. Timing windows are tight: Perfect (±2px), Good (±5px), Miss (>5px).

Inputs: SPACE key only. Pointer is ignored. Keyboard focus must be maintained on the canvas container.

Feedback & Juice: 
- Perfect Hit: Bright orange (#ff6b35) flash at the contact point, crisp 'thunk' sound, wood chips scatter radially. Board advances, Score +1. RPM increases by 2%.
- Good Hit: Yellow flash, softer sound, fewer chips. Score +0.5. RPM stable.
- Miss: Red flash, grinding noise, screen shake. Blade wobble amplitude increases significantly. RPM drops by 10%.
- Idle: Blade spins smoothly. Ambient hum varies with RPM.

Fail/Win: 
- Fail: RPM drops below 60 OR 5 consecutive misses. Show 'BLADE STALL' overlay with restart button.
- Win: Cut through 10 boards. Show 'JOB COMPLETE' with final score and efficiency rating.

Physics/State: 
- Track `rpm`, `wobbleAmplitude`, `consecutiveMisses`, `boardsCut`, `score`.
- Wobble adds sinusoidal noise to the blade's rotation angle and position, making timing harder as mistakes accumulate.
- Successful cuts slightly increase RPM efficiency. Misses decrease it.

Layout & Responsiveness: 
- Desktop: Centered canvas, max-width 800px. HUD top-left and top-right.
- Mobile: Full-screen canvas. Touch area for SPACE simulation (tap anywhere). HUD scales down.
- Aspect Ratio: Maintain 16:9 or 4:3 depending on viewport, letterboxing if necessary.

Constraints: 
- All logic in one HTML file.
- No external assets except fonts.
- Use requestAnimationFrame.
- Ensure the hit detection window is tight (visual alignment within 2px).
- HUD must show current RPM, Misses, and Boards Cut clearly.
- Code must be modular within the single file (Game, Player, Blade, Board classes).

Deliverable: single-file HTML/CSS/JS.
