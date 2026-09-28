# Hazard Tape Peel Reveal — Extended

**Concept**:
In industrial safety culture, tape is a temporary barrier, not a permanent wall. This concept plays on that tension: the interface is covered in a 'hazard' layer (tape), suggesting restricted or raw data. By interacting with it, the user performs a physical act of 'clearing the site' to access the clean information underneath. It merges the tactile satisfaction of removing a sticker with the utility of a reveal animation.

**Palette**:
- **Hazard Yellow**: `#FFD700` (High visibility, standard safety yellow)
- **Black**: `#000000` (For stripes and text)
- **Concrete Grey**: `#4A4A4A` (The background content area)
- **Glue Amber**: `#F0E68C` (Subtle, semi-transparent residue)

**Typography**:
- **Tape Text**: `Courier New` or `Roboto Mono`, bold, uppercase, stamped onto the stripes. Slightly misaligned to look like manual application.
- **Revealed Content**: `IBM Plex Sans` or `Inter` (neutral), clean, high-contrast white on dark grey. Legibility is paramount once revealed.

**Layout**:
- **Desktop**: The tape covers the entire hero section. Multiple strips can be applied horizontally or diagonally.
- **Mobile**: Single vertical strip or large square patch. Touch drag needs to be forgiving.

**Motion Brief**:
1. **Idle**: Tape has a very subtle 'breathing' scale (100% to 100.1%) to suggest tension.
2. **Interaction (Drag)**: The corner closest to the cursor lifts. The rest of the tape stretches slightly (skew). A drop shadow intensifies under the lifted corner to indicate height.
3. **Release**: If past 60%, the tape fully peels off and fades out, leaving a faint glue trail. If under 60%, it snaps back flat with a slight wobble.
4. **Ambient**: Dust particles or tiny debris might shake loose from the tape as it peels.

**Constraints Checklist**:
- [ ] No purple glows or soft shadows.
- [ ] Tape texture must look like vinyl, not flat color.
- [ ] Peel motion must use 3D transforms (`rotateX`, `perspective`).
- [ ] Performance: Use `will-change: transform` on the tape element.

**Acceptance Criteria**:
- User can drag the tape and feel resistance.
- The 'snap back' feels elastic.
- The revealed content is fully accessible after peel.
