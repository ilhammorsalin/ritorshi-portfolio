import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Scene1 from './scenes/Scene1';

function App() {
  const [appState, setAppState] = useState<'intro' | 'journal'>('intro');

  return (
    <div className="w-full h-full relative bg-[#000035]">
      <AnimatePresence mode="wait">
        {appState === 'intro' ? (
          <motion.div
            key="scene1"
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Scene1 onJournalClick={() => setAppState('journal')} />
          </motion.div>
        ) : (
          <motion.div
            key="scene2-placeholder"
            className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white text-3xl">Scene 2 Ready</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;