import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { createUser, findUserByEmail, findUserById } from '../store/db';
import { requireAuth, signToken, AuthRequest } from '../middleware/auth';
import { UserPublic } from '../types';

const router = Router();

function toPublic(user: { id: string; email: string; name: string }): UserPublic {
  return { id: user.id, email: user.email, name: user.name };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  if (!isValidEmail(email.trim())) {
    return res.status(400).json({ error: 'Enter a valid email address' });
  }

  if (name.trim().length > 80 || email.trim().length > 254) {
    return res.status(400).json({ error: 'Name or email is too long' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  if (findUserByEmail(email)) {
    return res.status(409).json({ error: 'An account with that email already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({
    id: randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash,
    watchlist: [],
  });

  const token = signToken(user.id);
  res.status(201).json({ token, user: toPublic(user) });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email?.trim() || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (!isValidEmail(email.trim())) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = signToken(user.id);
  res.json({ token, user: toPublic(user) });
});

router.get('/me', requireAuth, (req: AuthRequest, res: Response) => {
  const user = findUserById(req.userId!);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user: toPublic(user) });
});

export default router;
