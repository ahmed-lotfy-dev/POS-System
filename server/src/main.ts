import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    credentials: true,
    origin: process.env.APP_HOME,
    methods: 'GET, POST, PUT, DELETE,UPDATE, OPTIONS', // Allow all HTTP methods

    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.listen(3001);
}

bootstrap();
