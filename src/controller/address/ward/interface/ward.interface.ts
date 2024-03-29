import { Document } from 'mongoose';

export interface Ward extends Document {
  id: string;
  _name: string;
  _prefix: string;
  _province_id: string;
  _district_id: string;
}
