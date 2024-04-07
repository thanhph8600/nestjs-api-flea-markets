import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateMessengerDto } from './dto/update-messenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Messenger } from './schemas/messenger.chat.schema';
import { Model, ObjectId } from 'mongoose';
import { RoomChatService } from '../room-chat/room-chat.service';
import { CreateMessenger as MessengerInterFace } from './interface/messenger.chat.interface';
import {
  RoomChat,
  RoomChatDocument,
} from '../room-chat/schemas/roomChat.chat.schema';

@Injectable()
export class MessengerService {
  constructor(
    @InjectModel('Messenger') private readonly MessengerModel: Model<Messenger>,
    @Inject(forwardRef(() => RoomChatService))
    private readonly roomChatService: RoomChatService,
  ) {}
  async create(createMessengerDto: MessengerInterFace) {
    try {
      const idCustomer = {
        id_customer: [
          createMessengerDto.id_customer,
          createMessengerDto.id_receiver,
        ],
        theLastMess: null,
      };
      const roomChat = (await this.roomChatService.create(
        idCustomer,
      )) as RoomChat;
      createMessengerDto.id_room_chat = roomChat._id;
      return this.MessengerModel.create(createMessengerDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all messenger`;
  }

  findOne(id: string) {
    return `This action returns a #${id} messenger`;
  }

  async findByIdRoomChat(idRoom: string) {
    try {
      const listMessenger = await this.MessengerModel.find({
        id_room_chat: idRoom,
      });
      return listMessenger;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findByIdCustomer(idCustomer: ObjectId, idUser: ObjectId) {
    try {
      const checkRoom = (await this.roomChatService.create({
        id_customer: [idCustomer, idUser],
        theLastMess: null,
      })) as RoomChatDocument;
      const listMessenger = await this.findByIdRoomChat(checkRoom._id);
      return listMessenger;
    } catch (error) {
      console.log('find Mess by Id Customer error \n', error);
      throw new InternalServerErrorException();
    }
  }

  async findTheLastMessByIdRoom(idRoom: string) {
    try {
      const listMessenger = await this.MessengerModel.findOne({
        id_room_chat: idRoom,
      })
        .sort({ created_at: -1 })
        .exec();
      return listMessenger;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  update(id: string, updateMessengerDto: UpdateMessengerDto) {
    console.log(updateMessengerDto);
    return `This action updates a #${id} messenger`;
  }

  remove(id: string) {
    return `This action removes a #${id} messenger`;
  }
}
