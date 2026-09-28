# Riso Registration Shift

**Objective:** Create a looping animation of a typographic composition (e.g., the word 'PRESS' or a geometric mark) that simulates the mechanical misalignment of a two-color Riso printer.

**Visual Rules:**
1. **Palette:** Strict duotone. Ink 1: Fluorescent Orange (#FF4000). Ink 2: Fluorescent Cyan (#00FFFF). Background: Warm Off-White (#F2F2F0) with subtle paper grain noise.
2. **Layering:** Use `mix-blend-mode: multiply` on the ink layers to simulate physical pigment overlap. Overlapping areas should appear dark violet/brown.
3. **Motion:** The two color layers move independently on the XY axis using a stepped, non-linear easing (simulate mechanical gears/rollers). 
4. **Timing:** Cycle duration ~4s. 
   - 0-2s: Slight jitter and separation (misregistration).
   - 2-3s: Sharp snap into perfect registration (sharp black appearance).
   - 3-4s: Drift out again.
5. **Texture:** Apply a static SVG noise filter or CSS grain overlay to the entire container to mimic paper texture.

**Deliverable:** A single HTML/CSS/JS component that loops seamlessly.
