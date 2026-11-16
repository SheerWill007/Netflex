export type MediaType = 'movie' | 'series';

/** Internet Archive item, embeddable at https://archive.org/embed/<id> */
export interface ArchiveSource {
  provider: 'archive';
  id: string;
}

/** A film uploaded to Bunny Stream and played as adaptive HLS */
export interface BunnySource {
  provider: 'bunny';
  /** Bunny Stream video GUID */
  id: string;
  /** HLS playlist, filled in by the API from BUNNY_CDN_HOSTNAME */
  playbackUrl: string;
}

/** Where a title (or episode) streams from */
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
