import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateProductDto {
  @ApiProperty()
  id_customer: ObjectId;

  @ApiProperty()
  id_category: ObjectId;

  @ApiProperty()
  id_category_detail: ObjectId;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  selling_price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  specifications: object;

  @ApiProperty()
  address: Array<string>;

  @ApiProperty()
  status: string;

  thumbnail: object;

  created_at: Date;

  end_at: Date;
  isHidden: boolean;
}
