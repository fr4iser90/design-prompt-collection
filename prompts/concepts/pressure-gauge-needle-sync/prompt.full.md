# Pressure Gauge Needle Sync — Extended

**Concept**:
This concept explores the anxiety and precision of industrial monitoring. It’s not just a data display; it’s a mechanical system under stress. The 'sync' aspect implies that the data sources are physically or logically linked—a rise in one area causes instability in others. The visual language is cold, heavy, and metallic, contrasting with the volatile energy of steam.

**Palette**:
- **Steel Blue**: `#B0C4DE` (Metallic rims, highlights)
- **Iron Dark**: `#333333` (Gauge faces, deep shadows)
- **Alert Orange**: `#FF4500` (Needles, danger zones, warning lights)
- **Steam White**: `#FFFFFF` (with low opacity for particles)

**Typography**:
- **Labels**: `Arial Narrow` or `Helvetica Neue Condensed`, bold, uppercase, white. Small, functional, like printed labels on machinery.
- **Readings**: Digital monospace overlay (optional) to contrast with the analog needles.

**Layout**:
- **Desktop**: Horizontal row of 3 large gauges (400px+). Space between them allows steam to rise without occlusion.
- **Mobile**: Stacked vertically. Steam effects should be smaller to avoid clutter.

**Motion Brief**:
1. **Idle**: Needles hover at 20-30% with a very slight, slow drift (thermal expansion simulation).
2. **Input (Slider/Click)**: User adjusts 'Load'. Needles move with easing but add 'overshoot' and 'settle' wobbles.
3. **Critical State**: >80% load triggers steam particles. >95% triggers screen shake and a pulsing red glow on the gauge rim.
4. **Sympathetic Vibration**: When one needle moves fast, the others jitter randomly for 500ms.

**Constraints Checklist**:
- [ ] No smooth CSS transitions on needles; use JS requestAnimationFrame for mechanical feel.
- [ ] Steam must look volumetric (blur, opacity gradient), not just white dots.
- [ ] Shake effect must be subtle (2-3px) to avoid motion sickness.

**Acceptance Criteria**:
- Needles feel heavy and mechanical.
- Steam appears only at high pressure.
- The system feels 'alive' and reactive.
