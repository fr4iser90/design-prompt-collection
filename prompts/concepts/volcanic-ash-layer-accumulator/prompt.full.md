# Volcanic Ash Layer Accumulator — Extended

## Concept
A study in quiet accumulation and entropy. Unlike dynamic explosions, this is the aftermath—the gentle, relentless fall of ash. The visual goal is the creation of complex topography from simple particles. The layers represent time and geological history.

## Palette
- **Deep Shadow:** `#2c2c2c`
- **Mid Ash:** `#4a4a4a`
- **Light Ash:** `#6b6b6b`
- **Highlight/Dust:** `#d9d9d9`
- **Background:** `#111111` (Dark void to make ash pop)

## Type Pairing
- **UI:** `Inter` or `Helvetica Neue`. Light weight (300), small size. Color `#6b6b6b`. Used only for depth readout (e.g., 'Depth: 4.2mm').

## Layout
- **Desktop:** Full-screen. Camera fixed, slight parallax on mouse move.
- **Mobile:** Auto-scroll camera down as mound grows.

## Motion Brief
1.  **Entrance:** Empty stage. First few particles fall.
2.  **Ambient:** Constant, slow rain of particles. Speed varies slightly (natural randomness).
3.  **Interaction:** 
    - *Hover:* Creates a subtle 'wind' cone that pushes particles aside.
    - *Click:* Triggers a dense burst, causing a rapid increase in mound height.
    - *Scroll:* Adjusts global particle velocity.

## Constraints
- No color. Pure gray-scale.
- Particles must not disappear; they become part of the terrain.
- Lighting must create strong sense of volume in the ash pile.
- Performance: Use instancing for particles to handle high count (10k+).
- Avoid 'smoke' look; this is solid particulate matter.

## Acceptance Criteria
- The mound grows organically, with realistic pile slopes (angle of repose).
- Texture feels gritty, not smooth.
- Interaction feels gentle, not violent.
