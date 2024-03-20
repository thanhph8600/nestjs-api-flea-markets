import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetailCategoryService } from './detail-category.service';
import { CreateDetailCategoryDto } from './dto/create-detail-category.dto';
import { UpdateDetailCategoryDto } from './dto/update-detail-category.dto';
import { Public } from 'src/middleware/auth/public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('detail-category')
@Controller('detail-category')
export class DetailCategoryController {
  constructor(private readonly detailCategoryService: DetailCategoryService) {}

  @Post()
  create(@Body() createDetailCategoryDto: CreateDetailCategoryDto) {
    return this.detailCategoryService.create(createDetailCategoryDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.detailCategoryService.findAll();
  }

  @Public()
  @Get('category/:id')
  findByIdCategory(@Param('id') id: string) {
    return this.detailCategoryService.findByIdCategory(id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailCategoryDto: UpdateDetailCategoryDto,
  ) {
    return this.detailCategoryService.update(id, updateDetailCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailCategoryService.remove(id);
  }
}
