import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'specifications' })
export class Specification extends Document {
  @Prop()
  name: string;

  @Prop()
  value: Array<string>;
}

export const SpecificationSchema = SchemaFactory.createForClass(Specification);
