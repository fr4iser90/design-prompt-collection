# Letterpress Emboss Deform

**Objective:** Animate a headline entering the screen by physically pressing *into* the background, simulating a deep letterpress deboss.

**Visual Rules:**
1. **Substrate:** A flat, matte paper background (`#E6E6E6`). 
2. **Text:** White (`#FFFFFF`) or very light grey, relying entirely on shadow for definition.
3. **Shadow Logic (Crucial):** 
   - As text 'presses' down (Z-axis translation), increase the offset of a drop shadow.
   - Light source is top-left.
   - **Top/Left edge:** Add an inset shadow (dark) to simulate the paper folding over the edge of the hole.
   - **Bottom/Right edge:** Add a drop shadow (light/highlight) to simulate the paper bulging up on the opposite side.
4. **Motion:** 
   - Start: Text floats slightly above paper (large soft shadow).
   - Action: Text moves down Z-axis (`translateZ`).
   - End: Text is flush with paper, but the *shadows* remain deep, showing the indentation.
   - Use a heavy `cubic-bezier(0.2, 0.8, 0.2, 1)` to feel weighty.

**Deliverable:** CSS/JS animation that reacts to hover (press) or loops a 'stamp' cycle.
