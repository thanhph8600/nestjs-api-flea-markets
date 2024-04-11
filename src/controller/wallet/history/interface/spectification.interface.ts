import { Document, ObjectId } from 'mongoose';

export interface History extends Document {
  id_wallet: ObjectId;
  transaction: string;
  content: string;
  amount: number;
  current_amount: number;
  created_at: Date;
}
