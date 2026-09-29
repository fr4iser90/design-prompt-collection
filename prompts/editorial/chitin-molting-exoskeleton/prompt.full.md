## Concept
**Carapace Press** is a digital entomological field journal that treats the act of reading as a biological process of molting. The user begins in darkness, encased in a chitinous outer shell (`#1a2e1a`). As they scroll, the interface physically cracks and peels away, revealing the soft, pale, bioluminescent substrate (`#0a0a0a` with `#88ff00` accents) beneath. This metaphor connects the violent, necessary shedding of an exoskeleton with the shedding of preconceptions to gain new knowledge. The design is nocturnal, sharp, and scientific, avoiding soft cottagecore aesthetics in favor of hard exoskeleton physics and toxic-nightshade bioluminescence.

## Palette
-   **Void Black (`#0a0a0a`):** The primary background color for the substrate layer. Represents the deep night and the void before creation.
-   **Chitin Green (`#1a2e1a`):** The color of the initial overlay shell. It is dark, desaturated, and earthy, representing the protective outer layer.
-   **Bioluminescent Green (`#88ff00`):** The accent color. Used for crack edges, active navigation states, pull-quote borders, and the 'vein' patterns in the substrate. It is toxic, bright, and unnatural, contrasting sharply with the dark background.
-   **Pale Bone (`#e0e0e0`):** The primary text color for the revealed content. It is soft and organic, mimicking the color of a newly molted insect.

## Type
-   **Display Font:** 'Cormorant Garamond'. Used for all headlines, chapter titles, and pull-quotes. It is a serif font with high contrast between thick and thin strokes, evoking classical scientific illustration. Use weights 300 (Light) and 400 (Regular). Letter-spacing should be tight (-0.02em) for large headings to create density.
-   **Body/UI Font:** 'Space Mono'. Used for body text, captions, metadata, and UI elements. It provides a monospaced, technical feel, reinforcing the 'field journal' concept. Use weight 400 for body and 700 for emphasis. Line-height should be generous (1.6) to ensure readability against the dark, textured background.
-   **Hierarchy:** Headlines are dominant and expressive. Body text is subordinate and precise. Pull-quotes break the grid and use the display font at a larger scale to create visual rhythm.

## Layout
-   **Hero:** Full viewport height. Centered title 'The Molting Cycle' in Cormorant Garamond. Subtitle in Space Mono. The entire viewport is covered by the 'Shell' layer initially.
-   **Chapter Rail:** A fixed vertical sidebar on the left (60px wide). Contains rotated text labels for chapters ('Larval', 'Pupa', 'Imago'). Hidden on mobile. Active chapter is highlighted in `#88ff00`.
-   **Content Sections:** Long-form editorial blocks. Each section corresponds to a stage of the molt. 
    -   *Larval:* Heavy shell coverage. Text is partially obscured.
    -   *Pupa:* Shell is fragmented. Text is clearer.
    -   *Imago:* Shell is removed. Full visibility. Bioluminescent accents are prominent.
-   **Pull-Quotes:** Centered, large Cormorant Garamond text with a `#88ff00` left border. They serve as visual anchors and break the monotony of the body text.
-   **Grid:** A loose, asymmetric grid. Content blocks are not strictly aligned to a 12-column grid but flow organically, with some elements offset to create tension.

## Motion
-   **Entrance:** On load, the shell layer is fully opaque. A subtle 'pulse' animation on the shell edges hints at life beneath.
-   **Scroll Interaction (The Molt):** 
    -   Track `window.scrollY` and calculate scroll velocity.
    -   Map scroll progress (0 to 1) to a `clip-path` on the shell layer.
    -   *Low Velocity:* The clip-path expands smoothly from the center, creating clean, straight cuts.
    -   *High Velocity:* If velocity exceeds a threshold, the clip-path changes to a jagged, irregular polygon, simulating shattering. Add a `blur` filter to the shell edges during fast scroll.
-   **Ambient Breathing:** The substrate layer (background content) has a subtle `scale` animation (1.0 to 1.02) over 4s, infinite, ease-in-out. This simulates the breathing of the organism.
-   **Vein Reveal:** An SVG pattern of veins in `#88ff00` (opacity 0.1) is revealed as the shell cracks. The opacity of the veins increases as scroll progress increases.
-   **Hover States:** Links and interactive elements glow with `#88ff00` text-shadow on hover. The cursor changes to a custom crosshair or pointer.

## Constraints
-   **Performance:** Use `requestAnimationFrame` for scroll calculations. Debounce velocity checks. Ensure clip-path animations are GPU-accelerated.
-   **Accessibility:** Provide a 'Skip Animation' toggle. Ensure color contrast meets WCAG AA standards. Use semantic HTML5 tags.
-   **No AI Defaults:** Avoid purple gradients, cream backgrounds, generic sans-serif fonts, and pill-shaped buttons. The design must feel organic and scientific, not corporate or SaaS-like.
-   **Mobile:** The chapter rail is hidden. The shell interaction is simplified for performance. Text sizes are adjusted for readability.
-   **Stack:** Single-file HTML/CSS/JS. No external libraries except Google Fonts.

## Acceptance criteria
-   [ ] The initial view is fully covered by a dark green (`#1a2e1a`) shell layer.
-   [ ] Scrolling down causes the shell layer to disappear via `clip-path`, revealing the content beneath.
-   [ ] Fast scrolling creates a jagged, shattering effect on the shell layer, while slow scrolling creates a smooth cut.
-   [ ] The substrate layer has a subtle 'breathing' scale animation.
-   [ ] Bioluminescent green (`#88ff00`) is used for accents, cracks, and active states, not for body text.
-   [ ] Typography uses Cormorant Garamond for headlines and Space Mono for body/UI.
-   [ ] A fixed chapter rail is visible on desktop and highlights the active section.
-   [ ] The 'Skip Animation' toggle instantly removes the shell layer.
-   [ ] No purple gradients, cream backgrounds, or generic sans-serif fonts are used.
-   [ ] The design is responsive and functional on mobile devices.
-   [ ] The code is contained in a single HTML file with embedded CSS and JS.
