import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './modules/catalogue/categories/categories.module';
import { ProductsModule } from './modules/catalogue/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DeliveriesModule } from './modules/deliveries/deliveries.module';

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
    DeliveriesModule,
  ],
})
export class AppModule {}
