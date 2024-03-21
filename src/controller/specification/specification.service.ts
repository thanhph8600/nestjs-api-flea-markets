import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specification } from './interface/spectification.interface';

@Injectable()
export class SpecificationService {
  constructor(
    @InjectModel('Specification')
    private readonly specificationModel: Model<Specification>,
  ) {}

  async create(createSpecificationDto: CreateSpecificationDto) {
    const specification = await this.specificationModel.findOne({
      name: createSpecificationDto.name,
    });
    if (specification) {
      throw new InternalServerErrorException('Tên đã được dùng');
    }
    try {
      const createdCategory = await this.specificationModel.create(
        createSpecificationDto,
      );
      return createdCategory;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.specificationModel.find().exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} specification`;
  }

  update(id: string, updateSpecificationDto: UpdateSpecificationDto) {
    try {
      return this.specificationModel.findByIdAndUpdate(
        { _id: id },
        updateSpecificationDto,
      );
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    try {
      return this.specificationModel.findByIdAndDelete(id);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }
}
