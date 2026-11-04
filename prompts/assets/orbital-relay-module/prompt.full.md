## Concept
ORBITAL RELAY MODULE is a hard-surface communications node for vacuum: dish, sealed body, ceramic radiators, and a docking collar. The studio treats it as a production game-ready prop family with honest materials.

## Pack type
3d — glTF/GLB hero family. Tag: gltf-hero. Three.js CDN + GLTFExporter permitted.

## Style bible
- Hull anodized #2B3444 with panel break edges; radiators ceramic #E8ECF2; signal glass #6EC8FF; docking ring #141A22; ground void #0A0E14
- Light: single cool key + faint fill; glass must show transmission/fresnel, not flat cyan paint
- Form: cylindrical core, offset dish boom, stacked fin radiators — silhouette unique from any angle
- Ban primitive cube/sphere as the main mesh; ban matcap-only laziness without named materials

## Inventory
1. Hero relay module (dish + body + radiators + collar)
2. Variants ×3 (dish poses / radiator stow)
3. Props ×4 (bolt, umbilical, strobe, cargo puck)
4. Studio ground + gradient backdrop

## Download
- `orbital-relay.glb` — hero (+ embedded materials)
- Optional `orbital-relay-props.glb`
Real Blob download buttons required.

## Viewer
OrbitControls; exposure slider; wireframe; part isolate list. Pack title as hero type above the stage. Poster @ ~1.5s locked three-quarter.

## Palette
void #0A0E14 · hull #2B3444 · ceramic #E8ECF2 · signal #6EC8FF · ink #F2EFE8 · muted #8A93A3

## Type
Space Grotesk 600 for title; JetBrains Mono for part IDs. Never Inter/Roboto/Arial.

## Constraints
- Single HTML; Three.js via CDN only for this assets 3d brief
- No Blender/Godot pipeline; meshes authored in code / BufferGeometry with intention
- prefers-reduced-motion → static camera angle
- No shopping configurator price UI

## Acceptance criteria
1. Hero reads as a relay (dish recognizable) at shot size
2. GLB download produces a non-empty file
3. Auto-orbit reaches poster composition by ~1.5s
4. Glass/hull/ceramic materials are visually distinct
5. No cube-as-hero, no purple glow shell
