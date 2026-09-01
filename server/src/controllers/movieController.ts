import { Request, Response } from 'express';
import { categories, heroContent } from '../data/movies';

/**
 * Get hero content for the main banner
 */
export const getHeroContent = (_req: Request, res: Response) => {
  try {
    res.json(heroContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hero content' });
  }
};

/**
 * Get all categories with their movies
 */
export const getAllCategories = (_req: Request, res: Response) => {
  try {
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

/**
 * Get a specific category by ID
 */
export const getCategoryById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = categories.find(cat => cat.id === id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

/**
 * Get all movies across all categories
 */
export const getAllMovies = (_req: Request, res: Response) => {
  try {
    const allMovies = categories.flatMap(cat => cat.movies);
    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

/**
 * Get a specific movie by ID
 */
export const getMovieById = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allMovies = categories.flatMap(cat => cat.movies);
    const movie = allMovies.find(m => m.id === id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};

/**
 * Search movies by title
 */
export const searchMovies = (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    
    const allMovies = categories.flatMap(cat => cat.movies);
    const results = allMovies.filter(movie => 
      movie.title.toLowerCase().includes(q.toLowerCase())
    );
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search movies' });
  }
};
