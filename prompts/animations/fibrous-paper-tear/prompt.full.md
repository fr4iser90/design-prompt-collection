# Fibrous Paper Tear — Extended Brief

## Concept
This animation celebrates the physicality of paper. It’s not a digital 'slide'; it’s a *tear*. The focus is on the resistance of the material, the ragged edge, and the fibrous connection that breaks. It evokes a sense of discovery or revelation through destruction.

## Palette
- **Top Paper**: `#F9F7F2` (Warm, off-white, heavy cotton)
- **Paper Shadow/Edge**: `#D4CBB3` (Darker beige for depth)
- **Fiber Highlight**: `#FFFFFF` (Bright white for stretching fibers)
- **Underlying Layer**: `#2B2B2B` (Deep charcoal, high contrast)
- **Accent (Optional)**: `#8C8272` (Taupe, if revealing a third layer)

## Typography
- **Font**: *Courier New* or *Special Elite* (Typewriter style, imperfect, raw).
- **Weight**: Regular.
- **Color**: `#FFFFFF` (On the dark layer) or `#2B2B2B` (On the paper layer).
- **Position**: The text appears *only* after the tear is complete, centered on the revealed dark layer.

## Layout
- **Desktop**: Full viewport. Tear is vertical.
- **Mobile**: Full viewport. Tear is horizontal (swipe-friendly).

## Motion Brief
1.  **Setup**: The screen is covered by the textured paper. Slight ambient noise/grain.
2.  **The Start**: A small nick appears. If scroll-driven, the tear follows the scroll progress.
3.  **Propagation**: The tear grows. The edges should not be smooth; use a jagged SVG path or noise-based mask.
4.  **The Fibers**: As the gap widens, draw thin, stretching lines (fibers) connecting the two halves. These should snap randomly as the gap increases.
5.  **Reveal**: The halves separate fully, casting dynamic shadows on the dark layer below. The dark layer is revealed cleanly.
6.  **Settle**: The paper halves come to rest with a slight bounce/settle.

## Constraints & Acceptance
- **Tactility**: Must feel *rough*, not smooth.
- **Fiber Detail**: The stretching fibers are key. If they aren't visible, the animation fails.
- **Depth**: The shadow must move realistically as the paper halves move.
- **No Clean Edges**: A straight, clean line is wrong. It must be ragged.

## Variants
- **A**: 'Book Page' variant where the paper is thinner and tears faster.
- **B**: 'Cardboard' variant where the tear is thicker, brown (#8B4513), and shows fluting/inner structure.
