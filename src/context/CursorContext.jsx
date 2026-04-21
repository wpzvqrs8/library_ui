import { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext(null);

// cursor hint values: 'default' | 'book' | 'cta' | 'text'
export function CursorProvider({ children }) {
  const [cursorHint, setCursorHintState] = useState('default');

  const setCursorHint = useCallback((hint) => {
    setCursorHintState(hint);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorHint, setCursorHint }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used within CursorProvider');
  return ctx;
}
