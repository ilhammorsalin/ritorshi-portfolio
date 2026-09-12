# Ritoshi's 3D Portfolio - Design Specs

## Overview
A visually immersive 3D web portfolio featuring smooth scrolling and 2.5D interactable elements that serve as gateways to different sections of the portfolio.

## Scene and Environment
- The background is a fixed 3D canvas rendering a dark space environment with stars.
- A smooth scrolling HTML overlay sits on top, allowing text content to flow seamlessly while interacting with the 3D background.

## Core Interactions
- **Initial Explosion:** A 2.5s explosion particle effect introduces the scene before settling into debris and the main interaction icons.
- **Scroll Sync:** Scrolling vertically moves the 3D camera along the Y-axis to traverse the scene.
- **The "Dive" Transition:** Clicking on a 3D icon triggers a transition where the camera dives forward (Z-axis) into the object, scaling the object to fill the screen and revealing the specific section's content.

## 2.5D Icons and Assets
Assets are represented as transparent PNG planes in 3D space:
- **Sketchbook:** Link to "Graphic Design"
- **TV:** Link to "Animations"
- **Camera:** Link to "Cinematography"

## Page Sections
1. **Hero (Section 1):** Title "Ritoshi's Portfolio" and prompt to "Scroll down to explore the journey".
2. **Intro (Section 2 - "Here's Why I Am The Main Character"):** Comic-style backstory text and software skill badges.
3. **Testimonials (Section 3):** Client Testimonials featured around a CRT Monitor asset.
4. **Contact (Section 4):** Contact information featured around a Submarine Porthole asset.
