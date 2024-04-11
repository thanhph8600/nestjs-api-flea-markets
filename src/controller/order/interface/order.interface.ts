import { Document, ObjectId } from 'mongoose';

export interface Notification extends Document {
  id_seller: ObjectId;
  id_buyer: ObjectId;
  id_product: ObjectId;
  price: number;
  address: object;
  status: string;
  created_at: Date;
}
