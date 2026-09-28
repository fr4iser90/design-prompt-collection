# Saffron Watercolor Bloom — Extended

**Concept:**
This animation captures the precise moment of culinary transformation. It is not about 'cooking'; it is about the chemistry of color. Inspired by high-end food photography and scientific fluid dynamics, it visualizes the luxury of saffron. The aesthetic is 'chef's precision' — clean, sharp, and scientifically beautiful.

**Palette:**
- **Base:** #FFFDFB (Sterile White) — Provides maximum contrast for the pigment.
- **Pigment Core:** #E31837 (Saffron Red) — The initial release color.
- **Diluted/Amber:** #FFC72C (Golden Hour) — The color as it diffuses and thins.
- **Shadow/Depth:** #D1D5DB (Cool Grey) — Subtle water depth and thread shadows.

**Typography & UI:**
- Minimal. If text is present, use a thin, modern sans-serif (e.g., 'Helvetica Neue UltraLight' or 'Inter Thin' but *customized* with wide tracking). Text should react to the fluid field, perhaps rippling slightly when pigment passes behind it.

**Layout:**
- **Desktop:** Full-bleed fluid canvas. Text overlay centered or bottom-left.
- **Mobile:** Vertical crop focusing on the initial drop point. Text stacked below.

**Motion Brief:**
1. **Entrance:** Threads fall with slight motion blur. Impact causes immediate radial ripple.
2. **Physics:** Use WebGL fluid simulation or high-quality particle system. Pigment should behave like ink in water — branching, not mixing uniformly. Turbulence increases slightly over time.
3. **Ambient:** Slow, continuous drift. No sudden jerks.
4. **Interaction:** Mouse/Touch creates a 'stir' force vector, swirling the pigment. Velocity-based interaction.

**Constraints:**
- No rustic elements (wood, clay, linen).
- No steam or smoke.
- No complex UI chrome.

**Acceptance Criteria:**
- The diffusion looks organic and non-repetitive.
- Colors are vibrant and true to life.
- Performance remains smooth (60fps) despite particle complexity.
