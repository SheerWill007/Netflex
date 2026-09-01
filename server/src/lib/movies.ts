import moviesData from '../data/movies';
import { heroContent } from '../data/movies';
import { Movie } from '../types';

export function findMovieById(id: string): Movie | undefined {
  if (id === heroContent.id) {
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
  return moviesData.find((m) => m.id === id);
}

export { heroContent, moviesData };
