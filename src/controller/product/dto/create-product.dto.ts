import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  id_customer: string;

  @ApiProperty()
  id_category: string;

  @ApiProperty()
  id_category_detail: string;

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
  address: object;

  @ApiProperty()
  status: string;

  thumbnail: object;

  created_at: Date;

  update_at: Date;
}
