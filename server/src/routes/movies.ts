import { Router } from 'express';
import {
  getHeroContent,
  getAllCategories,
  getCategoryById,
  getAllMovies,
  getMovieById,
  searchMovies,
} from '../controllers/movieController';

const router = Router();

// Hero content
router.get('/hero', getHeroContent);

// Categories
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);

// Movies
router.get('/search', searchMovies); // Must be before /:id
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

export default router;
