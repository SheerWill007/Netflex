import { Router, Request, Response } from 'express';
import { categories, heroContent } from '../data/movies';

const router = Router();

// Get hero content
router.get('/hero', (_req: Request, res: Response) => {
  res.json(heroContent);
});

// Get all categories with movies
router.get('/categories', (_req: Request, res: Response) => {
  res.json(categories);
});

// Get specific category by ID
router.get('/categories/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const category = categories.find(cat => cat.id === id);
  
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  
  res.json(category);
});

// Get all movies
router.get('/', (_req: Request, res: Response) => {
  const allMovies = categories.flatMap(cat => cat.movies);
  res.json(allMovies);
});

// Get specific movie by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const allMovies = categories.flatMap(cat => cat.movies);
  const movie = allMovies.find(m => m.id === id);
  
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  
  res.json(movie);
});

// Search movies
router.get('/search', (req: Request, res: Response) => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }
  
  const allMovies = categories.flatMap(cat => cat.movies);
  const results = allMovies.filter(movie => 
    movie.title.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json(results);
});

export default router;
