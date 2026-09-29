# Cargo Manifest Ink Stamp

Create a document verification interface for 'PortLogistics'.

**Visual Rules:**
- **Paper:** Aged, off-white paper (#f5f5f0) with a subtle fiber texture. Not cream, not yellow.
- **Type:** Courier New or similar typewriter font for the manifest data. Stencil font for the stamp.
- **Ink:** Deep, matte red (#d62828). Not glossy.

**Interaction & Motion:**
1. **Drag Stamp:** Users drag a virtual rubber stamp icon from a tray to a designated "APPROVED" box on the document.
2. **Rotation:** While dragging, the stamp rotates slightly based on cursor velocity (simulating hand wobble).
3. **Press:** On release, the stamp "presses" down (scale down slightly, shadow deepens) and releases ink.
4. **Ink Bleed:** The stamped impression is not a perfect vector. It uses a mask with noise/blur to simulate ink bleeding into paper fibers. The ink density varies based on "pressure" (drag speed/duration).

**Deliverable:** A static HTML page with one manifest document and one draggable stamp. No backend; just front-end physics simulation.
