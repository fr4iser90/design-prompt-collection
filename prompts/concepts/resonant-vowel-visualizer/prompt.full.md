# Resonant Vowel Visualizer — Extended Brief

**Concept**: Explore the intersection of linguistics and physics by making typography the visual interface for sound. This is not just a waveform; it is the *meaning* made visible. The typography should feel alive, breathing with the audio input.

**Palette**:
*   Background: Deep Charcoal (#0a0a0a) to eliminate visual noise.
*   Primary Type: Off-White (#e0e0e0) for maximum contrast.
*   Active/Accent: Signal Orange (#ff4d00) to indicate audio intensity.

**Typography**:
*   Display: A variable font with extensive weight and width axes (e.g., Recursive or Neue Haas Grotesk). The font must support smooth interpolation.
*   Body/UI: Minimal monospace for frequency readouts (e.g., JetBrains Mono), kept subtle in the corner.

**Layout**:
*   **Desktop**: Full-screen viewport. The word "RESONANCE" is centered. Below it, a subtle frequency spectrum bar.
*   **Mobile**: Vertical layout. The word is larger, occupying 60% of the screen. Touch triggers a "pulse" effect if no mic is available.

**Motion Brief**:
*   **Entrance**: Letters fade in individually from a "silent" thin stroke state.
*   **Ambient**: Even without audio, letters have a micro-jitter (0.5px) to suggest potential energy.
*   **Interaction**: Real-time audio analysis. The mapping should be intuitive: louder = bigger/heavier; pitch = height/warping.

**Constraints**:
*   No purple glows.
*   Performance: Must run at 60fps. Use `requestAnimationFrame` and avoid DOM reflows where possible (prefer transform/opacity or canvas).
*   Accessibility: Provide a text transcript for the audio visualization.

**Acceptance Criteria**:
*   Smooth spring-back animation when audio stops.
*   Clear visual distinction between low/mid/high frequency reactions.
*   Responsive design maintains legibility at all sizes.
