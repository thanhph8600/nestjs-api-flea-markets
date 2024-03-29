import { Document } from 'mongoose';

export interface Province extends Document {
  id: string;
  _name: string;
  code: string;
}
