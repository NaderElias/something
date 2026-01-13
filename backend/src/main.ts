import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all origins

  app.enableCors({
    origin: 'http://localhost:5173', // Allow specific domain
    methods: 'GET,POST,PUT,DELETE', // Allow HTTP methods
    credentials: true, // Allow cookies to be sent
    allowedHeaders: 'Content-Type, Authorization', // Permitted request headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
