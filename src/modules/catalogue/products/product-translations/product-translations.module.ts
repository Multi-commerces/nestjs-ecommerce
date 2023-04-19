import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductLang, ProductLangSchema } from '../data/product.schema';
import { ProductTranslationsController } from './product-translations.controller';
import { ProductTranslationsService } from './product-translations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductLang.name, schema: ProductLangSchema },
    ]),
  ],
  controllers: [ProductTranslationsController],
  providers: [ProductTranslationsService],
})
export class ProductTranslationsModule {}
