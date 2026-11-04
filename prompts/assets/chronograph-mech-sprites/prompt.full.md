## Concept
CHRONOGRAPH MECH is a watchmaker-industrial sprite pack: a compact bipedal mech whose body language is gear teeth, case screws, and oil-black recesses. The studio page sells craft density — every frame is a machined object, not a doodle.

## Pack type
2d — production sprite atlas + SVG prop masters. Tag: sprite-production.

## Style bible
- Materials: brushed steel #8A9399, catchlight #E8EEF4, oil recess #1B2430, amber accent #C4A574, ground #12161C
- Edge language: hard bevel facets; 1px rim light on upper-left; no soft airbrush blobs
- Silhouette: wide shoulders, chronograph crown on chest, digitigrade legs — readable at 32px
- Ban soft cartoon squash; ban stick limbs; ban emoji sparks

## Inventory
1. Hero idle ×8, walk ×8, strike ×8 @64×64
2. Props ×6 (key, balance wheel, mainspring, caseback, screws, dropper)
3. VFX ×4 (spark ring, oil mist, gear flash, shock)
4. UI chrome plate ×1 (bezel + tick marks)

## Download
- `chronograph-mech-atlas.png` — packed sprite sheet with frame metadata JSON beside it
- `chronograph-props.svg` — vector masters for props + UI plate
Buttons must trigger real Blob downloads.

## Viewer
Left: filmstrip (all frames). Center: zoom stage with pixel-honest nearest scaling toggle (Nearest / Smooth). Right: Style bible swatches + inventory checklist. Pack title CHRONOGRAPH MECH as large display type.

## Palette
bg #12161C · steel #8A9399 · oil #1B2430 · amber #C4A574 · catch #E8EEF4 · ink #F2EFE8

## Type
Syne 700 for pack title; IBM Plex Mono 500 for labels/frame indices. Never Inter/Roboto/Arial/system-ui.

## Constraints
- Single HTML file; Canvas for raster frames; SVG for vector masters
- No external art CDNs; no Blender/Godot
- prefers-reduced-motion → static poster grid
- No landing CTAs; no playable combat loop

## Acceptance criteria
1. All 24 hero frames + 6 props + 4 VFX + UI plate visible in filmstrip
2. PNG atlas and SVG downloads succeed in Chromium
3. Poster @1.5s shows atlas + hero without user input
4. Silhouette still readable when stage scaled to 32px
5. No stick figures, cubes-as-hero, or emoji kits
