'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Movie } from '@/types';
import { useBrowse } from '@/components/BrowseProvider';
import MovieCard from '@/components/MovieCard';
import { fetchMoviesByIds } from '@/lib/api';

export default function MyListPage() {
  const { myList } = useBrowse();
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [failed, setFailed] = useState(false);
  const key = myList.join(',');

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    fetchMoviesByIds(key ? key.split(',') : [])
      .then((result) => !cancelled && setMovies(result))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [key]);

  return (
    <>
      <header className="page-header">
        <h1>My List</h1>
        <p>Titles you&apos;ve saved on this device. Use the + button on any title to add it.</p>
      </header>

      {failed ? (
        <div className="empty-state" role="alert">
          <h2>Couldn&apos;t load your list</h2>
          <p>The catalogue isn&apos;t responding. Try again in a moment.</p>
        </div>
      ) : movies === null ? (
        <p className="loading" aria-live="polite">Loading…</p>
      ) : movies.length === 0 ? (
        <div className="empty-state">
          <h2>Your list is empty</h2>
          <p>
            Browse the <Link href="/">home page</Link> and hit + on anything you want to watch later.
          </p>
        </div>
      ) : (
        <div className="grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
