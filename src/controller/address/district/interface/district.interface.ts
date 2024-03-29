import { Document } from 'mongoose';

export interface District extends Document {
  id: string;
  _name: string;
  _prefix: string;
  _province_id: string;
}
