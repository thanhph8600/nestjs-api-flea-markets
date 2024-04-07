import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRoomChatDto } from './dto/create-room-chat.dto';
import { UpdateRoomChatDto } from './dto/update-room-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { RoomChat } from './schemas/roomChat.chat.schema';
import { MessengerService } from '../messenger/messenger.service';

@Injectable()
export class RoomChatService {
  constructor(
    @InjectModel('RoomChat') private readonly RoomChatModel: Model<RoomChat>,
    @Inject(forwardRef(() => MessengerService))
    private readonly messengerService: MessengerService,
  ) {}
  async create(createRoomChatDto: CreateRoomChatDto) {
    try {
      if (createRoomChatDto.id_customer.length < 2) {
        return new HttpException('Số người phải hơn 2', 405);
      }
      if (
        createRoomChatDto.id_customer[0] == createRoomChatDto.id_customer[1]
      ) {
        return new HttpException('Không thể trò chuyện với chính mình', 405);
      }
      const checkListRoom = await this.checkRecords(
        createRoomChatDto.id_customer,
      );
      if (checkListRoom) {
        return checkListRoom;
      }
      const room = await this.RoomChatModel.create(createRoomChatDto);
      return room;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.RoomChatModel.find().lean();
  }

  async findByIdCustomer(idCustomer: string) {
    try {
      let listRoomChat = await this.RoomChatModel.find({
        id_customer: idCustomer,
      })
        .populate('id_customer')
        .lean();
      for (const room of listRoomChat) {
        room.theLastMess = await this.messengerService.findTheLastMessByIdRoom(
          room._id,
        );
      }

      listRoomChat = listRoomChat.filter((item) => item.theLastMess !== null);
      listRoomChat.sort((a, b) => {
        const dateA = new Date(a.theLastMess.created_at);
        const dateB = new Date(b.theLastMess.created_at);
        return dateB.getTime() - dateA.getTime();
      });
      return this.handleThumbnailCustomer(listRoomChat);
    } catch (error) {
      console.log('Error get list Room chat by Id Customer \n', error);
      throw new InternalServerErrorException();
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} roomChat`;
  }

  update(id: string, updateRoomChatDto: UpdateRoomChatDto) {
    console.log(updateRoomChatDto);
    return `This action updates a #${id} roomChat`;
  }

  remove(id: string) {
    return `This action removes a #${id} roomChat`;
  }

  async checkRecords(idArray) {
    try {
      const objectIdArray = idArray.map(
        (id) => new mongoose.Types.ObjectId(id),
      );
      const results = await this.RoomChatModel.find({
        id_customer: { $all: objectIdArray },
      });
      if (results.length > 0) {
        return results[0];
      } else {
        return false;
      }
    } catch {
      console.error('Phòng chưa được tạo');
    }
  }

  handleThumbnailCustomer(listCustomer) {
    listCustomer.forEach((room) => {
      // Loop through each id_customer object in the id_customer array
      room.id_customer.forEach((customer) => {
        customer.avata = `${process.env.URL_APi}uploads/${customer.avata}`;
      });
    });
    return listCustomer;
  }
}
