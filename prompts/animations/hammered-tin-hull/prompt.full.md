# Hammered Tin Hull — Extended

**Concept:**
A tactile exploration of cold-forming soft metals. Tin is ductile and malleable; the animation focuses on how the sheet yields, stretches, and retains the history of each hammer strike. It’s a meditation on manual craftsmanship and material memory.

**Art Direction:**
- **Palette:** Cool greys and silvers (#7a8b99 to #c0c8d1) against a dark, neutral background (#2b3035).
- **Texture:** Matte, unpolished metal surface. The hammered areas should have a slightly brighter, work-hardened look.
- **Lighting:** Large, soft area light to show the gradual change in curvature. No harsh speculars; the reflection should be broad and diffused.

**Motion Design:**
1.  **Rest State:** A flat, slightly uneven tin sheet.
2.  **Strike 1:** Hammer descends rapidly, hits, and retracts. The impact causes a ripple effect in the mesh. A dent forms.
3.  **Deformation:** The metal around the dent lifts and stretches. The sheet begins to take a shallow curve.
4.  **Sequence:** Repeat strikes in a staggered pattern. Each strike adds a new facet. The overall form becomes more convex.
5.  **Final State:** A curved, dimpled hull with a complex pattern of hammer marks.

**Technical Notes:**
- Use soft-body physics or vertex displacement based on impact force.
- Ensure the metal thickness remains constant (volume conservation) during deformation.
- Subtle sound design cues: a dull 'thunk' rather than a sharp 'clank'.
