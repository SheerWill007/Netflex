import { Request, Response } from 'express';
import moviesData, { categories, featured } from '../data/movies';
import { MediaType } from '../types';

function parseType(value: unknown): MediaType | undefined {
  return value === 'movie' || value === 'series' ? value : undefined;
}

/** Featured titles for the rotating hero banner */
export const getFeatured = (_req: Request, res: Response) => {
  res.json(featured);
};

/** Categories with their titles. Optional ?type=movie|series filters titles and drops empty rows. */
export const getAllCategories = (req: Request, res: Response) => {
  const type = parseType(req.query.type);
  if (!type) {
    return res.json(categories);
  }
  res.json(
    categories
      .map((cat) => ({ ...cat, movies: cat.movies.filter((m) => m.type === type) }))
      .filter((cat) => cat.movies.length > 0)
  );
};

export const getCategoryById = (req: Request, res: Response) => {
  const category = categories.find((cat) => cat.id === req.params.id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  res.json(category);
};

/** All titles. Optional ?type=movie|series, ?ids=a,b,c (keeps the requested order). */
export const getAllMovies = (req: Request, res: Response) => {
  const type = parseType(req.query.type);
  let results = moviesData;

  if (typeof req.query.ids === 'string') {
    const ids = req.query.ids.split(',').map((id) => id.trim()).filter(Boolean).slice(0, 200);
    results = ids
      .map((id) => moviesData.find((m) => m.id === id))
      .filter((m): m is NonNullable<typeof m> => Boolean(m));
  }

  if (type) {
    results = results.filter((m) => m.type === type);
  }
  res.json(results);
};

export const getMovieById = (req: Request, res: Response) => {
  const movie = moviesData.find((m) => m.id === req.params.id);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.json(movie);
};

/** Search titles, genres and descriptions */
export const searchMovies = (req: Request, res: Response) => {
  const { q } = req.query;
  if (!q || typeof q !== 'string' || !q.trim()) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  const needle = q.trim().toLowerCase().slice(0, 100);
  const score = (text: string, weight: number) => (text.toLowerCase().includes(needle) ? weight : 0);

  const results = moviesData
    .map((m) => ({
      movie: m,
      score:
        score(m.title, 10) +
        m.genres.reduce((sum, g) => sum + score(g, 4), 0) +
        score(m.category, 3) +
        score(m.description, 1),
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.movie);

  res.json(results);
};
