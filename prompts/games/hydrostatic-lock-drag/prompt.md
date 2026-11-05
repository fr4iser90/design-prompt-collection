Build a single-file HTML5 Canvas game: 'Hydrostatic Lock Drag'.

**Visuals:** Dark industrial aesthetic (#0A192F background). Central vertical tank (width 40% of canvas) with a visible water level. Three large circular valve handles (Left, Center, Right) positioned below the tank. Use Oswald for titles, IBM Plex Mono for HUD numbers. Water is #64FFDA with semi-transparent white surface highlights. Danger zones are #FFD700.

**Core Mechanics:**
1. **Fluid Sim:** Simple 1D heightfield. `waterLevel` changes based on `inflowRate` (random spikes) minus `outflowRate` (sum of valve openings). Add sine-wave turbulence to the surface rendering.
2. **Valves:** Each valve has an `openness` (0-1). Dragging the handle rotates it. Rotation maps to openness. Add 'viscous resistance': rotation speed is dampened, requiring deliberate drag.
3. **Pressure/Hazards:** Random 'Turbulent Spikes' increase inflow temporarily. 'Debris' occasionally blocks a valve (reducing max openness) until clicked to clear.

**Game Loop:**
- **Start:** Water at 50%. Timer 60s.
- **Play:** Adjust valves to keep water level within the 'Safe Zone' (green band, 40-60% height). 
- **Fail:** Water > 85% (Breach) or < 15% (Dry). 
- **Win:** Survive 60s. Score = 1000 - (average deviation from 50% * 10).

**Input:**
- Mouse/Touch: Click and drag valve handles to rotate. Click debris to clear.
- Keyboard: Up/Down arrows adjust the currently hovered valve's openness by 0.05.

**Feedback:**
- Screen shake on near-breach (>80%).
- Valve handles glow #64FFDA when active.
- Water surface ripples more aggressively during spikes.

**Constraints:**
- No external libraries. Pure JS/Canvas.
- Responsive canvas size.
- High contrast for readability.
- Must be playable in one sitting.

**Layout & Responsiveness:**
- **Desktop:** Tank centered, valves arranged horizontally below. HUD top-left (Timer/Score), top-right (Status).
- **Mobile:** Tank takes 60% width. Valves arranged vertically or in a tight row below. Touch targets min 44px.
- **Scaling:** Canvas resizes to window, maintaining 16:9 aspect ratio with letterboxing if needed.

**Motions & Animations:**
- **Valve Rotation:** Smooth easing (cubic-bezier) on drag release to simulate weight.
- **Water Surface:** Continuous sine wave animation, amplitude increases with turbulence.
- **Screen Shake:** Random offset translation on canvas context during critical warnings.
- **Transitions:** Fade-in for game start, fade-out for game over.

**Acceptance Criteria:**
1. Game runs at 60FPS on mid-range devices.
2. Water level responds visibly to valve changes within 200ms.
3. Fail/Win states trigger immediately upon condition met.
4. No console errors.

Deliverable: single-file HTML/CSS/JS.
