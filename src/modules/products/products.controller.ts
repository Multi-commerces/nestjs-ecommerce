import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  ProductReadData,
  ProductSaveData,
  ProductMergeData,
} from './data/product-data';
import { ProductLang } from './data/product.schema';

@ApiTags('products')
@Controller('products')
@ApiExtraModels(ProductReadData, ProductSaveData, ProductMergeData)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<ProductReadData[]> {
    return this.productsService.findAll();
  }

  @Get('/:id/langs')
  async findProductLanguages(): Promise<ProductLang[]> {
    return this.productsService.findLangs();
  }

  @Post()
  @HttpCode(201) // retourne le code HTTP 201 au lieu de 200 par défaut
  create(@Body() product: ProductSaveData): Promise<ProductReadData> {
    return this.productsService.create(product);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductReadData> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() product: ProductMergeData,
  ): Promise<ProductReadData> {
    return this.productsService.merge(id, product);
  }
}
