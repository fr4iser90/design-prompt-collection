## Concept
Create a photorealistic 3D study of a scientific glassware bubble trap. The focus is on material honesty: the behavior of light passing through borosilicate glass (IOR 1.47) and the interaction between empty glass and liquid-filled glass. The scene is a 'material lab' where the user can manipulate the liquid level to observe changes in refraction and caustics. The geometry should be procedurally generated or imported as a low-poly mesh with high-quality normal maps to ensure smooth curvature on the glass walls. The liquid inside should be a separate mesh with a slightly higher IOR (1.33 for water) to create distinct visual boundaries when the liquid surface intersects the glass walls.

## Palette
- Background: #0f1419 (Deep charcoal, almost black, to isolate the glass)
- Light/Ink: #e6e1d6 (Warm white, for the key light and UI text)
- Accent: #88c0d0 (Cold cyan, for the liquid tint or UI highlights)
- Shadow: #05070a (Deep shadow tone for floor contrast)

## Type
- Headings: Syne (Bold, geometric, scientific)
- UI/Labels: IBM Plex Mono (Technical, precise, monospaced)
- Font Weights: Regular for labels, Medium for values.

## Layout
- Desktop: Full-screen WebGL canvas. UI Overlay: Minimal. A single slider at the bottom-left corner. Label: 'LIQUID LEVEL'. Value display: '000%'. The slider track should be thin (2px) and the thumb small (12px circle) to maintain a technical aesthetic.
- Mobile: Full-screen WebGL canvas. UI Overlay: Slider moves to bottom-center for easier thumb access. Font size increases slightly for readability. The glass object scales down by 15% to ensure it fits within the narrower viewport without clipping.
- No header, no footer, no navigation. The glass is the hero.

## Motion
- Entrance: The key light pans from left to right over 3 seconds, casting moving shadows across the glass form. Use an easeInOutQuad easing function for smooth acceleration and deceleration.
- Ambient: The glass trap rotates slowly around its vertical axis (Y-axis) at 0.005 radians per frame. This rotation should pause if the user interacts with OrbitControls to prevent disorientation.
- Interaction: Scrubbing the 'LIQUID LEVEL' slider changes the Y-position/scale of the inner liquid mesh. This alters the refraction path, causing the caustics on the floor plane to shift and distort. The liquid surface should have a slight meniscus effect if possible, achieved by scaling the top edge of the liquid mesh slightly inward. Add a subtle 'wobble' animation to the liquid surface when the slider is released, simulating inertia.

## Constraints
- Renderer: Three.js / R3F.
- Material: MeshPhysicalMaterial with transmission, thickness, and ior. Ensure `clearcoat` is enabled for the glass to simulate surface gloss.
- Lighting: Single hard DirectionalLight + subtle AmbientLight. Shadow map size should be at least 2048x2048 for crisp shadows.
- No SaaS chrome. No shopping cart. No generic tech blue.
- Performance: Use transmission resolution 1024x1024 for quality, but consider 512x512 for performance if needed. Limit the number of lights to 2 to maintain high FPS on mobile devices.
- No particle systems. No post-processing bloom (keep it clean and sharp).
- Accessibility: Ensure the slider is keyboard accessible (arrow keys adjust value). Add ARIA labels for screen readers.

## Acceptance criteria
- [ ] Glass object is centered and rotates slowly.
- [ ] Key light pans on load.
- [ ] Slider controls liquid level (0-100%).
- [ ] Liquid level change visibly alters refraction/caustics.
- [ ] Background is #0f1419.
- [ ] UI is minimal, monospace, bottom-left (desktop) or bottom-center (mobile).
- [ ] No SaaS header/footer.
- [ ] Glass looks physically accurate (not plastic).
- [ ] No purple glows or generic tech aesthetics.
- [ ] Single-file HTML/CSS/JS deliverable.
- [ ] Mobile responsive layout verified.

## Type pairing
Syne + IBM Plex Mono
