# Hand-Thrown Pottery Wheel — Extended

**Concept:**
For 'Clay & Core', the digital experience must convey the physical effort and meditative rhythm of throwing clay. The interface is not a flat screen but a virtual wheel. Interactions have weight and inertia. The user doesn't just click; they *turn*. The aesthetic is warm, earthy, and imperfectly perfect.

**Palette:**
- **Clay Body:** #A0785A (Warm mid-brown)
- **Slip/Water:** #D4C4B1 (Light cream/beige) — used for highlights and text backgrounds.
- **Kiln Shadow:** #3E3631 (Deep brown-black) — text and deep shadows.
- **Accent:** #C28F66 (Lighter wet clay) for interactive states.

**Typography:**
- **Display:** 'Fraunces' (Variable). Use the 'SOFT' axis to make the type feel rounded and organic. Large, centered headings.
- **Body:** 'Lato' or 'Nunito Sans'. Rounded terminals to match the organic theme. Light weight.

**Layout:**
- **Hero:** Full viewport height. Centered circular wheel. Navigation is minimal, floating at the edges.
- **Gallery:** Asymmetric grid where images slightly overlap, looking like shelves of drying pots. Borders are soft, no hard lines.
- **Mobile:** The wheel shrinks. Drag interaction changes to tap-to-spin.

**Motion Brief:**
1. **Entrance (Spin Up):** The wheel starts stationary. On load, it accelerates over 2 seconds to a slow, rhythmic idle spin (0.5 rad/s).
2. **Interaction (Drag & Friction):** 
   - User clicks/touches the wheel and drags horizontally.
   - Velocity is mapped to mouse delta.
   - On release, the wheel continues spinning but decelerates due to 'friction' (easing out).
   - **Deformation:** At high velocity, the circular SVG path gains a subtle 'wobble' (sinusoidal distortion on the path data). At low velocity, it returns to a perfect circle.
3. **Scroll (Rise):** As the user scrolls down, the hero wheel transitions into a vase silhouette using SVG `d` attribute interpolation. The background color darkens slightly to simulate the kiln.

**Constraints Checklist:**
- [ ] Physics simulation must feel natural, not floaty. Use damping.
- [ ] Avoid standard scroll-jacking. The wheel interaction is localized to the hero.
- [ ] Images must have a 'handmade' feel (irregular crops).
- [ ] No sharp corners in UI elements; use border-radius > 10px or organic SVG shapes.

**Acceptance Criteria:**
- Dragging the wheel feels satisfying and responsive.
- The wobble effect is subtle, not distracting.
- The transition from wheel to vase on scroll is smooth and legible.
