'use client';

import type { Movie } from '@/types';
import '@/styles/MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const thumbStyle = {
    backgroundImage: `url('${movie.imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="card">
      <div className="card__thumb" style={thumbStyle}>
        <span className="card__label">{movie.title}</span>
      </div>
      <div className="card__overlay">
        <p className="card__overlay-title">{movie.title}</p>
        <div className="card__overlay-actions">
          <button className="mini-btn mini-btn--play" aria-label="Play">
            <svg viewBox="0 0 24 24">
              <path d="M6 4l14 8-14 8V4z" fill="currentColor" />
            </svg>
          </button>
          <button className="mini-btn" aria-label="Add to list">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button className="mini-btn" aria-label="Like">
            <svg viewBox="0 0 24 24">
              <path
                d="M7 10v10M3 12v6a2 2 0 002 2h10.5a2 2 0 002-1.6l1.3-6A2 2 0 0016.8 10H13l1-4.5A1.5 1.5 0 0012.6 4L7 10z"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
                strokeLinejoin="round"
              />
            </svg>
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
