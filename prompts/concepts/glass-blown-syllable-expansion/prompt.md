# Glass Blown Syllable Expansion

**Concept**: Typography as molten glass. Words start small and opaque (cool solid). User interaction acts as a 'heat source', causing letters to expand, glow orange/red, and become transparent/refractive.

**Visual Rules**:
1.  **Base State**: Dark, void-like background. Text is small, sharp, white, and solid (crystallized).
2.  **Heat Interaction**: On hover, letters near the cursor 'heat up'. Color shifts from white -> amber -> orange -> white-hot. Scale increases via non-uniform spring physics (bulging).
3.  **Cooling**: When the cursor leaves, the 'heat' dissipates with a delay. Letters shrink back, color cools to white, and opacity returns to 100%.
4.  **Refraction**: At peak heat, letters gain a slight glass-like refraction effect on the background (if any) or internal gradient.
5.  **Layout**: Centered, large-scale hero text. Minimalist. No UI chrome.

**Deliverable**: A single HTML/CSS/JS demo using CSS filters and transforms for the expansion/glow, and a JS loop for the cooling timer. Use `filter: drop-shadow` for the glow and `transform: scale()` for the expansion.
