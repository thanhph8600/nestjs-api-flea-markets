import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Messenger } from '../../messenger/schemas/messenger.chat.schema';

export type RoomChatDocument = HydratedDocument<RoomChat>;

@Schema()
export class RoomChat {
  _id: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Customer' }] })
  id_customer: Array<ObjectId>;

  theLastMess: Messenger;
}

export const RoomChatSchema = SchemaFactory.createForClass(RoomChat);
