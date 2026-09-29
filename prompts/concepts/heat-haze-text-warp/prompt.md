# Heat Haze Text Warp

Create a kinetic typography concept where text appears to shimmer and distort due to intense heat and air refraction.

**Visual Rules:**
- **Background:** A flat, sun-bleached bone color (`#FFFDF7`). No gradients, just pure light.
- **Typography:** Large, bold sans-serif text in a muted clay tone (`#B8A995`). The text is static in position but dynamic in shape.
- **Distortion:** Apply an SVG `feTurbulence` and `feDisplacementMap` filter to the text. Animate the `baseFrequency` or `seed` of the turbulence to create a rising heat wave effect.
- **Clarity:** When the user holds their mouse still, the heat haze settles, and the text becomes sharp. Moving the cursor 'stirs' the air, increasing the distortion.

**Deliverable:** An HTML/SVG file with animated displacement filters on text.
