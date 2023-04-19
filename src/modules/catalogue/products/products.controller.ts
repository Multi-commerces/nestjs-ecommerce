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
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { TransformInterceptor } from '../../../common/interceptor.controller';
import {
  ProductMergeData,
  ProductReadData,
  ProductSaveData,
} from './data/product.data';
import { ProductsService } from './products.service';

@ApiTags('[Catalogue] Gestion du catalogue des produits')
@Controller('products')
@ApiExtraModels(ProductReadData, ProductSaveData, ProductMergeData)
@UseInterceptors(TransformInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  schemaProduct = {
    properties: {
      _data: {
        $ref: getSchemaPath(ProductReadData),
      },
    },
  };

  @ApiOperation({ summary: 'Récupérer les produits' })
  @ApiOkResponse({
    schema: {
      properties: {
        _data: {
          type: 'array',
          items: { $ref: getSchemaPath(ProductReadData) },
        },
      },
    },
  })
  @Get()
  async findAll(): Promise<ProductReadData[]> {
    return await this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Créer un nouveau produit' })
  @ApiOkResponse({
    schema: {
      properties: {
        _data: {
          $ref: getSchemaPath(ProductReadData),
        },
      },
    },
  })
  @Post()
  @HttpCode(201) // retourne le code HTTP 201 au lieu de 200 par défaut
  async create(@Body() product: ProductSaveData): Promise<ProductReadData> {
    return await this.productsService.create(product);
  }

  @ApiOperation({ summary: 'Récupérer un produit de la liste' })
  @ApiOkResponse({
    schema: {
      properties: {
        _data: {
          $ref: getSchemaPath(ProductReadData),
        },
      },
    },
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<ProductReadData> {
    return await this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Mise à jour partielle du produit' })
  @ApiOkResponse({
    schema: {
      properties: {
        _data: {
          $ref: getSchemaPath(ProductReadData),
        },
      },
    },
  })
  @Patch(':id')
  @HttpCode(200)
  async patch(
    @Param('id') id: string,
    @Body() product: ProductMergeData,
  ): Promise<ProductReadData> {
    return await this.productsService.merge(id, product);
  }
}
