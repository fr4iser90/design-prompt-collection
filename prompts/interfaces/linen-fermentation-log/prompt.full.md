## Concept
Create 'Mold & Matter', a specialized interface for artisan cheese makers to track the fermentation process of their rinds. The design philosophy is 'Chef Precision' meets 'Wabi-Sabi'. The interface is not just a data logger; it is a visual representation of the cheese's aging. The core metaphor is the 'Rind': a procedural noise texture that evolves from a clean, white surface to a dense, dark, complex texture as environmental variables (humidity, salt) are logged. The UI should feel tactile, like a paper logbook, but powered by dynamic generative graphics.

## Primary task
The user's primary task is to log environmental conditions for a specific cheese batch. This involves entering date, humidity, salt levels, and optional notes. Each entry updates the visual state of the 'rind' texture, allowing the user to intuitively grasp the progression of the fermentation. The system must handle the accumulation of data gracefully, ensuring the visual representation remains legible even as the noise density increases.

## States
1.  **Empty State:** No entries logged. The canvas displays a very low-amplitude, high-frequency noise in light grey/white. The timeline area displays a centered, italicized prompt: 'Start your log' in Cormorant Garamond. The form is visible and ready for input.
2.  **Active State:** Entries exist. The timeline shows vertical connectors between data points. The noise texture is denser and darker, reflecting the cumulative data. The latest entry is highlighted with a subtle glow or border. The 'Log Entry' button is active.
3.  **Input Focus:** When an input field is focused, its hairline border thickens slightly (from 1px to 2px) and changes to the accent color #8B7D6B. The label above the input moves up slightly if using a floating label pattern, or remains static if using standard labels.
4.  **Error State:** Invalid input (e.g., non-numeric salt, humidity > 100) triggers a red border (#D9534F) and a subtle horizontal shake animation on the input group. An error message appears below the input in small, red text.
5.  **Logging Animation:** Upon submission, a 'ripple' effect emanates from the new timeline node across the canvas noise, visually 'stamping' the entry. The node scales up and settles. The canvas noise parameters update smoothly over 500ms.

## Palette
-   **Background (Linen):** `#FDFBF7` - The base color, representing the clean cheese or fresh paper.
-   **Ink (Slate):** `#3D405B` - Primary text color, headers, and UI icons. Strong contrast.
-   **Accent (Rind/Warm Grey):** `#8B7D6B` - Used for active states, borders, and the mid-tone of the noise texture.
-   **Error:** `#D9534F` - Only for validation errors.
-   **Success:** `#5CB85C` - Subtle flash on successful save (optional).
-   **Noise Dark:** `#4A4A4A` - The target color for high-density noise.

## Type
-   **Display:** `Cormorant Garamond`. Use for the brand name 'Mold & Matter', entry dates, and large data values (e.g., '85%'). It should feel elegant and slightly antique. Font weight 400 for body, 600 for headers.
-   **Body/UI:** `Public Sans`. Use for form labels, small instructions, and buttons. It provides the necessary legibility for functional UI elements. Font weight 400 for body, 500 for buttons.
-   **Hierarchy:** Brand > Entry Date > Data Values > Labels > Notes.
-   **Sizes:** Brand 24px, Entry Date 18px, Data Values 16px, Labels 12px, Notes 14px.

## Layout
-   **Desktop:** Two-column layout. 
    -   **Left (30%):** Fixed sidebar containing the brand logo at the top and the 'Log Entry' form below it. The form is compact. Padding 24px. Background #FDFBF7 with a subtle right border #E5E5E5.
    -   **Right (70%):** The main content area. This contains the `<canvas>` element which fills the background. Overlaid on the canvas is the vertical timeline component. The timeline should be centered or slightly offset to the right, with entries stacked vertically. Padding 40px.
-   **Mobile:** Single column. The brand and a 'Add Entry' button are sticky at the top or bottom. The timeline is the main scrollable area. The form appears in a modal or slide-up drawer when 'Add Entry' is clicked. The drawer should have a backdrop blur and slide up from the bottom with a spring animation.
-   **Spacing:** Generous whitespace to evoke 'calm' and 'craft'. Hairlines (1px) for dividers, not heavy borders. Margin between timeline nodes 40px.

## Motion
1.  **Entrance:** When the page loads, the brand text and form fade in slightly (opacity 0 to 1 over 500ms). The canvas noise initializes with a 'growth' animation, expanding from the center or top.
2.  **Ambient:** The noise texture has a very slow, subtle drift or 'breathing' effect (changing seed or offset slowly over time) to simulate organic life. This should be barely perceptible to avoid distraction but noticeable if stared at. Use `requestAnimationFrame` for smooth updates.
3.  **Interaction (Logging):** When 'Log Entry' is clicked:
    -   The button shows a 'pressed' state (scale 0.95).
    -   A new node appears on the timeline with a scale-up animation.
    -   A 'ripple' effect originates from the node's position on the canvas, temporarily increasing the noise amplitude/frequency in a circular wave before settling into the new global state.
4.  **Hover:** Hovering over a timeline entry highlights the corresponding noise region (if possible) or simply highlights the entry row with a background tint rgba(139, 125, 107, 0.1).

## Constraints
-   **No Images:** All textures must be generated procedurally via Canvas 2D or WebGL.
-   **Performance:** The noise generation must not block the main thread. Use `requestAnimationFrame`. Consider rendering noise to an offscreen canvas at lower resolution and scaling it up for performance.
-   **Accessibility:** Ensure high contrast for text. Form inputs must have proper labels. Focus states must be visible. Use ARIA labels for the canvas if it contains interactive elements.
-   **Tech Stack:** HTML, CSS, Vanilla JS or React/Vue/Svelte. Canvas API required.
-   **No AI Defaults:** Avoid generic SaaS gradients, purple glows, or standard card shadows. Use flat colors, hairlines, and procedural textures.
-   **Deliverable:** Single-file HTML/CSS/JS. No external assets except Google Fonts.

## Acceptance criteria
-   [ ] Interface loads with a procedural noise background that matches the 'Empty State' description.
-   [ ] User can successfully enter data into the form and submit it.
-   [ ] Submitting data adds a new entry to the timeline.
-   [ ] The noise texture visually changes (becomes darker/denser) after logging data.
-   [ ] A ripple animation is visible upon logging a new entry.
-   [ ] Invalid data triggers the 'Error State' (red border/shake).
-   [ ] The layout is responsive and usable on mobile devices.
-   [ ] Typography uses Cormorant Garamond and Public Sans as specified.
-   [ ] The 'Mold & Matter' brand is visible and styled correctly.
-   [ ] No console errors related to canvas rendering or noise generation.
-   [ ] The mobile drawer functions correctly (open/close).
-   [ ] The noise performance remains smooth (60fps) on standard hardware.
