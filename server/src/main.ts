import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'], // <--- add this line in options object
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Pos-System Backend Server ')
    .setDescription(
      'Pos system backend made with nestjs for pos system vite app',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    credentials: true,
    origin: ['https://pos-system-f.ahmedlotfy.dev', 'http://localhost:3000'],
    allowedHeaders: '*',
  });

  await app.listen(3001);
}

bootstrap();
