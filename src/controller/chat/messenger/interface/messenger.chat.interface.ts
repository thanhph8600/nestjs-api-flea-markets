import { Document, ObjectId } from 'mongoose';

export interface Messenger extends Document {
  _id: string;
  id_room_chat: string;
  id_customer: ObjectId;
  id_receiver: ObjectId;
  id_product: ObjectId;
  thumbnail: string;
  messenger: string;
  isWatched: boolean;
  created_at: Date;
}

export interface CreateMessenger {
  id_room_chat: string | null;
  id_customer: ObjectId | null;
  id_receiver: ObjectId | null;
  messenger: string | null;
  id_product: ObjectId | null;
  thumbnail: string | null;
}
