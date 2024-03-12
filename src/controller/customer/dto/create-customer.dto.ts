import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(10, 10)
  phone: string;

  @IsNotEmpty()
  password: string;
  role: number;
  refresh_token: string;
}
