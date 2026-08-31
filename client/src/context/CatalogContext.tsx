import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Movie } from '../types';

interface CatalogContextValue {
  selected: Movie | null;
  playing: Movie | null;
  openDetails: (movie: Movie) => void;
  closeDetails: () => void;
  play: (movie: Movie) => void;
  stopPlay: () => void;
}

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined);

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<Movie | null>(null);
  const [playing, setPlaying] = useState<Movie | null>(null);

  const value: CatalogContextValue = {
    selected,
    playing,
    openDetails: setSelected,
    closeDetails: () => setSelected(null),
    play: (movie) => {
      setSelected(null);
      setPlaying(movie);
    },
    stopPlay: () => setPlaying(null),
  };

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export const useCatalog = () => {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalog must be used within CatalogProvider');
  }
  return ctx;
};
