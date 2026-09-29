# Cast Iron Seasoning Gloss — Extended

**Concept:**
'Iron & Fire' sells the ritual of cast iron cooking. The design captures the tactile feedback of a well-seasoned pan: heavy, dark, smooth, and responsive to heat. The interface is dark-mode native, using light and reflection to guide the eye, rather than color. The 'gloss' is the signature visual motif.

**Palette:**
- **Pan Body:** #1A1A1A (Deep matte black)
- **Seasoning Sheen:** #333333 (Charcoal) — used for highlights
- **Heat Accent:** #CC5500 (Burnt Orange) — used sparingly for CTA hover states or 'hot' zones
- **Text:** #E0E0E0 (Warm white)

**Typography:**
- **Display:** 'Oswald' or 'Bebas Neue'. All-caps headings. Tight tracking. Strong, industrial feel.
- **Body:** 'Source Code Pro' or 'Roboto Mono'. Clean, monospaced feel for recipes and specs. Evokes the precision of temperature control.

**Layout:**
- **Hero:** Full-screen dark surface. Centered product image (pan) with a dynamic light overlay. Headline is large, bold, and white.
- **Features:** Grid of icons, but styled as 'cast' metal badges. Hovering reveals a 'hot' orange glow.
- **Mobile:** Simplified. Light effect follows touch. Larger text for readability.

**Motion Brief:**
1. **Entrance (Pre-Heat):** The page loads black. Then, a subtle orange glow pulses at the edges of the hero container, simulating the pan heating up. Duration: 1.5s.
2. **Interaction (Specular Sweep):** A large, soft radial gradient (white -> transparent) follows the cursor. This gradient is blended using `mix-blend-mode: overlay` or `screen` on the hero background. This reveals the subtle noise/grain texture of the 'cast iron' surface, making it look glossy and three-dimensional.
3. **Scroll (Heat Fade):** As user scrolls past the hero, the background gradually cools (orange glow fades to dark grey). Subsequent sections are cooler, 'cooled down' aesthetics.

**Constraints Checklist:**
- [ ] The 'gloss' effect must not look like a generic white blob. It should feel like oil/light on metal.
- [ ] Contrast: Ensure text is readable against the dynamic background. Use text-shadow if necessary.
- [ ] Performance: Use CSS transforms for the light movement, not JS layout thrashing.
- [ ] No purple/blue gradients. Stick to black, grey, and warm orange.

**Acceptance Criteria:**
- The hero feels 'heavy' and substantial.
- The cursor light effect is smooth and satisfying.
- The orange accent is used sparingly, maintaining its impact.
