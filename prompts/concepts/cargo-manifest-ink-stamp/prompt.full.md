# Cargo Manifest Ink Stamp — Extended

## Concept
In a digital world, physical verification feels more trustworthy. This concept gamifies the mundane task of document approval by reintroducing the tactile weight of a rubber stamp. The tension is between the clean, digital manifest data and the messy, human imperfection of the ink stamp.

## Palette
- **Manifest Paper (#f5f5f0):** A neutral, slightly warm off-white. Avoid beige/cream.
- **Ink Black (#2b2b2b):** For the printed manifest text. Slightly faded at the edges to look printed, not screened.
- **Stamp Red (#d62828):** A deep, matte crimson. Avoid bright fire-engine red.
- **Stamp Shadow (#00000040):** For the depth of the stamp hovering above the paper.

## Typography
- **Manifest Data:** Courier Prime or Courier New. Monospaced, typewriter style. Line height 1.5.
- **Stamp Text:** A custom stencil or bold sans-serif (like Bebas Neue, modified) to look like carved rubber. All caps.

## Layout
- **Document:** Centered, A4 ratio aspect. Heavy drop shadow to lift it off the page background (which is a dark wood or steel desk surface).
- **Stamp Tray:** Fixed at the bottom right. Contains the stamp icon.
- **Target Area:** A dashed box on the document labeled "VERIFICATION STAMP AREA".

## Motion Brief
1. **Hover:** When hovering over the stamp, it lifts slightly (translateY -2px) and gains a soft shadow.
2. **Drag:** As the user drags, the stamp follows the cursor with a slight lag (spring physics). It rotates based on horizontal velocity (wobble).
3. **Snap:** If released near the target, it snaps to center with a subtle bounce.
4. **Stamp Action:**
   - **Down:** On click/release, the stamp scales to 0.95 (pressing down) and the shadow tightens.
   - **Ink Release:** Immediately after, the stamp lifts (scale 1.0, shadow expands). The "imprint" fades in over 0.3s.
   - **Imprint Texture:** The imprint is an SVG or PNG overlay with a `mix-blend-mode: multiply`. It uses a noise filter to simulate ink spread. The opacity is high in the center, lower at the edges (ink pooling).

## Constraints Checklist
- [ ] No smooth, glossy shadows. Use hard, defined shadows for the paper.
- [ ] The ink must not look like a solid color fill. It must have texture/variation.
- [ ] The typography must remain legible. Do not let the ink texture obscure the underlying text if they overlap.
- [ ] No confetti or celebratory animations. Keep it serious and procedural.

## Acceptance Criteria
- The user feels a sense of "weight" when dragging and releasing the stamp.
- The resulting impression looks authentic, not like a standard UI icon.
- The interface communicates that this is a formal, legal, or logistical document.
