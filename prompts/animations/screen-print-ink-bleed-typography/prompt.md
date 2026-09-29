# Screen Print Ink Bleed

Create a looping animation simulating heavy screen-printed type on textured paper.

1. **Visuals**: A large, monumental serif letter (e.g., 'A' or 'K') in opaque black ink (#0F0F0F) on a warm off-white cotton paper background (#F5F2EA). The paper texture should be visible (subtle noise/grain).
2. **Motion**: The ink is not static. It exhibits a slow, viscous 'bleed' effect. The sharp vector edges of the letter slowly soften and feather outwards, as if the ink is soaking into the paper fibers over 3-4 seconds.
3. **Detail**: Highlight the 'misregistration' aesthetic where the black ink might slightly overlap a faint cyan or magenta underlayer, shifting subtly.
4. **Loop**: The bleed resets smoothly or holds at the maximum softness before fading back to sharp edges.
5. **Constraints**: No digital glow. Use SVG filters (feTurbulence + feDisplacementMap) for the organic bleed. Keep the motion slow and heavy, not jittery.
