import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateHistoryDto {
  @ApiProperty()
  @IsNotEmpty()
  id_wallet: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  transaction: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  amount: number;

  current_amount: number;

  @ApiProperty()
  created_at: Date;
}
