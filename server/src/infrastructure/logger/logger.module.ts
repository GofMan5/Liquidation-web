import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom format for console output
const consoleFormat = printf((info) => {
  const { level, message, timestamp, context, stack, method, url, statusCode, duration } = info;
  const ctx = context ? `[${String(context)}]` : '';
  const stackTrace = stack ? `\n${String(stack)}` : '';
  
  // Special format for HTTP requests
  if (method && url && typeof statusCode === 'number') {
    const statusColor = statusCode >= 500 ? '\x1b[31m' : statusCode >= 400 ? '\x1b[33m' : '\x1b[32m';
    const reset = '\x1b[0m';
    return `${String(timestamp)} ${level} ${ctx} ${String(method)} ${String(url)} ${statusColor}${statusCode}${reset} ${String(duration)}ms`;
  }
  
  return `${String(timestamp)} ${level} ${ctx} ${String(message)}${stackTrace}`;
});

// Custom format for file output (JSON)
const fileFormat = printf(({ level, message, timestamp, context, stack, ...meta }) => {
  return JSON.stringify({
    timestamp,
    level,
    context,
    message,
    stack,
    ...meta,
  });
});

// Custom log levels with http
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    verbose: 'blue',
    debug: 'magenta',
  },
};

winston.addColors(customLevels.colors);

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      levels: customLevels.levels,
      level: process.env.LOG_LEVEL || 'http',
      transports: [
        // Console transport with colors
        new winston.transports.Console({
          format: combine(
            colorize({ all: true }),
            timestamp({ format: 'HH:mm:ss' }),
            errors({ stack: true }),
            consoleFormat,
          ),
        }),
        // File transport for errors
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            fileFormat,
          ),
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
        // File transport for all logs
        new winston.transports.File({
          filename: 'logs/combined.log',
          format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            fileFormat,
          ),
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
      ],
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
