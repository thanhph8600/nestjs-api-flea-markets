import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { History } from './schemas/history.schema';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel('History') private readonly HistoryModel: Model<History>,
  ) {}
  create(createHistoryDto: CreateHistoryDto) {
    try {
      return this.HistoryModel.create(createHistoryDto);
    } catch (error) {
      console.log('erro create history');
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all history`;
  }

  findOne(id: string) {
    return `This action returns a #${id} history`;
  }

  findByIdWallet(idWallet: ObjectId) {
    try {
      return this.HistoryModel.find({ id_wallet: idWallet })
        .sort({ created_at: -1 })
        .exec();
    } catch (error) {
      console.log('erro find by id history');
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  update(id: string, updateHistoryDto: UpdateHistoryDto) {
    console.log(updateHistoryDto);
    return `This action updates a #${id} history`;
  }

  remove(id: string) {
    return `This action removes a #${id} history`;
  }
}
