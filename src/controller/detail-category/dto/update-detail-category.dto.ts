import { PartialType } from '@nestjs/swagger';
import { CreateDetailCategoryDto } from './create-detail-category.dto';

export class UpdateDetailCategoryDto extends PartialType(
  CreateDetailCategoryDto,
) {}
