# Stainless Brushed Light Sweep — Extended

**Concept:**
Culinary craft isn't just about food; it's about the tools. This animation celebrates the precision-engineered surface of a professional kitchen counter or knife blade. It focuses on the interplay of light and micro-geometry, showcasing the 'steel' in 'chef precision'.

**Palette:**
- **Metal Base:** #B0BEC5 (Mid-Grey Steel)
- **Highlight:** #FFFFFF (Pure White Specular)
- **Shadow/Crevice:** #455A64 (Blue-Grey Shadow)
- **Backdrop:** #263238 (Deep Slate) for contrast.

**Typography:**
- Industrial sans-serif (e.g., 'DIN', 'Bebas Neue' but thinner, or 'Roboto Mono' for technical labels).
- Text should appear as if etched into the metal, reacting to the light sweep (becoming visible only when light hits it).

**Layout:**
- **Desktop:** Full-width band of metal. Text centered, revealed by the light.
- **Mobile:** Square or 4:3 crop. Text below.

**Motion Brief:**
1. **Light Movement:** The key motion is the specular highlight. It must not be a simple gradient overlay. It needs to 'snap' and 'stretch' based on the viewing angle and light position (simulated via normal maps or shader tricks).
2. **Grain Visibility:** The brushed texture should only be clearly visible within the highlight and shadow transition zones.
3. **Interaction:** Direct mapping of mouse X/Y to light source position. Easing applied to prevent jitter.

**Constraints:**
- No scratches, dents, or damage.
- No warm tones (gold/bronze). Strictly stainless steel.
- No busy background patterns.

**Acceptance Criteria:**
- The anisotropic effect is visible (light stretches across the grain).
- The interaction feels heavy and substantial, not floaty.
- High contrast between light and dark areas.
