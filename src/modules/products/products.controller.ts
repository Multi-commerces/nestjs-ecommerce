import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CollectionHATEOS, DocumentHATEOS } from 'src/app.responses.hal';
import {
  ProductMergeData,
  ProductReadData,
  ProductSaveData,
} from './data/product-data';
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
  @Get()
  async findAll(): Promise<CollectionHATEOS<ProductReadData>> {
    const produtcs = await this.productsService.findAll();

    return CollectionHATEOS.create(produtcs);
  }

  @Post()
  @HttpCode(201) // retourne le code HTTP 201 au lieu de 200 par défaut
  async create(
    @Body() product: ProductSaveData,
  ): Promise<DocumentHATEOS<ProductReadData>> {
    const data = await this.productsService.create(product);
    return DocumentHATEOS.create(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<DocumentHATEOS<ProductReadData>> {
    return DocumentHATEOS.create(await this.productsService.findOne(id));
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() product: ProductMergeData,
  ): Promise<DocumentHATEOS<ProductReadData>> {
    return DocumentHATEOS.create(await this.productsService.merge(id, product));
  }
}
