import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ─── Security ─────────────────────────────
  app.use(helmet());

  // ─── CORS ─────────────────────────────────
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  // ─── Global Prefix ────────────────────────
  app.setGlobalPrefix('api/v1');

  // ─── Global Validation ────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Extra fields remove karo
      forbidNonWhitelisted: true, // Extra fields pe error do
      transform: true,           // Auto type convert karo
    }),
  );

  // ─── Swagger Docs ─────────────────────────
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('Production Ready Todo API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
  console.log('📖 Swagger docs at http://localhost:3000/api-docs');
}
bootstrap();