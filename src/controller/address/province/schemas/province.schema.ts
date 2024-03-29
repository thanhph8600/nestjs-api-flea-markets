import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'province' })
export class Province extends Document {
  @Prop()
  id: string;

  @Prop()
  _name: string;

  @Prop()
  code: string;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
