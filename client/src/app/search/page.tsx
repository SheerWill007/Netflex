import MovieCard from '@/components/MovieCard';
import ApiError from '@/components/ApiError';
import { searchMovies } from '@/lib/api';

export const metadata = { title: 'Search — Netflex' };

export default async function SearchPage({ searchParams }: { searchParams: { q?: string | string[] } }) {
  const raw = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const query = raw?.trim() ?? '';

  if (!query) {
    return (
      <header className="page-header">
        <h1>Search</h1>
        <p>Type a title, genre or decade in the search box above.</p>
      </header>
    );
  }

  const results = await searchMovies(query).catch(() => null);
  if (!results) return <ApiError />;

  return (
    <>
      <header className="page-header">
        <h1>
          Results for <span className="page-header__query">&ldquo;{query}&rdquo;</span>
        </h1>
        <p>{results.length === 1 ? '1 title' : `${results.length} titles`}</p>
      </header>
      {results.length ? (
        <div className="grid">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nothing matched</h2>
          <p>Try a genre like &ldquo;horror&rdquo;, &ldquo;noir&rdquo; or &ldquo;western&rdquo;.</p>
        </div>
      )}
    </>
  );
}
