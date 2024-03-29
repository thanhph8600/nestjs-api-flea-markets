import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  id_customer: string;

  @Prop()
  id_category: string;

  @Prop()
  id_category_detail: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  selling_price: number;

  @Prop()
  description: string;

  @Prop({ type: SchemaTypes.Mixed })
  specifications: object;

  @Prop()
  address: string;

  @Prop()
  status: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
