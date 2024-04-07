import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';

export type MessengerDocument = HydratedDocument<Messenger>;

@Schema()
export class Messenger {
  _id: string;
  @Prop()
  id_room_chat: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Customer' }] })
  id_customer: ObjectId;

  @Prop()
  messenger: string;

  @Prop({ default: false })
  isWatched: boolean;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const MessengerSchema = SchemaFactory.createForClass(Messenger);
