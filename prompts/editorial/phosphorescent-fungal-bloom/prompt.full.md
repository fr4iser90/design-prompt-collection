## Concept
Create a single-page, dark-mode long-form essay titled 'Phosphorescent Bloom' for the fictional imprint 'Mycelium Quarterly'. The core concept is a 'biological attention heat-map': the luminance of each paragraph is directly tied to the cumulative time the user has spent reading it. This transforms the static act of reading into a dynamic, visual representation of focus, where 'read' sections glow with a faint, fungal green light, and 'unread' sections remain dark and dormant. The page should feel like a living organism, reacting to the user's presence and attention.

## Palette
- **Background**: #050805 (Deep Void) - A near-black green, providing a canvas for the glow.
- **Unlit Text**: #1A1A1A (Unlit Charcoal) - The initial state of the text, barely visible against the background, representing dormant mycelium.
- **Active Glow**: #39FF14 (Phosphorescent Green) - The color of attention. Used for text color and `text-shadow` bloom.
- **UI Elements**: #39FF14 with 0.3 opacity for subtle borders or dividers.
- **Hover Accent**: #39FF14 with 0.1 opacity for subtle background hints on interactive elements.

## Type
- **Headings**: 'Fraunces', serif. Use a variable font weight (e.g., 300–700) to create a soft, organic feel. The title should be large (clamp(3rem, 5vw, 5rem)) and have a subtle, constant pulse.
- **Body**: 'IBM Plex Sans', sans-serif. Clean, technical, and readable. Size: 18px–20px. Line-height: 1.8. 
- **Pull-Quotes**: 'Fraunces', italic, larger size (1.5em), with a stronger glow effect.
- **Meta Data**: 'IBM Plex Mono', monospace, for issue numbers and dates to add a technical, archival feel.

## Layout
- **Header**: Fixed or absolute positioned at the top. 'Mycelium Quarterly' logo in Fraunces (left), Issue/Date in IBM Plex Sans (right). No navigation links.
- **Main Content**: A single column, max-width 700px, centered. Generous vertical spacing between paragraphs (2em).
- **Paragraphs**: Each `<p>` is an interactive unit. No cards, no boxes. Just text on the void.
- **Footer**: Simple, centered text at the bottom. '© Mycelium Quarterly'.

## Desktop Layout
- **Viewport > 1024px**: 
  - Header is `position: fixed`, top: 0, width: 100%, z-index: 100. Background: rgba(5, 8, 5, 0.85), backdrop-filter: blur(12px). Border-bottom: 1px solid rgba(57, 255, 20, 0.1).
  - Main content has `padding-top: 120px` to clear the fixed header.
  - Paragraphs have `margin-bottom: 3rem`.
  - Hover effects are active on all interactive elements.
  - The 'High Contrast' toggle is a small icon button in the top-right corner of the header.

## Mobile Layout
- **Viewport < 768px**:
  - Header is `position: static`, background: transparent. No backdrop-filter to save performance.
  - Main content has `padding-top: 20px`.
  - Paragraphs have `margin-bottom: 2rem`.
  - Font size for body text reduces to 16px.
  - Text-shadow blur radii are halved (e.g., 20px becomes 10px) to prevent rendering lag.
  - The 'High Contrast' toggle is a floating action button (FAB) at bottom-right, 44x44px, with a solid #39FF14 background and black icon.

## Motion
1. **Entrance**: All text starts at #1A1A1A (invisible). As the user scrolls, `IntersectionObserver` triggers the 'awakening' of paragraphs. If a paragraph has a score > 0, it fades in to its current glow level. If score is 0, it remains invisible until the user stops scrolling or hovers, then begins accumulating score.
2. **Ambient Pulse**: Paragraphs with a score > 50 have a CSS keyframe animation that slowly oscillates their opacity between 0.8 and 1.0, creating a 'breathing' effect. Duration: 4s, infinite, ease-in-out.
3. **Interaction (Pruning)**: Clicking a paragraph resets its score to 0. The text immediately fades to #1A1A1A over 0.5s. Add a small 'shiver' transform (translateX(2px)) on click to simulate the physical act of pruning.
4. **Glow Transition**: All color and shadow changes must have a CSS transition (1s, ease-out) to feel organic and smooth.
5. **Scroll Velocity**: If scroll speed exceeds 50px/frame, pause accumulation for 200ms to prevent accidental 'reading' of skipped content.
6. **Hover Glow**: On desktop, hovering over an unlit paragraph increases opacity to 0.15 and adds a faint `text-shadow: 0 0 5px #39FF14` to hint at interactivity.

## Constraints
- **Stack**: Single-file HTML/CSS/JS. No external libraries.
- **Performance**: Use `will-change` on animated properties. Limit `text-shadow` blur radius on mobile.
- **Accessibility**: Ensure text is readable. Provide a 'High Contrast' toggle in the header that switches all text to #39FF14 and removes the glow, for users who need it. Ensure focus states are visible for keyboard users.
- **No Images**: All visuals must be CSS-driven (gradients, shadows, text).
- **Scroll**: Hide the scrollbar visually, but maintain functionality.
- **Tab Visibility**: Use `document.visibilityState` to pause accumulation when the tab is inactive.

## Acceptance criteria
- [ ] Page loads with all text invisible (#1A1A1A) against #050805.
- [ ] Scrolling into a paragraph causes it to gradually glow green (#39FF14) over time.
- [ ] The glow intensity increases with time spent (more blur, brighter color).
- [ ] Clicking a paragraph resets its glow to invisible and triggers a 'shiver' animation.
- [ ] 'Mycelium Quarterly' branding is visible in the header.
- [ ] Typography uses Fraunces and IBM Plex Sans.
- [ ] No external JS/CSS libraries are loaded.
- [ ] The page is responsive and readable on mobile.
- [ ] The 'High Contrast' toggle works and switches the theme to flat green text.
- [ ] The ambient pulse is visible on 'read' paragraphs.
- [ ] Scrollbar is hidden but functional.
- [ ] Tab visibility change pauses/resumes accumulation.
- [ ] Hover states are distinct on desktop.
- [ ] Mobile layout adjusts font sizes and shadows appropriately.

## Type pairing
Fraunces + IBM Plex Sans
