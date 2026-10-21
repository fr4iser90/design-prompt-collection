Deliverable: single-file HTML/CSS/JS.

Build a single-page, dark-mode long-form essay titled 'Phosphorescent Bloom' for the fictional imprint 'Mycelium Quarterly'. The core mechanic is a biological attention heat-map: paragraph luminance correlates directly with cumulative read-time. The page must feel like a living organism, not a static document.

**Visual Identity & Palette**
Background: #050805 (Deep Void). Primary Text/Ink: #1A1A1A (Unlit Charcoal, initially invisible against bg). Active Glow/Accent: #39FF14 (Phosphorescent Green). Use subtle gradients for the glow effect, never flat colors. The glow should emanate from the text itself, not a background box. Use `text-shadow` for the bloom effect, varying the blur radius and opacity based on the 'read score'.

**Typography**
Headings: 'Fraunces', serif. Use variable font settings if possible to adjust weight/softness. Body: 'IBM Plex Sans', sans-serif. High contrast between the organic serif headers and the technical sans body. Line-height must be generous (1.8–2.0) to allow for the 'breathing' space of the glow. Font size for body: 18px–20px on desktop.

**Layout Structure**
1. **Header**: Minimal. 'Mycelium Quarterly' logo in Fraunces, top-left. Issue number and date in IBM Plex Sans, top-right. No navigation bar. 
2. **Hero**: Large title 'Phosphorescent Bloom' centered or left-aligned, with a subhead 'A Study in Attention'. The title itself should have a faint, slow pulse even before reading begins, establishing the 'alive' state.
3. **Article Body**: A single column, max-width 700px, centered. Each paragraph is a distinct interactive unit. 
4. **Footer**: Simple copyright and 'Mycelium Quarterly' imprint.

**Core Mechanic: The Attention Engine**
1. **State Tracking**: Each `<p>` tag must have a data attribute `data-read-score` (initially 0). 
2. **Intersection Observer**: Use `IntersectionObserver` to detect when a paragraph is in the viewport. 
3. **Time Accumulation**: When a paragraph is in the viewport, start a `requestAnimationFrame` loop or `setInterval` that increments its `data-read-score`. 
4. **Luminance Mapping**: 
   - Score 0–10: Text color #1A1A1A (invisible). 
   - Score 10–50: Text color transitions to #39FF14 with low opacity (0.2). 
   - Score 50–100: Text color #39FF14, opacity 0.6, `text-shadow: 0 0 10px #39FF14`. 
   - Score >100: Text color #39FF14, opacity 1.0, `text-shadow: 0 0 20px #39FF14, 0 0 40px #39FF14`. 
   - Implement a smooth CSS transition for color and text-shadow (duration: 1s, ease-out).
5. **Pruning Interaction**: Clicking a paragraph resets its `data-read-score` to 0. The text should immediately fade back to #1A1A1A (invisible) over 0.5s. This simulates 'pruning' the network. Add a subtle 'shiver' animation (transform: translateX(2px) then back) on click to give tactile feedback.

**Ambient Motion**
1. **Idle Pulse**: Paragraphs with a score >50 should have a very slow, rhythmic pulse (opacity oscillating between 0.8 and 1.0) using CSS keyframes. This makes the 'read' sections feel alive.
2. **Entrance**: On page load, all text is invisible (#1A1A1A). As the user scrolls, paragraphs fade in to their current state. If a paragraph has never been read, it remains invisible until scrolled into view, then starts accumulating score.

**Constraints**
- No external libraries (no React, no Vue, no GSAP). Vanilla JS only.
- No images. Use CSS gradients and box-shadows for any visual texture.
- No scrollbars visible (hide scrollbar via CSS, but keep scroll functionality).
- Ensure accessibility: The text must be readable even when 'unlit' (use a very faint #1A1A1A on #050805, or provide a 'high contrast' toggle if necessary, but the primary experience is the glow).
- Performance: Use `will-change: opacity, text-shadow` on paragraphs to optimize repaints.

**Content**
Write 5–7 paragraphs of placeholder text about mycelium networks, digital attention, or biological light. The text should be poetic but scientific. Include one pull-quote in the middle, styled with larger Fraunces type and a stronger glow.

**Edge Cases**
- If the user leaves the tab, pause the score accumulation for all paragraphs.
- If the user returns, resume accumulation.
- Ensure the glow does not cause performance issues on mobile (reduce blur radius on smaller screens).

**Desktop Layout Specifics**
On viewports wider than 1024px, the main content column should be strictly centered with a max-width of 700px. The header should use `position: fixed` with a backdrop-filter blur of 10px and a background of rgba(5, 8, 5, 0.8) to maintain legibility over scrolling content. The footer should have significant bottom padding (10rem) to allow the final paragraph to scroll into the center of the screen for maximum reading comfort. The 'High Contrast' toggle should be a small, circular button in the top-right corner, styled with a 1px border of #39FF14 and no background fill until hovered.

**Mobile Layout Specifics**
On viewports narrower than 768px, the max-width constraint is removed, allowing text to span 90% of the screen width. Font sizes scale down to 16px for body text to prevent horizontal overflow. The header becomes static (not fixed) to save vertical space. The 'High Contrast' toggle moves to the bottom-right corner as a floating action button (FAB) with a larger touch target (44x44px). The text-shadow blur radii are reduced by 50% to maintain performance on lower-powered devices. Line-height reduces slightly to 1.6 to accommodate smaller screens.

**Motion Details**
- **Scroll Velocity Impact**: If the user scrolls rapidly, the Intersection Observer threshold should be lowered to 0.1 to ensure paragraphs are registered even during fast movement. 
- **Hover State**: On desktop, hovering over an 'unlit' paragraph (score < 10) should slightly increase its opacity to 0.1, hinting at the text's presence without fully illuminating it. 
- **Focus State**: For keyboard navigation, focused paragraphs should receive a subtle outline in #39FF14 with 0.5 opacity, ensuring accessibility compliance. 
- **Transition Timing**: Use `cubic-bezier(0.4, 0.0, 0.2, 1)` for all color transitions to mimic the slow, organic growth of fungal networks.

**Acceptance Criteria**
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
