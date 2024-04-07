import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { UpdateMessengerDto } from './dto/update-messenger.dto';
import { AuthGuard } from 'src/middleware/auth/auth.guard';
import { ObjectId } from 'mongoose';
import { CreateMessenger } from './interface/messenger.chat.interface';

@Controller('messenger')
export class MessengerController {
  constructor(private readonly messengerService: MessengerService) {}

  @UseGuards(AuthGuard)
  @Post(':idCustomer')
  create(
    @Param('idCustomer') idCustomer: ObjectId,
    @Request() req,
    @Body() messenger: { messenger: string },
  ) {
    const dataCreate: CreateMessenger = {
      id_room_chat: '',
      id_customer: req.user.sub,
      id_receiver: idCustomer,
      messenger: messenger.messenger,
    };
    return this.messengerService.create(dataCreate);
  }

  @Get()
  findAll() {
    return this.messengerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messengerService.findOne(id);
  }

  @Get('room-chat/:idRoom')
  findByIdRoom(@Param('idRoom') idRoom: string) {
    return this.messengerService.findByIdRoomChat(idRoom);
  }

  @UseGuards(AuthGuard)
  @Get('customer/:idCustomer')
  findByIdCustomer(@Param('idCustomer') idCustomer: ObjectId, @Request() req) {
    return this.messengerService.findByIdCustomer(idCustomer, req.user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessengerDto: UpdateMessengerDto,
  ) {
    return this.messengerService.update(id, updateMessengerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messengerService.remove(id);
  }
}
