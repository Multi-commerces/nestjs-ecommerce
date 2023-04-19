import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('[Catalogue] Gestion des catégoies de produits et sous-catégories')
@Controller('categories')
export class CategoriesController {
  @ApiOperation({ summary: 'Récupérer toutes les catégories' })
  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }

  @ApiOperation({ summary: 'Céer une nouvelle catégorie' })
  @Post()
  async create(): Promise<any> {
    return {};
  }
}
