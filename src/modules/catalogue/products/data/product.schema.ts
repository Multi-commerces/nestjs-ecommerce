import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * La disponibilité du produit (par exemple, en stock, en rupture de stock).
 */
export enum ProductAvailability {
  InStock = 'in_stock',
  OutOfStock = 'out_of_stock',
  PreOrder = 'pre_order',
  Discontinued = 'discontinued',
}

/**
 * La note moyenne du produit.
 */
export enum ProductRating {
  OneStar = 1,
  TwoStars = 2,
  ThreeStars = 3,
  FourStars = 4,
  FiveStars = 5,
}

export type ProductDocument = Product & Document;
@Schema({ timestamps: true })
export class Product {
  @Prop()
  reference: string;

  @Prop()
  price: number;

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  availability: ProductAvailability;

  @Prop()
  rating: ProductRating;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'ProductLang' }],
  })
  'product-translations': ProductLang[];

  @Prop()
  'product-variations': [
    {
      type: Types.ObjectId;
      ref: 'Product';
    },
  ];

  @Prop()
  'product-relationships': [
    {
      type: Types.ObjectId;
      ref: 'Product';
    },
  ];
}
export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductLangDocument = ProductLang & Document;
@Schema()
export class ProductLang {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop()
  languageCode: string;

  @Prop()
  key: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  meta_title: string;

  @Prop()
  meta_description: string;

  @Prop()
  meta_keywords: string;
}

export const ProductLangSchema = SchemaFactory.createForClass(ProductLang);
// ProductLangSchema.index({ product: 1, languageCode: 1 }, { unique: true });

export type TagTranslationDocument = TagTranslation & Document;

@Schema()
export class TagTranslation {
  @Prop()
  languageCode: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const TagTranslationSchema =
  SchemaFactory.createForClass(TagTranslation);
