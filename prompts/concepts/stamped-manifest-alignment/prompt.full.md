# Stamped Manifest Alignment — Extended

**Concept**:
In an era of perfect digital pixels, this concept reintroduces the 'human error' and physicality of bureaucracy. It’s about the ritual of approval. The stamp is not a checkbox; it’s a physical act. The imperfection is the feature—it proves a human (or simulated human) made the decision. The aesthetic is dry, papery, and official.

**Palette**:
- **Paper White**: `#F4F4F0` (Aged, slightly warm)
- **Ink Black**: `#1A1A1A` (For document text)
- **Stamp Red**: `#C41E3A` (Standard office stamp red, not bright pink)

**Typography**:
- **Document**: `Courier New` (typewriter feel) or `Times New Roman` (formal legal feel).
- **Stamp Text**: Bold, sans-serif or serif, distorted by the ink filter.

**Layout**:
- **Desktop**: A central 'document' card (max-width 800px). Fields to verify are listed. Drag the stamp from a toolbar to the field.
- **Mobile**: Tap to place stamp. Simple and direct.

**Motion Brief**:
1. **Drag**: Stamp follows cursor with slight lag (inertia).
2. **Release**: 
   - Frame 1: Stamp appears slightly larger (110%).
   - Frame 2: Stamp shrinks to 100% and rotates randomly.
   - Frame 3: Ink bleed animation (opacity of the 'rough' layer increases from 0 to 1 over 200ms).
3. **Ambient**: Subtle paper grain shift on scroll to suggest the sheet is moving.

**Constraints Checklist**:
- [ ] Use SVG filters for ink bleed; do not use pre-rendered PNGs if possible (for scalability).
- [ ] Stamp rotation must be random each time.
- [ ] No drop shadows on the paper; it should look flat and printed.

**Acceptance Criteria**:
- The stamp feels 'heavy' upon release.
- The ink looks organic and imperfect.
- The overall vibe is bureaucratic yet satisfying.
