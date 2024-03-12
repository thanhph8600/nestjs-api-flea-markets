import { Document } from 'mongoose';

export interface Customer extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: number;
  refresh_token: string;
}
