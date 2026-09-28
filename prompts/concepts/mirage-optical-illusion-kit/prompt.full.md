# Mirage Optical Illusion Kit — Extended Brief

**Concept**
A playful yet refined UI kit that explores the visual phenomena of mirages and heat haze. Instead of solid, grounded UI elements, these components feel transient, as if they exist in a state of flux due to environmental conditions.

**Palette**
- **Base:** Sun-Bleached White (`#FAF9F6`) - overexposed, high-key.
- **Border:** Dry Sand (`#E8E0D5`) - barely visible, requiring user attention.
- **Active:** Dune Shadow (`#A69B8D`) - used for focus states and active elements.

**Typography**
- **Primary:** 'Helvetica Now' (Display Thin) or 'Inter' (Light 300). The font must be light and airy to enhance the 'heat' effect.

**Layout**
- **Desktop:** Centered column, ample whitespace (min 200px padding). Components are spaced generously to allow the 'haze' effects to breathe.
- **Mobile:** Single column, full-width components. The distortion effects should be less intense to prevent readability issues on small screens.

**Motion & Effects**
- **Global Filter:** Apply a subtle SVG filter with `feTurbulence` (baseFrequency ~0.01) and `feDisplacementMap` (scale ~2) to the entire container. This creates a permanent, low-frequency distortion.
- **Input Focus:** Increase displacement scale to 5 and shift turbulence phase for a 'ripple' effect.
- **Button Hover:** Add a radial gradient overlay (white to transparent) that moves with the cursor, simulating light reflection on hot asphalt.
- **Toggle Drag:** Implement a 'trail' effect by rendering previous positions of the knob with decreasing opacity (0.3, 0.2, 0.1) during drag.

**Constraints**
- Text must remain legible. Test contrast ratios carefully.
- Performance: SVG filters can be expensive. Use `will-change: filter` sparingly and only on interactive elements.
- No heavy animations. The movement should feel like slow, natural air currents.

**Acceptance Criteria**
- Users report the UI feels 'dreamlike' or 'unstable' in a controlled way.
- Interactions are smooth and do not cause layout shift.
- The 'heat haze' effect is consistent across the entire kit.
