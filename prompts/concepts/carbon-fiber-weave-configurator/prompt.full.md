# Carbon Fiber Weave Configurator — Extended

**Concept:**
Carbon fiber is defined by its structure and light interaction, not pigment. This configurator focuses on the *physics* of the material: how light scatters off the fibers based on weave and finish. It’s a study in reflection and texture.

**Palette:**
- **Primary:** `#111111` (Deep black, background).
- **Secondary:** `#333333` (Shadowed carbon, base object).
- **Highlight:** `#f8f8f8` (Specular highlights, UI text).
- **Accent:** Subtle amber reflection for warmth.

**Typography:**
- **Display:** Monospaced, technical (e.g., JetBrains Mono or IBM Plex Mono) for specs and labels.
- **Body:** Clean sans-serif (e.g., Inter or Roboto) for descriptive text, kept small and grey.

**Layout:**
- **Center:** Large 3D-style object (rotating slightly in idle state).
- **Left Panel:** Weave pattern selectors (visual icons, not text-only).
- **Right Panel:** Finish options (sliders or toggles).
- **Bottom:** Real-time spec readout (weight, tensile strength) that updates with selection.

**Motion Brief:**
1.  **Entrance:** Object fades in while rotating slowly.
2.  **Ambient:** Subtle, continuous rotation (10 degrees) to keep highlights moving.
3.  **Interaction:** 
    -   **Drag:** User drags to rotate object. Lighting reacts in real-time.
    -   **Select Weave:** Texture morphs smoothly. Highlight hotspot shifts.
    -   **Select Finish:** Specular glossiness changes. Matte = soft blur; Gloss = sharp reflection.

**Constraints:**
-   No color pickers (RGB/Hex). Only material properties.
-   Lighting must be dynamic and reactive to object rotation.
-   UI must not obscure the object.

**Acceptance Criteria:**
-   Light reflection changes perceptibly when weave/finish is altered.
-   Object feels heavy and solid.
-   No flat UI cards.
