import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AppContextType {
  hasExploded: boolean;
  setHasExploded: (val: boolean) => void;
  scrollProgress: number;
  setScrollProgress: (val: number) => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Check sessionStorage on initial load
  const [hasExploded, setHasExploded] = useState(() => {
    return sessionStorage.getItem('ritoshi_exploded') === 'true';
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    if (hasExploded) {
      sessionStorage.setItem('ritoshi_exploded', 'true');
    }
  }, [hasExploded]);

  return (
    <AppContext.Provider value={{ hasExploded, setHasExploded, scrollProgress, setScrollProgress, activePage, setActivePage }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
