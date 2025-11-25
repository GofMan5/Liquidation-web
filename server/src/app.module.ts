import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule, HttpLoggerMiddleware } from './infrastructure/logger';
import { configuration } from './infrastructure/config';
import { HealthController } from './presentation/controllers';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [configuration],
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,  // 1 minute
      limit: 100,  // 100 requests per minute
    }]),
    LoggerModule,
    DatabaseModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
