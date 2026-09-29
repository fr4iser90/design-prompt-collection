Build a single-page HTML interface for a print estimation tool named 'Plate & Press'. The layout must be a strict two-column split: 60% width for the visual canvas simulation, 40% for the control panel. Background is #f5f5f5. Text is #1a1a1a. 

The Control Panel (Right) contains four vertical sliders labeled C, M, Y, K in Bebas Neue (24px). Below sliders, display a 'Cost Estimate' and 'Quality Score' in Source Sans Pro. 

The Canvas (Left) is a 2D HTML5 Canvas rendering a 100x100 grid of pixels representing paper. Default state shows white paper (#ffffff). As sliders move, render CMYK layers using 'multiply' blend mode. 

Critical Behavior: When a slider changes, the canvas must not just update color. It must simulate 'ink bleed'. If C is high, M and Y values in the simulation should slightly increase (e.g., C=80% causes M=5%, Y=5% bleed) to show dot gain. Use a slight noise texture on the canvas to simulate paper grain. 

Visual Style: Industrial, utilitarian. Hairline borders (#1a1a1a) separate panels. No shadows. No rounded corners (border-radius: 0). Buttons are rectangular blocks. 

States: 
1. Default: All sliders at 0, canvas is white. 
2. Active: Sliders moving, canvas updating in real-time. 
3. High Density: If total ink coverage > 300%, show a warning banner in #ff0000 (Red) with text 'RISK OF SET-OFF'. 
4. Error: If inputs are invalid, border of slider container turns #ff0000. 

Motion: On load, the control panel slides in from the right (translateX 100% -> 0) over 400ms ease-out. The canvas fades in (opacity 0 -> 1) over 600ms. When sliders are dragged, the ink layers should have a subtle 'wet' look by applying a 1px blur to the canvas context during interaction, removing it on stop. 

Typography: Headings in Bebas Neue, uppercase, tracking-wide. Body in Source Sans Pro, 14px. 

Constraints: Do not use Inter, Roboto, or Arial. Do not use purple/blue gradients. Do not use card shadows. The UI must feel like a physical machine panel. Ensure the canvas redraws efficiently using requestAnimationFrame only when values change.

Mobile Layout: On screens < 768px, the 60/40 split collapses to a single column. The Canvas takes the top 50vh, and the Control Panel occupies the bottom 50vh with horizontal scrolling for sliders if necessary. Maintain the industrial aesthetic with full-width borders. Ensure touch targets for sliders are at least 44px high for mobile accessibility.

Detailed Interaction Logic: Implement a 'wet ink' simulation where rapid slider movements cause a temporary increase in blur radius up to 2px, decaying back to 0.5px over 200ms after the last input event. The noise texture should be generated once on load and overlaid using 'multiply' blend mode to avoid performance hits during redraws. 

Acceptance Criteria: 
- [ ] Desktop layout maintains 60/40 split without overflow at 1200px width.
- [ ] Mobile layout stacks vertically without breaking the canvas aspect ratio.
- [ ] Ink bleed effect is mathematically accurate (adjacent channels increase proportionally).
- [ ] Warning banner triggers exactly at 300% total ink coverage.
- [ ] Entrance animations are smooth and do not cause layout shift.
- [ ] No external dependencies other than Google Fonts (Bebas Neue, Source Sans Pro).
- [ ] Code is contained in a single HTML file with embedded CSS and JS.

Deliverable: single-file HTML/CSS/JS.
