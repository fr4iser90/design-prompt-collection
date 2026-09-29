# Track Lane Split Timing — Extended Brief

## Concept
Capture the visceral intensity of a photo-finish. This landing page for 'SplitSecond' (a fictional athletic timing tech) treats user interaction as a high-speed camera tracking. The site doesn't just display data; it *measures* the user's scroll speed to trigger animations, creating a sense of velocity.

## Art Direction
- **Color Palette:**
  - Primary: Athletic Red `#FF0000` (used for the finish line, active states, critical data).
  - Secondary: Pure White `#FFFFFF` (background, text).
  - Tertiary: Track Black `#111111` (silhouettes, deep shadows).
  - Accent: Signal Grey `#F5F5F5` (subtle grid lines).
- **Typography:**
  - Headings: 'Anton' or 'Oswald' (Heavy, Condensed). All caps.
  - Data: 'JetBrains Mono' or 'Roboto Mono'. Tabular numerals are mandatory.
- **Imagery:** Abstract, high-contrast silhouettes of runners in mid-stride. Motion-blurred horizontal streaks in the background to simulate speed.

## Layout & Structure
1. **Hero:** Full viewport. A large, bold 'SPLIT' wordmark. A red vertical line sweeps across the screen. Background is a blurred, high-speed track texture.
2. **The Lanes (Features):** Horizontal scroll (or vertical scroll mapped to horizontal movement). Each 'lane' is a feature section. Lane 1: Hardware. Lane 2: Software. Lane 3: Analytics.
3. **Data Viz:** Simple, stark line charts drawn in red on white. No fills. Just the line and the data points.

## Motion Brief
- **Entrance:** The 'Finish Line' sweep. A 2px red vertical line moves from right to left over 1.5s, revealing the hero content. 
- **Ambient:** Background 'track' lines move continuously to the left at varying speeds (parallax) to create a sense of constant forward momentum.
- **Interaction:** 
  - **Scroll-Jacking (Subtle):** On the 'Lanes' section, vertical scroll is translated to horizontal movement. 
  - **Hover:** When hovering a runner's data card, the background motion blur stops (CSS `filter: blur(0)`), and the red line underlines the specific metric.

## Technical Constraints
- Use CSS `transform: translateX()` for all motion to maintain 60fps.
- Avoid heavy images; use SVG for silhouettes and lines.
- Ensure reduced-motion support: disable parallax and sweeps for `prefers-reduced-motion`.

## Acceptance Criteria
- Feels like a sports broadcast overlay.
- Text is legible despite motion elements.
- Color contrast passes WCAG AA.
- No purple/blue tech clichés.
