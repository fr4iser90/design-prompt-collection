# Resonant Vowel Visualizer

**Concept**: An interactive typography experiment where letters act as membranes reacting to vocal frequencies.

**Visual Rules**:
1.  **Base State**: Clean, geometric sans-serif (e.g., Neue Haas Grotesk Display) in white on deep charcoal (#0a0a0a).
2.  **Reaction Zone**: A central viewport with a subtle radial gradient hinting at the "sound source."
3.  **Kinetic Behavior**:
    *   **Low Frequencies (Bass)**: Letters expand horizontally, gaining weight (font-weight variable interpolation).
    *   **Mid Frequencies**: Letters warp vertically, creating a sine-wave distortion along the baseline.
    *   **High Frequencies**: Letters fracture into shards or split into thin, vibrating strokes (SVG mask manipulation).
    *   **Rest State**: Spring physics ensure letters snap back to original geometry with damping.
4.  **Accent**: Active frequencies are highlighted with a thin, glowing outline in #ff4d00.

**Deliverable**: HTML/CSS/JS using Web Audio API and Canvas or SVG for high-performance rendering.
