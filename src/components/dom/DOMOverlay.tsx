import { useAppContext } from '../../context/AppContext';

export function DOMOverlay() {
  const { activePage, setActivePage } = useAppContext();

  if (activePage !== 'home') {
    // Post-dive layout: covers the 3D view completely.
    return (
      <div className="relative z-50 w-full h-full bg-black/90 flex flex-col items-center justify-center p-8 animate-in fade-in duration-1000">
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
      <section className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-4 pointer-events-auto">Ritoshi's Portfolio</h1>
        <p className="text-xl opacity-80 pointer-events-auto">Scroll down to explore the journey</p>
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
