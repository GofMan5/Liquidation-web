import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  
  // Use Winston as the main logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
