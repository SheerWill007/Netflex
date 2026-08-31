import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const JWT_SECRET = process.env.JWT_SECRET;

if (isProduction && !JWT_SECRET) {
  throw new Error('JWT_SECRET must be configured in production');
}

// The fallback keeps local setup simple. Production always requires an explicit secret.
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
