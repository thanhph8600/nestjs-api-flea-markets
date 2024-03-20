import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'category_detail' })
export class DetailCategory extends Document {
  @Prop()
  id_category: string;

  @Prop()
  name: string;

  @Prop()
  thumbnail: string;

  @Prop()
  link: string;
}

export const DetailCategorySchema =
  SchemaFactory.createForClass(DetailCategory);
