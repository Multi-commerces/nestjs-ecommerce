import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/interceptor.controller';
import { ProductTranslationsService } from './product-translations.service';

@ApiTags('[International] Gestion des traductions de produits')
@Controller('product-translations')
@UseInterceptors(TransformInterceptor)
export class ProductTranslationsController {
  constructor(private readonly productsService: ProductTranslationsService) {}

  @ApiOperation({ summary: 'Récupérer les traductions de produits' })
  @Get()
  async findAll(): Promise<any[]> {
    return this.productsService.findLangs();
  }

  @ApiOperation({ summary: 'Céer une nouvelle traduction produit' })
  @Post()
  async create(): Promise<any> {
    return {};
  }
}
