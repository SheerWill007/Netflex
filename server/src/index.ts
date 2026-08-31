import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import moviesRouter from './routes/movies';
import authRouter from './routes/auth';
import watchlistRouter from './routes/watchlist';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/movies', moviesRouter);
app.use('/api/auth', authRouter);
app.use('/api/watchlist', watchlistRouter);

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export default app;
