import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { DetailsModal, PlayerModal } from '../components/Modals';
import { searchMovies } from '../services/api';
import type { Movie } from '../types';

const Search = () => {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    searchMovies(query)
      .then(setResults)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="app">
      <Navbar />
      <main className="page">
        <h2 className="page__title">Results for “{query}”</h2>
        {loading && <p className="page__status">Searching…</p>}
        {!loading && results.length === 0 && (
          <p className="page__status">No titles matched that search.</p>
        )}
        <div className="grid">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
      <Footer />
      <DetailsModal />
      <PlayerModal />
    </div>
  );
};

export default Search;
