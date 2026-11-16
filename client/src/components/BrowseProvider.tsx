'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Episode, Movie } from '@/types';
import DetailsModal from './DetailsModal';
import Player from './Player';

const LIST_KEY = 'netflex:my-list';

interface NowPlaying {
  movie: Movie;
  episode?: Episode;
}

interface BrowseContextValue {
  myList: string[];
  isInList: (id: string) => boolean;
  toggleList: (id: string) => void;
  openDetails: (movie: Movie) => void;
  play: (movie: Movie, episode?: Episode) => void;
}

const BrowseContext = createContext<BrowseContextValue | null>(null);

export function useBrowse(): BrowseContextValue {
  const ctx = useContext(BrowseContext);
  if (!ctx) throw new Error('useBrowse must be used inside <BrowseProvider>');
  return ctx;
}

function readList(): string[] {
  try {
    const raw = window.localStorage.getItem(LIST_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export default function BrowseProvider({ children }: { children: React.ReactNode }) {
  const [myList, setMyList] = useState<string[]>([]);
  const [details, setDetails] = useState<Movie | null>(null);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

  // My List lives in this browser only (no account needed to watch).
  useEffect(() => {
    setMyList(readList());
    const sync = (e: StorageEvent) => e.key === LIST_KEY && setMyList(readList());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const toggleList = useCallback((id: string) => {
    setMyList((current) => {
      const next = current.includes(id) ? current.filter((x) => x !== id) : [id, ...current];
      try {
        window.localStorage.setItem(LIST_KEY, JSON.stringify(next));
      } catch {
        // Storage can be unavailable (private mode); the list still works for this visit.
      }
      return next;
    });
  }, []);

  const play = useCallback((movie: Movie, episode?: Episode) => {
    const chosen = episode ?? movie.episodes?.[0];
    if (!movie.source && !chosen) return;
    setDetails(null);
    setNowPlaying({ movie, episode: chosen });
  }, []);

  const value = useMemo<BrowseContextValue>(
    () => ({
      myList,
      isInList: (id) => myList.includes(id),
      toggleList,
      openDetails: setDetails,
      play,
    }),
    [myList, toggleList, play]
  );

  return (
    <BrowseContext.Provider value={value}>
      {children}
      {details && <DetailsModal movie={details} onClose={() => setDetails(null)} />}
      {nowPlaying && (
        <Player
          movie={nowPlaying.movie}
          episode={nowPlaying.episode}
          onClose={() => setNowPlaying(null)}
        />
      )}
    </BrowseContext.Provider>
  );
}
