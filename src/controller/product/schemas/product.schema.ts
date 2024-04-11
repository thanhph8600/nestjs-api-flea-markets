import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  SchemaTypes,
  Schema as MongooseSchema,
  ObjectId,
} from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Customer' }] })
  id_customer: ObjectId;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Category' }] })
  id_category: ObjectId;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'DetailCategory' }],
  })
  id_category_detail: ObjectId;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop({ default: 0 })
  selling_price: number;

  @Prop()
  description: string;

  @Prop({ type: SchemaTypes.Mixed })
  specifications: object;

  @Prop({ type: SchemaTypes.Mixed })
  address: object;

  @Prop({ default: 'complete' })
  status: string;

  @Prop({ type: SchemaTypes.Mixed })
  thumbnail: Array<string>;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) })
  end_at: Date;

  @Prop({ default: false })
  isHidden: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
