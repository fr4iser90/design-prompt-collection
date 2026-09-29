# Volcanic Ash Layer Accumulator

Create a calm, meditative visualization of ash falling and layering.

**Visual Rules:**
1.  **Palette:** Strictly gray-scale, ranging from deep charcoal (`#2c2c2c`) to light ash (`#d9d9d9`).
2.  **Particles:** Thousands of small, irregular particles falling slowly. No wind; vertical drop only.
3.  **Accumulation:** As particles hit the bottom, they stick, forming a growing mound. New particles land on top of old ones.
4.  **Texture:** The accumulated mass should have a grainy, noisy texture. Use a noise map to displace vertices on the accumulated mesh.
5.  **Lighting:** Single directional light from top-left, casting long, soft shadows within the ash folds.
6.  **Interaction:** 
    - *Scroll:* Increases/decreases fall rate.
    - *Click:* 'Rain' burst—dense cluster of particles.
    - *Hover:* Repels particles slightly (wind effect).
7.  **Typography:** Minimal counter of 'layers' or 'depth' in light gray (`#6b6b6b`) using a sans-serif like Helvetica Neue or Inter (clean, neutral).

**Deliverable:** WebGL/Three.js scene with instanced mesh for particles and height-field for accumulation.
