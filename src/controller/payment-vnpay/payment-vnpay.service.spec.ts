import { Test, TestingModule } from '@nestjs/testing';
import { PaymentVnpayService } from './payment-vnpay.service';

describe('PaymentVnpayService', () => {
  let service: PaymentVnpayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentVnpayService],
    }).compile();

    service = module.get<PaymentVnpayService>(PaymentVnpayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
