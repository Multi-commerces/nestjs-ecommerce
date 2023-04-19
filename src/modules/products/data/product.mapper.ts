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

  static toData(
    schema: ProductDocument,
    options?: ProductWithOptions,
  ): ProductReadData {
    // Copie les propriétés dans la nouvelle instance
    const data = new ProductReadData();
    data._id = schema._id;
    data.reference = schema.reference;
    data.price = schema.price;
    data.image = schema.image;

    // Personnalisation de la réponse en fonction des besoins de l'application.
    if (!options) {
      // Si l'option withTranslations est activée, les traductions du produit seront incluses.
      if (!options || options.withTranslations) {
        data._embedded = {
          'product-translations': data['product-translations'] ?? [],
        };
      }
      // Si l'option withRelationships est activée, les relations du produit seront incluses.
      if (options && options.withRelationships) {
        {
          data._embedded = {
            'product-relationships': data['product-relationships'] ?? [],
          };
        }
      }
    }

    return data;
  }
}
