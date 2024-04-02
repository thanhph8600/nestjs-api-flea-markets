import { Document, ObjectId } from 'mongoose';

export interface Product extends Document {
  id_customer: ObjectId;
  id_category: ObjectId;
  id_category_detail: ObjectId;
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
