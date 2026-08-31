import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { addToWatchlist, fetchWatchlist, removeFromWatchlist } from '../services/api';
import type { Movie } from '../types';
import { useAuth } from './AuthContext';

interface WatchlistContextValue {
  items: Movie[];
  ids: Set<string>;
  loading: boolean;
  toggle: (movie: Movie) => Promise<void>;
  refresh: () => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchWatchlist();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (movie: Movie) => {
      const exists = items.some((m) => m.id === movie.id);
      if (exists) {
        await removeFromWatchlist(movie.id);
        setItems((prev) => prev.filter((m) => m.id !== movie.id));
      } else {
        await addToWatchlist(movie.id);
        setItems((prev) => [...prev, movie]);
      }
    },
    [items]
  );

  const ids = useMemo(() => new Set(items.map((m) => m.id)), [items]);

  const value = useMemo(
    () => ({ items, ids, loading, toggle, refresh }),
    [items, ids, loading, toggle, refresh]
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) {
    throw new Error('useWatchlist must be used within WatchlistProvider');
  }
  return ctx;
};
