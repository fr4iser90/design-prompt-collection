# Ledger Line Justification

Animate a block of scattered, uneven ledger text lines that dynamically re-align themselves into a perfectly justified column. 

**Visual Rules:**
- Background: Matte archival paper (#f4f4f0) with subtle grain.
- Text: Deep charcoal (#1a1a1a) monospace or serif ledger font.
- Accent: Faint blue-grey (#8c92a3) guidelines that appear during the motion and fade away.

**Motion Brief:**
1. **Entrance:** Lines appear randomly offset (left-aligned ragged edge).
2. **Action:** Each line horizontally stretches/shrinks with elastic easing to match the target width. Vertical spacing normalizes simultaneously.
3. **Ambient:** Subtle noise grain overlay moves slowly. 
4. **Interaction:** Hovering a line reveals a faint 'index' number in the left margin.

**Constraints:**
- No bouncing or cartoonish overshoot; motion should feel precise, mechanical, and calm.
- Ensure reduced-motion fallback is a static aligned state.
