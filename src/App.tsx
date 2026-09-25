import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { AppProvider, useAppContext } from './context/AppContext';
import { StarsScene } from './components/canvas/StarsScene';
import { HeroScene } from './components/canvas/HeroScene';
import { DOMOverlay } from './components/dom/DOMOverlay';
import { ScrollReactiveBackground } from './components/dom/ScrollReactiveBackground';
import './styles/globals.css';

function AppContent() {
  const { setScrollProgress } = useAppContext();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    // Hook Lenis scroll data to our React Context
    lenis.on('scroll', (e: any) => {
      setScrollProgress(e.progress); // 0 to 1
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => { lenis.destroy(); };
  }, [setScrollProgress]);

  return (
    <div className="relative w-full h-full bg-black">
      {/* Layer 0: BG + radial gradients composited together (black base + soft distorted radials) */}
      <ScrollReactiveBackground />

      {/* Layer 1: Stars - blinking stars above Layer 0, no shaders covering it */}
      <Canvas
        className="!fixed inset-0 z-[1] pointer-events-none"
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <StarsScene />
      </Canvas>

      {/* Layer 2: Interactive 3D (Hero / Explosion shaders) - above stars, transparent so both Layer 0 & 1 show through */}
      <Canvas
        className="!fixed inset-0 z-[2]"
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
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
