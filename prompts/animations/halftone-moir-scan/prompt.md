# Halftone Moiré Scan

**Objective:** Create a background animation where three large, circular halftone grids (Cyan, Magenta, Yellow) overlap and rotate at slightly different speeds, generating dynamic moiré patterns that coalesce into a readable headline.

**Visual Rules:**
1. **Technique:** Use CSS `radial-gradient` to create repeating dot patterns, or an SVG pattern mask.
2. **Colors:** 
   - Cyan Layer (`#00A0E3`)
   - Magenta Layer (`#EC008C`)
   - Yellow Layer (`#FFF200`)
   - Use `mix-blend-mode: multiply` on all layers against a white background.
3. **Motion:** 
   - Layer 1 (Cyan): Rotates 0.5deg/sec clockwise.
   - Layer 2 (Magenta): Rotates 0.45deg/sec counter-clockwise.
   - Layer 3 (Yellow): Static or rotates very slowly.
4. **Resolution:** The dots should be large enough to see individually (macro print style), approx 10-15px spacing.
5. **Typography:** The headline should be masked by the interference pattern or sit on top with high contrast (black).

**Deliverable:** A looping background animation that creates a shifting optical texture behind static editorial text.
