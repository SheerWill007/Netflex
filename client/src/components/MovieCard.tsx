import type { Movie } from '../types';
import { useCatalog } from '../context/CatalogContext';
import { useWatchlist } from '../context/WatchlistContext';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { openDetails, play } = useCatalog();
  const { ids, pendingIds, toggle } = useWatchlist();
  const inList = ids.has(movie.id);

  const thumbStyle = {
    backgroundImage: `url('${movie.imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="card" onClick={() => openDetails(movie)}>
      <div className="card__thumb" style={thumbStyle}>
        <span className="card__label">{movie.title}</span>
      </div>
      <div className="card__overlay">
        <p className="card__overlay-title">{movie.title}</p>
        <div className="card__overlay-actions">
          <button
            className="mini-btn mini-btn--play"
            aria-label="Play"
            onClick={(e) => {
              e.stopPropagation();
              play(movie);
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M6 4l14 8-14 8V4z" fill="currentColor" />
            </svg>
          </button>
          <button
            className="mini-btn"
            aria-label={inList ? 'Remove from list' : 'Add to list'}
            disabled={pendingIds.has(movie.id)}
            onClick={(e) => {
              e.stopPropagation();
              void toggle(movie);
            }}
          >
            {inList ? (
              <svg viewBox="0 0 24 24">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="card__overlay-meta">
          <span className="match">{movie.rating}% Match</span>
          {movie.isHD && <span className="hd">HD</span>}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
