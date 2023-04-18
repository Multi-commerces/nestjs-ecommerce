import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ProductAvailability, ProductRating } from './product.schema';
import { IsOptionalNotEmpty } from '../../../validators/validators';

interface HasId {
	_id: string;
}

export class DocumentHAL<T> {
	_links: Record<string, { href: string }>;

	_relationships;

	_embeded: Record<string, [T]>;
}

export class ProductAttributes {
	@ApiProperty({
		type: String,
		description: 'Nom du produit'
	})
	@IsString()
	name: string;

	@ApiProperty({
		type: String,
		description: 'Description du produit'
	})
	@IsString()
	description: string;

	@ApiProperty({
		type: Number,
		description: 'Prix du produit'
	})
	@IsNumber()
	price: number;

	@ApiProperty({
		type: String,
		description: 'Référence unique du produit'
	})
	@IsString()
	reference: string;

	@ApiProperty({
		type: String,
		description: 'Image du produit'
	})
	@IsString()
	image: string;

	availability: ProductAvailability;

	rating: ProductRating;
}

/**
 * Bean de présentation pour la lecture du produit
 */
export class ProductReadData extends ProductAttributes implements HasId {
	@ApiProperty({
		name: 'id',
		readOnly: true,
		type: String,
		description: 'Nom du produit'
	})
	_id: string;

	_embedded: any;
}

/**
 * Bean de présentation pour l'enregistrement
 */
export class ProductSaveData extends ProductAttributes {}

/**
 * Bean de présentation pour l'enregistrement (partiel)
 */
export class ProductMergeData extends PartialType(ProductAttributes) {
	@ApiPropertyOptional()
	@IsOptionalNotEmpty()
	name: string;

	@ApiPropertyOptional()
	@IsOptionalNotEmpty()
	description: string;

	@ApiPropertyOptional()
	@IsOptionalNotEmpty()
	price: number;

	@ApiPropertyOptional()
	@IsOptionalNotEmpty()
	image: string;

	@ApiPropertyOptional()
	@IsOptionalNotEmpty()
	reference: string;
}
