## Concept
BRINE STATION is a saline-industrial kit: every asset feels like it rusted under saltwater in the same facility. Player, enemies, props, HUD, and VFX share one material dialect so a game can drop the pack in without style fracture.

## Pack type
game-kit — cohesive 2D production set. Tag: game-kit-cohesion.

## Style bible
- Water void #07131A / haze #0F2A32; metal #5C6B73; salt crust #D9E2E0; hazard #E0A45A; biolume #7EC8C3
- Edges: hard metal with salt bloom on upper surfaces; no soft pastel rounds
- Silhouette first at 48px; HUD plates use stencil type, not candy pills
- Ban mismatched cartoon/realistic mix; ban stick figures; ban emoji bubbles

## Inventory
1. Player diver idle×6 swim×6 @48px
2. Hazards×3 (vent, salt crab, cable snare)
3. Pickups×3 (O2, crystal, wrench)
4. Props×4 (elbow, valve, gauge, hatch)
5. UI×3 (O2 bar, warning, score)
6. VFX×3 (bubbles, salt burst, spark)

## Download
- `brine-station-atlas.png` + frame map JSON
- `brine-station-ui.svg` for HUD plates
Blob downloads required.

## Viewer
Kit grid (all items labeled); zoom stage; style bible strip; checklist progress. Title BRINE STATION as hero display. Poster @1.5s = grid + large diver.

## Palette
void #07131A · haze #0F2A32 · metal #5C6B73 · salt #D9E2E0 · hazard #E0A45A · biolume #7EC8C3 · ink #E8F0EE

## Type
Fraunces 600 for pack title; IBM Plex Sans 500 for labels. Never Inter/Roboto/Arial.

## Constraints
- Single HTML; Canvas/SVG only; no external art
- Cohesion test: remove labels — still one world
- prefers-reduced-motion → static grid
- Not a playable game loop; not a marketing landing

## Acceptance criteria
1. ≥14 distinct kit items visible and labeled
2. Atlas + SVG UI downloads work
3. Poster composition ready by ~1.5s
4. Player/hazard/UI share metal+salt language
5. No stick figures, no style-fractured assets
