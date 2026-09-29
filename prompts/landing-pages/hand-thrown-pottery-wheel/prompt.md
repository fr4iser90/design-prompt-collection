# Hand-Thrown Pottery Wheel

**Concept:** Landing page for 'Clay & Core', a pottery studio. The core metaphor is the potter's wheel. Interaction feels tactile and resistant, not slippery.

**Art Direction:**
- **Palette:** Wet clay browns (#A0785A), slip cream (#D4C4B1), and kiln-shadow charcoal (#3E3631).
- **Texture:** High-fidelity macro texture of wet clay. Subtle water sheen highlights.
- **Typography:** Display: 'Fraunces' (soft serif, variable font). Body: 'Lato' (humanist sans).
- **Hero:** A large, circular CSS/SVG representation of a clay mound on a wheel. It spins slowly by default.
- **Motion:**
  1. **Interaction:** User can 'drag' to spin the wheel faster. Friction slows it down gradually. The clay shape subtly deforms (wobbles) as speed increases, then stabilizes.
  2. **Entrance:** The wheel spins up from 0 to idle speed.
  3. **Scroll:** As user scrolls, the 'clay' rises into a vase shape via SVG path morphing.

**Deliverable:** HTML/CSS/JS. Use GSAP for physics-based drag simulation. SVG for morphing shapes.
