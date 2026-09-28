# Oxidized Coin Valuation — Extended Brief

## Concept
This concept applies the tactile experience of 'finding value' to data visualization. In antique markets, the true worth of a coin is hidden beneath layers of time and dirt. This UI requires the user to engage physically (via cursor) to uncover the data, creating a sense of discovery and reward.

## Visual Art Direction
- **Coin Base**: A circular metal disc. Use radial gradients to simulate a convex surface. Add a subtle noise texture for brushed metal.
- **Patina Layer**: An overlay of dark, organic textures (brown, deep green, black). Use SVG turbulence filters or image masks to create irregular, natural-looking oxidation patches.
- **Typography**: The value should appear as if engraved. Use `text-shadow` with a dark drop-shadow and a light highlight to create depth.

## Interaction Design
1. **Cursor as Cloth**: 
   - Track mouse movement over the coin.
   - Use a canvas `globalCompositeOperation: 'destination-out'` to erase the patina layer where the cursor moves.
   - Add a 'smudge' effect: the erased area should have soft, blurred edges, not hard circles.
2. **Progression**:
   - 0–50% Cleaned: Value is faint, partially obscured.
   - 50–100% Cleaned: Value becomes crisp, bright, and fully legible.
   - 100% Cleaned: A subtle 'shine' sweep animation plays across the coin.
3. **Idle**: 
   - If the user leaves, the patina slowly 'regrows' (fade-in effect) after 5 seconds, encouraging re-engagement.

## Technical Implementation
- **Layer 1**: Metal coin (SVG or CSS gradient).
- **Layer 2**: Value text (absolute positioned).
- **Layer 3**: Patina (Canvas or SVG mask). 
- Use `requestAnimationFrame` for smooth canvas drawing if using Canvas API.

## Acceptance Criteria
- The 'cleaning' interaction must feel satisfying and responsive.
- The transition from obscured to revealed data must be clear.
- The metal texture should react to 'light' (cursor position) for realism.
- No flat colors; the coin must have depth and materiality.
