import { forwardRef, Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Messenger, MessengerSchema } from './schemas/messenger.chat.schema';
import { RoomChatModule } from '../room-chat/room-chat.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Messenger.name, schema: MessengerSchema },
    ]),
    forwardRef(() => RoomChatModule),
  ],
  controllers: [MessengerController],
  providers: [MessengerService],
  exports: [MessengerService],
})
export class MessengerModule {}
