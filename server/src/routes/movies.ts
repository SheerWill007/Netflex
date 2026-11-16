import { Router } from 'express';
import {
  getFeatured,
  getAllCategories,
  getCategoryById,
  getAllMovies,
  getMovieById,
  searchMovies,
} from '../controllers/movieController';

const router = Router();

router.get('/featured', getFeatured);

router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);

router.get('/search', searchMovies); // Must be before /:id
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

export default router;
