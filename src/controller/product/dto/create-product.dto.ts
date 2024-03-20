import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  id_customer: string;

  @ApiProperty()
  @IsNotEmpty()
  id_category: string;

  @ApiProperty()
  id_category_detail: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  selling_price: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  specifications: object;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  status: string;

  created_at: Date;

  update_at: Date;
}
