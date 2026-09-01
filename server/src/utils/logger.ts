/**
 * Simple logger utility for consistent logging
 */

type LogLevel = 'info' | 'warn' | 'error' | 'success';

const colors = {
  info: '\x1b[36m',    // Cyan
  warn: '\x1b[33m',    // Yellow
  error: '\x1b[31m',   // Red
  success: '\x1b[32m', // Green
  reset: '\x1b[0m',
};

const getTimestamp = (): string => {
  return new Date().toISOString();
};

const log = (level: LogLevel, message: string, data?: any) => {
  const timestamp = getTimestamp();
  const color = colors[level];
  const levelUpper = level.toUpperCase().padEnd(7);
  
  console.log(
    `${color}[${timestamp}] ${levelUpper}${colors.reset} ${message}`
  );
  
  if (data) {
    console.log(data);
  }
};

export const logger = {
  info: (message: string, data?: any) => log('info', message, data),
  warn: (message: string, data?: any) => log('warn', message, data),
  error: (message: string, data?: any) => log('error', message, data),
  success: (message: string, data?: any) => log('success', message, data),
};

export default logger;
