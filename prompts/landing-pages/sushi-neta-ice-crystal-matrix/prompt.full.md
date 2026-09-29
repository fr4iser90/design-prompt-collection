# Sushi Neta Ice Crystal Matrix — Extended Brief

**Concept:**
'Tsuru Cold Chain' sells to high-end Omakase chefs. Their value proposition is *preservation integrity*. The design must communicate that the fish is not just 'fresh' but scientifically preserved at optimal temperatures. The aesthetic is 'Deep Sea Luxury'—dark, cold, and crystalline.

**Art Direction:**
- **Atmosphere:** Dark mode by default. The screen feels like looking into a deep tank or a vacuum-sealed chamber.
- **Materiality:** Glass, ice, and water. UI elements have a 'frosted glass' backdrop-blur effect (8px blur, white border opacity 0.1). The fish images are the only source of warm color, making them pop against the cold blue/black background.
- **Lighting:** Sharp, directional specular highlights on the 'ice' facets to create sparkle and depth.

**Typography:**
- **Display:** 'Helvetica Now Display' or 'Neue Haas Grotesk'. Extremely tight tracking for large headlines, wide tracking for subheaders.
- **Body:** 'Inter' or 'San Francisco'. Light weight (300 or 400) to maintain the 'airy' feel of ice.

**Layout:**
- **Desktop:** Central focus. A large, circular or diamond-shaped container holds the fish/ice visual. Navigation is a thin, translucent bar at the top. Product details appear in a side panel that slides in from the right on interaction.
- **Mobile:** Full-screen image. Swipe up to reveal the 'cracked ice' animation and product details.

**Motion Brief:**
1.  **Entrance:** The ice crystals form rapidly from the center outwards (scale up + opacity).
2.  **Ambient:** A slow, pulsing glow behind the fish slice, simulating a heartbeat or bioluminescence. The ice facets catch light slowly as the user scrolls.
3.  **Interaction:** Hovering over a product card causes the 'ice' to fracture along geometric lines, revealing the product image fully. Clicking triggers a 'freeze' effect where the screen briefly desaturates before reloading the detail view.

**Constraints Checklist:**
- [ ] No 'rustic' or 'traditional' Japanese imagery.
- [ ] Use of `backdrop-filter` for glass effects must be performant.
- [ ] Text must be legible against the dark blue background (WCAG AA).
- [ ] Avoid purple glows; stick to cyan/blue hues.

**Acceptance Criteria:**
The user feels the 'cold' of the product. The interface feels sharp, brittle, and precise, mirroring the knife work of a sushi chef.
