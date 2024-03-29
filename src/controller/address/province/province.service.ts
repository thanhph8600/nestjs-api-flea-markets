import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Province } from './schemas/province.schema';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectModel('Province') private readonly provinceModel: Model<Province>,
  ) {}
  findAll() {
    console.log('get province');
    return this.provinceModel.find().exec();
  }
}
