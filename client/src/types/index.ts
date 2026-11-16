export type MediaType = 'movie' | 'series';

export interface ArchiveSource {
  provider: 'archive';
  id: string;
}

/** Self-hosted film on Bunny Stream, played as adaptive HLS */
export interface BunnySource {
  provider: 'bunny';
  id: string;
  playbackUrl: string;
}

export type StreamSource = ArchiveSource | BunnySource;

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
