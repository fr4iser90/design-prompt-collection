## Concept
"The Decay Ribbon" is an editorial feature for "Perigee Press," a journal dedicated to satellite lifecycle analysis. The core thesis is that a satellite's descent is not just a data point but a dramatic, physical narrative. The design transforms a single continuous data stream (altitude, eccentricity, velocity) into a dramatic, physically diminishing narrative object. The ribbon is the protagonist: it starts healthy and cyan, drifts gently, and ultimately burns off in a fiery climax. This avoids static line graphs by making the line itself degrade and change state, creating an emotional connection to the data.

## Palette
- **Background:** `#03045e` (Deep Space Blue) - Represents the void of space. Solid, no gradients.
- **Primary Accent:** `#00b4d8` (Bright Cyan) - Represents the healthy satellite ribbon and active telemetry. High contrast against the background.
- **Critical Accent:** `#ff006e` (Hot Magenta-Red) - Represents the atmospheric burn-off phase. Used only when the satellite is in critical descent.
- **Text:** `#ffffff` (White) for primary text, `#a0a0a0` (Light Gray) for secondary metadata. Ensures readability.

## Type
- **Display/Headings:** "Syne" (Google Fonts). Use weights 700-800 for chapter titles and the publication brand. Syne's geometric yet quirky nature fits the technical/editorial blend.
- **Body:** "Work Sans" (Google Fonts). Use weights 400-500 for narrative text. Clean, legible, and modern.
- **Hierarchy:** 
  - Brand Mark: Syne 800, large, top-left or centered.
  - Chapter Titles: Syne 700, large, sticky or spaced out.
  - Body Copy: Work Sans 400, comfortable line-height (1.6-1.8).
  - Data/Metadata: Work Sans 500, smaller, possibly tabular nums if available.

## Layout
- **Structure:** Vertical scroll narrative. The page is a single long column with the ribbon running down the center or slightly offset.
- **Ribbon Position:** The SVG ribbon should be fixed or sticky in the viewport center, with the content scrolling past it. Alternatively, the ribbon can be absolute positioned relative to the scroll progress.
- **Text Placement:** Narrative text blocks should appear alongside the ribbon, using a sticky chapter rail on the left or right to indicate progress. Pull-quotes should be large and integrated into the flow, not boxed.
- **Responsive:** On mobile, the ribbon should remain centered, and text should stack below or above the ribbon segments. Ensure touch scrolling is smooth.

## Motion
- **Entrance:** 
  - A bright cyan dot appears at the top-center of the viewport.
  - It pulses once (scale 1.0 to 1.2 and back).
  - It then begins to trail a thin, smooth SVG line downward, simulating the start of the satellite's descent.
- **Ambient:** 
  - The ribbon gently sways left and right with a low-amplitude sine wave animation. This simulates orbital drift and adds life to the static SVG.
  - The sway should be subtle (e.g., ±5px) and slow (e.g., 4s cycle).
- **Interaction (Scroll):** 
  - As the user scrolls, the ribbon's vertical position (altitude) drops relative to the center of the screen. 
  - The waviness (eccentricity) of the ribbon should increase as altitude decreases, simulating instability.
  - **Burn-Off Phase:** When the scroll reaches a critical threshold (e.g., 70% down), the ribbon's stroke color transitions from cyan (#00b4d8) to hot magenta-red (#ff006e). 
  - Particle sparks emit from the line, simulating atmospheric friction. These particles should be small, bright, and short-lived.
  - The visible path length of the ribbon should shorten as it "burns off," creating a sense of destruction.
  - A countdown timer in the margin should tick down to zero, reinforcing the urgency.

## Constraints
- **No Dashboard Soup:** Do not add extra charts, gauges, or UI elements. The ribbon is the sole data visualization.
- **No AI-Default Looks:** Avoid purple glows, cream backgrounds, or dense multi-column broadsheet layouts.
- **Performance:** Use vanilla JavaScript for scroll tracking and SVG manipulation. Avoid heavy libraries. The particle effect can be done with simple SVG circles or a lightweight canvas overlay.
- **Readability:** Ensure text remains legible against the dark background. Use sufficient contrast.
- **Deliverable:** single-file HTML/CSS/JS.

## Acceptance criteria
- [ ] The page loads with a deep space blue background (#03045e).
- [ ] The publication brand "Perigee Press" is visible and styled with Syne.
- [ ] A cyan ribbon appears at the top and trails downward on scroll.
- [ ] The ribbon sways gently left and right (ambient motion).
- [ ] The ribbon's altitude drops as the user scrolls down.
- [ ] The ribbon's waviness increases as altitude decreases.
- [ ] At 70% scroll, the ribbon changes color to hot magenta-red (#ff006e).
- [ ] Particle sparks emit from the ribbon during the burn-off phase.
- [ ] The ribbon's visible path length shortens during the burn-off phase.
- [ ] A countdown timer ticks down in the margin during the burn-off phase.
- [ ] Text is readable and uses Syne for headings and Work Sans for body.
- [ ] No extra charts or dashboard elements are present.
- [ ] The experience is responsive and works on mobile devices.
- [ ] The code is contained in a single HTML file with embedded CSS and JS.

## Type pairing
Syne + Work Sans
