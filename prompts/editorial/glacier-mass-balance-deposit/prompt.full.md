## Concept
"Mass Balance Ledger" is an editorial data-story experience for the imprint "Cryo-Chronicle". It visualizes annual glacier mass balance data as a physical, stratified sediment stack. The core metaphor is that data is not abstract; it is physical accumulation and erosion. Positive mass balance builds up blue glacial layers; negative mass balance carves red meltwater channels into the existing structure. The scroll experience mimics the slow, geological accumulation of ice, with each year's data point acting as a distinct stratum. The design rejects dashboard aesthetics in favor of a tactile, print-inspired editorial layout where the visualization is the hero, and the text provides the narrative context.

## Palette
- **Background:** `#1a2332` (Deep Ice Shadow) - Provides a cold, deep contrast for the data layers.
- **Primary Data (Positive):** `#48cae4` (Glacial Blue) - Used for layers representing ice gain. Should feel solid and opaque.
- **Secondary Data (Negative):** `#e63946` (Meltwater Red) - Used for layers representing ice loss. Should feel sharp and eroding.
- **Text/Ink:** `#f1faee` (Snow White) - For primary text and headings.
- **Accent/Metadata:** `#90e0ef` (Pale Ice) - For secondary text, borders, and the cumulative meter line.
- **Texture:** Subtle noise overlay on the background and bedrock to mimic paper grain or ice crystal structure.

## Type
- **Headings & Narrative:** `Cormorant Garamond`. Use for the masthead "Cryo-Chronicle", section titles, and body text. This serif font evokes scientific journals and annual reports, providing an editorial weight. Use `font-weight: 400` for body, `600` for headings. Tracking should be slightly loose for headings to enhance readability against the dark background.
- **Data & Labels:** `IBM Plex Mono`. Use for all years, mass balance values, axis labels, and tooltips. This monospace font ensures numerical alignment and conveys technical precision. Use `font-size: 0.8rem` for labels, `1rem` for values.
- **Hierarchy:** 
  - Masthead: Small-caps, tracking 0.1em, size 1.2rem.
  - Hero Title: Size 3-4rem, weight 600.
  - Narrative Body: Size 1.1rem, line-height 1.6.
  - Data Labels: Size 0.9rem, weight 500.

## Layout
- **Structure:** A vertical scroll narrative. The page is divided into a fixed masthead, a hero section, and a main content area containing the visualization and narrative blocks.
- **Masthead:** Sticky top bar with "Cryo-Chronicle" on the left and "Annual Report 2023" on the right. Background: `#1a2332` with a bottom border of `#90e0ef`.
- **Hero:** Centered title "Mass Balance Ledger" in Cormorant Garamond. Subtitle in IBM Plex Mono. Background: `#1a2332` with a subtle radial gradient or noise texture.
- **Main Content:** 
  - **Canvas Container:** A central column, 60% width on desktop, 90% on mobile. This container holds the HTML5 Canvas element. It should have a fixed height that matches the viewport height (100vh) or slightly less, with the content scrolling within or alongside it.
  - **Narrative Blocks:** Text blocks positioned to the left or right of the canvas container. They should be spaced out vertically to align with the corresponding data layers. Use `position: sticky` or `absolute` positioning relative to the scroll container to ensure they appear at the right time.
  - **Cumulative Meter:** A thin vertical line on the right edge of the canvas container. It tracks the cumulative mass balance. It should be colored `#90e0ef` and have a small marker indicating the current total.
- **Spacing:** Generous whitespace. The visualization should breathe. Avoid dense columns. Use `padding: 4rem 2rem` for main sections.

## Motion
- **Entrance:** 
  - The "bedrock" (base layer) slides up from the bottom of the canvas viewport over 1.5 seconds with an ease-out curve. 
  - The masthead fades in and slides down from the top.
  - Hero text fades in with a slight upward translate.
