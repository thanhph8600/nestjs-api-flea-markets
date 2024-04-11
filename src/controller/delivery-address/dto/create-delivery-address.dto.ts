import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateDeliveryAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  id_customer: ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  email: string;

  @ApiProperty()
  @IsNotEmpty()
  address: object;

  @ApiProperty()
  isDefault: boolean;
}
