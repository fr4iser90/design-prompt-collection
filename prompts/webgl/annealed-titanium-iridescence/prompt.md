Build a single-file HTML WebGL experience using Three.js (r150+) that visualizes the anodization of a titanium plate via thin-film interference. 

**Scene Setup:**
Create a high-fidelity studio environment. Background: #1A1A1A. Lighting: Single key directional light (white, intensity 2.0) positioned at 45 degrees elevation, casting soft shadows. Fill light: Ambient light (intensity 0.2). No environment maps (HDRI) to maintain control over the material response. 

**Geometry:**
A single, curved titanium plate. Use a PlaneGeometry with high subdivision (128x128) and displace vertices slightly to create a gentle, organic curvature (like a spoon back or a shallow dish). Material: MeshPhysicalMaterial. Base color: #8A95A5 (titanium grey). Metalness: 1.0. Roughness: 0.3 (polished but not mirror-like). 

**Shader Logic (The Core):**
Implement a custom `onBeforeCompile` hook for the MeshPhysicalMaterial. You must simulate thin-film interference based on the `thickness` uniform.
1. **Uniforms:** `uTemperature` (float, 200.0 to 600.0). 
2. **Thickness Calculation:** Map `uTemperature` to an oxide thickness `d` in nanometers. 
   - 200°C ≈ 20nm (Straw/Yellow)
   - 300°C ≈ 30nm (Purple)
   - 400°C ≈ 40nm (Blue)
   - 500°C ≈ 50nm (Green)
   - 600°C ≈ 60nm (Grey/Thick)
   Use a smoothstep function to interpolate thickness based on temperature. 
3. **Interference Formula:** In the fragment shader, calculate the phase difference `delta = (4 * PI * n * d * cos(theta_t)) / lambda`. 
   - `n` (refractive index of TiO2): ~2.4
   - `theta_t`: Refraction angle calculated via Snell's law using the view vector and normal.
   - `lambda`: The wavelength of the pixel's color (R=650nm, G=510nm, B=450nm). 
   - Calculate intensity `I = cos(delta)^2`. 
   - Multiply the base PBR color by this intensity factor to produce the iridescence. 
4. **Thermal Shimmer:** Add a subtle vertex displacement noise driven by `uTemperature` to simulate heat haze, but keep it subtle (max displacement 0.001 units). 

**UI & Interaction:**
Overlay a minimal UI using absolute positioning. 
- **Font:** DM Mono for labels/values, Source Serif 4 for title. 
- **Slider:** A custom-styled range input. Track color: #8A95A5. Thumb: #6420B0. 
- **Readout:** Display current Temperature (°C) and estimated Oxide Thickness (nm) in real-time. 
- **Layout:** Bottom-left corner. Clean, no borders, transparent background. 

**Animation:**
On load, animate the `uTemperature` from 200 to 300 over 2 seconds to demonstrate the color shift. 

**Constraints:**
- No external assets (textures/models). All procedural. 
- Ensure correct color space handling (sRGB output). 
- The iridescence must react to camera angle (Fresnel effect). 
- Do not use standard CSS gradients for the object; it must be 3D rendered.
