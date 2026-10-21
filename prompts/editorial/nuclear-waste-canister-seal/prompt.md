Deliverable: single-file HTML/CSS/JS.

Build an editorial long-form report titled "The Containment Protocol" for the imprint "DeepVault Reports". The aesthetic is utility/safety/infrastructure: high-contrast industrial hazard, mono labels, stamps, and mechanical tension. The core mechanic is that scrolling the article physically tightens a copper canister seal and increases radiation particle density, creating reading tension.

**Visual Identity & Palette**
- Background: #0A0F14 (Deep Void Black). Use subtle noise texture or CSS grain to avoid flat digital look.
- Ink/Text: #E6F7FF (Ice White) for primary body text. Use #88929B for secondary metadata.
- Accent/Hazard: #FF4500 (International Orange) for warnings, seal integrity bars, and interactive states.
- Secondary Material: #B87333 (Copper) for the canister graphic elements.
- Typography: 
  - Display: Oswald (Google Fonts). Use for headlines, section numbers, and the "DeepVault Reports" masthead. Weight 400-700. Uppercase for headers.
  - Body: JetBrains Mono (Google Fonts). Use for all body text, captions, and data labels. Weight 300-500. This enforces the "technical report" feel.
  - Hierarchy: H1 is massive, tracking-tight. Body text is 16px-18px, line-height 1.6. Pull quotes are large Oswald, left-aligned with a thick #FF4500 left border.

**Layout Structure**
- **Masthead**: Fixed top bar. Left: "DeepVault Reports" in Oswald. Right: "SEAL INTEGRITY: 100%" in JetBrains Mono, color #E6F7FF. A thin #FF4500 progress line under the masthead tracks scroll depth.
- **Hero Section**: Full viewport height. Centered graphic of a copper canister lid (SVG or CSS 3D transform). Title "THE CONTAINMENT PROTOCOL" in Oswald, large, white. Subtitle in JetBrains Mono, grey.
- **Article Body**: Single column, max-width 700px, centered. Generous whitespace. 
- **Chapter Rail**: Sticky left sidebar (hidden on mobile) showing chapter markers (01, 02, 03...). Active chapter is #FF4500.
- **Warning Blocks**: Insert "HAZARD NOTICE" blocks between sections. Background #1A232E, border-left 4px solid #FF4500. Text in JetBrains Mono, uppercase.

**Core Mechanics & Interaction**
1. **Scroll-Driven Seal Compression**: 
   - As the user scrolls down, the copper canister lid in the hero (or a sticky mini-canister in the corner) rotates and scales down slightly (simulating tightening).
   - The "SEAL INTEGRITY" percentage in the masthead decreases from 100% to 0% based on scroll progress.
   - When integrity drops below 80%, the masthead border turns #FF4500 and pulses subtly.
   - When integrity drops below 50%, the background noise intensity increases.

2. **Radiation Particle Field**:
   - Use a HTML5 Canvas overlay behind the text (z-index 0, text z-index 1).
   - Particles are small, faint #E6F7FF dots with slight glow.
   - **Density Control**: Particle count increases linearly with scroll progress. At 0% scroll, 10 particles. At 100% scroll, 200 particles.
   - **Motion**: Particles drift slowly upwards and sideways (Brownian motion). Speed increases slightly as density increases.
   - **Performance**: Use requestAnimationFrame. Clear canvas each frame.

3. **Text Compression Effect**:
   - When seal integrity < 80%, apply a CSS transform `scaleY(0.95)` to the main article container. This creates a subtle "crushing" visual tension.
   - When seal integrity < 50%, apply `scaleY(0.90)` and add a slight `filter: blur(0.5px)` to simulate radiation interference.
   - Ensure text remains readable. Do not blur beyond 1px.

**Content Structure**
- **Intro**: "The repository is sealed. The clock is ticking." (Oswald, large).
- **Section 01: The Copper Barrier**: Discuss material science. Include a diagram of the canister layers (CSS borders).
- **Section 02: Geological Stability**: Discuss bedrock. Include a "DATA LOG" block with mono-font fake telemetry data.
- **Section 03: The Human Factor**: Discuss oversight. Include a pull quote: "Safety is not a state, it is a practice."
- **Footer**: "END OF REPORT. SEAL BROKEN." in Oswald, red.

**Technical Constraints**
- **Single File**: All CSS, JS, and SVG inline.
- **No External Libraries**: Vanilla JS only. No GSAP, no Three.js.
- **Responsive**: On mobile (<768px), hide the chapter rail. Reduce particle count by 50%. Font sizes scale down.
- **Accessibility**: Ensure contrast ratio > 4.5:1 for body text. Use `prefers-reduced-motion` to disable particle animation and compression effects.
- **Performance**: Canvas must run at 60fps. Debounce scroll events if necessary.

**Implementation Details**
- **Canister Graphic**: Create a simple SVG circle with concentric rings. Rotate the top ring on scroll. Use `transform: rotate(${scrollProgress * 360}deg)`.
- **Integrity Calculation**: `integrity = 100 - (scrollY / (documentHeight - windowHeight)) * 100`.
- **Particle Class**: 
  ```javascript
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
    }
    update() { /* move and wrap */ }
    draw(ctx) { /* fill circle */ }
  }
  ```
- **Scroll Listener**: Update integrity, particle density, and CSS variables for text compression.

**Anti-Cliché Checks**
- No purple/blue gradients.
- No rounded corners on hazard blocks (use sharp 90-degree angles).
- No emoji.
- No generic "tech" icons. Use abstract geometric shapes or text labels.
- Ensure the "industrial" feel is achieved through typography and spacing, not just dark mode.
