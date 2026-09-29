Design an editorial interface titled 'Rated Capacity' for the journal 'Lift & Limit'. The core metaphor is a crane load chart where editorial content volume equals physical weight. The layout must feel like a structural engineering document: utilitarian, precise, and tense. 

Visual Identity: Use a strict grid reminiscent of technical blueprints or safety placards. Background is deep charcoal (#1A1A1A). Primary text is off-white/high-contrast. Accent color is Safety Yellow (#F2C230) for structural lines and headers. Danger color is Alert Red (#E63946) for warnings and critical states.

Typography: Headings must use Oswald Condensed (or similar heavy, condensed industrial sans) to mimic stamped steel labels. Body text must use IBM Plex Mono to reinforce the technical/data-heavy aesthetic. Do not use serif or soft sans-serif fonts. Letter-spacing on headers should be tight; body text should have generous line-height for readability within the mono context.

Layout Structure: 
1. Header: A fixed top bar displaying the journal name 'Lift & Limit' in Oswald, with a 'SWL' (Safe Working Load) indicator that starts green/yellow.
2. Main Column: A single, wide central column for the article. This column is visually anchored at the top (like a crane hook) and 'hangs' down.
3. Sidebar: A sticky left rail showing a vertical 'Load Chart' scale. This scale marks percentages of 'capacity'.

The Core Mechanic (Physics Simulation): 
As the user scrolls down, the 'load' increases. 
- Phase 1 (0-50% Scroll): The column is rigid and straight. The sidebar indicator is Yellow (#F2C230). 
- Phase 2 (50-80% Scroll): The column begins to 'sag' slightly. Implement this via a subtle CSS transform: skewY or scaleY distortion on the text container, or by increasing the vertical spacing between paragraphs to simulate stretch. The sidebar indicator shifts to Orange. 
- Phase 3 (80-100% Scroll): The column 'strains'. The red warning strip (#E63946) at the bottom of the viewport or wrapping the text block pulses or brightens. The text itself might jitter slightly (micro-animation) to convey instability. The sidebar indicator hits Red. 

Background Details: 
Include faint, vector-style cable diagrams in the background. These cables should vibrate subtly (CSS animation: translateX 1-2px, fast frequency) to simulate tension. Use a noise texture overlay to give it a gritty, printed-on-metal feel.

Interaction Feedback: 
Hovering over pull-quotes should make them 'snap' out of the grid slightly, like a loose bolt. Clicking a 'Reset' button (styled like an emergency stop) snaps the view back to the top and resets the 'load' to zero, playing a visual 'clunk' effect (a quick scale-down/up on the header).

Constraints: 
- No rounded corners. All borders must be sharp (0px radius) to maintain the industrial aesthetic.
- No drop shadows. Use borders and background color contrast for depth.
- The 'sag' effect must not break text readability. Keep distortion subtle (<5 degrees skew).
- Ensure the mono font is legible at 16px+.
- The red warning state must be accessible (ensure contrast against background).

Deliverable: single-file HTML/CSS/JS. Ensure mobile responsiveness by collapsing the left rail into a top progress bar on screens <768px, maintaining the load simulation logic.
