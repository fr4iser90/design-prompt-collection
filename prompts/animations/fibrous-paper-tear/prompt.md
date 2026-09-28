# Fibrous Paper Tear

Animate a thick, textured paper sheet tearing vertically or horizontally. Focus on the *fibers* stretching and snapping, not just a clean cut.

**Visuals:**
- Top Layer: Heavy cotton paper (#F9F7F2), visible grain/fibers.
- Bottom Layer: Darker, contrasting material (#2B2B2B) or a different paper tone (#8C8272).
- The Tear: Ragged, irregular edge. Visible white fibers stretching between the two separating halves before snapping.
- Shadow: Real-time drop shadow on the separating halves to indicate thickness/depth.

**Motion:**
- Trigger: Scroll or click.
- Action: The tear starts small, then propagates. The halves separate slowly, with a slight 'pull' or resistance feeling.
- Fiber Snap: Micro-animation of fibers stretching and breaking (can be faked with sprite sheets or shader noise).

**Tech:**
- CSS `clip-path` animation for the mask.
- SVG or Canvas overlay for the fibrous edge detail.
- CSS `box-shadow` for depth.
