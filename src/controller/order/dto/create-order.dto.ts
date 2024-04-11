import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  id_seller: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  id_buyer: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  id_product: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  address: object;

  @ApiProperty()
  status: string;

  @ApiProperty()
  created_at: Date;
}
