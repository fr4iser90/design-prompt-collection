# Noodle Hydrocolloid Shear — Extended Brief

**Concept:**
'Gluten & Gauge' is not a home-cooking blog; it is a supplier for Michelin-starred kitchens. The design must communicate scientific rigor applied to artisanal craft. The core metaphor is *hydrocolloid behavior*—the precise control of water, starch, and protein under pressure. The visual language rejects the messy, flour-dusted aesthetic of traditional Italian kitchens in favor of the clean, stainless-steel reality of professional production.

**Art Direction:**
- **Atmosphere:** Sterile, bright, airy. The background is not pure white but a high-thread-count linen white (#F4F4F0) with subtle noise texture to prevent digital flatness.
- **Materiality:** Brushed stainless steel for UI elements (buttons, borders, nav). The 'dough' element is rendered as a smooth, matte-beige fluid that feels heavy and resistant.
- **Lighting:** Soft, diffused north-light. No harsh shadows. Shadows should be soft and ambient (blur 20px+, opacity 0.1).

**Typography:**
- **Display:** 'Editorial New' or 'Times New Roman' (serif). Large, tight tracking (-0.02em). Used for section headers and the main value proposition.
- **Body/UI:** 'IBM Plex Mono' or 'Space Mono'. Used for all data points, hydration percentages, and product codes. This creates a 'technical spec sheet' feel.

**Layout:**
- **Desktop:** Asymmetric grid. Left 60% is the hero fluid visualization. Right 40% is a sticky column of technical specs that updates as the user scrolls through different dough types (0.4 hydration, 0.6 hydration, etc.).
- **Mobile:** Stacked. Fluid visualization becomes a background layer with opacity 0.2, allowing text to remain legible.

**Motion Brief:**
1.  **Entrance:** The steel frame draws itself in (SVG stroke animation) from top to bottom.
2.  **Ambient:** The dough flow moves continuously at a slow pace (10s loop). It should feel 'alive' but controlled.
3.  **Interaction:** Mouse hover on the hero distorts the flow path slightly, as if a hand is guiding it. Clicking a 'spec' tab snaps the flow to a new viscosity level with a 0.5s ease-out transition.

**Constraints Checklist:**
- [ ] No wood grain or terracotta colors.
- [ ] No 'handwritten' fonts.
- [ ] All motion must respect `prefers-reduced-motion` (disable flow animation, keep static).
- [ ] Contrast ratio for text on linen background must be > 4.5:1.

**Acceptance Criteria:**
The page feels like a high-end medical device or laboratory interface repurposed for culinary craft. It is clean, heavy, and precise.
