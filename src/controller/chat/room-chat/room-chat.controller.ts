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
import { RoomChatService } from './room-chat.service';
import { CreateRoomChatDto } from './dto/create-room-chat.dto';
import { UpdateRoomChatDto } from './dto/update-room-chat.dto';
import { AuthGuard } from 'src/middleware/auth/auth.guard';

@Controller('room-chat')
export class RoomChatController {
  constructor(private readonly roomChatService: RoomChatService) {}

  @Post()
  create(@Body() createRoomChatDto: CreateRoomChatDto) {
    return this.roomChatService.create(createRoomChatDto);
  }

  @Get()
  findAll() {
    return this.roomChatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomChatService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('customer/:id')
  findByIdCustomer(@Request() req) {
    return this.roomChatService.findByIdCustomer(req.user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomChatDto: UpdateRoomChatDto,
  ) {
    return this.roomChatService.update(id, updateRoomChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomChatService.remove(id);
  }
}
