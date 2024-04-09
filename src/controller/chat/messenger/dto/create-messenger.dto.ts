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
  id_product: ObjectId;
  thumbnail: string;

  @ApiProperty()
  created_at: Date;
}
