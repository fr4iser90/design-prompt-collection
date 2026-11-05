Build a single-file HTML asset studio for 'GEO-SHIFT: Tectonic Plate Fracture', a 2D game-kit pack. The interface must feel like a geological survey terminal. Use Oswald for headers and Source Code Pro for data. The core deliverable is a high-fidelity sprite viewer displaying a cohesive set of cracked earth tiles, magma fissures, and seismic UI indicators.

Visual Style Bible: Strictly avoid cartoonish lava. Use realistic thermal gradients (deep red to bright orange) within fissures. Rock edges must have hard bevels (light top-left, dark bottom-right) to simulate depth at 32-64px scale. Colors: Base Rock #5D4037, Magma Core #FF5722, Deep Shadow #3E2723. No purple glows or soft blurs; use sharp, jagged geometry.

Inventory Requirements: Generate a procedural or pre-defined set including: 1) 4x4 Tileset of cracked earth (varying severity), 2) 3x3 Magma fissure animations (idle, pulse, erupt), 3) 5 UI elements (seismic gauge, crack indicator, warning plate). All assets must be rendered on a transparent background in the viewer.

Viewer UX: Implement a filmstrip layout. The main canvas shows the selected asset at 4x zoom with a pixel-grid overlay toggle. A sidebar lists the inventory with counts. Include a 'Poster Frame' mode that captures the current view at 1.5s intervals for preview.

Interactions: Hovering over a tile triggers a subtle 'earthquake' shake effect and visually expands the crack width in the preview. Clicking a tile selects it for export.

Downloads: Provide functional buttons to download the current selection as a PNG (transparent) and an SVG (vector paths for cracks). Include a 'Download Atlas' button that generates a sprite sheet PNG.

Technical Constraints: Use Canvas API for rendering. No external image CDNs; all assets must be drawn via code or embedded base64. Ensure the layout is responsive. The 'earthquake' effect should use CSS transforms or Canvas translation, not heavy physics engines. Code must be clean, commented, and self-contained.

Layout & Responsiveness: On desktop, use a three-column grid: Sidebar (250px), Main Viewport (flex-grow), Inspector (300px). On mobile, stack vertically with collapsible sections. Ensure touch targets are at least 44px. The header should remain sticky. The filmstrip should support horizontal scrolling with momentum on touch devices.

Motion Details: Entrance animations should stagger asset loading. Hover states must include a slight scale-up (1.05x) combined with the shake. The magma pulse should use a sine wave opacity modulation. Transitions between selected assets should be instant but with a brief flash effect to indicate selection.

Acceptance Criteria: The app must load without console errors. All download buttons must trigger file downloads. The pixel grid must align perfectly with the canvas pixels. The color palette must be strictly adhered to. The code must be valid HTML5, CSS3, and ES6 JavaScript.

Deliverable: single-file HTML/CSS/JS.
