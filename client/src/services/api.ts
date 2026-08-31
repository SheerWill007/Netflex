import axios from 'axios';
import type { AuthResponse, Category, HeroContent, Movie, User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

export const fetchMoviesByType = async (type: 'movie' | 'series'): Promise<Movie[]> => {
  const response = await api.get<Movie[]>('/movies', { params: { type } });
  return response.data;
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', { name, email, password });
  return response.data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};

export const fetchMe = async (): Promise<User> => {
  const response = await api.get<{ user: User }>('/auth/me');
  return response.data.user;
};

export const fetchWatchlist = async (): Promise<Movie[]> => {
  const response = await api.get<Movie[]>('/watchlist');
  return response.data;
};

export const addToWatchlist = async (movieId: string): Promise<void> => {
  await api.post('/watchlist', { movieId });
};

export const removeFromWatchlist = async (movieId: string): Promise<void> => {
  await api.delete(`/watchlist/${movieId}`);
};

export default api;
