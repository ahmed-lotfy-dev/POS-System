import { NestFactory } from '@nestjs/core';
// Trigger restart
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'], // <--- add this line in options object
  });

  // Global exception filter for error logging
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global pipes and interceptors
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());
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
    allowedHeaders: '*',
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed =
        origin === 'http://localhost:3000' ||
        origin === 'https://pos-system-app.ahmedlotfy.site' ||
        /^https:\/\/[a-z0-9-]+\.alotfy\.site$/.test(origin);
      callback(null, allowed);
    },
  });

  await app.listen(process.env.PORT || 8000);
}

bootstrap();
