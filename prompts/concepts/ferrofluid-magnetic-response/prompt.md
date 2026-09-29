# Ferrofluid Magnetic Response

Simulate a shallow pool of ferrofluid reacting to a magnetic cursor.

**Visual Rules:**
1.  **Surface:** Deep black, highly reflective surface (`#000000`). Use environment mapping to reflect a subtle studio light (`#e0e0e0` highlights).
2.  **Fluid Dynamics:** The fluid should be viscous. Slow to start moving, slow to stop.
3.  **Spiking:** When the cursor (magnet) is near, the fluid forms sharp, conical spikes (Rosensweig instability). Spikes should have specular highlights on their edges.
4.  **Pools:** Away from the magnet, the fluid settles into a calm, mirror-like pool.
5.  **Interaction:** 
    - *Hover:* Spikes form. Closer = taller, sharper spikes.
    - *Move:* Fluid drags behind cursor with delay.
    - *Click:* 'Collapse' the fluid into a flat surface, then rapidly re-spikes.
6.  **Typography:** None. Purely visual. Minimal UI icon for 'Reset' in corner.

**Deliverable:** WebGL implementation (Three.js or raw GLSL) simulating height-field fluid.
