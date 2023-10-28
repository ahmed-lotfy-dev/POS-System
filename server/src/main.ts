import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'], // <--- add this line in options object
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    credentials: true,
    origin: ['https://pos-system-f.ahmedlotfy.dev'],
    allowedHeaders: '*',
  });

  await app.listen(3001);
}

bootstrap();
