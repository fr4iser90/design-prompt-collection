# Photocopy Contrast Degradation — Extended

## Concept
This concept captures the raw, gritty aesthetic of punk zines and office bureaucracy. It’s about the loss of fidelity. Every generation of a photocopy loses detail, gains noise, and hardens contrast. We simulate this 'digital rot' in real-time. It’s a study of imperfection as an aesthetic choice.

## Palette
- **Black:** `#000000` (Pure, dense ink)
- **White:** `#FFFFFF` (Paper base)
- **Mid-Gray:** `#808080` (For shadows and noise)
- **Paper Tone:** `#F0F0F0` (Slightly off-white for the background)
- **Alert:** `#FF0000` (Red stamp/annotation, sparingly)

## Typography
- **Display:** *Impact*, *Anton*, or *Bebas Neue*. Bold, condensed, and sturdy.
- **Body:** *Courier Prime* or *Space Mono*. Monospaced, evoking the typewriter origins of zine culture.

## Layout
- **Desktop:** Vertical scroll. Content is arranged in columns, like a newspaper or zine layout. Large headlines overlap with images.
- **Mobile:** Single column. The degradation effect is more pronounced on smaller screens to emphasize the 'low-fi' feel.

## Motion Brief
1. **Entrance:** Elements slide in from the side with a slight 'skew' distortion, as if the page is being fed into a scanner incorrectly.
2. **Ambient:** A constant, subtle 'scanline' or 'flicker' effect across the entire viewport to simulate a live photocopy machine.
3. **Interaction (Scroll):** 
   - **Distance-based Distortion:** Elements further from the center of the viewport (or further down the scroll) gain more noise (`filter: url(#noise)`) and contrast (`filter: contrast(150%) grayscale(100%)`).
   - **Jagged Edges:** Use SVG filters or CSS `clip-path` with random polygon points to create jagged, broken edges on text and images as they degrade.
4. **Interaction (Click):** 
   - **Reset:** Clicking an element triggers a 'flash' (white overlay) and instantly clears the noise/distortion, restoring it to sharp black and white.
   - **Re-degrade:** Over 2-3 seconds, the noise gradually returns to the element.

## Constraints Checklist
- [ ] Use SVG filters for high-quality noise and contrast effects.
- [ ] Avoid using too many heavy filters on large areas; limit degradation to text and key images.
- [ ] The aesthetic must be intentional 'lo-fi,' not broken code.
- [ ] Ensure text remains legible even in the 'degraded' state.

## Acceptance Criteria
- The degradation feels progressive and linked to scroll position.
- The noise is convincing, not just random pixels.
- The 'reset' interaction feels like pressing 'Scan' or 'Copy' again.
