# Sun-Bleached Textile Swatches — Extended Brief

**Concept**
A tactile, sensory experience showcasing high-end, sustainable textiles inspired by desert environments. The design emphasizes the physical qualities of the fabric—texture, weight, and the way it absorbs light—through digital simulation.

**Palette**
- **Background:** Raw Linen (`#F0EBE1`) - with a subtle noise texture.
- **Swatch Colors:** A curated set of desaturated earth tones: Clay (`#CDB9A3`), Olive (`#8A9A85`), Sand (`#D4C5B0`), Iron (`#7D6E5F`), Stone (`#B0A89D`).
- **Shadow:** Soft Earth (`rgba(0,0,0,0.05)`).

**Typography**
- **Display:** 'Didot' - Classic, high-contrast serif. Used for fabric names (e.g., 'DUNE LINEN', 'DESERT SILK').
- **Body:** 'Lato' (Light) - Clean, sans-serif for technical specifications.

**Layout**
- **Desktop:** Horizontal scrollable row of 5 swatches. Each swatch is a card-like element but without borders or rounded corners. The long shadows connect the elements visually.
- **Mobile:** Vertical grid (2 columns). Shadows are shortened to fit the screen.

**Motion**
- **Entrance:** Swatches fade in and slide up slightly, staggered by 100ms.
- **Hover:**
    1. Lift: `transform: translateY(-5px)`.
    2. Shadow: `box-shadow: 15px 15px 0px rgba(0,0,0,0.08)`.
    3. Light Sweep: Animate a linear-gradient overlay (transparent -> white -> transparent) across the swatch to simulate sunlight hitting the fabric weave.
- **Active/Selected:** Swatch scales to 1.1 and brings itself to front (z-index). A small 'check' mark appears in the corner, styled as a hand-stitched label.

**Constraints**
- Texture realism is key. Use high-quality background images for the fabric patterns.
- The 'sun-bleached' look must be consistent. All colors should have low saturation and high brightness.
- No flashy animations. The movement should be slow and graceful, like wind moving through dunes.

**Acceptance Criteria**
- The swatches feel tangible and heavy.
- The light sweep effect enhances the perception of texture without being distracting.
- The color palette feels unified and serene.
