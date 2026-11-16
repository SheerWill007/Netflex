export type MediaType = 'movie' | 'series';

export interface StreamSource {
  provider: 'archive';
  id: string;
}

export interface Episode {
  id: string;
  title: string;
  source: StreamSource;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  posterUrl?: string;
  category: string;
  genres: string[];
  year?: number;
  maturityRating: string;
  type: MediaType;
  license: string;
  credit?: string;
  source?: StreamSource;
  episodes?: Episode[];
}

export interface Category {
  id: string;
  name: string;
  movies: Movie[];
}

export interface FeaturedTitle extends Movie {
  tagline: string;
}
