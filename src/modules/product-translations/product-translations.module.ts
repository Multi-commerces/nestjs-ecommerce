import { Module } from '@nestjs/common';
import { ProductTranslationsController } from './product-translations.controller';
import { ProductTranslationsService } from './product-translations.service';

@Module({
  controllers: [ProductTranslationsController],
  providers: [ProductTranslationsService]
})
export class ProductTranslationsModule {}
