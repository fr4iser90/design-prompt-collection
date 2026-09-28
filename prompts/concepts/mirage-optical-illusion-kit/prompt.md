# Mirage Optical Illusion Kit

Design a set of 3 interactive UI components (Input, Button, Toggle) that mimic optical illusions caused by desert heat.

**Visual Rules:**
- Background: Sun-bleached white (#FAF9F6).
- Style: Ultra-thin borders (1px solid #E8E0D5). High-key lighting effect.
- Typography: 'Helvetica Now' (Thin) or 'Inter' (Light) - extremely minimal.
- Effect: Elements should have a permanent, subtle 'ripple' distortion applied via SVG filters, as if viewed through rising hot air.

**Interaction:**
- **Input:** Focus state triggers a 'warp' effect where the border lines bend slightly outward, simulating refraction.
- **Button:** Hover state causes the text to 'shimmer' (scale 1.01, blur 0.2px) and the background to lighten, mimicking glare.
- **Toggle:** Sliding knob leaves a faint, fading trail (ghosting effect) as if moving through thick air.

**Constraint:**
- No drop shadows. Use blur and displacement for depth. All elements must feel ephemeral and unstable.
