import { Document, ObjectId } from 'mongoose';

export interface Notification extends Document {
  id_customer: ObjectId;
  id_product: ObjectId;
  content: string;
  description: string;
  created_at: Date;
  isWatched: boolean;
  link: string;
  isNew: boolean;
}
