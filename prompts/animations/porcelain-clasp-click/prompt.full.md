# Porcelain Clasp Click — Extended

## Concept
Explore the 'soft-machine' aesthetic by animating a miniature mechanism made entirely of high-fired porcelain. The interaction is a simple latch or clasp mechanism that demonstrates the unexpected tactile precision of ceramic engineering. It evokes the closure of a luxury jar or a high-end audio component knob.

## Art Direction
- **Material**: Matte porcelain, not glossy. The surface should feel like fine bone china—cool, smooth, and slightly porous under macro lighting.
- **Lighting**: Soft, studio-style lighting from the top-left. The shadows should be soft and gray, not black.
- **Color Palette**: 
  - Base: `#f0f0f0` (Warm White)
  - Shadow: `#d4d4d4` (Cool Gray)
  - Highlight: `#ffffff` (Pure White specular)
  - Accent: `#a0a0a0` (Muted Silver for the central pin axis)

## Motion Design
- **Entrance**: The components are already in frame, slightly apart.
- **The Click**: 
  1. **Rotate**: Both halves rotate inward on a central Z-axis pin.
  2. **Engage**: The curved edges meet.
  3. **Snap**: A sudden, short acceleration into the locked position.
  4. **Settle**: A very subtle elastic recoil (overshoot < 2%).
- **Audio**: Critical to the experience. A high-frequency, dry 'tick' or 'clink' with no reverb.

## Technical Constraints
- Use SVG for the shapes to ensure crisp edges.
- CSS `transform: rotate()` for the motion.
- `prefers-reduced-motion`: Display a static, engaged state.
- Frame rate: 60fps target for the snap.
