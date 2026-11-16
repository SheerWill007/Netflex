'use client';

import type { Movie } from '@/types';
import { useBrowse } from './BrowseProvider';
import { CheckIcon, InfoIcon, PlayIcon, PlusIcon } from './Icons';
import '@/styles/MovieCard.css';

export default function MovieCard({ movie }: { movie: Movie }) {
  const { play, openDetails, toggleList, isInList } = useBrowse();
  const saved = isInList(movie.id);

  return (
    <article className="card">
      <button
        className="card__thumb"
        style={{ backgroundImage: `url("${movie.imageUrl}")` }}
        onClick={() => openDetails(movie)}
        aria-label={`${movie.title} — details`}
      >
        {movie.type === 'series' && <span className="card__tag">SERIES</span>}
        <span className="card__label">{movie.title}</span>
      </button>
      <div className="card__panel">
        <div className="card__actions">
          <button className="mini-btn mini-btn--play" aria-label={`Play ${movie.title}`} onClick={() => play(movie)}>
            <PlayIcon />
          </button>
          <button
            className={`mini-btn ${saved ? 'mini-btn--on' : ''}`}
            aria-label={saved ? `Remove ${movie.title} from My List` : `Add ${movie.title} to My List`}
            aria-pressed={saved}
            onClick={() => toggleList(movie.id)}
          >
            {saved ? <CheckIcon /> : <PlusIcon />}
          </button>
          <button className="mini-btn mini-btn--end" aria-label={`More about ${movie.title}`} onClick={() => openDetails(movie)}>
            <InfoIcon />
          </button>
        </div>
        <p className="card__title">{movie.title}</p>
        <p className="card__meta">
          <span className="card__rating">{movie.maturityRating}</span>
          {movie.year && <span>{movie.year}</span>}
          {movie.episodes && <span>{movie.episodes.length} ep</span>}
        </p>
        <p className="card__genres">{movie.genres.slice(0, 3).join(' • ')}</p>
      </div>
    </article>
  );
}
