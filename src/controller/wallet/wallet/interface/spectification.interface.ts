import { Document, ObjectId } from 'mongoose';

export interface Wallet extends Document {
  id_customer: ObjectId;
  current_amount: number;
  sales_tax: number;
}
