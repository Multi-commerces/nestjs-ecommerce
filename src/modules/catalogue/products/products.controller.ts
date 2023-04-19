import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CollectionHATEOS, DocumentHATEOS } from 'src/app.responses.hal';
import { TransformInterceptor } from 'src/common/interceptor.controller';
import {
  ProductMergeData,
  ProductReadData,
  ProductSaveData,
} from './data/product.data';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
@ApiExtraModels(ProductReadData, ProductSaveData, ProductMergeData)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CollectionHATEOS) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(ProductReadData) },
            },
          },
        },
      ],
    },
  })
  @UseInterceptors(TransformInterceptor)
  @Get()
  async findAll(): Promise<ProductReadData[]> {
    return await this.productsService.findAll();
  }

  @Post()
  @HttpCode(201) // retourne le code HTTP 201 au lieu de 200 par défaut
  @UseInterceptors(TransformInterceptor)
  async create(@Body() product: ProductSaveData): Promise<ProductReadData> {
    return await this.productsService.create(product);
  }

  @Get(':id')
  @HttpCode(200)
  @UseInterceptors(TransformInterceptor)
  async findOne(@Param('id') id: string): Promise<ProductReadData> {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  async patch(
    @Param('id') id: string,
    @Body() product: ProductMergeData,
  ): Promise<DocumentHATEOS<ProductReadData>> {
    return DocumentHATEOS.create(await this.productsService.merge(id, product));
  }
}
