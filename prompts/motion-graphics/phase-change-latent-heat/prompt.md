Build a 16:9 motion graphics explainer (8s loop) visualizing Phase Change Material (PCM) thermal buffering for 'ThermoStore'. Use a single HTML file with SVG for geometry and CSS/rAF for animation. No external libraries. The aesthetic is 'Scientific Minimalism': stark contrast, precise geometry, no organic shapes or fire/ice clichés.

**Visual Setup:**
Background: Deep Charcoal (#212121). 
Foreground: A large, centered geometric representation of a PCM block. Initially solid white (#F5F5F5) with a subtle internal grid pattern (SVG stroke, opacity 0.1). 
Heat Source: A horizontal bar or gradient band appearing from the top, colored Amber (#FFC107), representing heat input. 
Temperature Graph: A small, minimal line chart in the bottom-right corner. Line color: Blue (#2196F3). 
Typography: Syne (Display) for labels, IBM Plex Sans (Body) for small data points. 

**Animation Sequence (8s Loop):**
1. **0.0–1.5s (Problem - Heat Spike):** The Amber heat bar descends rapidly towards the white PCM block. A temperature line graph in the corner spikes sharply upwards. Label: 'HEAT IN' appears in Syne, tracking in from the left.
2. **1.5–4.0s (Mechanism - Melting Plateau):** The heat bar makes contact. Instead of the block getting 'hotter', the top layer of the white block begins to 'melt'—transitioning to a translucent/gradient state or revealing a liquid-like internal texture. Crucially, the Temperature Graph line FLATTENS horizontally (the latent heat plateau), even as the Amber heat bar continues to press down/pulse. The block visually changes state (solid to liquid) but the temp stays constant. Label: 'PHASE CHANGE' fades in.
3. **4.0–6.0s (Payoff - Buffering):** The heat source withdraws (Amber bar moves up/fades). The block remains in its changed state. The Temperature Graph stays low and flat, contrasting with a hypothetical 'unbuffered' spike (show a faint grey ghost line spiking high for comparison). Label: 'TEMP STABLE' in Syne.
4. **6.0–8.0s (Lockup):** The block solidifies back to white (releasing energy, shown by small blue arrows radiating out). The ThermoStore logo (text only, Syne, centered) and 'Peak Shaving' tagline (IBM Plex) appear. Fade out to reset.

**Constraints:**
- No particle effects. Use clean vector morphs or opacity/transform changes.
- The 'melting' effect should be geometric (e.g., slicing layers, changing stroke dashoffset, or gradient mask reveal), not a blobby liquid simulation.
- Ensure the 'Flat Temp' vs 'Changing State' contrast is the visual hero.
- Font loading: Use Google Fonts for Syne and IBM Plex Sans.
