# Oxidized Brass Tarnish — Extended

**Concept:**
This animation explores the concept of "time as a material." By accelerating the natural oxidation process of brass, we visualize decay not as destruction, but as the accumulation of history. The visual language is strictly macro, focusing on the interplay between the hard, reflective metal and the soft, matte patina.

**Palette:**
- **Polished Brass:** `#b5a642` (High specular, warm)
- **Verdigris/Patina:** `#2f4f4f` to `#4b6969` (Desaturated teal-green, matte)
- **Ambient Shadow:** `#1a1a1a` (Deep, soft blacks)
- **Highlight:** `#fffdf2` (Cool white reflection)

**Material & Texture:**
- **Brass:** Brushed finish, visible grain direction, high reflectivity.
- **Patina:** Chalky, non-reflective, irregular edges, varying thickness (dense in crevices, thin on high points).

**Motion Design:**
1.  **Initiation:** Small, dark specks appear randomly across the plate.
2.  **Growth:** These specks expand using a cellular automaton or fluid simulation logic. They should not be perfect circles; they should have ragged, organic edges.
3.  **Coalescence:** Patches merge, creating larger islands of verdigris. The brass beneath appears to "sink" slightly where the tarnish is thickest (simulated via normal map displacement).
4.  **Lighting Shift:** As the surface becomes more matte, the specular highlights diminish and spread, while diffuse ambient occlusion increases.

**Technical Implementation:**
- **Shader Approach:** Use a fragment shader with two textures: `brass_base` and `patina_noise`. Use `smoothstep` on a time-varying noise threshold to reveal the patina. Apply a `displacement_map` to the UVs to make the edges wobble organically.
- **SVG Approach:** Use `feTurbulence` and `feDisplacementMap` on a path that expands over time. Complex but achievable.
- **Performance:** Keep particle count low if using JS canvas; prefer shader-based pixel manipulation for smoothness.

**Constraints Checklist:**
- [ ] No UI chrome or buttons in the frame.
- [ ] Realistic material response (specular vs. diffuse).
- [ ] Organic, non-uniform growth pattern.
- [ ] No "dissolve" effects using simple opacity masks.

**Acceptance Criteria:**
The viewer should feel the weight of time passing in 3-5 seconds. The transition from metal to stone-like patina must be convincing.
