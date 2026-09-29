# Photo Grain Developing Scan

Create an animation simulating a photograph developing in a darkroom scanner.

1. **Visuals**: A high-contrast black and white portrait or abstract editorial photo. 
2. **Effect**: The image is initially 'negative' (inverted colors) and heavily grainy.
3. **Motion**: A horizontal 'scanline' (a thin, bright band, possibly with a slight red tint #FF5733 to mimic safelight) moves from top to bottom.
4. **Transformation**: As the scanline passes, the image section above it flips to 'positive' (normal colors) and the grain density reduces, becoming finer and more settled.
5. **Grain**: Use an animated SVG noise or CSS canvas grain that is chaotic above the line and static below it.
6. **Loop**: Once the scan completes, the image holds for 2 seconds, then resets to negative/grainy state.
7. **Typography**: Minimal, monospace caption text appears in the bottom corner after the scan completes.
