import { Router, Request, Response } from 'express';
import { categories, findMovieById, heroContent, searchMovies, uniqueMovies } from '../lib/movies';

const router = Router();

router.get('/hero', (_req: Request, res: Response) => {
  res.json(heroContent);
});

router.get('/categories', (_req: Request, res: Response) => {
  res.json(categories);
});

router.get('/categories/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const category = categories.find((cat) => cat.id === id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json(category);
});

router.get('/search', (req: Request, res: Response) => {
  const { q } = req.query;

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  const query = q.trim();
  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" cannot be empty' });
  }

  res.json(searchMovies(query));
});

router.get('/', (req: Request, res: Response) => {
  const type = req.query.type;
  let results = uniqueMovies();
  if (type === 'movie' || type === 'series') {
    results = results.filter((m) => m.type === type);
  }
  res.json(results);
});

router.get('/:id', (req: Request, res: Response) => {
  const movie = findMovieById(req.params.id);

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.json(movie);
});

export default router;
