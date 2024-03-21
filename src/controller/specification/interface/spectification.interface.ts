import { Document } from 'mongoose';

export interface Specification extends Document {
  name: string;
  value: Array<string>;
}
