## Concept
The Iron Oxide Archive is a digital editorial experience for 'Ferrous Annual', a publication dedicated to industrial history and material culture. The central thesis is that history is not static; it decays and reveals itself over time. This is simulated through an interactive oxidation mechanic where text begins as pristine, black stamped metal and gradually rusts as the user scrolls, revealing underlying archival layers. The design prioritizes object honesty and tactile materials, avoiding digital gloss in favor of the rough, textured aesthetic of corroded iron.

## Palette
The color palette is restricted to three core colors to maintain visual discipline and emphasize the material metaphor:
- **Background (#1a1a1a)**: A deep, matte charcoal. This represents the void of the archive and provides high contrast for the text. It should feel like dark, unpolished iron.
- **Primary Ink (#b34a26)**: A rich, oxidized iron orange. This color is used for the 'decayed' state of the text and accent elements. It must not look like a standard 'warning' orange but rather a muted, earthy rust.
- **Secondary/Metal (#8c8c8c)**: A cold, neutral steel gray. Used for secondary text, borders, and the sticky rail. It represents the underlying structure that remains after the rust is polished away.

## Type
Typography is the primary vehicle for the 'stamped metal' aesthetic.
- **Display**: Oswald. Used for all headings (H1-H3). The font's condensed, industrial nature evokes factory signage and stamped metal plates. Headings should be uppercase, with tight letter-spacing (-0.02em) to enhance the 'stamped' feel.
- **Body**: Source Serif Pro. Used for all paragraph text. This serif font provides editorial readability and a classic, historical feel. It should be set at a comfortable reading size (18-20px) with generous line-height (1.6-1.8).
- **Hierarchy**: Clear distinction between display and body. No other fonts should be introduced. The weight of the type should convey physical mass.

## Layout
The layout follows a 'Folio' or 'Annual Spread' metaphor, prioritizing reading rhythm and scroll depth.
- **Structure**: A single-column flow with wide margins (min 15% on desktop, 5% on mobile). This creates a sense of isolation and focus, like reading a rare document.
- **Sticky Rail**: A vertical progress indicator on the left edge. Styled as a thin strip of metal (#8c8c8c) that 'rusts' (changes color to #b34a26) as the user scrolls down. This serves as both a navigation aid and a thematic element.
- **Content Blocks**: Each section of text is a `.text-block`. These blocks should have ample vertical spacing (min 4rem) to allow the oxidation effect to be perceived clearly between sections.
- **Archival Layers**: Hidden images are positioned absolutely behind text blocks. They are initially invisible (opacity 0) and revealed only on interaction. These images should be grayscale, high-contrast, and abstract enough to not distract from the text.

## Motion
Motion is functional, serving the narrative of decay and reveal.
- **Entrance (Stamping)**: Headlines animate in with a 'stamping' effect. They scale from 1.05 to 1.0 and translate Y from -10px to 0px with a sharp `ease-out` curve (0.3s). This mimics the impact of a metal stamp.
- **Ambient (Oxidation)**: As the user scrolls, each text block's `--oxidation-level` CSS variable updates from 0 to 1. This variable controls a mask or color transition. The text color shifts from #1a1a1a to #b34a26. A noise-based texture overlay (using CSS gradients or SVG filters) simulates flaking rust. The transition should be non-linear, using a step-based or noise-driven easing to feel organic and unpredictable.
- **Interaction (Polish)**: On hover over a text block, the oxidation effect reverses locally. The text returns to #1a1a1a with a 'shine' effect (a moving linear-gradient overlay). Simultaneously, the hidden archival image behind the text fades in to opacity 0.15. This creates a 'palimpsest' effect, revealing the history beneath the words. On mouse leave, the oxidation resumes, and the image fades out.

## Constraints
- **Single File**: All HTML, CSS, and JS must be in a single file. No external dependencies except Google Fonts (Oswald, Source Serif Pro).
- **Performance**: Use `requestAnimationFrame` for scroll calculations. Avoid heavy DOM manipulation. Use CSS variables for state management.
- **Responsiveness**: The oxidation effect must work on mobile, though it may simplify to a color shift rather than complex masking to preserve performance. The sticky rail should be hidden or simplified on small screens.
- **Accessibility**: Ensure sufficient contrast between text and background. The rust color #b34a26 on #1a1a1a is acceptable, but verify. Provide a 'reduce motion' fallback where the oxidation effect is disabled, and text remains static.
- **No AI Defaults**: Avoid purple glows, cream backgrounds, or generic sans-serif fonts. The design must feel industrial and tactile.

## Acceptance criteria
- [ ] **Visual**: The page uses only the three specified colors (#1a1a1a, #b34a26, #8c8c8c) and Oswald/Source Serif Pro fonts.
- [ ] **Scroll Effect**: Text blocks visibly change from black to rust-orange as the user scrolls down. The transition is smooth and textured, not a simple linear fade.
- [ ] **Hover Effect**: Hovering over a text block reverses the oxidation (text turns black) and reveals a hidden background image (opacity > 0).
- [ ] **Sticky Rail**: A vertical progress bar on the left changes color from gray to rust as the user scrolls.
- [ ] **Entrance Animation**: Headlines animate in with a 'stamping' scale/translate effect on page load.
- [ ] **Performance**: The page runs at 60fps during scroll on a mid-range device. No layout thrashing.
- [ ] **Responsiveness**: The layout adapts to mobile widths (375px) without breaking the reading flow or the oxidation effect.
- [ ] **Code Quality**: No external JS libraries (except fonts). Clean, commented code. Single file structure.

## Type pairing
Oswald (Display) + Source Serif Pro (Body)
