# Firefly Swarm Choreography — Extended

## Concept
Lumina Nights specializes in creating magical, intimate outdoor experiences. The landing page captures the fleeting, enchanting nature of fireflies. It is romantic, mysterious, and exclusive. The user doesn't just read about the service; they 'play' with the atmosphere.

## Palette
- **Night Sky:** `#0f172a` (Top), `#1e293b` (Bottom)
- **Firefly Glow:** `#fef08a` (Warm Yellow), `#d9f99d` (Lime Green core)
- **Text:** `#f8fafc` (White), `#94a3b8` (Gray for secondary)

## Typography
- **Display:** 'Baskerville' or 'Garamond' — classic, elegant, thin strokes.
- **Body:** 'Montserrat' — light weight, wide tracking for a modern, airy feel.

## Layout
- **Desktop:**
  - Full-screen interactive canvas.
  - Minimal UI: Logo top-left, 'Plan Your Night' button bottom-right (glowing border).
  - Content (About, Services) appears as overlays that fade in when the user clicks 'Read More', dimming the fireflies slightly.
- **Mobile:**
  - Fireflies drift automatically (ambient mode). Tap creates a burst of light. No complex swarm guidance.

## Motion Brief
1. **Entrance:** Fireflies fade in from darkness, drifting upwards.
2. **Ambient:** Continuous gentle swaying motion. Flicker intensity varies per particle.
3. **Interaction:** Cursor attraction/repulsion. Holding cursor creates a 'gravity well', clustering fireflies. Clicking disperses them in a burst.

## Constraints Checklist
- [ ] Avoid 'confetti' look. Fireflies must feel alive (varying speeds, sizes).
- [ ] Glow effects should not cause performance issues (use `will-change: transform`).
- [ ] Ensure the 'romantic' vibe doesn't tip into 'cheap party' aesthetics. Keep it dark and sophisticated.

## Acceptance Criteria
- The swarm feels magical and responsive.
- The brand feels premium and atmospheric.
- The page loads quickly and runs smoothly on mobile.
