# Substation Relay Status Board — Extended

## Concept
This concept explores the aesthetic of critical infrastructure monitoring. It avoids the "glowing dashboard" cliché by focusing on the physical reality of electrical substations: heavy steel, mechanical relays, and binary status indicators. The tension comes from the quiet, matte surface vs. the high-stakes data being communicated.

## Palette
- **Charcoal (#1a1a1a):** Primary surface, representing painted steel cabinets.
- **Signal White (#f1faee):** Safe state, text, and inactive LEDs.
- **Critical Red (#e63946):** Faults, alarms, and active hazards.
- **Hazard Amber (#e9c46a):** Warnings and standby states.
- **Stripe Black (#000000):** Used exclusively for hazard stripes.

## Typography
- **Display/Body:** IBM Plex Mono, Regular and Bold. All caps for labels. Lowercase for data values if necessary for readability, but prefer uppercase for a utilitarian feel.
- **Size:** Labels at 12px, Data values at 24px. High contrast.

## Layout
- **Desktop:** A 2x2 grid of relay modules. Each module is a distinct "unit" with a bezel.
- **Mobile:** Vertical stack. Each module expands to full width.
- **Structure:** Each module has a header (ID), a status LED matrix, a mechanical relay toggle visualization, and a data readout (Voltage/Current).

## Motion Brief
1. **Entrance:** Modules slide up slightly (20px) and fade in, staggered by 100ms.
2. **Ambient:** A very subtle, slow noise overlay (grain) to simulate camera sensor noise or film grain, adding to the "monitoring feed" feel.
3. **Interaction/State Change:**
   - **Relay Flip:** When status changes, a small SVG or CSS-drawn relay lever flips from "CLOSED" to "OPEN" (or vice versa). This motion is snappy (cubic-bezier(0.2, 0.8, 0.2, 1)) and lasts 0.15s.
   - **LED Fill:** The status LED is a 4x4 dot matrix. It fills from bottom to top with a 50ms delay between rows. If critical, it flashes once before settling.
   - **Hazard Stripe:** If a module goes Critical, a diagonal hazard stripe pattern slides in from the left as a background for the status label. This slide is linear and continuous while active.

## Constraints Checklist
- [ ] No purple or blue glow effects.
- [ ] No rounded corners > 2px.
- [ ] No soft shadows. Use hard, 1px borders or inset shadows to create depth.
- [ ] Colors must be strictly adhered to. No gradients except for the brushed metal texture.
- [ ] Accessibility: Ensure high contrast between text and background. Status is not conveyed by color alone (use icons/text).

## Acceptance Criteria
- The interface feels like a physical control panel, not a web app.
- State changes are immediately obvious through both color and motion (relay flip).
- The aesthetic is serious, utilitarian, and clean, avoiding "cyberpunk" tropes.
