# Dune Strata Geology Map

Create a single-page interactive visualization of desert geological strata. 

**Visual Rules:**
- Background: Pure bone-white (#F5F2EA). No gradients.
- Typography: 'Cormorant Garamond' for headers, 'IBM Plex Mono' for data labels.
- Layout: Sparse, asymmetric. Left column: Vertical stack of strata names (e.g., 'Quaternary', 'Neogene'). Right column: Abstract, horizontal line-art representations of the layers.
- Effects: Apply a subtle `filter: blur(0.5px)` and vertical displacement to text when hovered, simulating heat haze. Long, sharp, 45-degree angle shadows (rgba(0,0,0,0.1)) extend from layer labels.

**Interaction:**
- Hovering a strata label expands the corresponding line-art width and deepens the shadow contrast.
- No cards, no buttons. Just pure data-as-art.
