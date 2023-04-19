import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { CollectionHATEOS, DocumentHATEOS } from 'src/app.responses.hal';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, DocumentHATEOS<T> | CollectionHATEOS<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<DocumentHATEOS<T> | CollectionHATEOS<T>> {
    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          const collection = CollectionHATEOS.create<T>(data);
          response.setHeader('X-Total-Count', collection.total.toString());
          return collection;
        } else {
          const document = DocumentHATEOS.create<T>(data);
          return document;
        }
      }),
    );
  }
}
