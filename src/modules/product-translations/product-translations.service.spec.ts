import { Test, TestingModule } from '@nestjs/testing';
import { ProductTranslationsService } from './product-translations.service';

describe('ProductTranslationsService', () => {
  let service: ProductTranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductTranslationsService],
    }).compile();

    service = module.get<ProductTranslationsService>(
      ProductTranslationsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
