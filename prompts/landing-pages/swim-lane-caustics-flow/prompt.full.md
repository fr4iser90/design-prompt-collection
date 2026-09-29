# Swim Lane Caustics Flow — Extended Brief

## Concept
Swimming is about fluidity and resistance. 'AquaFlow' uses the visual language of underwater caustics (the dancing light patterns on the pool floor) to create a serene yet active atmosphere. The site should feel cool, refreshing, and technically precise.

## Art Direction
- **Color Palette:**
  - Primary: Deep Pool Blue `#0057B7`.
  - Secondary: Surface Cyan `#00A8E8`.
  - Tertiary: Bubble White `#E0F7FA`.
  - Deep: Midnight Navy `#001F3F` (for text/footer).
- **Typography:**
  - Headings: 'Montserrat' (Light) or 'Nunito'. Soft, approachable.
  - Body: 'Lato'. Highly readable.
- **Visual Effects:**
  - Caustics: Animated noise texture blended with a blue background. 
  - Bubbles: Small, sparse SVG bubbles rising slowly.
  - Distortion: Subtle SVG filter `feTurbulence` on text when hovered to mimic water refraction.

## Layout & Structure
1. **Hero:** Full-screen video or animated canvas of water surface from below. Text 'DIVE DEEP' floats in the center with a slight parallax effect.
2. **Coaching Modules:** Cards arranged in a 'lane' structure. Each card has a subtle glassmorphism effect (backdrop-blur).
3. **Stats:** Large numbers that ripple when scrolled into view (using SVG path animation).

## Motion Brief
- **Entrance:** Content rises from the bottom with a 'ease-out-back' easing, as if floating up from the depths.
- **Ambient:** 
  - **Caustics:** Background canvas renders animated caustic patterns. Use a shader or CSS `background-position` animation on a tiled noise image.
  - **Bobbing:** Apply `@keyframes float` to main sections. `transform: translateY(0px)` to `translateY(10px)` over 6s infinite ease-in-out.
- **Interaction:** 
  - **Hover:** On buttons, a ripple effect expands from the cursor (radial gradient animation).
  - **Scroll:** Parallax on background layers (slower) vs foreground content (faster) to create depth.

## Technical Constraints
- Performance: Caustics should be GPU-accelerated (CSS transform or Canvas).
- Accessibility: Ensure text contrast is maintained against the moving background (use dark overlays or text shadows).
- Reduced Motion: Stop caustics and bobbing; static calm blue background.

## Acceptance Criteria
- Evokes the feeling of being underwater without being confusing.
- Cool color temperature throughout.
- Smooth, liquid-like motion easing.
