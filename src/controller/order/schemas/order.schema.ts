import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ObjectId,
  Schema as MongooseSchema,
  HydratedDocument,
  SchemaTypes,
} from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  _id: ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Customer' }] })
  id_seller: ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Customer' }] })
  id_buyer: ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  id_product: ObjectId;

  @Prop()
  price: number;

  @Prop({ default: 'waiting_confirm' })
  status:
    | 'waiting_confirm'
    | 'processing'
    | 'delivering'
    | 'delivered'
    | 'successful_delivery'
    | 'cancel_exp';

  @Prop({ type: SchemaTypes.Mixed })
  address: object;

  @Prop({ default: new Date() })
  created_at: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
