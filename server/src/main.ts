import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GlobalExceptionFilter } from './presentation/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  
  const configService = app.get(ConfigService);
  
  // Use Winston as the main logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  // Security middleware
  app.use(helmet());
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  const corsOrigins = configService.get<string[]>('cors.origins', ['http://localhost:3000']);
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });
  
  const port = configService.get<number>('port', 4000);
  await app.listen(port);
  
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER) as { log: (message: string, context?: string) => void };
  logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
}
void bootstrap();
