# Ferrofluid Magnetic Response — Extended

## Concept
The aesthetic appeal of ferrofluid lies in its 'alive' quality—sharp, impossible geometry emerging from a liquid. This concept focuses on the tactile simulation of that material. The cursor acts as a powerful magnet. The goal is to capture the *tension* between the liquid's surface tension and the magnetic pull.

## Palette
- **Fluid:** `#000000` (Base), `#1a1a1a` (Shadow/Depth)
- **Reflections:** `#e0e0e0` (Studio light), `#ffffff` (Specular peaks)
- **Background:** `#0a0a0a` (Slightly lighter than fluid to create depth)

## Type Pairing
- **None.** The material is the subject.
- **UI:** If needed, a single 'Reset' icon. Use a thin stroke icon (1px stroke, `#555`).

## Layout
- **Desktop:** Full-screen canvas. Cursor is the primary input.
- **Mobile:** Touch point acts as magnet. Gyroscope can tilt the 'pool' to let fluid flow off-screen.

## Motion Brief
1.  **Entrance:** Fluid rises from bottom of screen to fill the container.
2.  **Ambient:** Very subtle ripples on the surface, like a quiet pond.
3.  **Interaction:** 
    - *Approach:* Surface begins to bulge before spiking.
    - *Hover:* Stable spikes with slight jitter (simulating energy vibration).
    - *Retreat:* Spikes collapse slowly, not instantly. The liquid 'flops' back down.
    - *Click:* Shockwave ripple radiates from center.

## Constraints
- Must use environment mapping for realistic reflections.
- Spikes must not look like simple 3D cones; they need irregular, organic edges.
- Fluid must not clip through the container walls.
- No purple/blue sci-fi lighting. Use white/warm studio lighting for realism.

## Acceptance Criteria
- Fluid movement feels heavy and viscous.
- Reflections move correctly with fluid deformation.
- Spiking effect is responsive to cursor distance.
