# Chime Resonance Brand — Extended

## Concept
Chime is a sonic branding studio. The website itself is an instrument. The core concept is 'Typography as Frequency'. The main hero section features the brand name in a custom, heavy sans-serif. As the user scrolls or moves their cursor, the letters do not just move; they vibrate at different frequencies, creating a visual representation of sound waves. The background is deep black, allowing the white type and red accent lines to pop.

## Palette
- **Deep Void**: #1a1a1a (Background)
- **Pure Signal**: #f0f0f0 (Primary Type)
- **Resonance Red**: #e63946 (Active State/Accents)

## Type Pairing
- **Display**: A custom, geometric sans-serif with rounded terminals (similar to Futura or Century Gothic but customized). Extremely large viewport height (10vw+).
- **Body**: Inter Tight or a similar high-x-height sans for readability, kept small and secondary.

## Layout
- **Desktop**: Full-viewport hero. The word 'CHIME' is centered, breaking the container edges slightly. Below, a simple nav with 'Work', 'About', 'Contact' in small caps.
- **Mobile**: Stacked layout. The wordmark is rotated 90 degrees or stacked vertically to fit the viewport width.

## Motion Brief
1. **Entrance**: Letters 'drop' into place with a slight spring overshoot, accompanied by a subtle audio ping (if enabled).
2. **Ambient**: A low-frequency hum visualized by faint, pulsing rings around the 'O' or 'E' characters.
3. **Interaction**: On hover, a specific letter expands its 'waveform' lines (thin red strokes) and distorts slightly, as if being plucked. The cursor should feel magnetic near the letter centers.

## Constraints Checklist
- [ ] No purple gradients or glassmorphism.
- [ ] Type must remain legible during motion.
- [ ] Performance: Use CSS transforms and SVG filters sparingly.
- [ ] Accessibility: Respect `prefers-reduced-motion` by stopping vibrations but keeping the static hierarchy.

## Acceptance Criteria
- The hero feels alive and responsive to user input.
- The brand identity 'Chime' is immediately understood as audio-related through visual metaphors alone.
- Clean, high-contrast aesthetic.
