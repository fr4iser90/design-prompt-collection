# Solar Flare Corona Visualization — Extended

## Concept
A scientific yet artistic visualization of stellar magnetic activity. The core mechanic is the tension between magnetic poles. When users bring two magnetic 'nodes' close together, the visualized field lines compress and brighten. Releasing them causes a simulated solar flare—a release of energy that sends plasma particles outward against the star's gravity.

## Palette
- **Void:** `#050505` (Background)
- **Core Heat:** `#ffffff` → `#ffd700` (Center glow)
- **Plasma Base:** `#ff4500` (Orange-red, lower energy)
- **Flare Peak:** `#fffacd` (Lemon chiffon, high energy)
- **Data:** `#888888` (UI text, non-intrusive)

## Type Pairing
- **Display/Labels:** `IBM Plex Mono` or `JetBrains Mono`. Small size (10-12px), uppercase, letter-spaced. Used for data overlays only.
- **No large headings.** The visual *is* the heading.

## Layout
- **Desktop:** Full-screen canvas. Data HUD in bottom-left and top-right corners. Interaction hint fades out after 5 seconds.
- **Mobile:** Simplified particle count. Touch-drag moves magnetic nodes.

## Motion Brief
1.  **Entrance:** Star ignites from a single pixel to full glow over 2s.
2.  **Ambient:** Slow, rhythmic pulsing of the corona (breathing effect). Background plasma flows slowly.
3.  **Interaction:** 
    - *Drag:* Field lines bend and tighten. Color intensity increases with proximity.
    - *Release:* 'Snap' effect. Particles explode outward with velocity decay. Screen shake (subtle, 2-3px) on strong flares.

## Constraints
- No blurry backgrounds.
- Plasma must look volumetric, not flat.
- Performance: Target 60fps on mid-range devices.
- No generic 'space' stars; focus entirely on the star's surface/atmosphere.

## Acceptance Criteria
- Magnetic field lines visibly deform during drag.
- Flare event triggers particle system and audio-visual cue (optional subtle hum).
- Color gradient accurately reflects simulated energy levels.
