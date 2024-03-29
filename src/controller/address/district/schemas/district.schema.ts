import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'district' })
export class District extends Document {
  @Prop()
  id: string;

  @Prop()
  _name: string;

  @Prop()
  _prefix: string;

  @Prop()
  _province_id: string;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
