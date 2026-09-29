# Emergency Stop Circuit Break

**Goal:** Animate the mechanical action of an industrial emergency stop (E-Stop) button interrupting a live circuit.

**Visuals:**
- **Subject:** A large, bright red mushroom-head E-Stop button centered on a matte, brushed steel faceplate. 
- **Circuitry:** Behind the button, visible copper busbars glow with a steady, warm orange light (representing live power). 
- **Action:** 
  1. The button depresses slowly under invisible pressure, compressing the red rubber bezel.
  2. At the bottom of the stroke, a sharp *snap* releases the internal tension.
  3. The copper contacts physically separate (a small spark arc flashes blue-white then vanishes).
  4. The orange glow on the busbars dies instantly, leaving the scene in cold, dark gray tones.
- **Typography:** A monospaced status label "CIRCUIT: LIVE" switches to "STATUS: LOCKOUT" in high-contrast white text upon break.

**Motion:**
- Use `cubic-bezier(0.1, 0.8, 0.2, 1)` for the initial slow compression to convey heavy spring resistance.
- The contact separation should be instant (frame-skip feel) followed by a subtle vibration/shake of the faceplate.
- Light fade-out is linear and immediate.

**Constraints:**
- No purple/blue tech glows. Use warm copper/orange for 'live' and cold steel for 'off'.
- The red must be safety-red (approx #D0021B), not bright cherry red.
- Maintain a static camera angle; all motion is internal to the mechanism.
