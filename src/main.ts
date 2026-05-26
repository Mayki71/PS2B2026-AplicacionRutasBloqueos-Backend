import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      /^https?:\/\/localhost:\d+$/,
      /^https?:\/\/172\.16\.\d+\.\d+:\d+$/,
      /^https?:\/\/192\.168\.\d+\.\d+:\d+$/,
      /^https?:\/\/10\.\d+\.\d+\.\d+:\d+$/,
      /^https?:\/\/26\.\d+\.\d+\.\d+:\d+$/,
      /^https:\/\/.*\.vercel\.app$/,
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on port: ${port}`);
}
bootstrap();