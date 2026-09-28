# Glazed Porcelain Crackle — Extended Brief

## Concept
This animation explores the moment of cooling in high-end ceramics. It captures the tension between the smooth, solid surface and the delicate, structural fractures (crackle glaze) that occur as the material settles. It’s a study in fragility and precision.

## Palette
- **Porcelain Base**: `#F5F5F3` (Warm white, not pure white)
- **Shadow/Crack**: `#D1CCC0` (Soft grey-taupe)
- **Deep Crack/Crevice**: `#4A4A45` (For subtle depth hints)
- **Glaze Highlight**: `#C4A484` (Warm, golden-beige light interaction)
- **Background**: `#E8E6E1` (Neutral, museum-wall tone)

## Typography
- **Font**: *Optima* or *Gill Sans* (Humanist sans-serif). Clean, elegant, with slight calligraphic influences that match the organic crackle.
- **Weight**: Light.
- **Color**: `#4A4A45`.
- **Position**: Centered, low opacity (50%), fading in *after* the crackle settles.

## Layout
- **Desktop**: Full-viewport canvas. Text overlay centered.
- **Mobile**: Full-viewport, slightly zoomed in for more macro detail.

## Motion Brief
1.  **Entrance (0-2s)**: The screen starts with a blurred, soft white field. Focus pulls in to reveal the porcelain texture.
2.  **The Crackle (2-15s)**: A procedural animation of line growth. It shouldn’t look like drawing; it should look like *stress relieving*. Lines branch and merge naturally. Speed varies—fast micro-cracks, slow major fissures.
3.  **Light Interaction (Loop)**: A subtle gradient overlay moves across the screen, simulating a light source moving over a 3D surface. The 'cracks' should catch this light, creating momentary glints.
4.  **Ambient**: Extremely subtle noise/grain overlay to prevent banding and add tactile feel.

## Constraints & Acceptance
- **Object Honesty**: Must look like ceramic, not plastic or stone.
- **Performance**: 60fps. No heavy DOM manipulation; use Canvas/WebGL.
- **No UI Chrome**: No buttons, no nav. Just the object and the motion.
- **Subtle**: The crackle should be *refined*, not shattering. Think 'antique vase', not 'broken windshield'.

## Variants
- **A**: Celadon Green tint (#A2C6C9) on crackle lines instead of grey.
- **B**: 'Gold Kintsugi' variant where cracks fill with gold (#D4AF37) instead of darkening.
