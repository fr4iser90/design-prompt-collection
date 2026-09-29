# Photo Grain Developing Scan — Extended

## Concept
A nostalgic nod to analog photography and the magic of the darkroom. This animation treats the digital screen as a physical photo paper sheet being exposed. The 'scanline' is not just a loading bar; it's the agent of development, converting chaos (grain/negative) into order (clarity/positive).

## Palette
- **Image**: Strictly Black and White (`#111111` to `#EEEEEE`).
- **Grain**: White noise on black, inverted to black noise on white.
- **Scanline**: `#FF5733` (Safelight Red) or `#FFFFFF` (White light), with a glow effect.
- **Background**: `#000000` (Void, focusing attention on the developing image).

## Typography
- **Font**: Monospace (e.g., Space Mono, Courier Prime). 
- **Content**: Technical metadata (e.g., `ISO 400`, `f/1.8`, `1/125s`) or a brief caption.
- **Position**: Bottom-left corner, fading in after the scan completes.

## Motion Brief
1. **Initial State**: Image is inverted (CSS `filter: invert(1)`) and has a high-frequency noise overlay.
2. **Scan Action**: A `clip-path` or `mask` moves from `0%` to `100%` vertically. 
3. **Filter Animation**: 
   - Elements *behind* the scanline (already scanned) have `filter: invert(0) saturate(1) contrast(1.1)`.
   - Elements *ahead* of the scanline have `filter: invert(1) saturate(0) contrast(1.5)`.
   - The grain opacity animates from `100%` (ahead) to `10%` (behind).
4. **Easing**: Linear motion for the scanline to mimic mechanical scanning. Easing out for the grain settling.

## Technical Constraints
- **Grain Implementation**: Use a CSS `background-image` with a repeating SVG noise pattern, animated via `background-position` to simulate moving film grain. Alternatively, use a WebGL shader for true random grain.
- **Masking**: Use `clip-path: inset(0 0 0 0)` animated to `inset(100% 0 0 0)` for the reveal. Ensure the 'positive' layer is underneath the 'negative' layer and revealed by the mask.
- **Responsiveness**: The scanline should always be horizontal, even on mobile. The image should `object-fit: cover`.

## Acceptance Criteria
- The transition from negative to positive is crisp, occurring exactly at the scanline edge.
- The grain movement feels organic, not tiled or repetitive.
- The 'safelight' glow of the scanline adds atmosphere without washing out the image.
- The final image is sharp and readable.
