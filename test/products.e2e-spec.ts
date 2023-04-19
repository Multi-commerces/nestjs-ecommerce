import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/products', () => {
    let createdProduct: any;

    it('POST /products', async () => {
      const product = {
        price: 9.99,
        reference: 'ABCD1234',
      };
      const response = await request(app.getHttpServer())
        .post('/products')
        .send(product)
        .expect(201);

      createdProduct = response.body;
      expect(createdProduct._data.price).toEqual(product.price);
      expect(createdProduct._data.reference).toEqual(product.reference);
    });

    it('PATCH /products/:id', async () => {
      const updatedProduct = {
        price: 32,
      };
      const response = await request(app.getHttpServer())
        .patch(`/products/${createdProduct._data._id}`)
        .send(updatedProduct)
        .expect(200);

      const body = response.body;
      expect(body._data.price).toEqual(updatedProduct.price);
      expect(body._data.reference).toEqual(createdProduct._data.reference);
    });
  });
});
