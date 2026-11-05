## Concept
'Hydrostatic Lock Drag' is a tactile physics toy disguised as a high-stakes industrial simulation. Players act as a dam operator, manually balancing inflow and outflow using three physical valve handles. The fantasy is one of precise mechanical control amidst chaotic natural forces. The core tension comes from the delay between turning a valve and seeing the water level change, requiring anticipation rather than reaction.

## Core loop
Verb: Drag valve handles to adjust outflow. Risk: Turbulent inflow spikes cause water to rise rapidly; over-draining causes dry-out. Reward: Maintaining the water level within the 'Safe Zone' for 60 seconds. Reset: Immediate restart on breach or dry-out.

## Input
- **Pointer:** Click and drag any of the three valve handles (Left, Center, Right). Rotation angle maps directly to valve openness (0% to 100%). Dragging feels 'heavy' due to simulated viscous resistance (damping factor).
- **Keyboard:** Up/Down arrows adjust the openness of the currently hovered valve by 5% increments for fine-tuning.
- **Interaction:** Click on 'Debris' blocks (randomly appearing on valves) to clear them and restore full valve functionality.

## Fail / win
- **Fail Condition:** 
  1. **Breach:** Water level exceeds 85% of tank height. 
  2. **Dry-out:** Water level drops below 15% of tank height.
  - On fail, the screen flashes red, water drains rapidly, and the game resets to the start screen.
- **Win Condition:** Survive 60 seconds without hitting fail conditions.
- **Scoring:** Score is calculated as `1000 - (average deviation from 50% water level * 10)`. Lower deviation yields a higher score. Display final score on win.

## Entities
1. **Player Valves (3):** 
   - **Left Valve:** Controls primary outflow. High capacity, slow response.
   - **Center Valve:** Controls secondary outflow. Medium capacity, medium response.
   - **Right Valve:** Controls emergency drain. Low capacity, fast response.
   - Each valve is a circular handle with a distinct grip pattern. Rotation is clamped to 0-360 degrees.
2. **Water Tank:** 
   - Central vertical rectangle. 
   - **Safe Zone:** Green horizontal band (40-60% height). 
   - **Danger Zones:** Yellow (60-85%), Red (>85%), Blue (<15%).
   - **Water Level:** Dynamic height, rendered with sine-wave surface turbulence.
3. **Hazards:**
   - **Turbulent Spikes:** Random events that temporarily double the inflow rate. Visualized by increased water surface choppiness and a warning icon.
   - **Debris:** Blocks a random valve, reducing its max openness to 20%. Must be clicked to clear.

## Feel
- **Tactile:** Valve rotation should feel resistant. Use easing functions to simulate inertia. Handles should glow #64FFDA when being dragged.
- **Visceral:** Screen shake intensity increases as water level approaches the 85% breach line. 
- **Audio (Optional):** Low-frequency hum for water flow, pitch increases with flow rate. Click sound for valve rotation. Alarm sound for breach warning.
- **Visuals:** Water color #64FFDA with white surface highlights. Background #0A192F. HUD elements in #FFD700 for warnings, #64FFDA for safe states.

## Palette
- **Background:** #0A192F (Deep Navy)
- **Water/Safe:** #64FFDA (Bright Cyan)
- **Warning/Danger:** #FFD700 (Gold)
- **Text/HUD:** #FFFFFF (White)
- **Valve Handles:** #334155 (Slate Gray) with #64FFDA accents.

## Type
- **Display:** Oswald (Bold, Uppercase) for Title and Game Over screens.
- **Body/HUD:** IBM Plex Mono (Regular) for timer, score, valve status, and water level percentages.

## Layout & Responsiveness
- **Desktop Layout:** The main tank is centered horizontally, occupying 40% of the canvas width. The three valve handles are arranged in a horizontal row directly below the tank base. HUD elements (Timer, Score, Status) are positioned in the top corners to avoid obstructing the play area.
- **Mobile Layout:** The tank expands to 60% of the canvas width for better visibility. Valve handles are arranged in a compact horizontal row or a vertical stack below the tank to accommodate thumb reach. Touch targets for valves and debris must be at least 44x44 pixels.
- **Scaling Strategy:** The canvas should dynamically resize to fit the browser window while maintaining a 16:9 aspect ratio. If the window aspect ratio differs, apply letterboxing (black bars) to preserve the game's visual integrity. All game coordinates should be normalized or scaled relative to the canvas dimensions to ensure consistent gameplay across devices.

## Motions & Animations
- **Valve Interaction:** When a user drags a valve, the rotation should follow the pointer with a slight lag (damping factor of 0.8) to simulate mechanical resistance. Upon release, the valve should settle into its new position using a cubic-bezier easing function, creating a sense of weight and inertia.
- **Water Dynamics:** The water surface is rendered using a continuous sine wave animation. The amplitude of the wave increases proportionally to the current turbulence level. During 'Turbulent Spikes', the frequency of the wave also increases, creating a choppier, more chaotic visual.
- **Screen Shake:** Implement a screen shake effect by applying random translation offsets to the canvas context. The intensity of the shake is proportional to how close the water level is to the breach threshold (85%). Shake should be subtle at 80% and violent at 84%.
- **UI Transitions:** Use fade-in and fade-out transitions for game state changes (Start, Play, Game Over). The 'Game Over' screen should overlay the game with a semi-transparent dark layer, displaying the score and a 'Restart' button that pulses gently to invite interaction.

## Constraints
- **Single File:** All HTML, CSS, and JS must be in one file.
- **No Libraries:** Use vanilla JS and Canvas 2D API only.
- **Performance:** Maintain 60 FPS. Optimize water rendering (simple heightfield, not particle system).
- **Responsiveness:** Canvas should resize to fit the window while maintaining aspect ratio.
- **Accessibility:** High contrast between water and background. Clear visual indicators for danger zones.

## Acceptance criteria
1. **Playability:** Game starts immediately or after a simple 'Start' click. Water level changes visibly when valves are adjusted.
2. **Fail States:** Game ends and resets if water level goes above 85% or below 15%.
3. **Win State:** Game ends and displays score after 60 seconds of survival.
4. **Input:** Mouse drag rotates valves. Keyboard arrows adjust hovered valve. Clicking debris clears it.
5. **Visuals:** Water surface has wave animation. Valve handles rotate smoothly. Colors match palette.
6. **Code:** No external dependencies. Code is clean and commented.
7. **Performance:** No lag during turbulent spikes. FPS remains stable.
8. **Responsiveness:** Game layout adapts correctly to mobile and desktop viewports without breaking element positioning.

Deliverable: single-file HTML/CSS/JS.

## Type pairing
Oswald (Display) + IBM Plex Mono (Body/HUD)


## Motion
- entrance: Water level rises from bottom with realistic wave turbulence
- ambient: Surface tension ripples propagate from moving valves
- interaction: Valve handles rotate 360° with viscous resistance feedback
