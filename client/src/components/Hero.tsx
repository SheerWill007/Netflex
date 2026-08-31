import type { HeroContent } from '../types';
import { useCatalog } from '../context/CatalogContext';
import './Hero.css';

interface HeroProps {
  content: HeroContent;
}

const Hero = ({ content }: HeroProps) => {
  const { openDetails, play } = useCatalog();

  const asMovie = {
    id: content.id,
    title: content.title,
    description: content.description,
    imageUrl: content.imageUrl,
    category: 'Featured',
    rating: content.rating,
    year: content.year,
    maturityRating: content.maturityRating,
    seasons: content.seasons,
    isHD: content.isHD,
    type: content.seasons ? ('series' as const) : ('movie' as const),
  };

  const backgroundStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.7) 65%, #141414 100%), url('${content.imageUrl}')`,
  };

  return (
    <section className="hero" style={backgroundStyle}>
      <div className="hero__content">
        <p className="hero__tag">{content.tag}</p>
        <h2 className="hero__title">{content.title}</h2>
        <p className="hero__meta">
          <span className="match">{content.rating}% Match</span>
          <span>{content.year}</span>
          <span className="badge">{content.maturityRating}</span>
          {content.seasons && <span>{content.seasons} Seasons</span>}
          {content.isHD && <span className="hd">HD</span>}
        </p>
        <p className="hero__desc">{content.description}</p>
        <div className="hero__buttons">
          <button className="btn btn--play" onClick={() => play(asMovie)}>
            <svg viewBox="0 0 24 24">
              <path d="M6 4l14 8-14 8V4z" fill="currentColor" />
            </svg>
            Play
          </button>
          <button className="btn btn--info" onClick={() => openDetails(asMovie)}>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path
                d="M12 8v.01M11 11h1v5h1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            More Info
          </button>
        </div>
      </div>
      <div className="hero__age-badge">{content.maturityRating}</div>
    </section>
  );
};

export default Hero;
