import { Document, ObjectId } from 'mongoose';

export interface Messenger extends Document {
  _id: string;
  id_room_chat: string;
  id_customer: ObjectId;
  id_receiver: ObjectId;
  messenger: string;
  isWatched: boolean;
  created_at: Date;
}

export interface CreateMessenger {
  id_room_chat: string;
  id_customer: ObjectId;
  id_receiver: ObjectId;
  messenger: string;
}
