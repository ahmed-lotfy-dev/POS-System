import { NestFactory } from '@nestjs/core';
// Trigger restart
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'], // <--- add this line in options object
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Pos-System Backend Server ')
    .setDescription(
      'Pos system backend made with nestjs for pos system vite app',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    credentials: true,
    origin: ['https://pos-system-app.ahmedlotfy.site', 'http://localhost:3000'],
    allowedHeaders: '*',
  });

  await app.listen(process.env.PORT || 8000);
}

bootstrap();
