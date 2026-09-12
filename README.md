# Ritoshi's 3D Portfolio - Technical Details

This project is a 3D web portfolio built specifically to leverage WebGL performance while integrating standard DOM elements.

## Tech Stack
- **Framework:** React 19 with Vite (chosen over Next.js for faster WebGL rendering and simplicity for pure client-side 3D apps).
- **Styling:** Tailwind CSS v3 (LTS).
- **3D Rendering:** `three.js` wrapper via `@react-three/fiber` and `@react-three/drei` for helpful abstractions.
- **Smooth Scrolling:** `lenis` is used for high-performance, accessible smooth scrolling that syncs with the 3D camera.
- **State Management:** React Context API (`AppContext`) to manage global states like the explosion logic (persisted in `sessionStorage`), scroll progress, and routing/active pages.
- **Animation (Optional/UI):** `framer-motion` for complex UI transitions.

## Architecture

The architecture strictly separates the 3D WebGL context from the HTML/CSS DOM logic to ensure optimal performance and z-indexing.

### Directory Structure
- `src/components/canvas/`: Contains all 3D/WebGL components. These are rendered inside the `<Canvas>` and include the environment (`Scene.tsx`), camera rig (`CameraRig.tsx`), and interactable 3D meshes/images (`Hero3D.tsx`).
- `src/components/dom/`: Contains all HTML/CSS components. `DOMOverlay.tsx` represents the scrollable transparent HTML layers that sit on top of the canvas.
- `src/context/`: Contains the global `AppContext.tsx` used to sync data (like scroll position) between the Canvas and the DOM.
- `src/styles/`: Contains `globals.css` with essential Tailwind directives and crucial rules to keep the DOM background transparent.
- `src/App.tsx`: The root component that houses the fixed background `<Canvas>` and the scrollable `<DOMOverlay>`.

## Key Technical Decisions
- **Canvas fixed background:** The `<Canvas>` is set to a fixed position with z-index 0. It spans the entire viewport.
- **Transparent DOM:** The HTML sections are made transparent (`background: transparent`) so the 3D scene is visible underneath.
- **Pointer Events:** The wrapper for the DOM overlay uses `pointer-events-none` so that clicks can pass through empty space and interact with 3D canvas objects, while specific text/buttons re-enable interactions with `pointer-events-auto`.
- **Scroll Syncing:** Lenis scroll data (0 to 1 progress) is passed to a global context, which the `CameraRig` uses inside a `useFrame` hook to lerp the camera's Y position.
