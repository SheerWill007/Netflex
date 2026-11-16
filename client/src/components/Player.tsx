'use client';

import { useEffect } from 'react';
import type { Episode, Movie } from '@/types';
import { embedUrl, sourcePageUrl } from '@/lib/api';
import HlsVideo from './HlsVideo';
import { CloseIcon } from './Icons';
import '@/styles/Player.css';

export default function Player({
  movie,
  episode,
  onClose,
}: {
  movie: Movie;
  episode?: Episode;
  onClose: () => void;
}) {
  const source = episode?.source ?? movie.source;
  const sourceLink = source ? sourcePageUrl(source) : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!source) return null;
  const label = `${movie.title}${episode ? ` — ${episode.title}` : ''}`;

  return (
    <div className="player" role="dialog" aria-modal="true" aria-label={`Playing ${movie.title}`}>
      <div className="player__bar">
        <button className="player__close" onClick={onClose} aria-label="Close player">
          <CloseIcon />
        </button>
        <div className="player__titles">
          <strong>{movie.title}</strong>
          {episode && <span>{episode.title}</span>}
        </div>
        {sourceLink ? (
          <a className="player__source" href={sourceLink} target="_blank" rel="noreferrer">
            {movie.license} · Internet Archive ↗
          </a>
        ) : (
          <span className="player__source">A Netflex Original</span>
        )}
      </div>
      <div className="player__frame">
        {source.provider === 'bunny' ? (
          <HlsVideo
            key={source.id}
            src={source.playbackUrl}
            progressKey={episode?.id ?? movie.id}
            title={label}
            poster={movie.posterUrl ?? movie.imageUrl}
          />
        ) : (
          <iframe
            key={source.id}
            src={embedUrl(source)}
            title={label}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {movie.credit && <p className="player__credit">{movie.credit}</p>}
    </div>
  );
}
