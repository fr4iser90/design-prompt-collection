# Tidal Glass Horizon — Extended

## Concept
'Quiet luxury' meets fluid dynamics. The screen is a plane of calm water. The user is looking *at* the water, not *into* it. The interface elements (text, buttons) are reflections or objects floating on/under the surface. The primary interaction is the slow, rhythmic rise and fall of the tide, which alters how the content is perceived through refraction.

## Palette
- **Air/Sky:** `#f0f4f8` (Very pale blue-white). Dominant space.
- **Water:** `#a3c4dc` (Soft, desaturated blue). Semi-transparent overlay.
- **Deep Shadow:** `#2c3e50` (Dark slate). For text and the horizon line itself. Provides contrast without harsh black.
- **Highlight:** `#ffffff` (Pure white). For specular highlights on the 'glass' surface.

## Typography
- **Display:** `Playfair Display` (Italic) - Elegant, high-contrast serif. Evokes classic luxury and calm.
- **UI/Nav:** `Montserrat` (Light) - Clean, geometric, unobtrusive.

## Layout
- **Desktop:** Split horizontally by the horizon. 60% Sky, 40% Water. Text sits in the 'Sky' zone but intersects the horizon. Navigation is fixed at the very top, small and centered.
- **Mobile:** Horizon stays central. Text scales down. Interaction becomes touch-based drag to 'tilt' the water surface (parallax).

## Motion Brief
1. **Entrance:** Horizon rises from bottom to center (ease-out). Text fades in above it.
2. **Ambient:** 
   - Horizon oscillates up/down by ±5% viewport height over 10s loop.
   - Subtle chromatic aberration intensity varies with the wave's peak.
3. **Interaction:** 
   - Mouse hover over text near the horizon increases refraction distortion (scale and shift).
   - Scroll triggers a 'wave' that propagates across the horizon line.

## Constraints
- No bubbles, no splashes. Water is *still* and *glass-like*.
- No heavy shadows. Use soft, diffused shadows only.
- Keep UI controls minimal (hamburger menu if needed, hidden otherwise).

## Acceptance Criteria
- The 'glass' refraction effect is noticeable but not nauseating.
- The mood is calming, not dynamic/energetic.
- High readability of serif text despite the background gradient.
