import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'ward' })
export class Ward extends Document {
  @Prop()
  id: string;

  @Prop()
  _name: string;

  @Prop()
  _prefix: string;

  @Prop()
  _province_id: string;

  @Prop()
  _district_id: string;
}

export const WardSchema = SchemaFactory.createForClass(Ward);