- **Ambient:** 
  - **Meltwater Particles:** A particle system on the canvas. Small, semi-transparent white/blue dots drip down the surface of the current top layer. They move slowly and irregularly. As they move, they leave faint, temporary dark streaks (alpha fade) that simulate water running over ice. This effect should be continuous but subtle, not distracting.
  - **Noise:** A static or very slowly shifting noise texture on the background to add depth.
- **Interaction:** 
  - **Scroll-Triggered Layering:** As the user scrolls past a narrative block, the corresponding data layer animates into view. 
    - **Positive Mass:** The blue layer grows upward from the previous layer's top edge. Height animates from 0 to final value over 1 second. Edge has slight irregularity.
    - **Negative Mass:** The red layer grows downward from the previous layer's top edge, carving into the blue. Height animates from 0 to final value over 1 second. Edge is jagged or eroded.
  - **Cumulative Meter:** The meter on the right updates in real-time as layers are added. It grows/shrinks smoothly.
  - **Hover:** Hovering over a layer displays a tooltip with the year and value. Tooltip fades in/out quickly.
  - **Narrative Fade:** Narrative blocks fade in (opacity 0 to 1) and slide slightly (translateY 20px to 0) as they enter the viewport. They fade out as they leave.

## Constraints
- **Deliverable:** Single-file HTML/CSS/JS.
- **Tech Stack:** Vanilla JavaScript, HTML5 Canvas, CSS3. No external libraries (except Google Fonts).
- **Performance:** Optimize canvas rendering. Use `requestAnimationFrame`. Only redraw on scroll, animation, or resize. Avoid memory leaks in the particle system.
- **Responsiveness:** The canvas must resize correctly on window resize. Recalculate layer heights and positions. On mobile, the canvas container should be full width, and narrative blocks should stack below or above the canvas.
- **Accessibility:** Ensure text is selectable. Provide a hidden table or ARIA labels for the data on the canvas. The narrative text must be in the DOM, not just on the canvas.
- **Visual Fidelity:** 
  - No standard bar charts. Layers must look physical.
  - No purple gradients or glow effects.
  - No dense multi-column newspaper layout.
  - The "carve" effect must be visually distinct from the "grow" effect.
  - Use `Cormorant Garamond` and `IBM Plex Mono` exclusively.

## Acceptance criteria
- [ ] **File Structure:** Single HTML file containing all CSS and JS.
- [ ] **Fonts:** `Cormorant Garamond` and `IBM Plex Mono` are loaded and applied correctly. No system fonts used for headings or data.
- [ ] **Palette:** Colors match the specified hex codes (`#1a2332`, `#48cae4`, `#e63946`, `#f1faee`, `#90e0ef`).
- [ ] **Visualization:** 
  - A canvas element renders the sediment stack.
  - Positive mass creates blue layers growing upward.
  - Negative mass creates red layers growing downward (carving).
  - Layers have irregular edges, not perfect rectangles.
  - Cumulative meter on the right updates correctly.
- [ ] **Motion:** 
  - Bedrock slides up on load.
  - Meltwater particles drip down the canvas.
  - Layers animate in on scroll.
  - Narrative blocks fade in/out on scroll.
- [ ] **Interaction:** 
  - Hovering over a layer shows a tooltip with year and value.
  - Scrolling triggers the correct layer animation.
- [ ] **Content:** 
  - Masthead displays "Cryo-Chronicle".
  - Hero title is "Mass Balance Ledger".
  - Narrative text references specific years and data values.
  - Data is hardcoded for at least 10 years.
- [ ] **Responsiveness:** 
  - Layout adapts to mobile (canvas full width, text stacks).
  - Canvas resizes on window resize without distortion.
- [ ] **Accessibility:** 
  - Text is selectable.
  - Data is accessible via DOM (e.g., hidden table or ARIA labels).
- [ ] **Performance:** 
  - No console errors.
  - Smooth scrolling and animation (60fps target).
  - No memory leaks in particle system.
- [ ] **Anti-Cliche:** 
  - No standard bar chart appearance.
  - No purple/glow effects.
  - No dense newspaper columns.
