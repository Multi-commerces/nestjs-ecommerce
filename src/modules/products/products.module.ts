import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductLang, ProductLangSchema, ProductSchema } from './data/product.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
			{ name: ProductLang.name, schema: ProductLangSchema }
		])
	],
	controllers: [ProductsController],
	providers: [ProductsService]
})
export class ProductsModule {}
