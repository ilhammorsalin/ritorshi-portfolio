import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AppContextType {
  hasExploded: boolean;
  setHasExploded: (val: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Check sessionStorage on initial load
  const [hasExploded, setHasExploded] = useState(() => {
    return sessionStorage.getItem('ritoshi_exploded') === 'true';
  });
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    if (hasExploded) {
      sessionStorage.setItem('ritoshi_exploded', 'true');
    }
  }, [hasExploded]);

  // Note: scrollProgress intentionally lives in the module-level scroll store
  // (src/lib/scrollStore.ts), NOT in React state. Updating context on every
  // scroll frame re-rendered the entire tree ~60x/sec and caused scroll jank.
  return (
    <AppContext.Provider value={{ hasExploded, setHasExploded, activePage, setActivePage }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
