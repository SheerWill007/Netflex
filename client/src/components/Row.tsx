'use client';

import { useEffect, useRef, useState } from 'react';
import type { Category } from '@/types';
import MovieCard from './MovieCard';
import { ChevronIcon } from './Icons';
import '@/styles/Row.css';

export default function Row({ category }: { category: Category }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [category.movies.length]);

  const scrollBy = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  if (!category.movies.length) return null;

  return (
    <section className="row" id={category.id} aria-labelledby={`${category.id}-title`}>
      <h2 className="row__title" id={`${category.id}-title`}>
        {category.name}
        <span className="row__count">{category.movies.length} titles</span>
      </h2>
      <div className="row__viewport">
        {canLeft && (
          <button className="row__arrow row__arrow--left" aria-label={`Scroll ${category.name} left`} onClick={() => scrollBy(-1)}>
            <ChevronIcon />
          </button>
        )}
        <div className="row__track" ref={trackRef} onScroll={updateArrows}>
          {category.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {canRight && (
          <button className="row__arrow row__arrow--right" aria-label={`Scroll ${category.name} right`} onClick={() => scrollBy(1)}>
            <ChevronIcon />
          </button>
        )}
      </div>
    </section>
  );
}
