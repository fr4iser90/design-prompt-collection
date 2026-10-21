## Concept
An 8-second looping explainer motion graphic for 'GreenStack', an environmental engineering firm. The goal is to visualize the chemical process of flue gas scrubbing, transforming a complex industrial process into an elegant, readable diagram. The aesthetic is 'hard industrial': precise lines, geometric shapes, and data-driven visuals, strictly avoiding organic or 'green' clichés (leaves, trees, soft gradients). The narrative arc is Problem (Emissions) → Mechanism (Solvent Binding) → Payoff (Clean Air/Capture Rate) → Brand Lockup.

## Beat sheet
**Total Duration:** 8.0 seconds

1.  **0.0s – 1.5s: The Problem (Ingress)**
    *   **Visual:** A cross-section of a vertical scrubber tower (outlined in #0F4C5C) is centered. A pipe enters from the left. Dark, turbulent smoke (representing CO2-rich flue gas, colored #4A5568 with opacity variations) flows rapidly into the tower base, swirling upwards.
    *   **Text:** 'PROBLEM: CO2 EMISSIONS' appears in the top-left corner, Archivo Bold, #EDF5F1.
    *   **Motion:** Smoke particles accelerate upwards. The tower outline draws itself in (stroke-dasharray animation).

2.  **1.5s – 4.0s: The Mechanism (Interaction)**
    *   **Visual:** Nozzles at the top of the tower activate. A fine mist of solvent droplets (small circles, #3282B8) sprays downwards, counter-current to the rising gas. Small, distinct CO2 molecules (cyan dots, #3282B8) move through the mist.
    *   **Interaction Logic:** When a CO2 dot intersects with a solvent droplet, the CO2 dot disappears (or merges), and the droplet slightly expands or changes shade to #0F4C5C, indicating capture. This collision effect should be frequent but not chaotic.
    *   **Text:** 'MECHANISM: SOLVENT BINDING' appears in the top-right corner.
    *   **Motion:** Continuous counter-flow: gas up, solvent down. Collision events trigger small ripple effects in the droplets.

3.  **4.0s – 6.0s: The Payoff (Output)**
    *   **Visual:** The smoke exiting the top of the tower transforms into clear, white, laminar flow lines (#EDF5F1), labeled 'CLEAN AIR'. Simultaneously, the bottom drain pipe activates, showing a dark, viscous liquid (#0F4C5C) flowing out, labeled 'CAPTURED CO2'.
    *   **Data:** A counter in the bottom-right corner rapidly increments from 0% to 99%, using IBM Plex Mono. 
    *   **Text:** 'PAYOFF: 99% CAPTURE' appears centrally or bottom-center.
    *   **Motion:** Flow lines smooth out. Liquid flow begins.

4.  **6.0s – 8.0s: Lockup (Brand)**
    *   **Visual:** The diagram elements fade to 20% opacity or slide out. The GreenStack logo (three stacked geometric rectangles, #3282B8 and #0F4C5C) scales up centrally. Text 'GreenStack | 99% Capture Efficiency' appears below the logo in Archivo Bold.
    *   **Background:** Solid #1B262C with a very faint, static grid pattern (#2D3748).
    *   **Motion:** Logo entrance with a subtle 'pop' or scale-up. Text fades in.

## Poster frame
**Timestamp:** 1.5s
**Description:** The scrubber tower is fully outlined in #0F4C5C. Dark smoke is actively entering from the left pipe and swirling in the lower half of the tower. The top nozzles are just beginning to emit the first mist particles. The text 'PROBLEM: CO2 EMISSIONS' is clearly visible in the top-left. The composition is balanced, with the tower central and the pipe creating a horizontal lead-in. This frame must be legible as a static thumbnail.

## Palette
*   **Background:** #1B262C (Deep Charcoal) - Provides high contrast for industrial elements.
*   **Text/Highlight:** #EDF5F1 (Off-White) - Used for primary text and 'clean air' flow.
*   **Structure/Secondary:** #0F4C5C (Deep Teal) - Used for the tower outline, captured CO2 liquid, and logo elements.
*   **Active Element:** #3282B8 (Bright Cyan) - Used for CO2 molecules, solvent mist, and logo accents. Represents the 'active' chemical process.

## Type
*   **Headings/Labels:** Archivo (Bold/Black). Clean, industrial sans-serif. High legibility at small sizes.
*   **Data/Counters:** IBM Plex Mono. Monospaced font for numerical data (capture %) to ensure alignment and technical feel.
*   **Hierarchy:** 'PROBLEM', 'MECHANISM', 'PAYOFF' are all caps, small size. Main brand text is larger.

## Frame
*   **Aspect Ratio:** 16:9 (1920x1080 or equivalent).
*   **Composition:** Centralized vertical tower. Horizontal flow from left (in) to right/top (out). Data overlays in corners to avoid blocking the central mechanism.
*   **Grid:** Subtle 8px or 16px grid alignment for all elements.
*   **Layout:** Desktop: Full width with side margins. Mobile: Vertical stacking of text overlays if necessary, but primarily scaling the central SVG.

## Motion
*   **Smoke/Flow:** Use path animations or particle systems. Smoke should have turbulent noise; clean air should have laminar, smooth paths.
*   **Collisions:** Simple intersection detection. When CO2 dot hits solvent droplet, trigger a CSS class change (e.g., opacity 0, scale 1.2) or SVG attribute change.
*   **Transitions:** Hard cuts between beats are acceptable for a 'technical' feel, or quick 0.2s fades. Do not use slow, dreamy dissolves.
*   **Looping:** At 8.0s, the state should reset to the beginning of Beat 1. Ensure no 'jump' in the logo fade-out; it should fade to the background color before the smoke re-enters.

## Constraints
*   **No Organic Shapes:** No leaves, trees, or soft organic blobs. All shapes must be geometric (circles, rectangles, paths with sharp or smooth but mechanical curves).
*   **No Purple/Glow:** Avoid purple hues or neon glows that suggest 'cyber' or 'magic'. Stick to the defined teal/cyan/charcoal palette.
*   **Readability:** Text must remain legible over moving particles. Use drop shadows or background pills for text if necessary, but prefer negative space.
*   **Performance:** Keep particle count manageable (<500 active elements) for smooth 60fps playback in a browser.
*   **Accessibility:** Ensure sufficient contrast between text and background (WCAG AA).
*   **Deliverable:** single-file HTML/CSS/JS.

## Acceptance criteria
*   [ ] The animation loops seamlessly every 8 seconds.
*   [ ] The 'Poster Frame' at 1.5s is clearly visible and matches the description (Tower outlined, smoke entering, 'Problem' text visible).
*   [ ] The color palette is strictly limited to the four defined hex codes (plus neutral greys for smoke if needed).
*   [ ] Text is rendered in Archivo and IBM Plex Mono (or suitable fallbacks with similar metrics).
*   [ ] The collision logic is visible: CO2 molecules disappear/merge upon hitting solvent droplets.
*   [ ] The final lockup displays 'GreenStack' and '99% Capture Efficiency' clearly.
*   [ ] No organic/nature imagery is present.
*   [ ] The animation runs smoothly in a modern browser without significant frame drops.
*   [ ] Layout adapts correctly to mobile viewports without breaking the aspect ratio or text legibility.

## Type pairing
Archivo + IBM Plex Mono
