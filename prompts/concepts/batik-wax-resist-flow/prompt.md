# Batik Wax Resist Flow

**Intent**: Create an interactive canvas that mimics the Batik dyeing process. Users 'paint' with virtual wax, then 'dye' the fabric. Where wax was applied, the color remains white/cream; elsewhere, it takes on the dye color.

**Visual Rules**:
1.  **Fabric Texture**: Subtle linen/weave texture background (`#fffff0` ivory).
2.  **Wax Tool**: Cursor leaves a trail of semi-transparent, yellowish-brown wax (`#daa520` with opacity). The trail should have slight randomness (jitter) to look hand-drawn with a *canting* (pen-like tool).
3.  **Dye Tool**: Clicking 'Dye' floods the canvas with a color (e.g., Indigo or Maroon). The wax acts as a mask. The dye should spread slightly into the fibers (soft edges), not just sit on top.
4.  **Color Layers**: Support multiple dye layers. Darker dyes cover lighter ones, but wax always reveals the previous state (or white if first).
5.  **UI**: Minimalist toolbar. Buttons: 'Apply Wax', 'Dye [Color]', 'Wash Off Wax'.

**Deliverable**: HTML/JS Canvas implementation. Must handle mobile touch for wax application. Include a 'Save Pattern' button that exports the current state as a PNG.
