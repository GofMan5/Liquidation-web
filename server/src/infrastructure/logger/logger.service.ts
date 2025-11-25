import { Injectable, Inject, LoggerService as NestLoggerService } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  private context?: string;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context: context || this.context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { 
      context: context || this.context,
      stack: trace,
    });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context: context || this.context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context: context || this.context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context: context || this.context });
  }

  // Custom methods for structured logging
  http(message: string, meta?: Record<string, unknown>) {
    this.logger.http(message, { context: this.context, ...meta });
  }

  logRequest(method: string, url: string, statusCode: number, duration: number) {
    this.logger.http(`${method} ${url} ${statusCode} - ${duration}ms`, {
      context: 'HTTP',
      method,
      url,
      statusCode,
      duration,
    });
  }

  logError(error: Error, context?: string) {
    this.logger.error(error.message, {
      context: context || this.context,
      stack: error.stack,
      name: error.name,
    });
  }
}
