# Fuse Blowout Arc Break — Extended

## Concept
This is a study of energy release. It contrasts the slow buildup of heat with the instantaneous violence of a circuit break. The aesthetic is 'High-Voltage Utility': stark, high-contrast, and devoid of unnecessary ornamentation. The focus is on the light and the material failure.

## Art Direction
- **Palette**: 
  - Background: #0a0a0a (Pure Black) to maximize contrast.
  - Thermal Glow: Gradient from #555555 (Cold Metal) -> #ff6600 (Orange) -> #ffffff (White Hot).
  - Arc Flash: #00ffff (Cyan) mixed with #ffffff (White). 
  - Smoke: #888888 (Grey) with low opacity.
- **Lighting**: The light comes *from* the filament itself. It should cast dynamic shadows on the fuse holder casing. 
- **Texture**: The filament should look thin, brittle, and metallic. The smoke should be volumetric but subtle.

## Layout
- **Desktop**: Macro shot, centered. The fuse takes up 40% of the screen. 
- **Mobile**: Full screen. The light flash should illuminate the edges of the device frame.

## Motion Brief
- **Phase 1: Overload (0–1.8s)**
  - Filament glow intensity increases exponentially. 
  - Add a subtle 'hum' visual effect: slight vibration of the filament as current increases.
- **Phase 2: Failure (1.8–1.9s)**
  - The filament snaps. 
  - The break point expands into a bright, jagged arc.
  - Light bloom spreads rapidly across the screen (screen blend mode).
- **Phase 3: Silence (1.9–3.0s)**
  - Arc disappears instantly.
  - Smoke rises slowly (buoyancy physics).
  - A faint residual ember glow remains at the break points for 0.5s, then fades.
  - The scene returns to black, but the 'danger' is implied by the smoke.

## Constraints
- The flash must not be a generic 'white circle'. It should be jagged and electric.
- No purple/blue 'magic' sparks. This is industrial electricity.
- The smoke should not fill the screen; it should be a delicate, haunting detail.
- Ensure the 'snap' is synchronized with the light burst.

## Acceptance Criteria
- The color progression of the heat is realistic (Blackbody radiation colors).
- The arc flash feels instantaneous and blinding.
- The smoke adds a layer of realism without cluttering the composition.
