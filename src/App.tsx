import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { AppProvider } from './context/AppContext';
import { StarsScene } from './components/canvas/StarsScene';
import { HeroScene } from './components/canvas/HeroScene';
import { DOMOverlay } from './components/dom/DOMOverlay';
import { ScrollReactiveBackground } from './components/dom/ScrollReactiveBackground';
import { scrollStore } from './lib/scrollStore';
import './styles/globals.css';

function AppContent() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // We drive lenis.raf() ourselves from a single loop below
      autoRaf: false,
    });
    lenisRef.current = lenis;

    // Publish scroll progress to the module store (no React re-renders).
    // Camera and background read this inside their own frame loops.
    lenis.on('scroll', (e: Lenis) => {
      scrollStore.progress = e.progress;
    });

    // Single rAF loop driving Lenis. The R3F canvas keeps its own frameloop,
    // but no React state updates happen during scroll anymore.
    let rafId = 0;
    function loop(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black">
      {/* Layer 0: BG + radial gradients composited together (black base + soft distorted radials) */}
      <ScrollReactiveBackground />

      {/* Single shared WebGL context: stars + hero in ONE canvas.
          Was two stacked canvases = 2 GL contexts, 2 render passes, double GPU/compositor cost. */}
      <Canvas
        className="!fixed inset-0 z-[1]"
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <StarsScene />
        <HeroScene />
      </Canvas>

      {/* DOM Overlay */}
      <DOMOverlay />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
