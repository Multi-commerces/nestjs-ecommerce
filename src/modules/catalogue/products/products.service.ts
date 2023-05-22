import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Product,
  ProductDocument,
  ProductLang,
  ProductLangDocument,
} from './data/product.schema';
import {
  ProductReadData,
  ProductSaveData,
  ProductMergeData,
} from './data/product.data';
import { ProductMapper } from './data/product.mapper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,

    @InjectModel(ProductLang.name)
    private readonly productLangModel: Model<ProductLangDocument>,
  ) {}

  async findAll(): Promise<ProductReadData[]> {
    const documents = await this.productModel
      .find()
      .populate('product-translations')
      .exec();

    console.debug(documents);

    return documents.map((doc) => ProductMapper.toData(doc));
  }

  async findOne(_id: string): Promise<ProductReadData> {
    const product = await this.productModel
      .findById(_id)
      .populate('product-translations')
      .exec();
    if (!product) {
      throw new NotFoundException({
        objectOrError: `Product ${_id} not found ${product}`,
        descriptionOrOptions: 'The product not exist or befor delete ',
      });
    }

    return ProductMapper.toData(product.toObject());
  }

  async create(product: ProductSaveData): Promise<ProductReadData> {
    const schema = ProductMapper.toSchema(product);

    // création du produit
    const savedProduct = await new this.productModel(schema).save();

    // Création des traductions
    const langs = [
      {
        languageCode: 'fr',
        key: 'Titre',
        name: product.name ?? 'Nouveau produit (fr)',
        description: product.description ?? 'Nouveau produit (fr)',
        meta_title: 'meta_title',
        meta_description: 'meta_description',
        meta_keywords: '',
      },
    ];

    const savedLangs = await Promise.all(
      langs.map((lang) =>
        new this.productLangModel({
          ...lang,
          product: savedProduct._id,
        }).save(),
      ),
    );

    savedProduct['product-translations'] = savedLangs.map((lang) => lang._id);
    await savedProduct.save();

    return this.findOne(savedProduct._id);
  }

  async merge(id: string, product: ProductMergeData): Promise<ProductReadData> {
    console.log('product (opération merge) : ' + JSON.stringify(product));
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $set: product },
      { new: true, runValidators: true },
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    console.log('updatedProduct : ' + JSON.stringify(updatedProduct));
    return ProductMapper.toData(updatedProduct.toObject());
  }
}
