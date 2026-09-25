# Ritoshi's 3D Portfolio - Design Specs

## Overview
A visually immersive 3D web portfolio featuring smooth scrolling and 2.5D interactable elements that serve as gateways to different sections of the portfolio.

## Scene and Environment
- The background is a fixed 3D canvas rendering a dark space environment with stars.
- A smooth scrolling HTML overlay sits on top, allowing text content to flow seamlessly while interacting with the 3D background.

## Hero Section — Load Sequence

### Phase 1: Explosion (0–2.5s)
- On first visit (no `sessionStorage` flag), a **comic-book style explosion** plays.
- The explosion is centered on the **left edge** of the screen — only the right half of the burst is visible on-screen.
- Particle shapes: a mix of flat-colored **squares, triangles, and circles** (like a comic "BOOM" panel).
- Colors: yellow, red, white, cyan, orange.
- Particles shoot outward to the right, shrinking and fading over 2.5 seconds.
- **Nothing else is visible** during this phase — no title, no icons.

### Phase 2: Icon Wobble-in (2.5s–4.5s)
- All 3 icons (Sketchbook, TV, Camera) spawn at the explosion origin point (left edge).
- They **simultaneously wobble outward** to their final asymmetrical resting positions near the bottom of the screen:
  - Sketchbook: `[-3.8, -2.8]` with `-8°` tilt
  - TV: `[0.3, -3.3]` with `+5°` tilt
  - Camera: `[3.7, -2.5]` with `-10°` tilt
- The travel motion has an **ease-out cubic** feel with a subtle sinusoidal wobble overlay, easing in their tilt angles as they settle.
- Duration: ~2 seconds.

### Phase 3: Idle Floating (continuous)
- Once in position, each icon **continuously bobs gently** in place at the bottom of the screen — like zero-gravity floating.
- Each icon has independent, randomized sine-wave motion:
  - Amplitude: ±0.1 to ±0.3 units
  - Cycle: ~3–4 seconds
  - Different phase offsets so they don't move in sync.

### Title & Subtitle (DOM Layer)
- **Title ("Ritoshi's Portfolio")**: Hidden during explosion. After explosion ends, it **slides in from the far left** (off-screen) to the **upper portion** of the hero viewport over ~1.2s (ease-out). Then it gently floats in place with its own slow sine-wave motion.
- **Subtitle ("Scroll down to explore the journey")**: Fades in ~1.5s after the title starts moving. Also gently floats independently.
- Title is positioned **above the 3 icons** (top of hero area), not overlapping them.

### Returning Visitors
- If `sessionStorage` flag `ritoshi_exploded` is set, the explosion is skipped. Icons appear immediately and begin floating. Title/subtitle also appear immediately.

## Core Interactions
- **Scroll Sync:** Scrolling vertically moves the 3D camera along the Y-axis to traverse the scene.
- **The "Dive" Transition:** Clicking on a 3D icon triggers a camera zoom (Z-axis) toward the clicked object. Once zoomed, a full-screen HTML overlay covers the 3D view with the section's content and a "← Back to Hub" button to reverse the dive.

## 2.5D Icons and Assets
Assets are represented as transparent PNG planes in 3D space:
- **Sketchbook:** Link to "Graphic Design"
- **TV:** Link to "Animations"
- **Camera:** Link to "Cinematography"

## Page Sections
1. **Hero (Section 1):** Title, subtitle, and 3 interactive 3D icons.
2. **Intro (Section 2 - "Here's Why I Am The Main Character"):** Comic-style backstory text and software skill badges.
3. **Testimonials (Section 3):** Client Testimonials featured around a CRT Monitor asset.
4. **Contact (Section 4):** Contact information featured around a Submarine Porthole asset.
