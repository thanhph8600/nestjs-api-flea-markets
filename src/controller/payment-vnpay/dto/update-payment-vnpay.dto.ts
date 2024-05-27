import { PartialType } from '@nestjs/swagger';
import { CreatePaymentVnpayDto } from './create-payment-vnpay.dto';

export class UpdatePaymentVnpayDto extends PartialType(CreatePaymentVnpayDto) {}
