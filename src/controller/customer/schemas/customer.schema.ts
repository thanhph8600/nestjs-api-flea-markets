import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustommerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop({ default: 'avata-default.jpg' })
  avata: string;

  @Prop({ default: 1 })
  role: number;

  @Prop({ default: '' })
  refresh_token: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
