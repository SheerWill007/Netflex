import { Router, Response } from 'express';
import { findUserById, updateUser } from '../store/db';
import { AuthRequest, requireAuth } from '../middleware/auth';
import { findMovieById } from '../lib/movies';

const router = Router();

router.use(requireAuth);

router.get('/', (req: AuthRequest, res: Response) => {
  const user = findUserById(req.userId!);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const movies = user.watchlist
    .map((id) => findMovieById(id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));
  res.json(movies);
});

router.post('/', (req: AuthRequest, res: Response) => {
  const { movieId } = req.body as { movieId?: string };
  if (!movieId) {
    return res.status(400).json({ error: 'movieId is required' });
  }

  const movie = findMovieById(movieId);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  const user = findUserById(req.userId!);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!user.watchlist.includes(movieId)) {
    user.watchlist.push(movieId);
    updateUser(user);
  }

  res.status(200).json({ watchlist: user.watchlist });
});

router.delete('/:movieId', (req: AuthRequest, res: Response) => {
  const { movieId } = req.params;
  const user = findUserById(req.userId!);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.watchlist = user.watchlist.filter((id) => id !== movieId);
  updateUser(user);
  res.json({ watchlist: user.watchlist });
});

export default router;
