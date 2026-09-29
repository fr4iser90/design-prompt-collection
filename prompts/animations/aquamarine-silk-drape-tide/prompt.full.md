# Aquamarine Silk Drape Tide — Extended

## Concept
Explore the intersection of textile physics and aquatic fluid dynamics. The subject is a piece of high-end, weighted silk that behaves less like cloth and more like a membrane of water. It explores 'quiet luxury' through the absence of rigid structure, relying on gravity, tension, and light refraction. The brand 'Solis Deep' is revealed not by fading in, but by the physical displacement of the material.

## Palette
- **Deep Void:** `#0f2b33` (Background and fabric base)
- **Saline Mid:** `#4a7c8c` (Fabric mid-tones and shadows)
- **Foam Highlight:** `#d0e8eb` (Light peaks and text)
- **Accent:** `#8bbdd6` (Caustic light refractions)

## Typography
- **Display:** 'Cormorant Garamond' or 'Didot' for elegance, but rendered in a clean, modern weight.
- **Body/UI:** 'Söhne Mono' or 'IBM Plex Mono' for technical labels, kept extremely small and subtle.

## Layout
- **Desktop:** Full viewport height. The silk drapes from the top center, covering 60% of the width. Text is centered behind it.
- **Mobile:** The drape becomes vertical, flowing from top to bottom, mimicking a waterfall curtain. Text appears in the lower third.

## Motion Brief
1. **Entrance (0-2s):** The silk drops into frame, settling with heavy inertia. No bounce, just a smooth, damped settle.
2. **Ambient Loop (2-12s):** A slow, horizontal 'tide' wave passes through the fabric. The wave speed is slow (approx. 0.5x real-time water). The fabric's opacity shifts slightly as it thins in the wave's trough.
3. **Interaction:** When the cursor moves over the silk, it acts as a 'lens' or 'pressure point.' The fabric clears (opacity drops) and sharpens in a circular radius around the cursor, revealing the text 'SOLIS DEEP' in crisp white. When the cursor leaves, the fabric ripples back into opacity.

## Technical Constraints
- Use WebGL shader-based cloth simulation for smoothness.
- Avoid typical 'flag' waving motion; this is *submerged* weight.
- Refraction indices should be high (1.4-1.5) to mimic wet silk.
- No external assets; generate textures procedurally if possible to maintain crispness.

## Acceptance Criteria
- The fabric must look wet/submerged, not dry.
- The text reveal must be driven by physical displacement, not just alpha fading.
- The loop must be seamless.
