'use client';

import { useEffect, useRef } from 'react';
import type { Movie } from '@/types';
import { sourcePageUrl } from '@/lib/api';
import { useBrowse } from './BrowseProvider';
import { CheckIcon, CloseIcon, PlayIcon, PlusIcon } from './Icons';
import '@/styles/Modal.css';

export default function DetailsModal({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const { play, toggleList, isInList } = useBrowse();
  const dialogRef = useRef<HTMLDivElement>(null);
  const saved = isInList(movie.id);
  const art = movie.posterUrl ?? movie.imageUrl;
  const firstSource = movie.source ?? movie.episodes?.[0]?.source;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button className="modal__close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className="modal__banner" style={{ backgroundImage: `url("${art}")` }}>
          <div className="modal__banner-shade" />
          <div className="modal__banner-content">
            <h2 id="modal-title">{movie.title}</h2>
            <div className="modal__buttons">
              <button className="btn btn--play" onClick={() => play(movie)}>
                <PlayIcon /> Play
              </button>
              <button
                className={`round-btn ${saved ? 'round-btn--on' : ''}`}
                aria-label={saved ? 'Remove from My List' : 'Add to My List'}
                aria-pressed={saved}
                onClick={() => toggleList(movie.id)}
              >
                {saved ? <CheckIcon /> : <PlusIcon />}
              </button>
            </div>
          </div>
        </div>

        <div className="modal__body">
          <div className="modal__main">
            <p className="modal__meta">
              {movie.year && <span>{movie.year}</span>}
              <span className="modal__rating">{movie.maturityRating}</span>
              {movie.type === 'series' && movie.episodes && (
                <span>{movie.episodes.length} episodes</span>
              )}
              <span className="modal__hd">HD</span>
            </p>
            <p className="modal__desc">{movie.description}</p>
          </div>
          <dl className="modal__facts">
            <div>
              <dt>Genres:</dt>
              <dd>{movie.genres.join(', ')}</dd>
            </div>
            <div>
              <dt>Licence:</dt>
              <dd>{movie.license}</dd>
            </div>
            {movie.credit && (
              <div>
                <dt>Credit:</dt>
                <dd>{movie.credit}</dd>
              </div>
            )}
            {firstSource && (
              <div>
                <dt>Source:</dt>
                <dd>
                  <a href={sourcePageUrl(firstSource)} target="_blank" rel="noreferrer">
                    View source on Internet Archive ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        {movie.episodes && movie.episodes.length > 0 && (
          <div className="modal__episodes">
            <h3>Episodes</h3>
            <ol>
              {movie.episodes.map((ep, i) => (
                <li key={ep.id}>
                  <button className="episode" onClick={() => play(movie, ep)}>
                    <span className="episode__num">{i + 1}</span>
                    <span className="episode__title">{ep.title}</span>
                    <PlayIcon className="episode__play" />
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
