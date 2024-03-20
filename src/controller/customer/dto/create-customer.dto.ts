import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 10)
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  role: number;

  @ApiProperty()
  refresh_token: string;
}
