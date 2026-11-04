Build a single-file HTML asset studio for 'Copper Sulfide Tarnish Plate', a 3D hero mesh family. The core deliverable is a high-fidelity 3D viewer showcasing weathered copper plates with physically-modeled surface degradation, not static texture overlays. Use Three.js via CDN for rendering and GLB export.

## Pack Type
3D Hero Mesh Family: Authored copper plates with embossed heraldry and procedural sulfide tarnish states.

## Style Bible
Materials: Base copper (#b87333) with high metallic roughness (0.35-0.45). Tarnish layers: Sulfide black (#1a1a1a) transitioning to Verdigris green (#4a6b5d) and Copper Oxide brown (#7a4f2a). Edge language: Sharp bevels on plate rims, soft embossed details on faces. Light: Studio HDRI with strong key light to highlight metallic sheen on fresh copper and diffuse scattering on tarnished areas. Silhouette: Rectangular plates with chamfered corners, distinct embossed central motifs (shields, gears, crests).

## Inventory
1. Hero Plate A: Shield motif, 128x128px texture resolution equivalent.
2. Hero Plate B: Gear mechanism motif, 128x128px.
3. Hero Plate C: Abstract crest, 128x128px.
4. Tarnish Maps: 3 procedural maps (Sulfide, Oxide, Verdigris) generated via shader noise.
5. UI Plates: 3 flat backing plates for mounting.
Total: 6 distinct mesh variants + 3 procedural material states.

## Download
Users can download:
1. GLB file: Contains all 6 mesh variants with baked PBR textures (Albedo, Normal, Roughness, Metallic).
2. SVG Patina Mask: Vector-based representation of the tarnish progression for 2D use.

## Viewer
Orbit controls for 360-degree inspection. A prominent time-slider (0-100 years) controls the tarnish progression shader uniform. At 0s, copper is fresh and reflective. At 100s, it is fully verdigris-covered. Poster frame at 1.5s shows the initial tarnish spread from edges. Chrome uses Cinzel for titles and Lato for UI labels. No external asset CDNs; all geometry and textures generated procedurally or embedded as base64.

## Layout
Desktop: Full-screen 3D viewport with a fixed right-side overlay panel (320px width) for controls. Mobile: Viewport occupies top 60% of screen, controls stack in a scrollable bottom sheet with collapsible sections for Mesh Selection and Export Options. Ensure touch targets are minimum 44x44px.

## Motions
Entrance: Camera dollies in from 5 units to 3 units over 1.2s with ease-out cubic. Tarnish shader uniform animates from 0.0 to 0.15 over 3s to demonstrate edge degradation. Ambient: Idle auto-rotation at 0.2 degrees per frame. Interaction: Slider drag updates `uTimeProgress` instantly; button hovers trigger a 0.2s glow effect on the copper material emission channel.

## Constraints
- Single-file HTML/CSS/JS only.
- Three.js r150+ via CDN.
- No external image assets; all textures procedural.
- Max 5k triangles per mesh.
- 60fps target on mid-range devices.
- No emoji or primitive cubes.

## Acceptance Criteria
1. 3D viewer loads with correct copper material.
2. Time slider smoothly interpolates tarnish colors.
3. GLB export downloads valid file with embedded textures.
4. SVG export downloads valid vector mask.
5. Fonts Cinzel/Lato render correctly.
6. No console errors.
7. Meshes are distinct (Shield, Gear, Crest).
8. Tarnish progresses non-linearly from edges.

Deliverable: single-file HTML/CSS/JS.
