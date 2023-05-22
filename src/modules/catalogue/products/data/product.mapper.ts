import { Product, ProductDocument } from './product.schema';
import {
  ProductReadData,
  ProductSaveData,
  ProductMergeData,
} from './product.data';

export class ProductWithOptions {
  withTranslations?: boolean;
  withRelationships?: boolean;
}

export class ProductMapper {
  static toSchema(data: ProductSaveData | ProductMergeData): Product {
    const document = new Product();
    document.reference = data.reference;
    document.price = data.price;
    document.image = data.image;

    return document;
  }

  static toData(schema: ProductDocument): ProductReadData {
    // Copie les propriétés dans la nouvelle instance
    const data = new ProductReadData();
    data._id = schema._id;
    data.reference = schema.reference;

    data.price = schema.price;
    data.image = schema.image;

    const translations = schema['product-translations'];

    const translation = translations.find((t) => t.languageCode === 'fr');
    data.name = translation?.name;
    data.description = translation?.description;

    // Personnalisation de la réponse en fonction des besoins de l'application.
    data._embedded = {
      // Si l'option withTranslations est activée, les traductions du produit seront incluses.
      'product-translations': schema['product-translations'] ?? [],
      // Si l'option withRelationships est activée, les relations du produit seront incluses.
      'product-relationships': schema['product-relationships'] ?? [],
    };

    return data;
  }
}
