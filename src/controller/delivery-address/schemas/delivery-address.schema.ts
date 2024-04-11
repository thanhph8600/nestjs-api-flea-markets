import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Schema as MongooseSchema,
  ObjectId,
  SchemaTypes,
  Document,
} from 'mongoose';

@Schema({ collection: 'delivery_address' })
export class DeliveryAddress extends Document {
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Customer' }] })
  id_customer: ObjectId;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: SchemaTypes.Mixed })
  address: object;

  @Prop()
  isDefault: boolean;
}

export const DeliveryAddressSchema =
  SchemaFactory.createForClass(DeliveryAddress);
