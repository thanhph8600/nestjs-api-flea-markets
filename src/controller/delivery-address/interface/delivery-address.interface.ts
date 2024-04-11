import { Document, ObjectId } from 'mongoose';

export interface DeliveryAddress extends Document {
  _id: ObjectId;
  id_customer: ObjectId;
  name: string;
  phone: string;
  email: string;
  address: object;
  isDefault: boolean;
}
