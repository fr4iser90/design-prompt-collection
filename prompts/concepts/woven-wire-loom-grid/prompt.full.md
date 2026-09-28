# Woven Wire Loom Grid — Extended Brief

## Concept
This concept reimagines the navigation menu as a mechanical loom. Each link is a thread of steel. The 'weave' represents the structure of the site—how pages connect and overlap. The tactile feedback mimics the tension of a real wire: taut, resonant, and physical.

## Visual Art Direction
- **Material**: Polished steel or aluminum. Use linear gradients to simulate cylindrical volume on the 2px stroke.
- **Depth**: The 'over/under' crossing effect is critical. Use `stroke-width` and `z-index` (or SVG drawing order) to create the illusion that one wire passes over another. Add a tiny drop-shadow *only* at the crossing point to enhance the depth.
- **Background**: Neutral, matte surface (paper or concrete). No gradients in the background.
- **Typography**: Sans-serif, small, tracked out. The label should feel like a tag attached to the wire.

## Interaction Design
1. **Hover**: 
   - The target wire scales vertically by 10–15% (tautness).
   - Color shifts from dark grey to bright silver.
   - A 'vibration' animation (subtle x/y transform jitter) plays for 200ms.
   - Crossing wires 'dip' (translate Y) to create space, reinforcing the 'over' status.
2. **Active/Focus**:
   - The wire becomes bright white with a soft glow.
   - The label expands and becomes bold.
3. **Rest**:
   - Slow, organic sine-wave motion on the Y-axis of the wires (amplitude < 2px).

## Technical Notes
- Use SVG `<path>` elements for the wires.
- Animate `d` attribute or `transform` for the dip/tension effects.
- Use CSS variables for wire color and tension strength to allow for theming.

## Acceptance Criteria
- The 'weave' effect must be clearly visible and believable.
- Interaction must feel 'heavy' and 'taut', not floaty.
- No standard hover backgrounds (no filled rectangles).
- The component should look like a physical installation.
