import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import moviesRouter from './routes/movies';
import authRouter from './routes/auth';
import watchlistRouter from './routes/watchlist';
import { SERVER_CONFIG, API_PREFIX } from './config/constants';
import { errorHandler } from './utils/errorHandler';
import { logger } from './utils/logger';

dotenv.config();

const app: Application = express();
const PORT = SERVER_CONFIG.port;

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000')
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

// Request logging
app.use((req: Request, _res: Response, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// API Routes
app.use(`${API_PREFIX}/movies`, moviesRouter);
app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/watchlist`, watchlistRouter);

// Health check
app.get(`${API_PREFIX}/health`, (_req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: SERVER_CONFIG.env,
  });
});

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Netflex API',
    version: '1.0.0',
    endpoints: {
      health: `${API_PREFIX}/health`,
      movies: `${API_PREFIX}/movies`,
      auth: `${API_PREFIX}/auth`,
      watchlist: `${API_PREFIX}/watchlist`,
    },
  });
});

// Production: Serve static files
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.resolve(__dirname, '../../client/dist');
  const clientIndex = path.join(clientDist, 'index.html');
  const hasClientBuild = fs.existsSync(clientIndex);

  if (!hasClientBuild) {
    logger.warn(
      `Production mode is enabled, but the frontend build was not found at ${clientIndex}. ` +
      'The API will continue running without serving the React app. Ensure the client build is generated before deployment.'
    );
  } else {
    app.use(express.static(clientDist));
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api')) {
        return next();
      }

      res.sendFile(clientIndex);
    });
  }
}

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    logger.success(`🚀 Server running on http://localhost:${PORT}`);
    logger.info(`📊 Environment: ${SERVER_CONFIG.env}`);
    logger.info(`🌐 CORS enabled for: ${allowedOrigins.join(', ')}`);
    logger.info(`📡 API available at: http://localhost:${PORT}${API_PREFIX}`);
  });
}

export default app;
