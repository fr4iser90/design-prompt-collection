# Vacuum-Form Blister — Extended Brief

## Concept
'Form & Void' manufactures custom plastic packaging via vacuum forming. The website needs to communicate precision, clarity, and the physical depth of their products. The design should feel like looking at a perfect, high-end product shot: clean, white, with subtle shadows defining the shapes.

## Palette
- **Background:** `#FFFFFF` (Pure White)
- **Plastic Body:** `#F5F5F5` to `#E6E6E6` (Gradient)
- **Shadows/Edges:** `#B0B0B0` (Medium Grey)
- **Text:** `#4A4A4A` (Dark Grey)
- **Accent:** `#D1D5DB` (Light Grey for UI elements)

## Typography
- **Display:** 'Neue Montreal' Bold or 'Helvetica Now' Display.
- **Body:** 'Neue Montreal' Regular.
- **Labels:** 'IBM Plex Mono' for part numbers and specs.

## Layout
- **Hero:** Centered visual of a vacuum-formed tray. The tray is composed of multiple SVG layers to create parallax depth. Text is overlaid but does not obscure the main product.
- **Process Section:** Horizontal scroll or step-by-step reveal. Steps: 'Mold', 'Heat', 'Vacuum', 'Trim'. Each step has a clean icon and minimal text.
- **Gallery:** Grid of product shots. Each image is masked inside a rounded rectangle that mimics the corner radius of vacuum-formed plastic.

## Motion Design
- **Parallax:** The hero visual has 3 layers: Background (soft shadow), Plastic Tray (midground), Products (foreground). Scroll movement causes these layers to shift slightly on the Y-axis, creating depth.
- **Hover:** Hovering over a 'cavity' in the tray causes a soft white glow to appear inside, simulating light hitting the plastic. The cursor changes to a crosshair.
- **Scroll Trigger:** As the user scrolls down, the 'lid' of the packaging animates away (rotates/fades) to reveal the next section's content, metaphorically 'unboxing' the site.

## Constraints Checklist
- [ ] No heavy blurs or frosted glass effects (backdrop-filter) unless very subtle.
- [ ] Avoid cheap 'glossy' CSS gradients. Use multi-stop linear/radial gradients to simulate realistic plastic light reflection.
- [ ] No Inter, Roboto, Arial.
- [ ] Ensure SVGs are optimized and accessible.

## Acceptance Criteria
- The hero visual clearly resembles vacuum-formed plastic.
- The site feels clean, bright, and professional.
- Interactions are smooth and reinforce the 'precision' brand value.
