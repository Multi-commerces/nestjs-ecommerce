import { ApiProperty } from '@nestjs/swagger';

/**
 * La classe DocumentHATEOS<T> est utilisée pour représenter une ressource unique, elle contient
 * un objet _data qui représente les données de la ressource, ainsi qu'un objet _links qui contient des liens vers des ressources connexes.
 */
export class DocumentHATEOS<T> {
  @ApiProperty({
    readOnly: true,
    description: 'Un objet qui contient des liens vers des ressources connexes',
  })
  links: Record<string, { href: string }>;

  @ApiProperty({
    readOnly: true,
    description: 'Un objet qui contient les données de la ressource.',
  })
  data: T;

  constructor(data: T) {
    this.data = data;
  }

  addLink(rel: string, href: string) {
    if (!this.links) {
      this.links = {};
    }
    this.links[rel] = { href };

    return this;
  }

  static create<T>(data: T): DocumentHATEOS<T> {
    return new DocumentHATEOS<T>(data);
  }
}

/**
 * La classe CollectionHATEOS<T> quant à elle est utilisée pour représenter une collection de ressources.
 * Elle contient des propriétés pour la pagination (page, limit, total) ainsi que des objets _links et _data pour les liens et les données de la collection.
 */
export class CollectionHATEOS<T> {
  @ApiProperty({
    type: Number,
    readOnly: true,
    description: 'Le numéro de la page actuelle',
  })
  page: number;

  @ApiProperty({
    type: Number,
    readOnly: true,
    description: 'Le nombre de item retournés par page',
  })
  limit: number;

  @ApiProperty({
    type: Number,
    readOnly: true,
    description: ' Le nombre total items dans la collection',
  })
  total: number;

  @ApiProperty({
    readOnly: true,
    description: 'Un objet qui contient des liens vers des ressources connexes',
  })
  links: Record<string, { href: string }>;

  @ApiProperty({
    readOnly: true,
    description: 'Un objet qui contient les données de la collection.',
  })
  data: T[];

  constructor(data: T[], links?: Record<string, { href: string }>) {
    this.data = data;
    this.page = 1;
    this.limit = data.length;
    this.total = data.length;

    this.links = links || {};
  }

  addLink(rel: string, href: string): CollectionHATEOS<T> {
    if (!this.links) {
      this.links = {};
    }
    this.links[rel] = { href };
    return this;
  }

  static create<T>(
    data: T[],
    links?: Record<string, { href: string }>,
  ): CollectionHATEOS<T> {
    return new CollectionHATEOS<T>(data, links);
  }
}
