# Parallax Depth Layers — Extended

## Concept
A walk into mist: far trees crawl, mid ridge moves, near ferns slide faster. Fog unifies the stack so it doesn’t look like three PNGs taped together.

## Art direction
- Palette: pine black `#0c1210`, moss `#1f3d32`, mist `#8fbf9f`, bone type `#e7efe9`
- Assets: can be CSS gradients + SVG silhouettes if photos unavailable
- Type: a sturdy serif or grotesque with outdoor character (e.g. Source Serif / Fitzgerald-class)

## Motion brief
1. Entrance: layers already composed; motion starts on scroll
2. Ambient: optional very slow fog opacity breathing (disable if distracting)
3. Interaction: none required beyond scroll

## Performance
- Prefer 1 shared rAF listener
- Avoid filter: blur on scroll; bake blur into assets

## Constraints checklist
- [x] Reduced motion static frame
- [x] No scroll hijack
- [x] Mobile amplitude reduced
- [x] Brand readable over mid layer

## Acceptance
Depth reads instantly; 60fps on integrated GPUs.

## Optional variants
- Variant A: dusk amber grade
- Variant B: winter blue-gray grade
