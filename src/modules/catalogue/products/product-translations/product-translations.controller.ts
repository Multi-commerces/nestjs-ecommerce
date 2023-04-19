import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[International] Gestion des traductions de produits')
@Controller('product-translations')
export class ProductTranslationsController {
  @ApiOperation({ summary: 'Récupérer les traductions de produits' })
  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }

  @ApiOperation({ summary: 'Céer une nouvelle traduction produit' })
  @Post()
  async create(): Promise<any> {
    return {};
  }
}
