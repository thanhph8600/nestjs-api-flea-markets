import { Document } from 'mongoose';

export interface Product extends Document {
  id_customer: string;
  id_category: string;
  id_category_detail: string;
  title: string;
  price: number;
  selling_price: number;
  description: string;
  specifications: object;
  address: object;
  status: string;
  thumbnail: object;
  created_at: Date;
  update_at: Date;
}
