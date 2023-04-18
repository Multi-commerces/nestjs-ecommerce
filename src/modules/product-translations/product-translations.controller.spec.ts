import { Test, TestingModule } from '@nestjs/testing';
import { ProductTranslationsController } from './product-translations.controller';

describe('ProductTranslationsController', () => {
  let controller: ProductTranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTranslationsController],
    }).compile();

    controller = module.get<ProductTranslationsController>(ProductTranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
