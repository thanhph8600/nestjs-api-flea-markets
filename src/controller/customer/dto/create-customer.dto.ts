import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 10)
  phone: string;

  avata: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ default: 1 })
  role: number;

  @ApiProperty()
  refresh_token: string;

  isBan: boolean;
}
