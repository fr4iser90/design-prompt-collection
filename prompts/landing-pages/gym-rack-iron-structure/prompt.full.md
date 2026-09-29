# Gym Rack Iron Structure — Extended Brief

## Concept
Strength is structural. 'IronGrid' presents its equipment as architectural steel. The UI is not decorative; it is functional and heavy. The grid system is visible, representing the steel uprights of a power rack.

## Art Direction
- **Color Palette:**
  - Primary: Matte Black `#1A1A1A` (background).
  - Secondary: Gunmetal `#4A4A4A` (grid lines, cards).
  - Tertiary: Steel Grey `#999999` (text, inactive elements).
  - Accent: Chrome `#C0C0C0` (highlights, borders, active states).
- **Typography:**
  - Display: 'Bebas Neue' or 'Teko'. Tall, condensed, powerful.
  - Body: 'Roboto Condensed'. Technical, legible.
- **Visual Elements:**
  - **Grid Lines:** Visible 4px vertical lines running the full height of the page, colored Gunmetal.
  - **Hardware:** Small circle icons representing bolt holes or safety pins.
  - **Plates:** Circular dividers or icons that look like weight plates.

## Layout & Structure
1. **Hero:** Massive typography 'BUILD STRENGTH' spanning 8 columns. Background is a dark texture with subtle vertical grid lines.
2. **Products:** Cards are placed strictly between grid lines. No gaps. They look like they are 'slotted' into the rack.
3. **Specs:** A table that looks like a steel plate label. Monospaced text, high contrast.

## Motion Brief
- **Entrance:** 
  - **Drop:** Headlines drop from above with `ease-in` acceleration and a slight `bounce` on landing. 
  - **Snap:** Images snap into their grid cells with a sharp `cubic-bezier(0.175, 0.885, 0.32, 1.275)` easing.
- **Interaction:**
  - **Load Hover:** On hover, a product card's `box-shadow` deepens significantly (e.g., `0 20px 40px rgba(0,0,0,0.8)`), and the border color shifts to Chrome.
  - **Click:** The 'Safety Pin' icon in the nav rotates and extends, triggering the mobile menu slide-out.

## Technical Constraints
- Grid alignment must be pixel-perfect.
- Shadows should be hard/directional (top-left light source) to emphasize 3D depth.
- No soft blurs; use sharp edges and high contrast.

## Acceptance Criteria
- Feels heavy, durable, and masculine.
- The grid is a design feature, not just a tool.
- No soft, rounded corners; keep it industrial and sharp.
