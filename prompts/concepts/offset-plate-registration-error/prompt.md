# Offset Plate Registration Error

Build a typographic experience based on offset lithography registration. The background is a warm, textured paper stock (#F5F5F0). The main headline is split into four distinct color channels: Cyan, Magenta, Yellow, and Key (Black).

**Visual Rules:**
1. **Layering:** Each letter is composed of 4 overlapping divs or SVG paths, one for each CMYK color.
2. **Misalignment:** On page load or initial state, the C, M, and Y plates are slightly offset (e.g., 2-4px in random directions) from the K plate, creating a 'ghosting' or 'vibration' effect typical of poor registration.
3. **Interaction:** As the user scrolls or hovers, the C, M, and Y plates smoothly slide into perfect alignment with the K plate. The blend mode should be 'multiply' to create true subtractive color mixing (e.g., C+M=Blue).
4. **Ink Texture:** Add a subtle 'dot gain' noise texture over the final aligned text to simulate ink absorption into paper.

**Deliverable:** A single-section hero component demonstrating the shift from chaotic misregistration to precise alignment.
