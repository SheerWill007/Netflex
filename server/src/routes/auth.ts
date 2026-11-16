import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { createUser, findUserByEmail, findUserById } from '../store/db';
import { requireAuth, signToken, AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../utils/errorHandler';
import { UserPublic } from '../types';

const router = Router();

function toPublic(user: { id: string; email: string; name: string }): UserPublic {
  return { id: user.id, email: user.email, name: user.name };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Every lookup and every stored email goes through this, so " A@b.com" and "a@b.com"
// are always treated as the same account.
function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const { name, email: rawEmail, password } = req.body as {
    name?: unknown;
    email?: unknown;
    password?: unknown;
  };

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof rawEmail !== 'string' || !rawEmail.trim() ||
    typeof password !== 'string' || !password
  ) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const email = normalizeEmail(rawEmail);

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Enter a valid email address' });
  }

  if (name.trim().length > 80 || email.length > 254) {
    return res.status(400).json({ error: 'Name or email is too long' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  if (findUserByEmail(email)) {
    return res.status(409).json({ error: 'An account with that email already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // Check again after the await: another request for the same email may have
  // registered while we were hashing. The check and createUser are synchronous,
  // so nothing can interleave between them.
  if (findUserByEmail(email)) {
    return res.status(409).json({ error: 'An account with that email already exists' });
  }

  const user = createUser({
    id: randomUUID(),
    name: name.trim(),
    email,
    passwordHash,
    watchlist: [],
  });

  const token = signToken(user.id);
  res.status(201).json({ token, user: toPublic(user) });
}));

router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { email: rawEmail, password } = req.body as { email?: unknown; password?: unknown };

  if (typeof rawEmail !== 'string' || !rawEmail.trim() || typeof password !== 'string' || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const email = normalizeEmail(rawEmail);

  if (!isValidEmail(email)) {
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
}));

router.get('/me', requireAuth, (req: AuthRequest, res: Response) => {
  const user = findUserById(req.userId!);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ user: toPublic(user) });
});

export default router;
