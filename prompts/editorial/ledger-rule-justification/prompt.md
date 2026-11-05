Build a single-file HTML/CSS/JS editorial experience titled 'Ledger Rule Justification' for the brand 'Balance & Line'. The core metaphor is double-entry accounting visualized as typographic structure: a central vertical spine acts as the ledger balance, with text columns tethered to it as debit/credit entries.

Deliverable: single-file HTML/CSS/JS.

**Visual Identity & Palette**
Use a strict, high-contrast palette that evokes archival ledgers and modern precision:
- Background: `#0F1419` (Deep Charcoal/Ink) for the main canvas.
- Primary Text/Spine: `#E8E6E1` (Off-White/Paper) for body text and the central spine base.
- Credit/Accent: `#00A86B` (Emerald Green) for 'Credit' side highlights, positive balance states, and active spine segments.
- Debit/Accent: `#FF4B4B` (Alert Red) for 'Debit' side highlights, negative balance states, and tension indicators.

**Typography**
- Display: 'Playfair Display' (serif) for headings, pull-quotes, and the brand name. Use tight tracking for large sizes to evoke printed type.
- Body/Data: 'IBM Plex Mono' for all body text, captions, and data labels. This reinforces the 'ledger' and 'code' aesthetic. Use `font-variant-numeric: tabular-nums` for all numbers.
- Hierarchy: Headings should be large and imposing. Body text should be readable but monospaced, creating a grid-like rhythm.

**Layout Structure**
1.  **The Spine:** A fixed-position vertical line (2px wide) centered horizontally (`left: 50%`). It runs the full height of the viewport. Its color transitions dynamically based on scroll position (see Motion).
2.  **The Columns:** Two main content columns flank the spine. 
    -   Left Column (Debit): Text blocks aligned to the right edge, creating a ragged left edge that 'pulls' toward the spine.
    -   Right Column (Credit): Text blocks aligned to the left edge, creating a ragged right edge that 'pulls' toward the spine.
    -   On mobile (<768px), collapse to a single column, but keep the spine visible as a left-border accent.
3.  **Horizontal Rules:** Thin horizontal lines (`1px solid #E8E6E1` at 20% opacity) intersect the spine at regular intervals (e.g., every 100px of scroll or per section). These act as 'ledger rules'.

**Content & Interaction Logic**
-   **Scroll-Driven Balance:** As the user scrolls, calculate a 'balance' value based on the scroll depth relative to the total document height. 
    -   If the scroll is in the upper half, the spine leans toward `#FF4B4B` (Debt/Start).
    -   If the scroll is in the lower half, the spine leans toward `#00A86B` (Credit/End).
    -   The transition should be smooth but perceptible, creating a sense of 'paying off' the debt as you read.
-   **Magnetic Snap:** When a text block's vertical center aligns with a horizontal ledger rule, apply a 'snap' effect. 
    -   Visually: The block's border or a connecting line to the spine glows in the corresponding accent color (Red for left, Green for right).
    -   Auditory: Trigger a subtle, high-pitched 'click' or 'tick' sound (use Web Audio API or a small base64 audio snippet) to reinforce the mechanical precision.
-   **Tension Lines:** Draw SVG lines or CSS borders connecting the text block to the spine. These lines should have a slight 'elastic' feel—when not snapped, they are faint and dashed; when snapped, they become solid and bright.

**Motion Design**
1.  **Entrance:** On load, the spine draws itself from top to bottom over 1.5s using `stroke-dashoffset` (if SVG) or `scaleY` (if div). Text blocks fade in and slide slightly toward the spine.
2.  **Ambient Pulse:** The spine should have a subtle, slow pulse (opacity or glow) that intensifies as the scroll speed increases, simulating 'activity' or 'flow'.
3.  **Snap Feedback:** When a block snaps to a rule, add a small 'bounce' animation (scale 1.0 -> 1.02 -> 1.0) to the block and a flash of the accent color on the spine intersection point.

**Technical Constraints**
-   Use vanilla JS for scroll calculations (no heavy libraries).
-   Ensure performance: Use `requestAnimationFrame` for scroll-linked animations.
-   Accessibility: Ensure high contrast ratios. Provide `prefers-reduced-motion` support (disable snap sounds and heavy animations).
-   No external assets except Google Fonts (Playfair Display, IBM Plex Mono).

**Acceptance Criteria**
-   [ ] Single HTML file contains all CSS and JS.
-   [ ] Spine is visible and centered on desktop.
-   [ ] Spine color changes from Red to Green as user scrolls from top to bottom.
-   [ ] Text blocks are clearly divided into Left (Debit) and Right (Credit) columns.
-   [ ] Horizontal rules are visible and intersect the spine.
-   [ ] Snapping effect triggers when blocks align with rules (visual change + optional sound).
-   [ ] Typography uses Playfair Display for headings and IBM Plex Mono for body.
-   [ ] Mobile view collapses to single column but retains spine accent.
-   [ ] No console errors.
