import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidNonWhitelisted: true,
      // whitelist: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('NestJS Blog')
    .setDescription(`Blog's api created by NestJS`)
    .setVersion('1.0')
    .addServer('http://localhost:5432/', 'Local environment')
    .addServer('https://kanokpit.com/', 'Production')
    .addTag('Blog')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.API_PORT || 5432);
}
bootstrap();
