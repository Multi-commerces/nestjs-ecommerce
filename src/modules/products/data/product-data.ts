import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
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
    type: Number,
    description: 'Prix du produit',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
    description: 'Référence unique du produit',
  })
  @IsString()
  reference: string;

  @ApiProperty({
    type: String,
    description: 'Image du produit',
  })
  @IsOptional()
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
    description: 'Nom du produit',
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
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  image: string;

  @ApiPropertyOptional()
  @IsOptional()
  reference: string;
}
