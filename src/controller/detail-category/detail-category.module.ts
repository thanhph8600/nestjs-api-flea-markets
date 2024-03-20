import { Module } from '@nestjs/common';
import { DetailCategoryService } from './detail-category.service';
import { DetailCategoryController } from './detail-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DetailCategory,
  DetailCategorySchema,
} from './schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DetailCategory.name,
        schema: DetailCategorySchema,
      },
    ]),
  ],
  controllers: [DetailCategoryController],
  providers: [DetailCategoryService],
})
export class DetailCategoryModule {}
