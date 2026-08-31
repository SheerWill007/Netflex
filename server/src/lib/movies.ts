import { categories, heroContent } from '../data/movies';
import moviesData from '../data/movies';
import { Movie } from '../types';

export function heroAsMovie(): Movie {
  return {
    id: heroContent.id,
    title: heroContent.title,
    description: heroContent.description,
    imageUrl: heroContent.imageUrl,
    category: 'Featured',
    rating: heroContent.rating,
    year: heroContent.year,
    maturityRating: heroContent.maturityRating,
    seasons: heroContent.seasons,
    isHD: heroContent.isHD,
    type: heroContent.seasons ? 'series' : 'movie',
  };
}

export function uniqueMovies(): Movie[] {
  const seen = new Map<string, Movie>();
  seen.set(heroContent.title, heroAsMovie());
  for (const movie of moviesData) {
    if (!seen.has(movie.title)) {
      seen.set(movie.title, movie);
    }
  }
  return [...seen.values()];
}

export function findMovieById(id: string): Movie | undefined {
  if (id === heroContent.id) {
    return heroAsMovie();
  }
  return moviesData.find((m) => m.id === id);
}

export function searchMovies(query: string): Movie[] {
  const q = query.toLowerCase();
  return uniqueMovies().filter((movie) => movie.title.toLowerCase().includes(q));
}

export { categories, heroContent, moviesData };
