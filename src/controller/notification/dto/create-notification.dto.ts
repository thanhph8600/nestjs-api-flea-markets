import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  id_customer: ObjectId;

  id_product: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  created_at: Date;

  isWatched: boolean;

  @ApiProperty()
  @IsNotEmpty()
  link: string;

  isNew: boolean;
}
