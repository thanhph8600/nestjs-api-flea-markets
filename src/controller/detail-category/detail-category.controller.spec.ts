import { Test, TestingModule } from '@nestjs/testing';
import { DetailCategoryController } from './detail-category.controller';
import { DetailCategoryService } from './detail-category.service';

describe('DetailCategoryController', () => {
  let controller: DetailCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailCategoryController],
      providers: [DetailCategoryService],
    }).compile();

    controller = module.get<DetailCategoryController>(DetailCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
