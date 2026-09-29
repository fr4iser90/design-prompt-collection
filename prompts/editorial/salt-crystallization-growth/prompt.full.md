## Concept
'Saline Press' is an editorial zine dedicated to the science and craft of food preservation. The core metaphor is 'Cure'—the transformation of raw ingredients through time, salt, and pressure. The digital experience mirrors this physical process. Text does not merely load; it crystallizes. The interface feels like a damp, cold laboratory surface where information grows organically but locks into a rigid, industrial lattice. This rejects the soft, organic 'farm-to-table' cliché in favor of a sharp, geometric, and precise aesthetic rooted in chemistry and metallurgy.

## Palette
The palette is strictly monochrome to emphasize texture and structure over color.
- **Background (#F2F2F2):** A cool, bright white with a subtle grain overlay to simulate high-quality linen or damp paper. This is the primary canvas.
- **Ink (#1C1C1C):** Near-black, used for all primary body text and headline elements. It represents the 'steel' of the editorial voice.
- **Accent (#9CA3AF):** A medium grey, used for metadata, chapter markers, secondary text, and the 'raw' state of interactive elements. It mimics oxidized metal or wet salt.
- **Highlight (#D1D5DB):** Light grey, used for hover states or background distinctions in tooltips.
- **Shadow/Depth (#4B5563):** Dark grey, used for very subtle depth cues in the crystallization animation, but never for drop shadows.

## Type
Typography is the primary visual driver. 
- **Primary Body:** 'Canela Text' or a similar high-contrast serif with sharp terminals. It provides the editorial authority and readability. Weight: Regular (400). Size: 18px base on desktop.
- **Metadata & UI:** 'Söhne Mono' or a precise monospace font. Used for chapter titles, footnotes, image captions, and the 'raw definition' tooltips. This creates a contrast between the 'human' narrative and the 'scientific' data. Weight: Medium (500). Size: 12-14px.
- **Headlines:** Massive, tight-tracking Canela Text. No all-caps unless for very small labels. The scale should feel architectural.

## Layout
- **Hero:** Full viewport. Centered 'CURE' title. Background is a static noise texture (#F2F2F2 with 5% #9CA3AF noise). The title animation is the focal point.
- **Article Container:** Max-width 65ch, centered. Left margin: 4rem on desktop for the sticky rail. 
- **Sticky Rail:** Fixed position left. Contains chapter navigation. Style: Söhne Mono, uppercase, small size. Active chapter is indicated by a bold weight and a left-border of 2px #1C1C1C. Inactive chapters are #9CA3AF.
- **Pull Quotes:** Not in cards. Large, serif text, indented by 2ch, with a thin vertical rule on the left (#9CA3AF). No background color.
- **Images:** Full-width within the container. Grayscale. No captions below; instead, use a small Söhne Mono label in the top-right corner of the image container.

## Motion
- **Entrance (Hero):** The title 'CURE' shatters into 20-30 geometric fragments per character. These fragments fly in from random positions and rotate into place. Easing: `cubic-bezier(0.19, 1, 0.22, 1)` for a sharp, mechanical snap. Duration: 1.2s. Stagger: 0.05s per character.
- **Ambient (Text Growth):** As paragraphs enter the viewport (Intersection Observer), they trigger a 'crystallization' effect. Each character starts with `opacity: 0` and `transform: scale(0.8)`. They animate to `opacity: 1` and `scale(1)` with a slight random delay (0-100ms) per character to create a jagged, uneven growth pattern. The easing should be `steps(4, end)` or similar to feel like discrete crystal growth rather than smooth motion.
- **Interaction (Flake):** Hovering over a keyword class `.term`. The visible character animates: `opacity: 0`, `transform: translateY(-5px)`. Simultaneously, a tooltip appears below: `opacity: 1`, `transform: translateY(0)`. Tooltip background: #1C1C1C. Text: #F2F2F2. Border: none. Padding: 0.5rem. Font: Söhne Mono. Transition duration: 0.1s (instant feel).

## Constraints
- **No Rounded Corners:** All borders, buttons, and tooltips must have `border-radius: 0`.
- **No Drop Shadows:** Use color contrast and borders for depth, not box-shadow.
- **No Fade-Ins:** Standard opacity fades are forbidden. All entrances must involve positional or scale changes that imply physical movement.
- **Performance:** The character-by-character animation must be optimized. Use `will-change: transform, opacity` on animated elements. Limit the crystallization effect to paragraphs only, not entire pages.
- **Accessibility:** Ensure the 'flake' interaction has a focus state that shows the tooltip for keyboard users. Maintain WCAG AA contrast ratios.
- **Responsive:** On mobile (<768px), the sticky rail becomes a sticky top bar. The crystallization animation reduces to a simple fade-up to save CPU, but retains the 'sharp' easing.

## Acceptance criteria
- [ ] Hero title 'CURE' animates via shatter/reassemble, not fade.
- [ ] Body text paragraphs animate via jagged, character-by-character growth (crystallization).
- [ ] Hovering keywords reveals a tooltip with raw definition; visible text flakes away.
- [ ] Palette is strictly #F2F2F2, #1C1C1C, #9CA3AF (and derivatives). No warm tones.
- [ ] Typography uses Söhne Mono and Canela Text (or exact equivalents).
- [ ] No rounded corners anywhere in the UI.
- [ ] Sticky chapter rail is functional on desktop and collapses correctly on mobile.
- [ ] Images are grayscale with no soft shadows.
- [ ] Motion feels mechanical/geological (sharp easing), not fluid/soft.
- [ ] No standard fade-in animations are used for content entrance.

Deliverable: single-file HTML/CSS/JS.

## Type pairing
Söhne Mono + Canela Text
