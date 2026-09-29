# Wood Type Incremental Heat — Extended

## Concept
Wood type was the workhorse of early printing. It’s heavy, warm, and organic. This concept plays with the physical properties of wood under heat: expansion, drying, and the revelation of grain. The cursor isn't just selecting; it's 'applying heat,' causing the material to breathe and change state. It’s a tactile study of analog craft.

## Palette
- **Ink Base:** `#3E2723` (Deep warm brown/black ink)
- **Wood Base:** `#8B4513` (Saddle Brown)
- **Wood Light:** `#D2B48C` (Tan, for highlights and grain)
- **Heat Glow:** `#FFF8DC` (Cornsilk, for the subtle highlight when 'warm')
- **Background:** `#F5F0E6` (Aged paper/parchment)

## Typography
- **Display:** *Alfa Slab One*, *Bungee*, or a custom wood-type font with thick, blocky serifs. The letters must be large enough to show texture (min 100px).
- **Support:** *Courier New* or *Special Elite* for meta-data, evoking the typewriter era that followed wood type.

## Layout
- **Desktop:** Centered hero. The text is large and impactful. Background has a subtle paper grain.
- **Mobile:** The text wraps. Each letter still responds to touch, but the 'heat' effect is triggered by tap-and-hold rather than hover.

## Motion Brief
1. **Entrance:** Letters drop down from above with a 'thud' motion (ease-in-out) and a slight settle bounce, like heavy blocks being placed on a press bed.
2. **Ambient:** No ambient motion when idle. The material is static and heavy.
3. **Interaction (Hover):** 
   - **Scale:** Letter scales up to 1.03.
   - **Color:** Ink opacity decreases slightly; a 'heat' gradient (radial, centered on cursor) appears, lightening the wood tone.
   - **Texture:** The `background-position` of the wood grain texture shifts slightly to simulate fibers rising/expanding.
   - **Shadow:** The drop shadow softens and spreads, simulating the object lifting slightly off the surface.
4. **Interaction (Leave):** Reverse the above with a slower ease (0.5s), simulating the time it takes for wood to cool.

## Constraints Checklist
- [ ] Use `background-blend-mode` or layered images for the wood grain + ink effect.
- [ ] Avoid neon or digital colors; keep it earthy and analog.
- [ ] Ensure the 'heat' effect is subtle, not a harsh brightness change.
- [ ] Performance: Limit the number of letters to 10-15 to maintain 60fps during hover.

## Acceptance Criteria
- The letters feel heavy and physical.
- The heat interaction feels responsive but organic (not robotic).
- The wood grain is visible and reacts to the 'heat' state.
