import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interface/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (category) {
      throw new InternalServerErrorException('Tên đã được dùng');
    }
    try {
      const createdCategory =
        await this.categoryModel.create(createCategoryDto);
      return createdCategory;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    try {
      return this.categoryModel.find().exec();
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  findOne(id: string) {
    try {
      return this.categoryModel.findById(id);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return this.categoryModel.findByIdAndUpdate(
        { _id: id },
        updateCategoryDto,
      );
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    try {
      return this.categoryModel.findByIdAndDelete(id);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }
}
