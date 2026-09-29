# Dewey Decimal Orbit

Create a minimalist data visualization of library classification. 

**Visual Rules:**
- Background: Pure white (#ffffff).
- Elements: Thin circular paths. Numbers (000-999) spaced evenly along the rings.
- Color: Primary text in Deep Navy (#003366). Selected/Active state in Signal Red (#cc0000).
- Lighting: Flat, no shadows, relying on weight and size for hierarchy.

**Motion Brief:**
1. **Ambient:** Three concentric rings rotate slowly at different speeds (inner fastest, outer slowest).
2. **Entrance:** Rings scale in from center (scale 0 -> 1) with a fade-in.
3. **Interaction:** 
   - Hovering a ring pauses its rotation and scales it slightly (1.05x).
   - The hovered ring turns Signal Red (#cc0000).
   - A tooltip appears in the center with the category name (e.g., '500 - Science').
4. **Exit:** On mouse leave, rotation resumes smoothly.

**Constraints:**
- No 3D perspective; keep it flat 2D SVG or Canvas.
- Typography must be small, crisp, and monospaced.
