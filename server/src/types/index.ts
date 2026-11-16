export type MediaType = 'movie' | 'series';

/** Where a title (or episode) streams from. Only openly licensed sources are allowed. */
export interface StreamSource {
  provider: 'archive';
  /** Internet Archive item identifier, embeddable at https://archive.org/embed/<id> */
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
  /** Card artwork */
  imageUrl: string;
  /** Large artwork for the hero banner and details view (falls back to imageUrl) */
  posterUrl?: string;
  category: string;
  genres: string[];
  year?: number;
  maturityRating: string;
  type: MediaType;
  /** Licence the title is distributed under, e.g. "Public domain" or "CC BY 3.0" */
  license: string;
  /** Required attribution for Creative Commons titles */
  credit?: string;
  /** Movies have a source; series have episodes */
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

export interface UserPublic {
  id: string;
  email: string;
  name: string;
}

export interface StoredUser extends UserPublic {
  passwordHash: string;
  watchlist: string[];
}

export interface DatabaseShape {
  users: StoredUser[];
}
