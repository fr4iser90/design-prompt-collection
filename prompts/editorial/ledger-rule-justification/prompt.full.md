## Concept
**Ledger Rule Justification** reimagines the act of reading as a process of balancing a ledger. The brand 'Balance & Line' presents an editorial piece where the layout itself is the argument. The central vertical spine represents the 'Balance' of the argument, while the text columns on either side represent 'Debit' (questions, problems, left-side context) and 'Credit' (answers, solutions, right-side resolution). 

The core mechanic is **typographic equilibrium**. As the reader scrolls, the spine's color shifts from red (debt/imbalance) to green (credit/balance), suggesting that reading the content 'pays off' the initial tension. Text blocks physically 'snap' to horizontal ledger rules, providing a tactile sense of order and completion. This transforms passive scrolling into an active experience of finding balance.

## Palette
The palette is derived from archival accounting ledgers but modernized for digital clarity.
-   **`#0F1419` (Ink/Background):** A deep, near-black charcoal. Provides high contrast for the off-white text and spine. Evokes the darkness of a closed book or a night-shift ledger.
-   **`#E8E6E1` (Paper/Primary):** A warm off-white. Used for the main spine, body text, and horizontal rules. Mimics the color of aged but clean paper.
-   **`#00A86B` (Credit/Green):** A vibrant emerald green. Used for 'Credit' side highlights, positive balance states, and the spine's color when the scroll reaches the end. Represents resolution and value.
-   **`#FF4B4B` (Debit/Red):** A sharp alert red. Used for 'Debit' side highlights, negative balance states, and the spine's color at the start. Represents tension and questions.

## Type
-   **Display: Playfair Display.** Used for the brand name, section headings, and pull-quotes. Its high contrast between thick and thin strokes mirrors the 'debit/credit' duality. Use `font-weight: 700` for headings to ensure they anchor the layout.
-   **Body/Data: IBM Plex Mono.** Used for all body text, captions, and data points. The monospaced nature creates a strict vertical rhythm, reinforcing the 'ledger' metaphor. It feels technical, precise, and archival.
-   **Hierarchy:** 
    -   H1: 4rem, Playfair Display, `#E8E6E1`.
    -   H2: 2.5rem, Playfair Display, `#E8E6E1`.
    -   Body: 1rem, IBM Plex Mono, `#E8E6E1` (80% opacity).
    -   Captions: 0.8rem, IBM Plex Mono, `#00A86B` or `#FF4B4B` depending on side.

## Layout
-   **Desktop (>768px):**
    -   **Spine:** Fixed position, `left: 50%`, `width: 2px`, `height: 100vh`. Z-index above content.
    -   **Columns:** Two flex containers, each 45% width, positioned left and right of the spine. 
        -   Left Column: `text-align: right`, `padding-right: 2rem`. Blocks are aligned to the right edge, creating a ragged left edge that 'pulls' toward the spine.
        -   Right Column: `text-align: left`, `padding-left: 2rem`. Blocks are aligned to the left edge, creating a ragged right edge that 'pulls' toward the spine.
    -   **Horizontal Rules:** Absolute positioned lines at intervals (e.g., every 150px of scroll). They span the full width but are only visible near the spine (gradient fade out).
-   **Mobile (<768px):**
    -   Single column layout.
    -   Spine becomes a left border (4px wide) on the main container.
    -   Text blocks align left, but maintain the 'snap' logic relative to the left border.

## Motion
1.  **Entrance:** 
    -   Spine: Animates `scaleY` from 0 to 1 over 1.5s with `ease-out`.
    -   Text Blocks: Fade in (`opacity: 0 -> 1`) and translate slightly toward the spine (`translateX: 20px -> 0` for right column, `-20px -> 0` for left column) with staggered delays.
2.  **Scroll-Linked Balance:**
    -   Calculate `scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight)`.
    -   Interpolate spine color: `color = mix(#FF4B4B, #00A86B, scrollProgress)`.
    -   Update spine `background-color` or `border-color` in real-time using `requestAnimationFrame`.
3.  **Magnetic Snap:**
    -   Define 'snap zones' at horizontal rule positions.
    -   When a text block's center enters a snap zone (within 10px), add class `.snapped`.
    -   `.snapped` effect: 
        -   Block border glows in accent color (Red for left, Green for right).
        -   A 'tension line' (SVG or CSS pseudo-element) connects the block to the spine, becoming solid and bright.
        -   Trigger a subtle 'click' sound (Web Audio API oscillator, short decay).
        -   Small scale bounce: `transform: scale(1.02)` then back to `1.0`.
4.  **Ambient Pulse:**
    -   Spine has a subtle `box-shadow` or `filter: drop-shadow` that pulses opacity (0.5 -> 0.8) over 3s infinite loop. Intensity increases with scroll velocity.

## Constraints
-   **Performance:** Use `requestAnimationFrame` for all scroll-linked updates. Avoid layout thrashing.
-   **Audio:** Sound must be optional or muted by default if `prefers-reduced-motion` is set. Use a small base64 encoded WAV or Web Audio API oscillator to avoid external assets.
-   **Accessibility:** Ensure text contrast meets WCAG AA. Provide `aria-label` for interactive elements. 
-   **No External Assets:** Except Google Fonts. No images, no SVG files (use CSS/SVG inline).
-   **Responsive:** Must work on mobile, though the 'two-column' metaphor collapses to 'single-column with spine accent'.

## Acceptance criteria
-   [ ] **File Structure:** Single HTML file with embedded CSS and JS.
-   [ ] **Typography:** Playfair Display used for headings, IBM Plex Mono for body. Both loaded via Google Fonts.
-   [ ] **Spine:** Visible vertical line centered on desktop. Color transitions from `#FF4B4B` to `#00A86B` as user scrolls from top to bottom.
-   [ ] **Columns:** Two distinct columns on desktop. Left column text right-aligned, right column text left-aligned.
-   [ ] **Snap Mechanic:** Text blocks visually 'snap' to horizontal rules when aligned. Visual feedback (glow/border) and optional sound.
-   [ ] **Horizontal Rules:** Visible lines intersecting the spine at regular intervals.
-   [ ] **Motion:** Entrance animation for spine and text blocks. Smooth scroll-linked color change.
-   [ ] **Mobile:** Layout collapses to single column. Spine remains visible as left border.
-   [ ] **Performance:** No jank during scroll. Uses `requestAnimationFrame`.
-   [ ] **No Console Errors:** Clean console on load and interaction.
