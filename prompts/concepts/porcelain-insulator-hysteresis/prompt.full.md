# Porcelain Insulator Hysteresis — Extended Brief

## Concept
Hysteresis is usually depicted as a sharp, technical diagram. This concept reimagines it as a physical property of the material itself. The "loop" is a path of least resistance for energy within the porcelain, visualized as a glowing trace on a cool, white ceramic body. It emphasizes the calm, stable nature of electrical insulation.

## Palette
- **Porcelain:** `#f8f9fa` (with subtle blue-grey shadows `#dfe6e9`)
- **Void:** `#2d3436` (deep charcoal)
- **Energy Trace:** `#00b894` (soft teal, not neon)
- **Type:** `#b2bec3`

## Type Pairing
- **Display:** Söhne (Clean, Swiss, industrial)
- **Data Labels:** JetBrains Mono (for technical precision, but small and quiet)

## Layout
- **Desktop:** Centered composition. The insulator takes up 60% of the vertical height. Data readouts float in the top-right corner, updating in real-time with the trace.
- **Mobile:** Insulator fills width. Data readouts stack below.

## Motion Brief
1. **Entrance:** The insulator fades in from 0% opacity to 100% over 2s. No scale animation.
2. **Ambient:** The glowing line traces the loop continuously. The speed is constant but slow (10s per cycle). 
3. **Interaction:** 
   - **Hover:** The trace slows down by 50%. A tooltip appears showing the current H-field value.
   - **Click:** The loop is "erased" and redrawn, emphasizing the cycle.

## Constraints
- No neon glow effects. The light should feel like a reflection on the glaze.
- No jerky movements. All easing must be linear or ease-in-out with long durations.
- Avoid black backgrounds; use charcoal to maintain "softness."

## Acceptance Criteria
- The visual must feel cold and silent.
- The hysteresis loop shape must be accurate to a magnetic material (S-shape).
- Performance must remain smooth at 60fps.
