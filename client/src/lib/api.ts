import axios from 'axios';
import type { Category, HeroContent, Movie } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHeroContent = async (): Promise<HeroContent> => {
  const response = await api.get<HeroContent>('/movies/hero');
  return response.data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/movies/categories');
  return response.data;
};

export const fetchMovieById = async (id: string): Promise<Movie> => {
  const response = await api.get<Movie>(`/movies/${id}`);
  return response.data;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await api.get<Movie[]>('/movies/search', {
    params: { q: query },
  });
  return response.data;
};

export default api;
