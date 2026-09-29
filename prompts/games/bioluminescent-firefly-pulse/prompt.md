Deliverable: single-file HTML/CSS/JS. Build 'Bioluminescent Firefly Pulse', a rhythm-timing game on Canvas 2D. The player controls a single firefly in a dark void (#001122). A swarm of 12-20 AI fireflies (#AAFF00) flashes in a chaotic, emergent pattern that gradually synchronizes over time. The player must observe the swarm's pulse and click/tap to flash their own firefly (#FFFFFF) in sync with the majority beat. 

Core Mechanics: The swarm has a 'sync meter' (0-100%). When sync is low, flashes are random. As time passes, AI agents adjust phase to neighbors, creating a visible pulse. The player's click is evaluated against the swarm's current dominant phase. If within a tight tolerance (e.g., ±100ms of the peak), the player 'joins' the swarm for that cycle, gaining score. If outside tolerance, it counts as a desync.

Fail Condition: 5 desyncs cause the swarm to scatter (game over). Win Condition: Successfully sync with 3 distinct swarm cycles (each cycle lasts ~10 seconds of stable high sync). Score is based on total time maintained in sync.

Visuals: Use additive blending for glow effects. Fireflies are small circles with radial gradients. The player's firefly is distinct (white). HUD shows desync count (5 dots) and current swarm sync level. Use Gill Sans for HUD text. No external assets. Ensure the game is playable in one viewport.

Layout & Responsiveness: The canvas must fill the entire viewport (100vw, 100vh) with no scrollbars. On desktop, the swarm should spread across the center 80% of the screen. On mobile, the swarm density should adjust to prevent overlap, keeping fireflies within the safe touch area. The HUD should be fixed at the top-left for desktop and top-center for mobile to avoid thumb occlusion. 

Motions & Physics: Fireflies move via a gentle random walk (Perlin noise or simple vector drift) bounded by screen edges. When the swarm syncs, their movement should subtly align, creating a 'breathing' motion. On desync, fireflies should exhibit a slight recoil or jitter. The player's flash should have a decay animation (opacity fade over 200ms). 

Constraints: No external libraries. All code in one file. Use requestAnimationFrame for the game loop. Ensure touch events prevent default scrolling behavior. 

Acceptance Criteria: 1. Game starts on a 'Click to Begin' overlay. 2. Swarm synchronizes visibly within 15 seconds. 3. Player clicks register accurately. 4. Game over screen shows final score and 'Restart' button. 5. Performance remains smooth on mid-range devices.
