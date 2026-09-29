# Anodized Titanium Blotter — Extended Brief

## Concept
Titanium anodization creates colors through light interference in an oxide layer, not pigment. This concept uses that physical truth to create a unique, "soft-machine" color picker. It feels like a tool, not a toy.

## Palette
- **Base Metal:** `#c0c0c0` (Brushed Titanium)
- **Voltage Range:** 
  - Low (12V): `#d4af37` (Gold/Straw)
  - Mid (60V): `#4a90e2` (Blue)
  - High (90V): `#9b59b6` (Purple)
  - Max (120V): `#2ecc71` (Green)
- **UI Text:** `#333333`

## Type Pairing
- **UI:** SF Mono or Roboto Mono (functional, precise)
- **Title:** Inter (but strictly tracked out, not bold)

## Layout
- **Desktop:** Split view. Left: The plate (large, interactive). Right: Controls (slider, hex input, copy button).
- **Mobile:** Stacked. Plate on top, controls below.

## Motion Brief
1. **Entrance:** The plate slides up from the bottom.
2. **Ambient:** Subtle specular highlight movement (simulated by rotating a radial gradient mask slowly).
3. **Interaction:** 
   - **Drag Slider:** The color changes smoothly. The hex code updates in real-time.
   - **Hover Plate:** The mouse position acts as a light source, changing the angle of the iridescence (hue shift based on `x/y` position).
   - **Release:** The color settles.

## Constraints
- Do not use simple `background-color` changes. Must use gradients or filters to simulate metallic sheen.
- Avoid saturated, flat colors. The look must be metallic and reflective.
- No "glow" effects.

## Acceptance Criteria
- The color shift feels physically accurate (interference colors).
- The interaction feels smooth and precise, like adjusting a knob.
- The UI is quiet and unobtrusive.
