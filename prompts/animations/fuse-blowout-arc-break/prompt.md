# Fuse Blowout Arc Break

**Intent**: Capture the precise moment of electrical failure. The animation should feel dangerous, sudden, and final.

**Visuals**:
- **Subject**: A close-up of a glass/ceramic fuse holder with a thin tungsten filament.
- **State 1 (Intact)**: Filament is dark, cold metal. 
- **State 2 (Overload)**: Filament heats up. Colors shift from grey to orange to blinding white.
- **State 3 (Break)**: The filament snaps in the middle. A bright blue-white arc flashes for 100ms.
- **State 4 (Dead)**: The arc vanishes. Smoke curls slightly. The background is pitch black.

**Motion Logic**:
1. **Heat Up**: The filament glows progressively (grey -> orange -> yellow -> white). This should take ~2 seconds, accelerating.
2. **Snap**: A sudden, sharp break. The ends recoil slightly.
3. **Flash**: A radial burst of light (blue-white) emanating from the break point.
4. **Aftermath**: The light dies instantly. A thin, faint wisp of grey smoke rises slowly. 

**Deliverable**: A dramatic, short animation (2–3s) suitable for a 'system failure' or 'security breach' indicator.
