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

  create(createDetailCategoryDto: CreateDetailCategoryDto) {
    console.log(createDetailCategoryDto);
    return 'This action adds a new detailCategory';
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
    console.log(id);
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
    console.log(updateDetailCategoryDto);
    return `This action updates a #${id} detailCategory`;
  }

  remove(id: string) {
    return `This action removes a #${id} detailCategory`;
  }
}
