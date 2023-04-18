import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_HOST || 'localhost'}:${
        process.env.MONGODB_PORT || '27017'
      }/${process.env.MONGODB_DATABASE || 'ecommerceDB'}`,
    ),
    ProductsModule,
    CategoriesModule,
    OrdersModule,
  ],
})
export class AppModule {}
