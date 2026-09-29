# Emulsion Breakpoint Visualizer

Create a interactive simulation of sauce emulsification (e.g., Hollandaise or Vinaigrette).

**Visuals:**
- Center: A dark bowl containing a swirling mixture.
- Particles: Oil droplets (Gold #D4AF37) and Water/Vinegar droplets (Translucent White #F5F5F0).
- State: 
  - 'Emulsified': Droplets are microscopic and evenly distributed, creating a creamy, opaque yellow-green texture (#8C9E7A).
  - 'Broken': Droplets merge into large spheres, separating into distinct layers (Oil on top, Vinegar on bottom).
- Controls: Sliders for 'Agitation Speed' (RPM) and 'Fat Ratio'.

**Motion:**
- Idle: Slow swirl of the emulsion.
- Interaction: Changing sliders changes the viscosity and particle size in real-time. 
- Breaking: If agitation is too low for the fat ratio, particles rapidly coalesce, and the mixture separates.
