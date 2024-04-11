import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateWalletDto {
  @ApiProperty()
  @IsNotEmpty()
  id_customer: ObjectId;

  @ApiProperty()
  current_amount: number;

  @ApiProperty()
  sales_tax: number;
}
