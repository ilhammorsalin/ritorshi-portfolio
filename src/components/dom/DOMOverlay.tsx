import { useAppContext } from '../../context/AppContext';
import { useState, useEffect, useRef } from 'react';

export function DOMOverlay() {
  const { activePage, setActivePage, hasExploded } = useAppContext();
  const [titleLanded, setTitleLanded] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // After explosion, title slides in from left over ~1.5s, then subtitle fades in
  useEffect(() => {
    if (hasExploded && !titleLanded) {
      // Small delay so explosion particles clear
      const titleTimer = setTimeout(() => {
        setTitleLanded(true);
      }, 200);
      return () => clearTimeout(titleTimer);
    }
  }, [hasExploded, titleLanded]);

  useEffect(() => {
    if (titleLanded && !showSubtitle) {
      // Subtitle appears ~1.5s after title starts sliding (title slide ~1s + settle ~0.5s)
      const subtitleTimer = setTimeout(() => {
        setShowSubtitle(true);
      }, 1500);
      return () => clearTimeout(subtitleTimer);
    }
  }, [titleLanded, showSubtitle]);

  // Gentle floating animation for title and subtitle via CSS transforms
  useEffect(() => {
    if (!titleLanded) return;

    let frameId: number;
    const startTime = performance.now();

    function animate(now: number) {
      const t = (now - startTime) / 1000;

      if (titleRef.current) {
        const floatX = Math.sin(t * 0.4 * Math.PI * 2 + 0.5) * 4;
        const floatY = Math.sin(t * 0.3 * Math.PI * 2 + 1.2) * 3;
        titleRef.current.style.transform = `translate(${floatX}px, ${floatY}px)`;
      }

      if (subtitleRef.current && showSubtitle) {
        const floatX = Math.sin(t * 0.35 * Math.PI * 2 + 2.0) * 3;
        const floatY = Math.sin(t * 0.28 * Math.PI * 2 + 0.8) * 2.5;
        subtitleRef.current.style.transform = `translate(${floatX}px, ${floatY}px)`;
      }

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [titleLanded, showSubtitle]);

  if (activePage !== 'home') {
    // Post-dive layout: covers the 3D view completely.
    return (
      <div className="relative z-50 w-full h-full bg-[#1a0b2e]/95 flex flex-col items-center justify-center p-8">
        <button 
          className="absolute top-8 left-8 px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
          onClick={() => setActivePage('home')}
        >
          ← Back to Hub
        </button>
        <h1 className="text-5xl font-bold mb-6 capitalize text-white">
          {activePage.replace('-', ' ')}
        </h1>
        <div className="max-w-3xl text-center text-lg opacity-90 text-white">
          <p>
            Welcome to the {activePage.replace('-', ' ')} section! Here is where we will display your specific works, 
            embedded videos, and image galleries.
          </p>
        </div>
      </div>
    );
  }

  return (
    // pointer-events-none allows clicking 3D objects underneath!
    <div className="relative z-10 w-full pointer-events-none">
      
      {/* Section 1: Hero (100vh) */}
      <section className="h-screen flex flex-col items-center justify-start pt-[8vh] text-center">
        {/* Title: slides in from left after explosion */}
        <h1
          className={`pointer-events-auto transition-all duration-[1200ms] ease-out mb-2 ${
            titleLanded
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-[100vw]'
          }`}
        >
          <div ref={titleRef} className="will-change-transform flex justify-center">
            <img
              src="/hero-text.png"
              alt="Ritoshi's Portfolio"
              className="w-[85vw] max-w-[420px] sm:max-w-[500px] md:max-w-[580px] lg:max-w-[650px] h-auto object-contain select-none pointer-events-none drop-shadow-md"
              draggable={false}
            />
          </div>
        </h1>

        {/* Subtitle: fades in after title lands */}
        <div
          className={`pointer-events-auto transition-all duration-[800ms] ease-out ${
            showSubtitle
              ? 'opacity-80 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl will-change-transform"
          >
            Scroll down to explore the journey
          </p>
        </div>
      </section>

      {/* Section 2: Intro (100vh) */}
      <section className="h-screen flex items-center justify-center">
        <div className="max-w-2xl pointer-events-auto bg-black/40 p-8 rounded-lg backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-4">Here's Why I Am The Main Character</h2>
          <p>Comic-style backstory text and software skill badges go here...</p>
        </div>
      </section>

      {/* Section 3: Testimonials (100vh) */}
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold pointer-events-auto">Client Testimonials (CRT Monitor)</h2>
      </section>

      {/* Section 4: Contact (100vh) */}
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold pointer-events-auto">Contact Me (Submarine Porthole)</h2>
      </section>
      
      {/* Extra space to allow scrolling past the last section */}
      <section className="h-screen"></section>
    </div>
  );
}
