import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { AppProvider, useAppContext } from './context/AppContext';
import { Scene } from './components/canvas/Scene';
import { DOMOverlay } from './components/dom/DOMOverlay';
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
      {/* Fixed 3D Background */}
      <Canvas
        className="!fixed inset-0 z-0"
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>

      {/* Scrollable HTML Overlay */}
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
