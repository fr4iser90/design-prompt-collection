# Bioluminescent Spore Dispersion — Extended

**Concept:**
Capture the fleeting magic of a night forest where fungi emit light. The scene is not about control, but about presence. The user’s movement disturbs the stillness, causing spores to scatter like disturbed dust, but their light lingers.

**Palette:**
- **Void:** `#050a0f` (Deep blue-black, not pure black, to retain depth)
- **Glow Core:** `#00f5d4` (Bright cyan-green bioluminescence)
- **Glow Halo:** `#0a2a2a` (Desaturated teal for ambient scattering)
- **Foliage Hint:** `#0f1a14` (Very dark, barely visible leaf shapes in background layers)

**Type Pairing:**
- None. This is a pure visual field. If UI is needed, use a thin, light sans-serif (e.g., Helvetica Neue Thin) in white with 40% opacity, bottom-left corner only.

**Layout:**
- Full-screen canvas.
- No scroll. Interaction is purely spatial via mouse/touch.

**Motion Brief:**
- **Entrance:** Spores fade in randomly across the screen over 3 seconds. No hard start.
- **Ambient:** Continuous upward drift (parallax speed variance based on 'depth'). Lateral sway uses Perlin noise for organic, non-repetitive motion.
- **Interaction:**
  - **Proximity:** Spores within 150px of cursor receive a repulsive vector force.
  - **Reaction:** On force application, particle brightness increases by 20% for 0.5s, then eases back.
  - **Trail:** Optional subtle trail effect if user moves fast, but keep it restrained.

**Constraints Checklist:**
- [ ] No purple or magenta hues.
- [ ] No cottagecore aesthetic (no fairies, no cute shapes).
- [ ] Performance: Use GPU-accelerated particles.
- [ ] Contrast: Ensure glow is visible against the dark background without blowing out.

**Acceptance Criteria:**
- Feels calm, not frantic.
- Spores react intuitively to mouse.
- Dark mode optimized.
