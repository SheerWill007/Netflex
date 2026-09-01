export const API_VERSION = 'v1';
export const API_PREFIX = '/api';

export const CORS_OPTIONS = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};

export const SERVER_CONFIG = {
  port: parseInt(process.env.PORT || '5000', 10),
  env: process.env.NODE_ENV || 'development',
};

export const RESPONSE_MESSAGES = {
  SUCCESS: 'Operation successful',
  ERROR: 'An error occurred',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Invalid request',
  SERVER_ERROR: 'Internal server error',
};
