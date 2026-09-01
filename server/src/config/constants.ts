export const API_PREFIX = '/api';

export const SERVER_CONFIG = {
  port: parseInt(process.env.PORT || '5000', 10),
  env: process.env.NODE_ENV || 'development',
};
