import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateMessengerDto {
  @ApiProperty()
  id_room_chat: string;

  @ApiProperty()
  id_customer: ObjectId;

  @ApiProperty()
  messenger: string;

  isWatched: boolean;

  @ApiProperty()
  created_at: Date;
}
