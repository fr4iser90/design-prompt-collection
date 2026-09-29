# Aluminum Knob Torque

Implement a draggable UI knob that mimics a heavy, precision-machined aluminum dial.

1. **Visuals**: Circular knob with a brushed metal texture (`linear-gradient` repeating-linear-gradient) and a single dark indicator notch. 
2. **Interaction**: On drag, the knob rotates. 
3. **Physics**: Implement 'magnetic detents'—the knob should resist rotation slightly, then 'snap' to 12 discrete positions (30-degree increments). 
4. **Easing**: Use a heavy spring simulation (high friction, low tension) so the knob feels weighty, not floaty. 
5. **Feedback**: The indicator notch brightens slightly when snapped into place.
