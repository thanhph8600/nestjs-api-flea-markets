import { Test, TestingModule } from '@nestjs/testing';
import { PaymentVnpayController } from './payment-vnpay.controller';
import { PaymentVnpayService } from './payment-vnpay.service';

describe('PaymentVnpayController', () => {
  let controller: PaymentVnpayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentVnpayController],
      providers: [PaymentVnpayService],
    }).compile();

    controller = module.get<PaymentVnpayController>(PaymentVnpayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
