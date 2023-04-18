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
} from './data/product-data';
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
    return documents.map((doc) => ProductMapper.toData(doc.toObject()));
  }

  async findLangs(): Promise<ProductLang[]> {
    const data = await this.productLangModel.find().exec();

    return data;
  }

  async findOne(_id: string): Promise<ProductReadData> {
    const product = await this.productModel.findById(_id).exec();
    if (!product) {
      throw new NotFoundException({
        objectOrError: `Product ${_id} not found ${product}`,
        descriptionOrOptions: 'The product not exist or befor delete ',
      });
    }

    return ProductMapper.toData(product.toObject());
  }

  async create(product: ProductSaveData): Promise<ProductReadData> {
    const document = ProductMapper.toSchema(product);
    const newProduct = new this.productModel(document);

    const savedProduct = await newProduct.save();
    console.log('savedProduct : ' + JSON.stringify(savedProduct));
    const langs = [
      {
        productId: savedProduct._id,
        languageCode: 'fr',
        key: 'Titre',
        name: 'Nouveau produit (fr)',
        description: 'Nouveau produit (fr)',
      },
      {
        productId: savedProduct._id,
        languageCode: 'en',
        key: 'Title',
        name: 'Nouveau produit (en)',
        description: 'New product (en)',
      },
    ];
    console.log('newLangs : ' + JSON.stringify(langs));

    // Ajouter les éléments au fur et à mesure de leur création
    for (const lang of langs) {
      const savedLang = await this.productLangModel.create(lang);
      if (!savedProduct['translated-products'])
        savedProduct['translated-products'] = [];

      savedProduct['translated-products'].push(savedLang._id);
    }
    await savedProduct.save();

    return ProductMapper.toData(savedProduct);
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
