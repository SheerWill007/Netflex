export type MediaType = 'movie' | 'series';

export interface Movie {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  rating: number;
  year?: number;
  maturityRating?: string;
  seasons?: number;
  duration?: string;
  isHD: boolean;
  type: MediaType;
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

export interface Category {
  id: string;
  name: string;
  movies: Movie[];
}

export interface HeroContent {
  id: string;
  title: string;
  description: string;
  tag: string;
  imageUrl: string;
  rating: number;
  year: number;
  maturityRating: string;
  seasons?: number;
  isHD: boolean;
}
