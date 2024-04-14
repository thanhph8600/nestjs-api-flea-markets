import { Document, ObjectId } from 'mongoose';

export interface Notification extends Document {
  id_seller: ObjectId;
  id_buyer: ObjectId;
  id_product: ObjectId;
  price: number;
  address: object;
  status:
    | 'waiting_confirm'
    | 'processing'
    | 'delivering'
    | 'delivered'
    | 'successful_delivery'
    | 'cancel_exp';
  created_at: Date;
}
