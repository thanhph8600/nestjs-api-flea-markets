import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<History>;

@Schema()
export class History {
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Wallet' }] })
  id_wallet: ObjectId;

  @Prop()
  transaction: string;

  @Prop()
  content: string;

  @Prop()
  amount: number;

  @Prop()
  current_amount: number;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
