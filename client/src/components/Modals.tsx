import { useWatchlist } from '../context/WatchlistContext';
import { useCatalog } from '../context/CatalogContext';
import './Modal.css';

const SAMPLE_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const DetailsModal = () => {
  const { selected, closeDetails, play } = useCatalog();
  const { ids, toggle } = useWatchlist();

  if (!selected) return null;

  const inList = ids.has(selected.id);

  return (
    <div className="modal-backdrop" onClick={closeDetails} role="presentation">
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal__close" onClick={closeDetails} aria-label="Close">
          ×
        </button>
        <div
          className="modal__hero"
          style={{ backgroundImage: `linear-gradient(transparent, #181818), url('${selected.imageUrl}')` }}
        >
          <h2>{selected.title}</h2>
          <div className="modal__actions">
            <button className="btn btn--play" onClick={() => play(selected)}>
              Play
            </button>
            <button className="btn btn--info" onClick={() => void toggle(selected)}>
              {inList ? 'Remove from My List' : 'Add to My List'}
            </button>
          </div>
        </div>
        <div className="modal__body">
          <p className="modal__meta">
            <span className="match">{selected.rating}% Match</span>
            <span>{selected.year}</span>
            <span>{selected.maturityRating}</span>
            {selected.seasons ? <span>{selected.seasons} Seasons</span> : null}
            <span>{selected.type === 'series' ? 'Series' : 'Movie'}</span>
          </p>
          <p>{selected.description}</p>
        </div>
      </div>
    </div>
  );
};

export const PlayerModal = () => {
  const { playing, stopPlay } = useCatalog();
  if (!playing) return null;

  return (
    <div className="modal-backdrop modal-backdrop--player" onClick={stopPlay} role="presentation">
      <div className="player" onClick={(e) => e.stopPropagation()}>
        <div className="player__bar">
          <p>{playing.title}</p>
          <button onClick={stopPlay} aria-label="Close player">
            ×
          </button>
        </div>
        <video src={SAMPLE_VIDEO} controls autoPlay />
      </div>
    </div>
  );
};
