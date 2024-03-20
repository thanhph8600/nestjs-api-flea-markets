import { Test, TestingModule } from '@nestjs/testing';
import { DetailCategoryService } from './detail-category.service';

describe('DetailCategoryService', () => {
  let service: DetailCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailCategoryService],
    }).compile();

    service = module.get<DetailCategoryService>(DetailCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
