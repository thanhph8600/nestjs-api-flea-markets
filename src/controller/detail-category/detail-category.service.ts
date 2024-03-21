import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDetailCategoryDto } from './dto/create-detail-category.dto';
import { UpdateDetailCategoryDto } from './dto/update-detail-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DetailCategory } from './schemas/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class DetailCategoryService {
  constructor(
    @InjectModel('DetailCategory')
    private readonly detailCategoryModel: Model<DetailCategory>,
  ) {}

  async create(createDetailCategoryDto: CreateDetailCategoryDto) {
    const category = await this.detailCategoryModel.findOne({
      name: createDetailCategoryDto.name,
    });
    if (category) {
      throw new InternalServerErrorException('Tên đã được dùng');
    }
    try {
      const createdCategory = await this.detailCategoryModel.create(
        createDetailCategoryDto,
      );
      return createdCategory;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    try {
      return this.detailCategoryModel.find().exec();
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  findByIdCategory(id: string) {
    try {
      return this.detailCategoryModel.find({ id_category: id });
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  findOne(id: string) {
    try {
      return this.detailCategoryModel.findById(id);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  update(id: string, updateDetailCategoryDto: UpdateDetailCategoryDto) {
    try {
      return this.detailCategoryModel.findByIdAndUpdate(
        { _id: id },
        updateDetailCategoryDto,
      );
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    try {
      return this.detailCategoryModel.findByIdAndDelete(id);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }
}
