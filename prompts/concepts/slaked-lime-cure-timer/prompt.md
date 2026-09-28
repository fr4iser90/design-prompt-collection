# Slaked Lime Cure Timer

Create a UI component representing a 'Cure Timer' for architectural materials.

**Visual Metaphor**:
The progress bar is not a fill, but a **material transformation**. 
- **0%**: Rough, porous, dark grey slaked lime paste (wet, uneven surface).
- **50%**: Becoming chalky, lighter grey, starting to crackle slightly.
- **100%**: Smooth, dense, bright white limestone surface (dry, solid).

**Layout**:
- A circular or rounded-rectangular container representing the 'surface'.
- Use CSS filters and background blends to simulate the texture shift.
- Typography: Small, technical monospace for the timer value (e.g., `48h:12m`).

**Motion**:
- The transition from grey/rough to white/smooth is slow and non-linear (simulating chemical cure).
- Subtle 'breathing' effect on the texture when idle (like drying plaster).

**Constraints**:
- No standard progress bars.
- Use noise textures for the rough state.
- High contrast between the 'wet' dark phase and 'dry' bright phase.
- Clean, brutalist framing around the material sample.
