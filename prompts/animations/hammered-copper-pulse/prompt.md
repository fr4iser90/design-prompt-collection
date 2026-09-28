# Hammered Copper Pulse

Simulate a flat sheet of hammered copper that responds to subtle, invisible pressure points, creating ripples that behave like liquid metal but retain solid-state friction.

**Visuals:**
- Material: Hammered copper. Visible dimples/indentations from hammering.
- Color Palette: Rich copper (#B87333) with high-contrast specular highlights (#F4C430) and deep shadows (#2C1A14).
- Texture: Use a normal map to create the hammered texture. The ripple effect should deform this texture, not just scale it.

**Motion:**
- Interaction: Mouse hover or periodic 'pulse' (every 5s) triggers a ripple from the center/pointer.
- Physics: High damping. Ripples should be slow, heavy, and viscous. Not water-fast.
- Light: Specular highlights must move realistically across the deformed surface.

**Tech:**
- WebGL (Three.js or raw GL) for vertex displacement.
- Custom shader for 'hammered' noise combined with sine-wave ripples.
