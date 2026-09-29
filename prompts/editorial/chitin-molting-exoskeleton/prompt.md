Deliverable: single-file HTML/CSS/JS.

Build a high-fidelity editorial landing page for 'Carapace Press', an entomological field journal. The core interface metaphor is biological molting: the user scrolls through a dark, chitinous outer shell that physically cracks and peels away to reveal the soft, pale, bioluminescent substrate underneath. This is not a simple opacity fade; it requires a layered DOM structure with clip-path manipulation driven by scroll velocity.

**Visual Identity & Palette:**
- **Background (Substrate):** `#0a0a0a` (Void Black). This is the deep night environment.
- **Mid-tone (Chitin/Shell):** `#1a2e1a` (Deep Forest/Exoskeleton). Used for the initial overlay layer, borders, and structural elements.
- **Accent (Bioluminescence):** `#88ff00` (Toxic Nightshade Green). Used strictly for active states, crack edges, pull-quote highlights, and the 'vein' patterns in the substrate. Do not use this for body text.
- **Text (Substrate):** `#e0e0e0` (Pale Bone). For readable content on the revealed layer.

**Typography:**
- **Display:** 'Cormorant Garamond'. Use for headlines, pull-quotes, and chapter titles. It must feel organic, serifed, and slightly fragile. Weight 300-400.
- **Body/UI:** 'Space Mono'. Use for metadata, captions, scroll indicators, and small labels. It provides the 'field journal' scientific precision. Weight 400-700.
- **Hierarchy:** Headlines are large (clamp(3rem, 8vw, 6rem)), tight leading. Body text is monospaced, smaller (1rem), with generous line-height (1.6) for readability against the dark background.

**Layout Structure:**
1.  **Hero Section:** Full viewport height. Centered title 'The Molting Cycle' in Cormorant Garamond. Below it, a subtle instruction in Space Mono: 'Scroll to molt'. The background is the `#0a0a0a` void. The 'shell' layer is a fixed overlay covering the entire viewport initially.
2.  **Chapter Rail:** A fixed left sidebar (width 60px) visible only after the shell is partially cracked. Contains vertical text labels for chapters (e.g., 'Larval', 'Pupa', 'Imago') in Space Mono, rotated 90deg. Active chapter is highlighted in `#88ff00`.
3.  **Content Flow:** Long-form editorial sections. Each section represents a 'stage' of the molt. 
    -   *Section 1 (Larval):* Heavy shell coverage. Text is dimmed, visible through cracks.
    -   *Section 2 (Pupa):* Shell is fragmented. Text is clearer, background shows faint vein patterns.
    -   *Section 3 (Imago):* Shell is mostly gone. Full visibility of the pale substrate. Bioluminescent accents glow.
4.  **Pull-Quotes:** Large Cormorant Garamond text, centered, with a thin `#88ff00` left border. These act as visual anchors in the flow.

**Interaction & Motion Logic:**
-   **The Shell Layer:** Create a `div` with `position: fixed`, `top: 0`, `left: 0`, `width: 100vw`, `height: 100vh`, `z-index: 10`. Background color `#1a2e1a`. Add a subtle noise texture or SVG pattern to simulate chitin texture.
-   **Clip-Path Animation:** Use JavaScript to track `window.scrollY`. Map scroll progress (0 to 1) to a `clip-path: polygon(...)` value. 
    -   *Slow Scroll:* The clip-path expands smoothly from the center or top, creating clean, straight cuts.
    -   *Fast Scroll:* Detect high scroll velocity. If velocity > threshold, change the clip-path to a jagged, irregular polygon (simulating shattering). Add a CSS `filter: blur(1px)` to the shell edges during fast scroll to enhance the fracture effect.
-   **Substrate Breathing:** The background content layer (behind the shell) should have a subtle CSS animation: `transform: scale(1.0)` to `scale(1.02)` over 4s, infinite, ease-in-out. This simulates the 'breathing' of the living organism beneath.
-   **Vein Reveal:** As the shell cracks, reveal an SVG background pattern of veins in `#88ff00` with low opacity (0.1) on the substrate layer. This pattern should become more visible as scroll progress increases.

**Constraints:**
-   No purple gradients. No cream backgrounds. No generic sans-serif fonts.
-   The 'shell' must feel physical. Use `box-shadow: inset 0 0 20px #000` on the shell layer to give it depth.
-   Ensure text contrast is sufficient. Body text must be `#e0e0e0` on `#0a0a0a` or `#1a2e1a`.
-   Mobile responsive: The chapter rail hides on mobile. The clip-path logic should still work but may need simplified polygons for performance.
-   Accessibility: Provide a 'Skip Animation' toggle in the header for users with vestibular disorders, which instantly removes the shell layer.
