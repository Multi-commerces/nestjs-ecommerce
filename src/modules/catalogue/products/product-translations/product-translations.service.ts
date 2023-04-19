import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductLang, ProductLangDocument } from '../data/product.schema';

@Injectable()
export class ProductTranslationsService {
  constructor(
    @InjectModel(ProductLang.name)
    private readonly productLangModel: Model<ProductLangDocument>,
  ) {}

  async findLangs(): Promise<ProductLang[]> {
    const data = await this.productLangModel.find().exec();

    return data;
  }
}
