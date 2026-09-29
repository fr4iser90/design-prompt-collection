# Lunar Cycle Bloom Calendar — Extended

## Concept
'Selene & Stem' is a brand that sells seeds for plants that only flower after sunset. The landing page must convey patience, mystery, and the celestial rhythm of nature. It is not a garden shop; it is an observatory for organic life.

## Palette
- **Night Sky:** `#0f172a` (Base), `#1e1b4b` (Depth)
- **Moonlight:** `#e0e7ff` (Text/Highlights), `#c7d2fe` (Soft Glow)
- **Botanical Accents:** `#34d399` (Muted, desaturated green), `#818cf8` (Lavender shadows), `#f3e8ff` (Petal whites)
- **Warning/Action:** `#fbbf24` (Dim, warm amber for CTA)

## Typography
- **Display:** 'Playfair Display' or 'Cormorant Garamond' — italicized for the brand name to evoke movement. Sharp serifs to maintain 'sharpness' against the 'romantic' softness.
- **Data/UI:** 'JetBrains Mono' — small, uppercase, wide tracking. Used for lunar phases (e.g., 'WAXING GIBBOUS', '78% ILLUMINATED').

## Layout
- **Desktop:**
  - **Hero:** Split screen. Left: Brand statement & CTA. Right: Interactive Lunar Dial.
  - **Dial:** A circular SVG canvas. Outer ring: Lunar days (1-29). Inner ring: Moon phase graphic. Center: Botanical illustration.
  - **Scroll Trigger:** Scrolling rotates the dial. At 'Day 15' (Full Moon), the central flower blooms.
- **Mobile:**
  - Stacked. Dial becomes a header element. Bloom animation triggers on scroll down.

## Motion Brief
1. **Entrance:** Fade in of star field. Dial rotates slowly from 'New Moon' to current phase.
2. **Ambient:** Subtle pulsing of the moon glow (box-shadow animation). Stars twinkle via opacity noise.
3. **Interaction:** Hovering over a specific plant species in the catalog highlights its corresponding lunar phase on the dial. Clicking 'Buy' triggers a 'seed drop' animation (gravity physics).

## Constraints Checklist
- [ ] No cottagecore clichés (no bunnies, no checkered cloths).
- [ ] Colors must remain desaturated/dark.
- [ ] Animations must be 60fps, using `transform` and `opacity` only.
- [ ] Accessibility: High contrast text; reduced-motion media query support.

## Acceptance Criteria
- The lunar dial feels tactile and weighty.
- The flower blooming animation looks organic, not mechanical.
- The page feels 'quiet' and 'expensive'.
