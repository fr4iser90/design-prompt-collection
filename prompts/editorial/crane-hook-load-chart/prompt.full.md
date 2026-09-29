## Concept
'Rated Capacity' is an editorial experience for the 'Lift & Limit' Industrial Safety Journal. The design premise treats reading volume as physical weight. The article container behaves like a suspended load in a crane system. As the user scrolls, the perceived 'weight' of the content increases, causing the layout to physically deform—stretching and sagging—until it breaches a 'Safe Working Load' (SWL) threshold, triggering visual alarms. This creates a tangible sense of urgency and structural integrity, aligning the user's physical action (scrolling) with the metaphorical weight of the information.

## Palette
- **Background**: `#1A1A1A` (Deep Charcoal) - Represents the dark, industrial void or steel.
- **Ink**: `#E0E0E0` (Off-White) - High-contrast text for readability on dark backgrounds.
- **Structural/Accent**: `#F2C230` (Safety Yellow) - Used for grid lines, headers, and 'normal' operational states.
- **Warning/Danger**: `#E63946` (Alert Red) - Used exclusively for critical load warnings, error states, and the 'SWL' breach indicator.
- **Neutral**: `#444444` (Steel Grey) - For secondary UI elements and inactive grid lines.

## Type
- **Display/Headers**: `Oswald` (or similar condensed grotesque). Weight: 700 or 800. All-caps. Tight tracking (-0.05em). Used for section titles, the journal masthead, and 'load' labels. Mimics stamped industrial signage.
- **Body/Mono**: `IBM Plex Mono`. Weight: 400. Regular tracking. Used for all article text, footnotes, and technical data. This reinforces the 'engineering report' aesthetic. 
- **Hierarchy**: Clear separation between the 'structural' labels (Oswald) and the 'data' content (Mono). No serif fonts. No system UI fonts.

## Layout
- **Grid**: A strict 12-column grid, but visually simplified to a single dominant central column for reading, flanked by technical rails.
- **Header**: Fixed top bar. Left: 'LIFT & LIMIT' in Oswald. Right: Dynamic 'SWL STATUS' indicator (Yellow -> Orange -> Red).
- **Left Rail (Sticky)**: A vertical 'Load Chart'. A line graph running down the viewport showing 'Current Load' vs 'Max Capacity'. This rail is always visible on desktop.
- **Main Content**: The article text. It is 'hung' from the top. 
- **Right Rail**: Empty or minimal, used for 'Cable Tension' visualizers (abstract lines).
- **Footer**: A 'Reset/Release' button styled as an emergency stop switch.
- **Mobile Adaptation**: On screens narrower than 768px, the Left Rail collapses into a thin, fixed top progress bar that changes color based on load. The main column takes full width. The 'Cable' background simplifies to a single vertical line to save performance.

## Motion
- **Entrance**: Elements do not fade in; they 'snap' into place. The header drops down with a hard stop. The text column appears instantly, rigid.
- **Ambient**: Background cable lines (thin, 1px, grey) vibrate continuously with a low-amplitude, high-frequency horizontal shake. This simulates high-tension steel cables.
- **Scroll Interaction (The Load)**: 
    - Map scroll depth (0 to 1) to a 'Load' variable (0% to 120%).
    - **0-50%**: No deformation. Status is Yellow.
    - **50-80%**: Apply `transform: skewY(1deg)` to the text container. Increase paragraph margins by 10%. Status shifts to Orange.
    - **80-100%**: Apply `transform: skewY(3deg)` and `scaleY(1.02)`. The red warning strip at the bottom of the viewport fades in and pulses (opacity 0.8 to 1.0). The text container edges glow faintly red. Status is Red.
- **Micro-interactions**: Hovering over links causes them to 'rattle' slightly (translateX ±2px). Hovering over pull-quotes shifts them 4px right and adds a 2px left border in Safety Yellow.

## Constraints
- **No Rounded Corners**: All UI elements, buttons, and containers must have `border-radius: 0`. This is non-negotiable for the industrial aesthetic.
- **No Soft Shadows**: Use hard borders (1px solid `#444444` or `#F2C230`) to define space. Depth is conveyed through layering and color contrast, not blur.
- **Performance**: The 'sag' effect must be GPU-accelerated (using `transform`). Avoid layout thrashing (changing `height` or `margin` dynamically). Use `transform: skew` and `scale` only.
- **Accessibility**: Ensure the red warning color has sufficient contrast against the dark background for text. The 'sag' effect must not distort text beyond readability (max skew 3-5 degrees).
- **Content Density**: The design is sparse. Do not overcrowd. The tension comes from the whitespace and the rigid structure, not clutter.

## Acceptance criteria
- [ ] The page loads with a rigid, non-distorted text column.
- [ ] Scrolling down causes the text column to visibly skew/stretch vertically.
- [ ] The 'SWL' indicator in the header changes color from Yellow to Red as scroll depth increases.
- [ ] A red warning visual element appears when scroll depth exceeds 80%.
- [ ] Background cable elements vibrate continuously.
- [ ] All fonts are either Oswald or IBM Plex Mono (or exact equivalents).
- [ ] No border-radius is present anywhere in the UI.
- [ ] The 'Reset' button snaps the scroll position to top and resets the deformation to zero instantly.
- [ ] Text remains legible during the maximum 'sag' state.
- [ ] Mobile view collapses sidebars correctly without breaking the load simulation.

Deliverable: single-file HTML/CSS/JS.

## Type pairing
Oswald + IBM Plex Mono
