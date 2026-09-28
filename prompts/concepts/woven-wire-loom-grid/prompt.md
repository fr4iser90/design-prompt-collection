# Woven Wire Loom Grid

Build a navigation menu where each item is a **single taut wire** crossing the viewport or container.

**Visual Metaphor**:
- Wires are thin, metallic lines (2px–3px).
- They cross each other in a grid-like arrangement (not perfectly orthogonal, slightly offset for depth).
- **Over/Under Logic**: When wires cross, one passes over the other. This 'weave' pattern should be consistent or dynamically determined by hover state.

**Interaction**:
- **Hover**: The hovered wire 'tightens' (scales slightly in Y-axis to appear taut) and vibrates subtly. The wires it crosses 'yield' (dip down) to let it pass over.
- **Click**: The wire snaps into a highlighted state (glowing edge) and triggers the navigation.
- **Rest**: Wires have a very subtle, slow undulation (like hanging cables in a breeze).

**Style**:
- Background: Off-white or light concrete grey.
- Wires: Silver/Steel gradient. No solid colors.
- Labels: Small, sans-serif text attached to the end of each wire, rotating slightly to follow the wire's angle.

**Constraints**:
- No rectangular buttons.
- Focus on the **tension** and **depth** of the crossing wires.
- Use SVG paths for precise control of the 'over/under' illusion.
