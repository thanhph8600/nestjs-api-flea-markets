import { Document, ObjectId } from 'mongoose';

export interface PaymentVNPay extends Document {
  _id: ObjectId;
  id_customer: ObjectId;
  status: 'prosessing' | 'success' | 'error';
  txnRef: string;
}
