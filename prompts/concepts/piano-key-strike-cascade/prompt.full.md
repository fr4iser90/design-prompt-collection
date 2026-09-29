# Piano Key Strike Cascade — Extended

## Concept
Visualizing language as rhythm. In this kinetic type study, letters are not printed; they are played. Each character is a mechanical key that responds to an internal 'music' of the sentence. The motion is percussive, sharp, and precise, emphasizing the staccato nature of modern communication.

## Palette
-   **Case**: `#1a1a1a` (Deep charcoal, background/frame)
-   **Keys**: `#f5f5f5` (Off-white, clean, matte)
-   **Accent**: `#d4af37` (Gold, representing the hammer strike/energy)
-   **Text**: `#1a1a1a` (Dark text on white keys)

## Typography
-   **Font**: A clean, geometric sans-serif with uniform stroke width (e.g., *Helvetica Neue* or *Futura*). The font should look like it could be engraved on a piano key.
-   **Letter Spacing**: Tight, to mimic the compactness of a keyboard.

## Layout
-   **Desktop**: Horizontal row of letters. Perspective view from slightly above.
-   **Mobile**: Wrapped rows, maintaining the key-like aspect ratio.

## Motion Brief
1.  **Entrance**: No entrance; keys are present but text is hidden.
2.  **Interaction (Strike)**:
    -   On trigger (scroll or auto-play), the letter's `translateY` goes from 0 to 10px.
    -   `rotateX` goes from 0deg to 5deg (front edge dips).
    -   Duration: 100ms down, 300ms spring back up.
    -   Gold underline `box-shadow` flashes at impact.
3.  **Ambient**: Idle keys have a very subtle, slow breathing animation (opacity 0.95-1.0) to feel 'alive'.

## Constraints
-   Motion must feel heavy and mechanical, not floaty.
-   Use `transform-style: preserve-3d` for realistic depth.
-   Sound is optional but visual rhythm must be clear.

## Acceptance Criteria
-   The 'strike' feels impactful and percussive.
-   Recoil physics feel natural (overshoot then settle).
-   High contrast between the dark case and bright keys.
