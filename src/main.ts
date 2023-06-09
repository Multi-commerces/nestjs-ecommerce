import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, { cors: true });

  /** Validation Globale */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      // la validation ne s'arrête pas après avoir rencontré la première erreur.
      stopAtFirstError: false,

      dismissDefaultMessages: false,
      forbidNonWhitelisted: true,

      // Ignorer la validation de toutes les propriétés non définies dans l'objet de validation.
      skipUndefinedProperties: false,
      // Ne pas ignorer la validation de toutes les propriétés nulles dans l'objet de validation.
      skipNullProperties: false,
    }),
  );

  /** Configuration swagger */
  const config = new DocumentBuilder()
    .setTitle('RestFul API e-commerce')
    .setDescription(
      'API permettant de manipuler la boutique et découvrir les données de celle-ci.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
