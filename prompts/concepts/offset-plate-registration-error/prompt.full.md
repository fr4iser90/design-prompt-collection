# Offset Plate Registration Error — Extended

## Concept
This concept explores the mechanical precision of traditional offset printing. Before digital perfection, print relied on the physical alignment of four separate plates (Cyan, Magenta, Yellow, Key/Black). Slight mechanical drift results in 'registration errors,' where colors don't quite line up, creating a fuzzy, vibrating edge. We invert this: the 'error' is the aesthetic starting point, and 'precision' is the reward for interaction.

## Palette
- **Paper Base:** `#F5F5F0` (Warm uncoated stock)
- **Cyan:** `#00AEEF` (Vibrant process cyan)
- **Magenta:** `#EC008C` (Rich process magenta)
- **Yellow:** `#FFED00` (Bright process yellow)
- **Key:** `#1A1A1A` (Soft black, not pure #000)
- **Ink Gloss:** Subtle radial gradient overlay to simulate ink wetness.

## Typography
- **Display:** A heavy, high-contrast serif (e.g., *Playfair Display* Black or *Bodoni Moda*) or a grotesque with sharp terminals. The serifs help visualize the 'bite' of the plate into the paper.
- **Body:** A clean, geometric sans-serif (e.g., *DM Sans* or *Futura*) for supporting text, kept in solid Key black to avoid registration complexity in smaller sizes.

## Layout
- **Desktop:** Full-bleed viewport. Headline centered vertically and horizontally. Registration marks (crosshairs) in the corners of the viewport that also align.
- **Mobile:** Headline scales down. The 'ghosting' effect becomes more pronounced on touch devices to emphasize the tactile nature of the print metaphor.

## Motion Brief
1. **Entrance:** Plates enter from different edges of the screen, overshooting their final position slightly before settling into the 'misregistered' state.
2. **Ambient:** A very subtle, slow 'drift' animation (2-3px) on the misregistered state to simulate loose machinery.
3. **Interaction:** On scroll (or click), the C, M, and Y layers interpolate their transform values to (0,0) relative to the K layer. The easing should be cubic-bezier(0.25, 0.1, 0.25, 1) — mechanical and decisive. As they align, a faint 'snap' sound (optional) or a visual 'pulse' of ink saturation occurs.

## Constraints Checklist
- [ ] Use `mix-blend-mode: multiply` for the CMY layers.
- [ ] Do not use RGB values for the final color; the blend *must* create the secondary colors (e.g., no pure blue text, only Cyan+Magenta).
- [ ] Performance: Use `transform: translate3d` for the plate shifts to ensure GPU acceleration.
- [ ] Accessibility: Ensure the final aligned state meets contrast requirements.

## Acceptance Criteria
- The text must look like it is printed on paper, not glowing on a screen.
- The alignment must feel satisfying and precise.
- The misregistration must be visible but not nauseating.
