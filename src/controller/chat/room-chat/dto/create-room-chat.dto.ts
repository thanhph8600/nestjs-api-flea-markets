import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateRoomChatDto {
  @ApiProperty()
  @IsNotEmpty()
  id_customer: Array<ObjectId>;

  theLastMess: ObjectId;
}
