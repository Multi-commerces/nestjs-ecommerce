import { Product } from './product.schema';
import { ProductReadData, ProductSaveData, ProductMergeData } from './product-data';

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

	static toData(schema: Product, options?: ProductWithOptions): ProductReadData {
		const data = new ProductReadData();

		// Copie les propriétés dans la nouvelle instance
		for (const prop of Object.getOwnPropertyNames(schema)) {
			if (data.hasOwnProperty(prop)) data[prop] = schema[prop];
		}

		// Personnalisation de la réponse en fonction des besoins de l'application.
		if (options) {
			// Si l'option withTranslations est activée, les traductions du produit seront incluses.
			if (options.withTranslations) {
				data._embedded = { 'product-translations': data['product-translations'] ?? [] };
			}
			// Si l'option withRelationships est activée, les relations du produit seront incluses.
			if (options.withRelationships) {
				{
					data._embedded = { 'product-relationships': data['product-relationships'] ?? [] };
				}
			}
		}

		return data;
	}
}
