# Gasket Compression Seal — Extended

## Concept
This animation visualizes the critical moment of industrial integrity. It focuses on the humble rubber gasket—the component that makes machines functional. The 'soft-machine' lane here is represented by the flexible, compliant nature of the rubber versus the rigid, unforgiving aluminum plates. It is a study in force distribution and material science.

## Art Direction
- **Material 1 (Gasket)**: Vibrant industrial red (`#c44536`). Matte rubber texture. Should look pliable.
- **Material 2 (Plates)**: Brushed aluminum. Cool grays (`#dcdcdc` to `#999999`). 
- **Lighting**: Hard top-down light to cast a crisp shadow of the bulging gasket.
- **Background**: Neutral white or light gray to keep focus on the compression.

## Motion Design
- **Phase 1 (Approach)**: Top plate moves down at a constant, slow speed.
- **Phase 2 (Contact)**: The gasket touches the top plate. No deformation yet.
- **Phase 3 (Compression)**: 
  - The vertical height of the gasket decreases linearly.
  - The horizontal width (bulge) increases non-linearly (exponential ease-out) to simulate volume conservation.
  - The rubber surface should wrinkle slightly at the edges of contact.
- **Phase 4 (Seal)**: The plate stops. The gasket holds the compressed shape. A subtle 'pressure' color shift (darker red) indicates stress.
- **Loop**: Reset to open state.

## Technical Constraints
- Use SVG paths for the gasket to allow for morphing the `d` attribute (bulging sides).
- Alternatively, use CSS `scaleY` on the gasket and `scaleX` on the bulge elements.
- Ensure the 'squish' feels heavy, not like a balloon.
