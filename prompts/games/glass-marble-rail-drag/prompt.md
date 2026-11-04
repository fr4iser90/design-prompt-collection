Build a single-file HTML/CSS/JS top-down physics puzzle game titled 'Marble Run Architect'. The core mechanic is freeform track drawing: the user clicks and drags the mouse to create a smooth, white, semi-transparent track line. Upon releasing the mouse, the track solidifies. Pressing Space releases a batch of glass marbles from the top of the screen. The marbles must roll along the drawn tracks, obeying gravity and collision physics, to land in designated collection cups at the bottom. 

**Core Loop:** Draw track → Release marbles (Space) → Navigate obstacles → Collect in cups. 

**Entities:** 
1. **Player (Marbles):** Small, shiny glass spheres with a highlight. They have mass and bounce slightly. 
2. **Tracks:** User-drawn paths. Rendered as thick white lines with rounded caps. They act as static colliders. 
3. **Hazards:** Static red 'shatter' zones (instant fail for that marble) and moving blue blockers that oscillate horizontally. 
4. **Targets:** Yellow collection cups at the bottom. They sway gently when idle. 

**Input Map:** 
- Mouse Down: Start drawing track. 
- Mouse Move: Extend track (smooth curve interpolation). 
- Mouse Up: Finalize track segment. 
- Right-Click: Erase last track segment. 
- Space: Release marbles from the top spawner. 

**Fail/Win Conditions:** 
- **Fail:** A marble falls off the bottom of the screen without entering a cup, or touches a red hazard. 
- **Win:** All released marbles enter collection cups before the timer expires. 

**Visuals & Feel:** 
- Background: Dark slate (#2C3E50). 
- Tracks: White (#ECF0F1) with slight glow. 
- Hazards: Red (#E74C3C). 
- Cups: Yellow (#F1C40F). 
- Marbles: Light blue (#3498DB) with specular highlights. 
- Physics: Simple Verlet integration or Matter.js-like logic for circle-line collision. 
- Juice: Marbles make a subtle 'clink' visual effect (scale pulse) on collision. Cups sway on idle. 

**Deliverable:** single-file HTML/CSS/JS.
