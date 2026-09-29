# Hydraulic Relay Lockout — Extended

## Concept
This animation visualizes the critical moment of security in an industrial control system. It is designed for a utility dashboard or a safety-critical interface where confirming a "locked" state provides psychological reassurance. The aesthetic is pure function: high-contrast colors (Red/Green/Silver) against a void, emphasizing clarity and urgency without clutter.

## Palette
- **Hazard Red:** `#D90429` (The housing/lock mechanism)
- **Relay Silver:** `#B0B0B0` (The moving pin, with `#E0E0E0` highlights)
- **Void Black:** `#1A1A1A` (Background)
- **Status Amber:** `#FFB703` (Inactive state)
- **Status Green:** `#06D6A0` (Active/Locked state)

## Typography
- **Font:** `IBM Plex Mono` or `Roboto Mono`.
- **Style:** All caps, tight tracking (-0.05em), weight 500.
- **Placement:** Label positioned below the mechanism, centered.

## Layout
- **Desktop:** Centered composition, mechanism takes up 40% of viewport height. Grid background subtle opacity (5%).
- **Mobile:** Mechanism scaled down, label stacked below. Touch area expanded for the "Engage" interaction.

## Motion Brief
1. **Idle:** The silver pin rests slightly retracted. The LED pulses slowly in Amber.
2. **Interaction (Click/Hover):** 
   - Pin slides left at constant velocity.
   - **Easing:** `cubic-bezier(0.25, 1, 0.5, 1)` for smooth deceleration into the socket.
   - **Impact:** Upon reaching the lock point, the pin compresses horizontally by 4% for 50ms, then snaps back.
   - **Audio:** A crisp, low-frequency mechanical "clunk".
   - **Light:** LED turns Green instantly (0.1s transition).
3. **Release:** Pin retracts slowly, light fades back to Amber.

## Constraints
- **No Soft Shadows:** Use flat vector shapes or minimal hard-edged shadows to maintain the "technical diagram" feel.
- **Performance:** GPU-accelerated transforms only (`translate3d`, `scale3d`).
- **Accessibility:** Ensure the color change (Amber to Green) is accompanied by a text change or icon change for color-blind users.

## Acceptance Criteria
- The "snap" motion feels weighty, not elastic.
- The color contrast meets WCAG AA.
- The loop is seamless if set to auto-play.
