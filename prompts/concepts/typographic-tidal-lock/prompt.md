# Typographic Tidal Lock

**Concept**: A circular composition where text elements orbit a central "gravity" point. Proximity to the center increases size and weight, simulating gravitational pull.

**Visual Rules**:
1.  **Structure**: Concentric rings of text. The center is empty (negative space).
2.  **Orbit Mechanics**:
    *   Inner rings rotate faster (higher angular velocity).
    *   Outer rings rotate slower.
    *   All rings are continuous loops (text repeats seamlessly).
3.  **Typography**:
    *   Use a highly legible, wide sans-serif (e.g., Space Grotesk).
    *   Text on the "far side" of the orbit (back) should be dimmer and thinner.
    *   Text on the "near side" (front) should be brighter and bolder.
    *   Use CSS `transform: rotateX()` and `translateZ()` to create a 3D tilt perspective.
4.  **Interaction**: Mouse movement shifts the "gravity well" slightly, causing the orbits to wobble and the text to lean toward the cursor.

**Deliverable**: HTML/CSS with 3D transforms. No canvas required.
