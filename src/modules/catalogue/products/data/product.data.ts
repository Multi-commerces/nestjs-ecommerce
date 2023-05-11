import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductAvailability, ProductRating } from './product.schema';

interface HasId {
  _id: string;
}

export class ProductAttributes {
  type: string;

  // Getter pour la propriété 'type'
  static get type(): string {
    return 'product';
  }

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
    description: 'Nom du produit du produit',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Description du produit',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    description: 'Image du produit',
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
