import type { ArchiveSource, Category, FeaturedTitle, MediaType, Movie, StreamSource } from '@/types';

/**
 * Server components call the Express API directly. In the browser, requests go to
 * same-origin /api, which next.config.js rewrites to the API.
 */
const API_URL =
  typeof window === 'undefined'
    ? process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
    : '/api';

async function get<T>(path: string): Promise<T> {
  // Short cache: the catalogue rarely changes, but newly uploaded films should appear quickly.
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`API ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const fetchFeatured = () => get<FeaturedTitle[]>('/movies/featured');

export const fetchCategories = (type?: MediaType) =>
  get<Category[]>(`/movies/categories${type ? `?type=${type}` : ''}`);

export const fetchMoviesByIds = (ids: string[]) =>
  ids.length ? get<Movie[]>(`/movies?ids=${ids.map(encodeURIComponent).join(',')}`) : Promise.resolve([]);

export const searchMovies = (query: string) =>
  get<Movie[]>(`/movies/search?q=${encodeURIComponent(query)}`);

export const embedUrl = (source: ArchiveSource) =>
  `https://archive.org/embed/${encodeURIComponent(source.id)}?autoplay=1`;

/** Public page for a title's source, or null for self-hosted films */
export const sourcePageUrl = (source: StreamSource) =>
  source.provider === 'archive' ? `https://archive.org/details/${encodeURIComponent(source.id)}` : null;
