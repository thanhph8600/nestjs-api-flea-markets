import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  id_customer: string;
  @IsNotEmpty()
  id_category: string;
  id_category_detail: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  price: number;
  selling_price: number;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  specifications: object;
  @IsNotEmpty()
  address: string;
  status: string;
  created_at: Date;
  update_at: Date;
}
