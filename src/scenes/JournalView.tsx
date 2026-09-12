import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'Animation' | 'Graphic Design & Cinematography' | 'Testimonials' | 'About Me';

const tabs: Tab[] = [
  'Animation',
  'Graphic Design & Cinematography',
  'Testimonials',
  'About Me',
];

const JournalView = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Animation');

  const renderContent = () => {
    switch (activeTab) {
      case 'Animation':
        return (
          <div className="flex flex-col h-full justify-center">
            <h2 className="text-3xl font-bold mb-6 text-[#5c3a21] border-b-2 border-[#5c3a21]/30 pb-2">Animation Projects</h2>
            <p className="text-[#3e2723] text-lg leading-relaxed italic">
              Sketches and notes from various animation sequences. The movement here is crucial. 
              (Content placeholder)
            </p>
          </div>
        );
      case 'Graphic Design & Cinematography':
        return (
          <div className="flex flex-col h-full justify-center">
            <h2 className="text-3xl font-bold mb-6 text-[#5c3a21] border-b-2 border-[#5c3a21]/30 pb-2">Visuals & Framing</h2>
            <p className="text-[#3e2723] text-lg leading-relaxed italic">
              Studying the light. How to compose the shot. Colors must evoke the right emotion.
              (Content placeholder)
            </p>
          </div>
        );
      case 'Testimonials':
        return (
          <div className="flex flex-col h-full justify-center">
            <h2 className="text-3xl font-bold mb-6 text-[#5c3a21] border-b-2 border-[#5c3a21]/30 pb-2">Words from Others</h2>
            <p className="text-[#3e2723] text-lg leading-relaxed italic">
              "A brilliant mind." - Survivor 1
              <br/><br/>
              "Their designs saved us." - Survivor 2
            </p>
          </div>
        );
      case 'About Me':
        return (
          <div className="flex flex-col h-full justify-center">
            <h2 className="text-3xl font-bold mb-6 text-[#5c3a21] border-b-2 border-[#5c3a21]/30 pb-2">Log Entry: Who am I?</h2>
            <p className="text-[#3e2723] text-lg leading-relaxed italic">
              Name: Ilham Morsalin. 
              <br/>
              Status: Surviving, creating.
              <br/><br/>
              This journal holds everything I know.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto bg-black/60 p-4 sm:p-8 backdrop-blur-sm">
      
      {/* The Journal Container */}
      <div className="relative w-[95vw] max-w-5xl h-[85vh] flex drop-shadow-2xl font-serif">
        
        {/* Left Page */}
        <div className="w-1/2 h-full bg-[#f4e4bc] rounded-l-md border-r border-[#d9c59c] shadow-[inset_-5px_0_15px_rgba(0,0,0,0.1),_inset_10px_0_20px_rgba(0,0,0,0.1)] p-8 sm:p-12 overflow-y-auto relative z-10">
           {/* Paper texture overlay */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0wIDBMMCA0TTQgMEw0IDRNMCAwTDQgME0wIDRMNCBNIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMC4wNSIvPgo8L3N2Zz4=')` }}></div>
           
           <h1 className="text-4xl sm:text-5xl font-extrabold text-[#3e2723] mb-8 opacity-80 tracking-wider transform -rotate-1">LOGBOOK</h1>
           <div className="text-[#5c3a21]/80 text-lg space-y-4 font-mono">
             <p>Entry: Unknown</p>
             <p>Location: Crash Site</p>
             <div className="w-full h-px bg-[#5c3a21]/20 my-4"></div>
             <p className="italic">Select a bookmark to read the corresponding entries.</p>
           </div>
        </div>

        {/* Center Spine Divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-20"></div>

        {/* Right Page (Content) */}
        <div className="w-1/2 h-full bg-[#f4e4bc] rounded-r-md shadow-[inset_5px_0_15px_rgba(0,0,0,0.1),_inset_-10px_0_20px_rgba(0,0,0,0.1)] p-8 sm:p-12 overflow-y-auto relative z-10">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxwYXRoIGQ9Ik0wIDBMMCA0TTQgMEw0IDRNMCAwTDQgME0wIDRMNCBNIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMC4wNSIvPgo8L3N2Zz4=')` }}></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full relative z-10"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bookmarks (Tabs) - Protruding from Right Edge */}
        <div className="absolute right-0 top-12 bottom-12 flex flex-col gap-6 justify-center z-0" style={{ transform: 'translateX(95%)' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative px-6 py-4 rounded-r-md text-left font-bold transition-all duration-300 shadow-md
                  ${isActive 
                    ? 'bg-[#8b4513] text-[#f4e4bc] w-48 shadow-[5px_5px_15px_rgba(0,0,0,0.4)]' 
                    : 'bg-[#a0522d] text-[#f4e4bc]/80 hover:bg-[#8b4513] w-40 hover:w-44 shadow-[2px_2px_10px_rgba(0,0,0,0.3)]'}
                  border-y-2 border-r-2 border-[#3e2723]/40
                `}
                style={{
                  clipPath: 'polygon(0 0, 95% 5%, 100% 50%, 95% 95%, 0 100%)',
                }}
              >
                <div className="text-sm drop-shadow-md pr-2">
                  {tab}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default JournalView;
