Build a single-file HTML5 Canvas game: **Turbine Blade Cutoff**.

**Visuals:** Dark industrial aesthetic (#0A0A0A background). A large turbine rotor with 12 blades spins clockwise in the center. A static vertical red line (#FF0000) acts as the "Cutoff Guide" on the right side. Blades are white (#FFFFFF) rectangles. The laser cutter is an orange (#FFA500) horizontal beam that fires momentarily on input.

**Mechanics:**
1. **Rotation:** The turbine starts spinning at a base speed. Every successful cut increases speed slightly (difficulty ramp).
2. **The Guide:** Blades must be trimmed when they align perfectly with the static red guide mark.
3. **Input:** Press `Spacebar` to fire the laser. 
4. **Success:** If a blade tip is within a tight tolerance (e.g., < 5px deviation from the guide line center) when the laser fires, the blade is "trimmed" (shortens visually), sparks emit, and the rotor balance is maintained.
5. **Failure:** If the laser fires when NO blade is aligned (empty space) OR if a blade is cut at a significantly incorrect angle (hitting the base or missing the tip entirely due to extreme misalignment), the rotor becomes "Unbalanced". The screen shakes, the turbine wobbles violently, and the game ends (Crash).
6. **Win Condition:** Successfully trim 10 blades to spec.

**HUD:** Top center shows "Blades Trimmed: 0/10". Use Oswald for headers, Lato for stats. High contrast.

**Constraints:** Use Canvas 2D. No external assets. Keep logic in a single `requestAnimationFrame` loop. Handle state: `START`, `PLAYING`, `GAMEOVER`, `WIN`. Ensure the "wobble" effect on failure is visually distinct (rotor center shifts randomly).

**Layout & Responsiveness:**
- **Desktop:** Canvas centers in viewport. HUD overlays top-center. Laser beam extends horizontally across the right quadrant.
- **Mobile:** Canvas scales to fit width. Touch anywhere to fire. HUD remains legible with scalable font sizes. Ensure touch targets are forgiving.

**Motions & Feedback:**
- **Blade Trim:** Smooth linear interpolation (lerp) of blade length over 200ms upon successful cut.
- **Laser Flash:** Orange beam appears for 100ms, fading out rapidly.
- **Sparks:** Particle system emits 10-15 small orange/white circles outward from the cut point, affected by slight gravity and friction.
- **Unbalance:** On failure, apply a sinusoidal offset to the rotor's center coordinates (x, y) with increasing amplitude for 1 second before stopping.

**Deliverable:** Single-file HTML/CSS/JS.
