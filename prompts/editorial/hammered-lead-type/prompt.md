Build an editorial page for 'Matrix Quarterly' that simulates the physicality of lead type casting.

**Visual Identity:**
- **Background:** #050505 (Deep Black) representing the press bed. No gradients. Pure, absolute void to maximize contrast with metallic elements.
- **Type Color:** #c0c0c0 (Lead Silver) for primary text; #8a8a8a for secondary metadata. The silver should feel cold, hard, and reflective, not soft or white.
- **Grid:** Visible #2a2a2a lines acting as 'furniture' or spacing material between columns. These lines must have a slight 3D bevel effect (light top/left, dark bottom/right) to simulate metal bars holding type in place. Use subtle box-shadows to create this depth without using gradients.
- **Fonts:** Bodoni Moda for all headlines (high contrast, sharp serifs). IBM Plex Mono for body text and captions. Ensure font loading is optimized to prevent FOIT (Flash of Invisible Text).

**Layout Structure:**
- **Hero:** A massive Bodoni Moda headline 'FOUNDRY & FLAW' centered. It should look heavy, with a subtle drop shadow (0 4px 10px rgba(0,0,0,0.8)) to suggest it is raised off the page. The hero section should occupy at least 40vh on desktop.
- **Grid System:** 12-column grid. Content blocks are 'cast' into these columns. Use the #2a2a2a furniture lines as vertical dividers between columns. On mobile, collapse to a single column but retain the visual weight of the lines as horizontal separators.
- **Reading Flow:** Standard editorial flow, but with 'impressions'—slight indentations in the background color where text blocks sit, simulating pressure. Use a background color of #0a0a0a for text blocks to create this depth.
- **Sticky Rail:** A left-side sticky rail (desktop only) shows the current 'chapter' or 'column number' in #8a8a8a, monospace, small font. It acts as the 'index' of the press. Hide on mobile to save space.

**Motion & Interaction:**
1. **Entrance Animation:** On load, headlines do not fade in. They 'drop' from above with a cubic-bezier(0.34, 1.56, 0.64, 1) easing (bounce). As they land, the shadow expands slightly then settles. The 'furniture' lines beneath them vibrate (translateY ±1px) for 0.3s to suggest impact. This vibration must be subtle to avoid motion sickness.
2. **Ambient State:** The grid lines have a constant, very subtle opacity oscillation (0.8 to 1.0) over 4s to feel alive, like heat haze or settling metal. This animation should be infinite and ease-in-out.
3. **Interaction - Re-casting:** When a user clicks a paragraph of body text, trigger a 'ripple' effect. 
   - Use a CSS filter or canvas overlay to distort the text slightly (scaleX/skewX) for 0.2s.
   - Change the color momentarily to #fff (molten) then back to #c0c0c0.
   - Add a 'spark' particle effect (3-5 small #fff dots) shooting out from the click point. Particles should animate translateY(-20px) and opacity 0 over 0.5s.

**Constraints:**
- No rounded corners. All edges are sharp (border-radius: 0).
- No soft shadows except for the 'depth' of the type. No blur filters on text unless part of the re-casting interaction.
- Maintain high contrast for readability. #c0c0c0 on #050505 meets WCAG AAA.
- Ensure the 'vibration' is subtle enough not to cause motion sickness (prefers-reduced-motion check required).
- Performance: Use GPU-accelerated properties (transform, opacity) for all animations.

**Acceptance Criteria:**
- [ ] Background is exactly #050505.
- [ ] Headlines use Bodoni Moda and drop with a bounce animation on load.
- [ ] Grid lines are visible (#2a2a2a) and vibrate when headlines land.
- [ ] Clicking body text triggers a color flash (#fff) and particle effect.
- [ ] No rounded corners are present anywhere in the UI.
- [ ] Body text uses IBM Plex Mono.
- [ ] `prefers-reduced-motion` disables all animations.
- [ ] The 'furniture' lines have a 3D bevel effect (light/dark borders).

Deliverable: single-file HTML/CSS/JS.
