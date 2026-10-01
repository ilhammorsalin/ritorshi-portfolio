import { useEffect, useRef } from 'react';
import { scrollStore } from '../../lib/scrollStore';

// Layer 0: Black base + distorted radial gradients composited together.
// Scrolls at same speed as the stars/camera (Layer 1) — no lag.
const BACKGROUND = `
    radial-gradient(ellipse 92% 78% at 18% 18%, rgba(36, 16, 72, 0.95) 0%, rgba(26, 11, 46, 0.81) 22%, rgba(38, 18, 78, 0.40) 48%, rgba(18, 8, 38, 0.17) 64%, transparent 74%),
    radial-gradient(ellipse 76% 62% at 84% 16%, rgba(58, 31, 107, 0.42) 0%, rgba(42, 20, 80, 0.31) 28%, rgba(26, 11, 46, 0.17) 54%, transparent 72%),
    radial-gradient(ellipse 86% 52% at 48% 52%, rgba(45, 22, 88, 0.30) 0%, rgba(30, 15, 58, 0.26) 26%, rgba(18, 10, 36, 0.14) 56%, transparent 74%),
    radial-gradient(ellipse 108% 68% at 50% 104%, rgba(12, 6, 28, 0.85) 0%, rgba(22, 10, 44, 0.51) 26%, rgba(26, 11, 46, 0.24) 46%, transparent 72%),
    radial-gradient(ellipse 130% 55% at 50% 100%, rgba(0,0,0,0.88) 0%, transparent 60%),
    radial-gradient(ellipse 130% 45% at 50% 0%, rgba(0,0,0,0.42) 0%, transparent 58%),
    #000000
  `;

export function ScrollReactiveBackground() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lerp exactly like CameraRig (0.05) so gradients stay visually locked 1:1
    // with the camera. Written straight to the DOM node — React never re-renders
    // during scroll.
    let rafId = 0;
    let current = 0;

    const tick = () => {
      const target = scrollStore.progress;
      current += (target - current) * 0.05;
      if (Math.abs(current - target) < 0.0005) current = target;

      if (gradientRef.current) {
        gradientRef.current.style.transform = `translate3d(0, ${-current * 45}vh, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <div
        ref={gradientRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: BACKGROUND,
          backgroundColor: '#000000',
          willChange: 'transform',
          // Extend height to avoid gaps when translated -45vh at scroll 1
          height: '190vh',
          top: '-45vh',
        }}
        aria-hidden
      />
      {/* Grain stays fixed - not scrolling with gradients */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
    </>
  );
}
