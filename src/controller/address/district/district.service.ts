import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { District } from './schemas/district.schema';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel('District') private readonly districtModel: Model<District>,
  ) {}
  findAll() {
    return this.districtModel.find().exec();
  }

  findByIDProvince(idProvince: string) {
    console.log(idProvince);
    try {
      const listDistrict = this.districtModel.find({
        _province_id: idProvince,
      });
      return listDistrict;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
