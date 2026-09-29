# WeaveWorks — Extended Brief

**Concept:**
'WeaveWorks' manufactures high-efficiency heat exchangers for industrial applications. Their key innovation is a woven tube design that maximizes surface area. The website visualizes this 'weave' as a living, breathing engine. The copper pipes are not static; they carry energy.

**Palette:**
- **Background:** Deep Brown-Black (#2c1a1a) to complement copper.
- **Copper:** Metallic Copper (#b87333) with highlights (#ffdab9) and shadows (#5c3a21).
- **Heat:** Vibrant Orange (#ff5500) to #ffaa00 gradient for the pulse.
- **Text:** White (#f0f0f0) for high contrast.

**Type Pairing:**
- **Display:** 'Montserrat' or 'Futura' (Bold, uppercase). Geometric and engineered.
- **Body:** 'Work Sans' (Regular). Clean and technical.

**Layout Desktop:**
1. **Hero:** Full-screen SVG of the woven pipes. The weave pattern is dense and intricate.
2. **Text:** Large headline 'Engineered Warmth' overlaid in the center. 
3. **Scroll:** As user scrolls, the camera zooms in slightly, and the heat pulse accelerates.
4. **Features:** Below the fold, white background with black text. Simple diagrams of the weave structure.

**Layout Mobile:**
1. **Hero:** The weave pattern is simplified (fewer lines) to prevent clutter.
2. **Text:** Smaller, positioned at the bottom.

**Motion Brief:**
- **Entrance:** Lines of the weave draw themselves in from the edges towards the center (SVG stroke-dashoffset animation).
- **Ambient:** The heat pulse moves continuously. The speed of the pulse correlates with 'efficiency' (faster = hotter/better).
- **Interaction:** Hovering over a specific 'zone' of the weave highlights that section with a brighter glow and shows a tooltip 'Surface Area: +20%'.

**Constraints Checklist:**
- [ ] SVG must be optimized (minimal nodes) to prevent performance issues.
- [ ] No purple or blue tones. Stick to warm metallics.
- [ ] Text must remain readable even over the busy pattern (use backdrop-filter or mix-blend-mode carefully).
- [ ] Respect prefers-reduced-motion: Stop the pulse, show static image.

**Acceptance Criteria:**
The visual communicates 'complexity' and 'heat' simultaneously. The copper looks real, not like a flat orange shape. The brand feels innovative and high-tech.
