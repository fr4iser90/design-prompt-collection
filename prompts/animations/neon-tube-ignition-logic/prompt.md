# Neon Tube Ignition Logic

Create a dark-mode kinetic typography animation where text appears as if ignited by high-voltage electricity inside bent glass neon tubes.

**Visual Rules:**
- Background: Deep matte black or very dark charcoal (#1a1a1a) to maximize contrast.
- Type: Use a custom SVG path for the letters that mimics the uniform thickness and rounded caps of a glass neon tube. Avoid standard fonts; the shape must feel physical.
- Ignition Sequence: Each letter lights up sequentially. The first 20% of the sequence is erratic flickering (low opacity, rapid on/off) simulating gas ignition, followed by a sudden, stable warm glow (#ff5e5e or #f0f0f0).
- Glow Effect: Use CSS `box-shadow` or SVG `filter` for a soft, diffuse outer glow and a sharp, white-hot inner core.
- Circuit Trace: A faint, dim gray line connects the letters, pulsing with light as the current 'reaches' each character.

**Motion Brief:**
- **Entrance:** Current travels left-to-right along the circuit trace. Letters flicker 3-5 times rapidly (100ms intervals) before locking into full brightness.
- **Ambient:** Once lit, the glow subtly breathes (opacity 0.95 to 1.0) every 2-3 seconds. Occasional micro-flickers on individual letters every 5-10 seconds.
- **Interaction:** Hovering over a word intensifies its glow and slightly increases the flicker rate. Clicking 'powers off' the sequence, fading to dark gray outlines.

**Deliverable:**
- HTML/CSS/JS implementation.
- No external libraries unless necessary for physics-like flicker easing.
