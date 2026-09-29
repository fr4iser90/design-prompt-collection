# Magnetic Ferrofluid Kerning

Create a kinetic typography effect where standard sans-serif text behaves like a viscous magnetic fluid (ferrofluid).

**Visual Rules:**
- Type: Bold, heavy-weight sans-serif (e.g., Arial Black, Helvetica Now Display Black) rendered in a matte dark gray/black (#2a2a2a) on a very dark background (#0f0f0f).
- Deformation: Letters must not just scale; they must warp. When attracted, the side facing the cursor elongates and forms sharp, spiky protrusions typical of ferrofluid in a magnetic field.
- Material Feel: High reflectivity is minimal; focus on the *silhouette* change. The edges should look liquid, not pixelated.

**Motion Brief:**
- **Interaction:** The mouse cursor acts as the magnet. 
- **Attraction:** As the cursor approaches a letter, the letter's shape stretches towards the cursor. Use vertex manipulation or SVG filters (`feDisplacementMap`) to create the spike effect.
- **Repulsion/Snap-back:** When the cursor moves away, the letter must snap back to its original shape with a slight elastic wobble (spring physics).
- **Kerning:** Adjacent letters should subtly push apart if one is significantly deformed towards the cursor, simulating fluid volume conservation.

**Deliverable:**
- Use SVG filters (`feTurbulence`, `feDisplacementMap`) or Canvas 2D/Three.js for the deformation. CSS alone is likely insufficient for the 'spike' look.
- Ensure smooth 60fps performance by limiting filter complexity on mobile.
