# Carbon Fiber Weave Configurator

Design a 3D-style product configurator for carbon fiber components.

**Core Metaphor:**
- The product (e.g., a laptop shell or car panel) is made of carbon fiber.
- Users don't just pick a "color"; they pick a **weave pattern** (twill, plain, herringbone) and a **finish** (gloss, matte, satin).
- The visual difference is driven by **light reflection** on the fibers, not color change.

**Interaction:**
- Changing weave type rotates the texture angle and shifts the highlight hotspot.
- Changing finish alters the specular highlights (gloss = sharp, matte = diffuse).
- Dragging on the object rotates it to show how light plays across the fibers from different angles.

**Visual Style:**
- **Background:** Deep charcoal (`#111111`) with a subtle vignette.
- **Lighting:** Two studio lights: one cool white (`#f8f8f8`) from top-left, one warm amber from bottom-right.
- **UI:** Minimal, monospaced type for specs. Thin lines connect UI labels to the object.
