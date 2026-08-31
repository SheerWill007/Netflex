import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Row from '../components/Row';
import { DetailsModal, PlayerModal } from '../components/Modals';
import { fetchMoviesByType } from '../services/api';
import type { Movie } from '../types';

interface BrowseProps {
  type: 'movie' | 'series';
  title: string;
}

const Browse = ({ type, title }: BrowseProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMoviesByType(type)
      .then(setMovies)
      .catch(() => setError('Could not load titles.'))
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div className="app">
      <Navbar />
      <main className="page">
        <h2 className="page__title">{title}</h2>
        {loading && <p className="page__status">Loading…</p>}
        {error && <p className="page__status">{error}</p>}
        {!loading && !error && (
          <Row category={{ id: type, name: title, movies }} />
        )}
      </main>
      <Footer />
      <DetailsModal />
      <PlayerModal />
    </div>
  );
};

export default Browse;
