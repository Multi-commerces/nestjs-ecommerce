import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './modules/catalogue/categories/categories.module';
import { ProductsModule } from './modules/catalogue/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DeliveriesModule } from './modules/deliveries/deliveries.module';
import { InvoicesModule } from './modules/orders/invoices/invoices.module';
import { ShoppingCartsModule } from './modules/shopping-carts/shopping-carts.module';
import { ProductTranslationsModule } from './modules/catalogue/products/product-translations/product-translations.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGODB_HOST || 'localhost'}:${
        process.env.MONGODB_PORT || '27017'
      }/${process.env.MONGODB_DATABASE || 'ecommerceDB'}`,
    ),
    ProductsModule,
    ProductTranslationsModule,
    CategoriesModule,
    OrdersModule,
    DeliveriesModule,
    InvoicesModule,
    ShoppingCartsModule,
  ],
})
export class AppModule {}
