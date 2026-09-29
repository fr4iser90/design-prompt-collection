# Aluminum Knob Torque — Extended

## Concept
A tactile UI control that rejects the 'flat' web aesthetic in favor of industrial realism. This is not a volume slider; it is a mechanical interface element designed to feel like the dial on a vintage radio or a modern hi-fi amplifier. The 'soft-machine' aspect comes from the lack of visible gears—the resistance is felt through motion alone.

## Art Direction
- **Material**: Brushed anodized aluminum. The brush lines should be radial, emanating from the center.
- **Finish**: Matte satin, not mirror-polished.
- **Background**: Dark charcoal (`#222222`) to make the aluminum pop.
- **Typography**: Minimal sans-serif labels (e.g., "Vol", "Input") in `#e0e0e0`, small, tracked out.

## Motion Design
- **Drag**: The knob follows the cursor/finger 1:1 horizontally, mapped to rotation.
- **Detents**: 
  - As the user drags past a 30-degree mark, the rotation should feel 'sticky' (slower).
  - Once the threshold is passed, it 'snaps' to the next position.
  - Implement with CSS `transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)` triggered on snap.
- **Inertia**: If the user flicks the knob, it should coast and settle into the nearest detent with damped oscillation.

## Technical Implementation
- Use JavaScript to track pointer delta X and map to rotation degrees.
- Calculate the nearest 30-degree increment for the snap target.
- Use `requestAnimationFrame` for the drag loop.
- Accessibility: Support arrow keys for step-by-step adjustment.
