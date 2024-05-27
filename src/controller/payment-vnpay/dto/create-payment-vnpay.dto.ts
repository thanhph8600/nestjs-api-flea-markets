import { ObjectId } from 'mongoose';

export class CreatePaymentVnpayDto {
  id_customer: ObjectId;
  status: 'prosessing' | 'success' | 'error';
  txnRef: string;
  amount: number;
}
