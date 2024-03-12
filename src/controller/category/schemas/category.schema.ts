import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  thumbnail: string;

  @Prop()
  link: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
