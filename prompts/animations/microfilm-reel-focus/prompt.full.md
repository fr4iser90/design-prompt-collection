# Microfilm Reel Focus — Extended

**Concept**
The tactile memory of focusing a mechanical device. This component turns the act of reading an archive into a physical interaction. It evokes the 'Library-of-the-future' by taking an old analog technology (microfilm) and rendering it with high-fidelity digital precision. The 'trust' element comes from the clarity achieved only through user effort.

**Palette & Type**
- **Background:** `#e0e0e0` (Neutral grey, mimics the plastic screen of a reader).
- **Text:** `#2b2b2b` (Soft black, easier to read than pure black on grey).
- **Indicator:** `#00ff00` (CRT/LED green, only for status).
- **Typography:** `IBM Plex Mono` or `Courier`, resembling typed records.

**Layout**
- **Desktop:** A horizontal bar or card containing the text. A slider or scroll area controls the focus.
- **Mobile:** Full-width card. Touch-drag vertical gesture controls focus.

**Motion Brief**
- **Core Mechanic:** Map input (scroll position or slider value 0-100) to `blur` value (4px -> 0px) and `opacity` (0.6 -> 1).
- **Easing:** Use `linear` for the input mapping, but add a `cubic-bezier(0.175, 0.885, 0.32, 1.275)` overshoot for the Focus Lock indicator pop.
- **Scanline:** A pseudo-element with a repeating linear gradient moving `translateY` infinite linear. Opacity 0.05.
- **Interaction:** 
  - Drag/Scroll -> Update CSS variables for blur.
  - Threshold -> Toggle class `.focused` to turn on green indicator.

**Constraints & Acceptance**
- Performance: Animating `filter: blur` can be expensive. Use `transform: scale()` or `opacity` if blur is too heavy, or limit blur radius to max 3px.
- Visual: Must look like *optical* defocus, not just opacity fading. 
- No purple, no neon other than the specific status green.
