import { Document } from 'mongoose';

export interface Category extends Document {
  id_category: string;
  name: string;
  thumbnail: string;
  link: string;
  specification: Array<string>;
}
