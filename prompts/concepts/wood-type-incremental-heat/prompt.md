# Wood Type Incremental Heat

Create an interactive typography specimen featuring large, chunky wooden letterpress blocks. The surface is matte, porous wood with visible grain.

**Visual Rules:**
1. **Material:** Each letter is a 3D-ish block with a visible top face (inked) and side faces (wood). Use CSS `box-shadow` and gradients to simulate depth and grain.
2. **Heat Metaphor:** The cursor acts as a 'heat source.' As the cursor moves over a letter, the wood appears to 'warm up' — the grain expands slightly (scale 1.02-1.05), and the ink color shifts subtly towards a lighter, drier tone (desaturation + brightness).
3. **Cooling:** When the cursor leaves, the letter cools down, contracting back to its original size and restoring the deep, saturated ink color.
4. **Grain Reveal:** The 'heating' effect should also increase the visibility of the wood grain texture overlay, as if the heat is making the wood fibers rise.

**Deliverable:** A single line of large text where each character independently responds to the cursor's proximity with thermal expansion and color shift.
