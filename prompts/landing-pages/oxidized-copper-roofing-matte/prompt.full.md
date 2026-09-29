# Oxidized Copper Roofing — Extended

**Concept:**
This landing page for 'Verdigris Architects' celebrates the temporal nature of materials. Unlike sterile modernism, this brand embraces the beauty of weathering. The digital interface mirrors the physical process of copper oxidizing: starting bright and metallic, then dulling, then developing a protective, verdant patina. The design should feel heavy, permanent, and quietly elegant.

**Palette:**
- **Base:** #EAE6D9 (Unbleached Paper/Matte Stone) or #1A1A1A (Dark Slate)
- **Primary Metal:** #B87333 (Fresh Copper) transitioning to #6A5C52 (Aged Bronze)
- **Patina Accent:** #8FA898 (Soft Verdigris) — used sparingly for CTAs and highlights.
- **Text:** #2F4F4F (Dark Charcoal) on light; #EAE6D9 on dark.

**Typography:**
- **Display:** 'Cormorant Garamond' or 'Playfair Display'. High contrast serif. Large sizes (60px+ desktop). Use italic for subheadings to evoke handwritten architectural notes.
- **Body:** 'IBM Plex Sans' or 'Source Sans Pro'. Clean, technical, legible at small sizes. Monospace variants for coordinates/specs.

**Layout:**
- **Desktop:** 12-column grid. Hero occupies left 2/3, with a vertical navigation rail on the right (thin, hairline borders). Project gallery uses a masonry layout with irregular spacing to mimic stone masonry.
- **Mobile:** Single column. Hero collapses to full-width. Navigation becomes a sticky bottom bar with minimal icons.

**Motion Brief:**
1. **Entrance (The Bloom):** The hero graphic starts as a sharp, metallic bronze polygon. Over 3 seconds, a radial gradient of verdigris green slowly expands from the center, softening the edges. Text elements fade up with a slight 'heavy' easing (easeOutQuint).
2. **Ambient (Time-Lapse):** The background texture has a very slow CSS animation shifting the opacity of two overlaid noise patterns (one bronze, one green) to simulate slow oxidation. Duration: 60s loop.
3. **Interaction (Weathering):** Project cards have a 'clean' state and a 'weathered' state. On hover, the image scales down 1%, and a green-tinted overlay with a noise mask fades in, simulating the patina taking over.

**Constraints Checklist:**
- [ ] No glossy buttons or standard web shadows.
- [ ] Use SVG filters for the oxidation effect if possible, or CSS gradients with noise.
- [ ] Ensure text remains legible against textured backgrounds.
- [ ] Reduced motion fallback: Instant state change, no ambient loops.

**Acceptance Criteria:**
- The page feels 'heavy' and substantial.
- The color transition from bronze to green is organic, not abrupt.
- Typography hierarchy is clear despite the artistic textures.
