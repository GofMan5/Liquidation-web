import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      const contentLength = res.get('content-length') || 0;

      const logLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'http';

      this.logger.log(logLevel, `${method} ${originalUrl} ${statusCode} ${duration}ms`, {
        context: 'HTTP',
        method,
        url: originalUrl,
        statusCode,
        duration,
        contentLength,
        ip,
        userAgent,
      });
    });

    next();
  }
}
