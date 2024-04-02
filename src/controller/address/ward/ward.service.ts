import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ward } from './schemas/ward.schema';

@Injectable()
export class WardService {
  constructor(@InjectModel('Ward') private readonly wardModel: Model<Ward>) {}
  findAll() {
    return this.wardModel.find().exec();
  }

  findByIdDistrict(idDistrict: string) {
    try {
      const listDistrict = this.wardModel.find({
        _district_id: idDistrict,
      });
      if (!listDistrict) {
        return new HttpException('!ID Province', 400);
      }
      return listDistrict;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
