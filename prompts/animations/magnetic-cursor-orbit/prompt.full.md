# Magnetic Cursor Orbit — Extended

## Concept
Cursor proximity warps local space around nav labels. Motion should feel physical (mass, damping) not playful jelly.

## Art direction
- Palette: void `#121212`, graphite `#2a2a2a`, bone `#f2f2f2`, accent line `#c4f34a` (thin, rare)
- Type: Neue Montreal / Satoshi-class; tracking slightly open
- Cursor: 6–8px disc or crosshair; opacity ~0.9

## Motion brief
1. Entrance: nav fades in, items offset 8px then settle
2. Ambient: none (interaction-led)
3. Interaction: magnetic pull + optional orbiting dot; release spring-back

## Parameters (suggested)
- radius: 80–120px
- stiffness / damping: tune so settle < 300ms after leave
- max translation: 10–16px

## Constraints checklist
- [x] Reduced motion + touch fallbacks
- [x] No purple glow
- [x] Readable hit targets
- [x] 60fps on mid laptops

## Acceptance
Feels expensive in 3 seconds. Doesn’t fight scrolling or accessibility.

## Optional variants
- Variant A: magnetic only (no orbiting dot)
- Variant B: magnetic + underline that slides between items
