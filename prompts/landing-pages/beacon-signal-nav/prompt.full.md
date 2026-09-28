# Beacon Signal Nav — Extended

## Concept
Beacon is the eye in the storm. The design captures the tension of the open ocean at night—darkness punctuated by precise, artificial light. It’s not just a website; it’s an instrument panel. The user should feel like they are operating a high-tech vessel.

## Palette
- **Void:** #05141f (Deep Ocean Navy) — Almost black, but with blue undertones.
- **Signal:** #00ff9d (Safety Green) — The only bright color. Used for active elements, primary CTAs, and data highlights.
- **Glass:** #ffffff (White) at 10-20% opacity for borders and secondary text.
- **Depth:** #0a2535 (Mid-Navy) for card backgrounds to create subtle separation.

## Typography
- **Headlines:** 'Montserrat' (Bold/Heavy). Geometric, modern, strong.
- **Data/Body:** 'Roboto Mono' or 'Space Mono'. Technical, precise, tabular.
- **Labels:** All-caps, tracked out. Small font size (10-12px) for meta-data.

## Layout Structure
1. **Hero:** Full-screen dark video background (ocean at night, slow motion). Overlay: A large, semi-transparent circular radar graphic. Center: "NAVIGATE THE UNKNOWN." CTA: Solid green button with white text.
2. **Radar Section:** A stylized map view. Points of interest are green dots with concentric rings. Hovering a dot reveals a tooltip with data in monospace.
3. **Capabilities:** Three columns. Each icon is a thin-line drawing in green/white. Background has a faint grid pattern.

## Motion Brief
- **Ambient:** The hero radar sweep rotates continuously (60s loop). The ocean background has a slow parallax scroll effect.
- **Entrance:** The radar rings expand outward from the center as the page loads. Text fades in with a slight blur-to-sharp effect.
- **Interaction:** Hovering a 'Capacities' icon causes the line stroke to 'draw' itself (stroke-dashoffset animation). Buttons have a 'glow' effect on hover (box-shadow: 0 0 10px #00ff9d).

## Constraints
- No heavy gradients; use opacity and blur for atmosphere.
- Ensure text contrast is high enough for readability against the dark background.
- Performance: Video background must be optimized (looped, muted, no audio).
- Mobile: Radar simplifies to a static icon; sections stack vertically.

## Acceptance Criteria
- The page feels 'alive' and 'monitoring.'
- The green accent is used strategically, not overused.
- The interface feels like a tool, not just a marketing page.
