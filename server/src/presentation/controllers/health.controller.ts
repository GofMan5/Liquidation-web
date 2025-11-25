import { Controller, Get, Inject } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../infrastructure/database/database.module';

@Controller('health')
export class HealthController {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: unknown,
  ) {}

  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Get('ready')
  readiness() {
    const dbReady = this.db !== null && this.db !== undefined;
    
    return {
      status: dbReady ? 'ready' : 'not_ready',
      timestamp: new Date().toISOString(),
      checks: {
        database: dbReady ? 'ok' : 'error',
      },
    };
  }
}
