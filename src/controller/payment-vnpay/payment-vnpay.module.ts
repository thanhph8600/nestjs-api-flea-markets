import { Module } from '@nestjs/common';
import { PaymentVnpayService } from './payment-vnpay.service';
import { PaymentVnpayController } from './payment-vnpay.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentVNPay,
  PaymentVNPaySchema,
} from './schemas/payment-vnpay.schema';
import { WebSocketModule } from 'src/web-socket/web-socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentVNPay.name, schema: PaymentVNPaySchema },
    ]),
    WebSocketModule,
  ],
  controllers: [PaymentVnpayController],
  providers: [PaymentVnpayService],
})
export class PaymentVnpayModule {}
