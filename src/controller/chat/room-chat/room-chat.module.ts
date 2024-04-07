import { forwardRef, Module } from '@nestjs/common';
import { RoomChatService } from './room-chat.service';
import { RoomChatController } from './room-chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomChat, RoomChatSchema } from './schemas/roomChat.chat.schema';
import { MessengerModule } from '../messenger/messenger.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomChat.name, schema: RoomChatSchema },
    ]),
    forwardRef(() => MessengerModule),
  ],
  controllers: [RoomChatController],
  providers: [RoomChatService],
  exports: [RoomChatService],
})
export class RoomChatModule {}
