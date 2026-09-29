# Broadsheet Column Cascade — Extended

**Concept:**
Reviving the authority and density of print journalism. The design prioritizes readability and information density, using the classic newspaper grid to organize content efficiently.

**Art Direction:**
- **Palette:** Monochromatic with a single accent color (red) for urgency. The background should feel like slightly aged newsprint.
- **Typography:** A mix of classic serif and sans-serif. Headlines are bold and condensed. Body text is small and tightly leading to fit more words per line.
- **Imagery:** Black and white photos, often cropped tightly. Captions are small and italicized.

**Layout:**
- **Hero:** A massive headline spanning multiple columns, with a sub-headline and byline. 
- **Content Grid:** A strict multi-column grid. Articles are stacked vertically within columns. 
- **Sidebar:** A narrow column on the right for 'Opinion', 'Weather', or 'Stocks'.

**Motion Brief:**
- **Ticker:** A continuous, smooth scroll of latest headlines at the top of the viewport.
- **Scroll:** As the user scrolls, new 'stories' slide up from the bottom into their designated columns.
- **Interaction:** Clicking a headline expands the article in-place or slides a panel out from the side, maintaining the column structure.

**Technical Notes:**
- Use CSS `column-count` for multi-column text.
- Use `text-align: justify` for body copy.
- Ensure responsiveness by collapsing columns into a single stack on mobile.
