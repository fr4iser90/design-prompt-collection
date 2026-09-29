## Concept
Create a landing page for 'SwitchPoint', a railway logistics software that emphasizes physical certainty over digital abstraction. The core metaphor is a mechanical rail switch. The user interacts with a heavy, tactile lever to physically shift steel rails into a locked position. This action reveals route data, simulating the satisfaction of a physical lock engaging. The aesthetic is 'Signal Warning'—raw, industrial, high-contrast, and utilitarian. It rejects soft SaaS design in favor of heavy, mechanical truth.

## Palette
-   **Background**: `#2C2C2C` (Deep Charcoal). Not pure black. Represents the dark, oily infrastructure.
-   **Ink/Steel**: `#F5F5F5` (Off-White/Steel). Used for rails, text, and high-contrast elements. Simulates polished steel under industrial lighting.
-   **Accent/Safety**: `#FFB300` (Safety Yellow). Used ONLY for active states, locked indicators, and critical alerts. Do not use for general branding or links. This color must feel like a warning label or a high-visibility vest.
-   **Mid-Tones**: Use varying opacities of `#F5F5F5` on `#2C2C2C` to create depth and texture without introducing new hues.

## Type
-   **Display**: 'Anton'. Used for the brand name 'SwitchPoint' and the main headline ('ROUTING IS PHYSICS' or similar). It must be uppercase, tight-tracked (letter-spacing: -0.02em to -0.05em), and massive. It should feel like a stencil or a stamp.
-   **Body/UI**: 'IBM Plex Sans'. Used for all labels, data readouts, CTA text, and footer. It provides a technical, engineered feel. Use `font-weight: 500` or `600` for labels to ensure legibility against the dark background.
-   **Hierarchy**: The brand name is the largest element. The headline is next. Data readouts are small but high-contrast. No serif fonts. No system fonts.

## Layout
-   **Viewport 1**: Dominated by the 'Rail Assembly'. This is a full-bleed visual element, not a background image. It should span the width of the screen.
-   **Composition**: 
    -   **Left/Top**: Brand and Headline. Stacked vertically. Left-aligned.
    -   **Center/Right**: The Rail Assembly and Lever. This is the interactive core.
    -   **Overlay**: Route data appears *on top* of the rails when locked, not in a separate card.
-   **No Cards**: Do not use white boxes, rounded corners, or drop shadows to contain content. Use dividers, borders, and background color shifts. The design should feel like a control panel, not a website.
-   **Responsiveness**: On mobile, the rail assembly should orient vertically or simplify to a top-down view. The lever must be large enough for touch (min 44px hit area).

## Motion
-   **Entrance**: The rail assembly slides in from the left (or bottom on mobile) with a slight 'clank' visual effect (a quick scale/shake on arrival). 
-   **Idle/Ambient**: The rails vibrate subtly (1-2px translate) to simulate the hum of distant trains. This is continuous but low-amplitude. 
-   **Interaction (The Lever)**:
    1.  **Drag**: User drags the lever. The rails shift horizontally.
    2.  **Resistance**: As the lever approaches the 'locked' position (e.g., last 20% of travel), implement simulated resistance. The drag speed slows down or requires more 'force' (visual feedback like the lever handle tilting or straining).
    3.  **Lock**: When the threshold is crossed, the rails snap into alignment. The `#FFB300` indicator lights up. The text 'LOCKED' appears in Anton font. 
    4.  **Data Reveal**: Route data (e.g., 'SECTOR 7 CLEAR') fades in or stamps onto the screen near the locked position.
    5.  **Release**: If released before locking, the rails settle but do not lock. If released after locking, they stay locked until the user drags them back (with resistance).

## Constraints
-   **Single File**: HTML, CSS, JS in one file.
-   **No Images**: Use CSS, SVG, or Canvas for all visuals. No JPGs/PNGs.
-   **Performance**: 60fps drag interaction. Use `requestAnimationFrame`.
-   **Accessibility**: Keyboard support for the slider. ARIA labels for state changes.
-   **Color Discipline**: `#FFB300` is strictly for active/warning states. 
-   **No Soft UI**: No blur, no gradients (except for metallic highlights), no rounded corners (use sharp or chamfered).

## Acceptance criteria
-   [ ] Page loads with a full-bleed rail assembly visible in viewport 1.
-   [ ] Brand name 'SwitchPoint' is in Anton font, massive, and legible.
-   [ ] Dragging the lever moves the rails smoothly.
-   [ ] Resistance is felt visually/physically as the lever nears the lock position.
-   [ ] Locking the switch triggers a `#FFB300` indicator and reveals route data.
-   [ ] No white cards, rounded corners, or drop shadows are used for content containers.
-   [ ] Ambient vibration is visible on the rails when idle.
-   [ ] All fonts are loaded correctly (Anton, IBM Plex Sans).
-   [ ] Layout is responsive and usable on mobile.
-   [ ] No external assets (images) are used.
-   [ ] The design feels 'heavy' and 'industrial', not 'SaaS' or 'playful'.

## Type pairing
Anton + IBM Plex Sans
