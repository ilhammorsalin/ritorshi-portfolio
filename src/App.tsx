import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Scene1 from './scenes/Scene1';
import JournalView from './scenes/JournalView';

function App() {
  const [appState, setAppState] = useState<'intro' | 'journal'>('intro');

  return (
    <div className="w-full h-full relative bg-[#000035] overflow-hidden">
      <AnimatePresence mode="wait">
        {appState === 'intro' && (
          <motion.div
            key="scene1"
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Scene1 onJournalClick={() => setAppState('journal')} />
          </motion.div>
        )}
        {appState === 'journal' && (
          <motion.div
            key="journal"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <JournalView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;