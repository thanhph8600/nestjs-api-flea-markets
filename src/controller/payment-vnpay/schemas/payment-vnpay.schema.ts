import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type PaymentVNPayDocument = HydratedDocument<PaymentVNPay>;

@Schema()
export class PaymentVNPay {
  _id: ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Customer' }] })
  id_customer: ObjectId;

  @Prop({ default: 'prosessing' })
  status: 'prosessing' | 'success' | 'error';

  @Prop()
  txnRef: string;
}

export const PaymentVNPaySchema = SchemaFactory.createForClass(PaymentVNPay);
