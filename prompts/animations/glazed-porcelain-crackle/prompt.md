# Glazed Porcelain Crackle

Create a high-fidelity animation of a white porcelain surface cooling and settling.

**Visuals:**
- Base: Smooth, off-white matte porcelain (#F5F5F3).
- Action: As the surface cools, a network of fine 'crackle' lines (celadon-style) spreads organically across the surface. The lines are subtle (#D1CCC0), not aggressive.
- Lighting: A soft, warm highlight (#C4A484) sweeps slowly across the surface, interacting with the 'depth' of the cracks via shadowing and subsurface scattering effects.
- Texture: Add subtle grain/noise to the porcelain to avoid plastic look.

**Motion:**
- Crackle spread: Slow, organic, non-linear (use Perlin noise or similar for spread logic).
- Light sweep: Slow, elegant pan (15s loop).
- Entrance: Fade in from a slightly out-of-focus state to sharp macro detail.

**Tech:**
- Use Canvas API or WebGL shader for efficient crackle rendering.
- CSS filters for initial focus/blur transition.
