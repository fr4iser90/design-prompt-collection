# Cutout Collage Layer Shift

Create an animation of layered paper cutouts shifting in Z-space.

1. **Visuals**: 3-4 distinct layers of paper shapes (rectangles, torn edges, circles) in bold colors (Red, Teal, Off-White) on a Dark Grey background. Each layer has a subtle drop shadow to indicate depth.
2. **Motion**: The layers slide horizontally at different speeds (parallax). 
   - Layer 1 (Front): Fastest, slides left.
   - Layer 2 (Middle): Medium speed, slides right.
   - Layer 3 (Back): Slowest, static or slight drift.
3. **Reveal**: As layers slide, they uncover bold typography or abstract shapes on the base layer.
4. **Edge Detail**: The edges of the paper layers should look 'cut'—not perfectly vector smooth, but with slight irregularities (use SVG path noise or CSS `clip-path` with polygon points that mimic hand-cutting).
5. **Loop**: Seamless loop where shapes exit one side and re-enter the other, maintaining rhythm.
