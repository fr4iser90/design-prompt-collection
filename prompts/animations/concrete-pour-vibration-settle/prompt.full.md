# Concrete Pour Vibration Settle — Extended

## Concept
This concept captures the brutalist beauty of modern construction. It is not about the finished building, but the *process* of solidification. The animation should feel heavy, dense, and physical. The vibration is the key mechanic, transforming chaos (lumps/bubbles) into order (smooth plane).

## Art Direction
- **Palette**: Monochromatic greys.
  - Slurry: #8c8c8c (Mid-grey) with darker #595959 shadows in the lumps.
  - Formwork: #d4c5a9 (Pale wood) for contrast and warmth.
  - Background: #2b2b2b (Deep Charcoal) to isolate the subject.
  - Accents: White (#ffffff) for air bubbles and specular highlights on wet concrete.
- **Texture**: 
  - Concrete: High-frequency noise for aggregate. Smooth gradient for the final surface.
  - Wood: Visible grain on the formwork edges.
- **Lighting**: Diffused, overhead 'factory' light. No harsh shadows; we want to see the surface topology change.

## Layout
- **Desktop**: Top-down or slight isometric angle (15 degrees). The formwork is centered. 
- **Mobile**: Top-down view. Ensure the wooden frame is visible to provide context and scale.

## Motion Brief
- **Phase 1: Agitation (0–1.5s)**
  - Rebar rods vibrate with a blur effect (motion blur on the rods).
  - Concrete surface ripples outward from the rods.
  - Bubbles rise rapidly. 
- **Phase 2: Settling (1.5–2.5s)**
  - Vibration slows and stops. 
  - The surface 'levels out' using a viscous fluid simulation. 
  - Bubbles pop and vanish.
- **Phase 3: Curing (2.5–4s)**
  - The specular highlights fade out, replaced by a matte texture.
  - Subtle dust particles settle from the air onto the surface.
  - A final 'settle' compression: the slab drops 2px as it compacts.

## Constraints
- Avoid cartoonish 'lava' looks. Concrete is opaque, grey, and gritty.
- The vibration must feel mechanical, not organic.
- Do not use green/eco-friendly colors; keep it industrial and raw.
- Performance: Use shaders for the fluid surface if possible to maintain 60fps with particle bubbles.

## Acceptance Criteria
- The transition from glossy to matte is distinct and readable.
- The vibration feels physically accurate (high frequency, not wide shaking).
- The air bubbles are visible enough to convey 'expulsion' but not distracting.
