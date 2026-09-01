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
