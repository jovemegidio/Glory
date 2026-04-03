import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Church } from '../types';
import { mockChurch } from '../data/mock';

interface ChurchContextType {
  church: Church;
  churches: Church[];
  switchChurch: (churchId: string) => void;
}

const mockChurches: Church[] = [
  mockChurch,
  { ...mockChurch, id: 'church-2', name: 'Glory Zona Norte', address: 'Av. Norte, 500', memberCount: 450, parentChurchId: 'church-1' },
  { ...mockChurch, id: 'church-3', name: 'Glory Zona Sul', address: 'Rua Sul, 200', memberCount: 320, parentChurchId: 'church-1' },
];

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export function ChurchProvider({ children }: { children: ReactNode }) {
  const [church, setChurch] = useState<Church>(mockChurch);

  const switchChurch = (churchId: string) => {
    const found = mockChurches.find(c => c.id === churchId);
    if (found) setChurch(found);
  };

  return (
    <ChurchContext.Provider value={{ church, churches: mockChurches, switchChurch }}>
      {children}
    </ChurchContext.Provider>
  );
}

export function useChurch() {
  const context = useContext(ChurchContext);
  if (!context) throw new Error('useChurch must be used within ChurchProvider');
  return context;
}
