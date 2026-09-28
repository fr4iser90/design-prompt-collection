# Gridlock Transit Alert — Extended

## Concept
This landing page serves as the central nervous system for a modern city's transit network during disruptions. The design language borrows from industrial safety signage and railway departure boards. The goal is to convey immediate, unambiguous information through visual hierarchy and signal colors, avoiding the 'friendly tech' cliché in favor of 'reliable utility.'

## Palette
- **Base:** #1a1a1a (Deep Charcoal) — Reduces eye strain for high-contrast text.
- **Signal Caution:** #ffcc00 (Safety Yellow) — Used for delays, advisories, and secondary buttons.
- **Signal Critical:** #ff3333 (Alert Red) — Reserved for total shutdowns or major incidents.
- **Text:** #f0f0f0 (Off-White) for primary, #888888 for metadata.

## Typography
- **Headlines:** 'Archivo Narrow' or 'Oswald' (Bold/Heavy). Tall, condensed, legible at distance.
- **Body/Data:** 'IBM Plex Mono' or 'Space Mono'. Monospaced ensures tabular data aligns perfectly, reinforcing the 'system' feel.
- **Labels:** All-caps, tracked out by 0.1em for status indicators.

## Layout Structure
1. **Hero:** Full-width hazard stripe border top/bottom. Large, condensed headline: "NETWORK STATUS." Below, a live summary ticker in monospace.
2. **Disruption Grid:** A masonry-like grid of route cards. Each card has a hard 2px border. 
   - *Idle State:* Border color matches route line.
   - *Alert State:* Border pulses slightly; background gets a faint 5% opacity stripe pattern.
3. **Map/Line Diagram:** A simplified, schematic view of the network. Lines are drawn with stroke-width 4px. Active lines glow; disrupted lines are dashed red.

## Motion Brief
- **Entrance:** Cards slide up with a 'clunk' effect (ease-out-back) to mimic mechanical flipping.
- **Ambient:** Critical alerts have a very slow, subtle opacity pulse on the red indicator.
- **Interaction:** Hovering a route card reveals a 'Details' button with a diagonal wipe transition. Clicking expands the card inline to show station-by-station status.

## Constraints
- No drop shadows. Use borders and background contrast for depth.
- No gradients on text.
- Ensure WCAG AAA contrast for all text on colored backgrounds.
- Mobile: The grid becomes a vertical stack; hazard stripes become horizontal dividers between sections.

## Acceptance Criteria
- The page feels 'urgent' but 'calm.'
- Data is instantly scannable in <3 seconds.
- The aesthetic is distinctly 'infrastructure,' not 'SaaS startup.'
