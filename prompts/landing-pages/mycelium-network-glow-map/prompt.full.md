# Mycelium Network Glow Map — Extended

## Concept
RhizoNet uses fungal structures to process data. The landing page visualizes this 'biological internet'. It is not a tech page with green accents; it is a tech page that *feels* alive, damp, and interconnected. The aesthetic is 'subterranean luxury'.

## Palette
- **Soil/Dark:** `#052e16` (Deep background), `#022c22` (Shadows)
- **Fungal Light:** `#34d399` (Primary glow), `#6ee7b7` (Bright nodes), `#a7f3d0` (Particle trails)
- **Text:** `#ecfdf5` (Off-white, cool), `#94a3b8` (Secondary data)

## Typography
- **Headings:** 'Space Grotesk' or 'Syne' — geometric but with unique curves to suggest organic growth.
- **Body/Data:** 'IBM Plex Mono' — clean, technical, trustworthy.

## Layout
- **Desktop:**
  - Full-screen Canvas background.
  - Floating, semi-transparent content cards (`backdrop-filter: blur(10px); background: rgba(2, 44, 34, 0.6);`).
  - Left: Mission statement. Right: Live 'Node Status' data panel.
- **Mobile:**
  - Canvas reduced to a header banner. Content stacked below. Interaction limited to tap-to-pulse.

## Motion Brief
1. **Entrance:** The network grows from the bottom-up, branching out across the screen.
2. **Ambient:** Slow, rhythmic pulsing of nodes. Data particles flow constantly along paths.
3. **Interaction:** Mouse proximity causes 'chemical signal' waves. Clicking a node isolates it and shows its specific 'load' or 'species' data.

## Constraints Checklist
- [ ] Avoid generic 'AI neural network' visuals (symmetric, grid-like). This must look chaotic/organic.
- [ ] Performance: Limit particle count for mobile.
- [ ] No bright neon greens. Keep it mossy and deep.

## Acceptance Criteria
- The visualization feels like watching a time-lapse of fungus.
- The UI overlays do not distract from the background beauty.
- The brand feels innovative yet rooted in nature.
