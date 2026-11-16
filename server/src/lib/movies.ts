import moviesData from '../data/movies';
import { Movie } from '../types';

export function findMovieById(id: string): Movie | undefined {
  return moviesData.find((m) => m.id === id);
}

export { moviesData };
