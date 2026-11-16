import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const nodeEnv = process.env.NODE_ENV;
const isLocalEnv = nodeEnv === 'development' || nodeEnv === 'test';
const JWT_SECRET = process.env.JWT_SECRET;

// Only an explicit development/test environment may fall back to a built-in secret.
// If NODE_ENV is missing or anything else (e.g. a host that never sets it), refuse to
// start: with a known secret anyone could forge login tokens.
if (!JWT_SECRET && !isLocalEnv) {
  throw new Error(
    `JWT_SECRET must be set (NODE_ENV is "${nodeEnv ?? 'unset'}"). ` +
    'Set JWT_SECRET, or set NODE_ENV=development for local use.'
  );
}

const signingSecret = JWT_SECRET || 'development-only-secret';

export interface AuthRequest extends Request {
  userId?: string;
}

export function signToken(userId: string): string {
  return jwt.sign({ userId }, signingSecret, { expiresIn: '7d' });
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

  if (!token) {
    res.status(401).json({ error: 'Sign in required' });
    return;
  }

  try {
    const payload = jwt.verify(token, signingSecret) as { userId: string };
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
