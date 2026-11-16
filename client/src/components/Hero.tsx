'use client';

import { useEffect, useState } from 'react';
import type { FeaturedTitle } from '@/types';
import { useBrowse } from './BrowseProvider';
import { InfoIcon, PlayIcon } from './Icons';
import '@/styles/Hero.css';

const ROTATE_MS = 9000;

export default function Hero({ titles }: { titles: FeaturedTitle[] }) {
  const { play, openDetails } = useBrowse();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (titles.length < 2 || paused) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % titles.length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [titles.length, paused]);

  if (!titles.length) return null;
  const title = titles[index];
  const art = title.posterUrl ?? title.imageUrl;

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured titles"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Wide blurred backdrop built from the poster, so portrait art still fills the banner */}
      <div className="hero__backdrop" style={{ backgroundImage: `url("${art}")` }} key={`bg-${title.id}`} />
      <div className="hero__shade" />

      <div className="hero__poster" key={`poster-${title.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={art} alt="" />
      </div>

      <div className="hero__content" key={`content-${title.id}`}>
        <p className="hero__brand">
          <span>N</span>ETFLEX&nbsp;OPEN
        </p>
        <h1 className="hero__title">{title.title}</h1>
        <p className="hero__tagline">{title.tagline}</p>
        <p className="hero__meta">
          {title.year && <span>{title.year}</span>}
          <span>{title.genres.slice(0, 3).join(' · ')}</span>
          <span className="hero__license">{title.license}</span>
        </p>
        <p className="hero__desc">{title.description}</p>
        <div className="hero__buttons">
          <button className="btn btn--play" onClick={() => play(title)}>
            <PlayIcon /> Play
          </button>
          <button className="btn btn--info" onClick={() => openDetails(title)}>
            <InfoIcon /> More Info
          </button>
        </div>
      </div>

      <div className="hero__rating">{title.maturityRating === 'All' ? 'U' : `U/A ${title.maturityRating}`}</div>

      {titles.length > 1 && (
        <div className="hero__dots" role="tablist" aria-label="Choose featured title">
          {titles.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === index}
              aria-label={t.title}
              className={`hero__dot ${i === index ? 'hero__dot--active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
