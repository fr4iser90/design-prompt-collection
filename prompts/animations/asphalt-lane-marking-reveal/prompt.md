# Asphalt Lane Marking Reveal

Create a text reveal animation that mimics road paint being applied to asphalt.

**Visuals:**
- Background: High-resolution gray asphalt texture (`#4A4A4A`) with subtle noise and grit.
- Foreground: Bright traffic yellow (`#FCC419`) thick line (10px width).
- Text: White (`#FFFFFF`), bold sans-serif (e.g., `Inter` bold or `Helvetica Neue`), positioned along or within the yellow line's path.

**Motion:**
1. **Spray:** The yellow line draws from left to right with a `stroke-dashoffset` animation.
2. **Texture Interaction:** The line should have a rough edge (SVG filter `feTurbulence` or noise mask) so it looks like it's bonding to the asphalt grain, not floating above it.
3. **Reveal:** As the yellow line passes over the hidden white text, the text becomes visible (opacity 0 -> 1) with a slight "ink soak" effect (blur -> sharp).
4. **Ambient:** Subtle heat-haze distortion over the yellow line to imply hot asphalt.

**Constraints:**
- The yellow must be highly saturated (#FCC419).
- The asphalt texture must be dark enough to provide contrast for the yellow.
- Motion speed should be steady, like a painting robot.
