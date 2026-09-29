# Woven Rattan Lattice — Extended

**Concept:**
'Loom & Light' focuses on the interplay of structure and transparency in woven furniture. The landing page treats the web as a woven surface. Text and images are not placed *on* the page, but *between* the strands. The design emphasizes light filtering through the weave, creating dappled shadows and highlights.

**Palette:**
- **Strand Light:** #C19A6B (Sunlit rattan)
- **Strand Shadow:** #8B7355 (Shadowed weave)
- **Light/Background:** #F5F5DC (Warm sunlight cream)
- **Text:** #4A3F35 (Deep brown, high contrast against cream)

**Typography:**
- **Display:** 'DM Serif Display'. High contrast serif. Used for large section titles. Apply a 'knockout' effect so the background pattern shows through the thick strokes of the letters.
- **Body:** 'Karla'. Clean, geometric, legible. White or light cream on dark sections; dark brown on light.

**Layout:**
- **Hero:** Full-screen woven pattern. Headline is 'cut out' of the pattern using `mix-blend-mode: multiply` or `clip-path`.
- **Product Grid:** Images are framed by a border that looks like the end of a weave. Hovering lifts the frame (shadow) and clarifies the image.
- **Mobile:** The pattern simplifies to a subtle background. Text is always fully legible (no masking on small screens).

**Motion Brief:**
1. **Entrance (Weaving):** The hero pattern starts with `stroke-dasharray` set to full length (invisible). Animate `stroke-dashoffset` to 0 over 2s. The pattern draws itself left-to-right, then top-to-bottom.
2. **Interaction (Loosen):** On product card hover, the rattan border pattern scales 110% and reduces opacity to 0.5, allowing the product image to pop forward. The cursor changes to a 'grab' icon.
3. **Ambient (Light Shift):** A large, soft radial gradient (simulating sunlight) moves slowly across the page (`transform: translate`). This interacts with the pattern via `mix-blend-mode: overlay` or `soft-light`, creating moving dapples of light.

**Constraints Checklist:**
- [ ] Performance: Use SVG patterns, not heavy images, for the weave.
- [ ] Accessibility: Ensure text contrast is sufficient even with the pattern. Use text-shadow if needed.
- [ ] No harsh lines. All edges should feel organic or woven.
- [ ] Test on mobile: Pattern must not distract from content.

**Acceptance Criteria:**
- The page feels airy and light, despite the complex pattern.
- The 'weaving' entrance animation is smooth and satisfying.
- Light effects create a realistic sense of depth and time-of-day.
