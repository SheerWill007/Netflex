'use client';

import type { Category } from '@/types';
import MovieCard from './MovieCard';
import '@/styles/Row.css';

interface RowProps {
  category: Category;
}

const Row = ({ category }: RowProps) => {
  return (
    <div className="row">
      <h3 className="row__title">{category.name}</h3>
      <div className="row__track">
        {category.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Row;
