import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Schema as MongooseSchema, HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  _id: ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Customer' }] })
  id_customer: ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
  id_product: ObjectId;

  @Prop()
  content: string;

  @Prop()
  description: string;

  @Prop({ default: new Date() })
  created_at: Date;

  @Prop({ default: false })
  isWatched: boolean;

  @Prop()
  link: string;

  @Prop({ default: true })
  isNew: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
