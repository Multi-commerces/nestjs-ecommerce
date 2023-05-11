import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { CollectionHATEOS, DocumentHATEOS } from '../app.responses.hal';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, DocumentHATEOS<T> | CollectionHATEOS<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<DocumentHATEOS<T> | CollectionHATEOS<T>> {
    const response: Response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        const baseUrl = request.protocol + '://' + request.get('host');
        const selfUrl = baseUrl + request.originalUrl;
        if (Array.isArray(data)) {
          const collection = new CollectionHATEOS<T>(data);

          response.setHeader('X-Total-Count', collection.total.toString());
          collection.addLink('self', selfUrl);
          return collection;
        } else {
          const document = this.transformData(data, selfUrl);

          return document;
        }
      }),
    );
  }

  private transformData(data: any, selfUrl: string): any {
    const document = new DocumentHATEOS<T>(data);
    document.addLink('self', selfUrl);

    if ('product-translations' in data._embedded) {
      const translations = data._embedded['product-translations'];
      if (Array.isArray(translations)) {
        // Faire quelque chose avec les traductions ici
        document.addLink('product-translations', '/products/$id/translations');
      }
    }

    return document;
  }
}
