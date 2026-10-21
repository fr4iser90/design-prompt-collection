## Concept
"The Containment Protocol" is a long-form editorial report from the fictional imprint "DeepVault Reports". It simulates the physical act of sealing a nuclear waste canister through scroll interaction. As the reader progresses through the safety analysis, the visual metaphor of containment tightens: a copper lid rotates, radiation particles multiply, and the text layout subtly compresses under "pressure". The goal is to make abstract safety data feel tangible, urgent, and mechanically precise. The aesthetic is utility/safety/infrastructure: high-contrast, mono-typed, and hazardous.

## Palette
- **Background**: `#0A0F14` (Deep Void Black). Provides the void of the repository. Add a subtle CSS noise filter (`opacity: 0.05`) to prevent flatness.
- **Primary Ink**: `#E6F7FF` (Ice White). For all readable body text and headlines. High contrast against the void.
- **Secondary Ink**: `#88929B` (Steel Grey). For metadata, captions, and inactive UI elements.
- **Hazard Accent**: `#FF4500` (International Orange). Used for warnings, active states, seal integrity bars, and critical alerts. This is the "danger" color.
- **Material Accent**: `#B87333` (Copper). Used for the canister graphic and specific material science highlights.
- **UI Surface**: `#1A232E` (Dark Slate). For background panels of data blocks and hazard notices.

## Type
- **Display Font**: **Oswald**. 
  - Usage: Masthead, H1-H3, Section Numbers, Pull Quotes.
  - Style: Uppercase, tight tracking (`letter-spacing: -0.02em`), bold weights (500-700). 
  - Rationale: Industrial, condensed, authoritative.
- **Body Font**: **JetBrains Mono**.
  - Usage: All body paragraphs, data logs, captions, UI labels.
  - Style: Regular weight (400), line-height 1.6. 
  - Rationale: Technical, precise, evokes terminal/code/reporting.
- **Hierarchy**:
  - H1: 4rem, Oswald, White.
  - H2: 2rem, Oswald, White, with a thin #FF4500 underline.
  - Body: 1.125rem, JetBrains Mono, Ice White.
  - Caption: 0.875rem, JetBrains Mono, Steel Grey.

## Layout
- **Masthead**: Fixed top. Height 60px. Background `#0A0F14` with 90% opacity. 
  - Left: "DeepVault Reports" (Oswald, 1.2rem).
  - Right: "SEAL INTEGRITY: [XX]%" (JetBrains Mono, 1rem). Color changes to #FF4500 if < 80%.
  - Bottom Border: 2px solid #FF4500, width scales with scroll progress.
- **Hero**: 100vh. Flex center. 
  - Graphic: SVG Canister Lid (concentric circles, copper stroke). Rotates on scroll.
  - Title: "THE CONTAINMENT PROTOCOL" (Oswald, 5rem, centered).
  - Subtitle: "Repository Safety Analysis // Vol. 4" (JetBrains Mono, 1rem, grey).
- **Article Container**: Max-width 720px, centered. Padding 2rem.
- **Chapter Rail**: Fixed left, 100px width. Hidden on mobile. 
  - List of chapters (01, 02, 03). Active chapter is #FF4500, others #88929B.
- **Hazard Blocks**: Full-width within article container. Background #1A232E. Border-left 4px solid #FF4500. Padding 1.5rem. Text uppercase.
- **Footer**: "END OF REPORT. SEAL BROKEN." (Oswald, 2rem, #FF4500, centered). Large bottom padding.

## Motion
1. **Scroll-Driven Canister Rotation**:
   - The hero canister SVG rotates 360 degrees over the first 50% of scroll.
   - Simultaneously, the canister scales down from 1.0 to 0.95 to simulate tightening.
   - Use `transform: rotate(${deg}deg) scale(${scale})`.
2. **Radiation Particle Field**:
   - Canvas overlay behind text.
   - **Density**: Linear interpolation from 10 particles (top) to 200 particles (bottom).
   - **Behavior**: Particles drift randomly. Speed increases with density.
   - **Visuals**: Small circles, radius 1-3px, color #E6F7FF, opacity 0.3-0.6.
   - **Interaction**: Particles avoid the cursor slightly (repulsion force) to enhance the "active radiation" feel.
3. **Text Compression (Pressure Effect)**:
   - When Seal Integrity < 80%: Apply `transform: scaleY(0.95)` to the main article wrapper. Transition 0.3s ease.
   - When Seal Integrity < 50%: Apply `transform: scaleY(0.90)` and `filter: blur(0.5px)`.
   - When Seal Integrity < 20%: Apply `filter: blur(1px)` and add a subtle red vignette overlay.
   - **Reset**: On scroll up, effects reverse smoothly.
4. **Entrance Animation**:
   - On load, the canister lid "clanks" into place (scale from 1.2 to 1.0 with a bounce easing).
   - Title fades in with a slight upward translate.

## Constraints
- **Single File**: All HTML, CSS, JS, and SVG must be in one file.
- **No Libraries**: Vanilla JS only. No GSAP, no Three.js, no jQuery.
- **Performance**: Canvas animation must use `requestAnimationFrame`. Debounce scroll events if needed, but prefer `scroll` event with `passive: true`.
- **Accessibility**: 
  - Respect `prefers-reduced-motion`: Disable particle animation and text compression. Keep static visuals.
  - Contrast: Ensure #E6F7FF on #0A0F14 meets WCAG AAA.
  - Focus states: Visible outlines for links.
- **Responsiveness**: 
  - Mobile (<768px): Hide chapter rail. Reduce particle max count to 100. Font sizes scale down (H1 2.5rem).
  - Tablet: Adjust padding.
- **No Emoji**: Use SVG icons or text labels only.
- **No Gradients**: Use solid colors and opacity for depth. Avoid purple/blue AI-default gradients.

## Acceptance criteria
- [ ] **Visual**: Background is #0A0F14 with subtle noise. Text is #E6F7FF. Accents are #FF4500.
- [ ] **Typography**: Display is Oswald, Body is JetBrains Mono. No Inter/Roboto.
- [ ] **Interaction**: Scroll progress updates "SEAL INTEGRITY" percentage in masthead.
- [ ] **Interaction**: Canister SVG rotates and scales on scroll.
- [ ] **Interaction**: Particle count increases visibly from top to bottom of page.
- [ ] **Interaction**: Text container compresses (scaleY) when integrity < 80%.
- [ ] **Layout**: Chapter rail is sticky on desktop, hidden on mobile.
- [ ] **Layout**: Hazard blocks have sharp corners and orange left border.
- [ ] **Performance**: No layout thrashing. Canvas runs smoothly.
- [ ] **Accessibility**: `prefers-reduced-motion` disables animations.
- [ ] **Code**: Single HTML file. No external assets except Google Fonts.
- [ ] **Content**: Includes at least 3 sections with data logs and pull quotes.
- [ ] **Aesthetic**: No rounded corners on hazard blocks. No purple glow. Industrial feel maintained.

## Type pairing
Oswald (Display) + JetBrains Mono (Body)
