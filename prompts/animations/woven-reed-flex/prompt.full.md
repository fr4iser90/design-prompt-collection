# Woven Reed Flex — Extended

**Concept:**
"Structure through Tension." This animation focuses on the mechanical honesty of woven materials. Unlike rigid structures (wood, metal), wicker holds its form through the elastic limit of its components. The animation demonstrates this resilience: a force is applied, the material deforms, and it recovers.

**Palette:**
- **Raw Reed:** `#d2b48c` (Tan, warm neutral)
- **Shadowed Reed:** `#8b7355` (Deep tan)
- **Background/Deep Shadow:** `#3a2e1d` (Dark brown, not black)
- **Highlight:** `#f5e1c4` (Warm cream)

**Material & Texture:**
- **Reed:** Smooth, slightly glossy finish. Visible longitudinal fibers.
- **Weave Pattern:** Simple over-under interlace. Tight spacing.

**Motion Design:**
1.  **Rest State:** Strands are straight, parallel, evenly spaced.
2.  **Tension Phase (0-1.5s):** A central point pulls outward (Z-axis or X-axis). The vertical strands bow outward. The horizontal strips tighten, becoming less visible as they compress.
3.  **Release Phase (1.5-2.5s):** The force is removed. Strands snap back.
4.  **Damping (2.5-4s):** Oscillations decrease in amplitude until rest. Slight secondary motion in the ends of the strands.

**Technical Implementation:**
- **Three.js:** Model a single reed as a cylinder with a bendable geometry (using `SkinnedMesh` or vertex shader displacement based on distance from center). Apply a cloth-like or soft-body physics constraint.
- **CSS/SVG:** If using 2.5D, use `clip-path` or SVG paths with animated `d` attributes. Simulate curvature using `border-radius` or `transform: perspective()`. This is harder to make realistic.
- **Lighting:** Use a directional light to cast dynamic shadows from the bending strands onto the strands behind them.

**Constraints Checklist:**
- [ ] Motion must feel elastic, not rubbery.
- [ ] Shadows must update dynamically with the bend.
- [ ] No UI elements.
- [ ] Focus on the *interlocking* nature (show how one strand holds another).

**Acceptance Criteria:**
The animation should convey the tactile sensation of touching and flexing a wicker chair. The physics must feel weightless yet resistant.
