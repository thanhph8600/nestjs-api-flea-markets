import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { PaymentVnpayService } from './payment-vnpay.service';
import { CreatePaymentVnpayDto } from './dto/create-payment-vnpay.dto';
import {} from './config';
import { AuthGuard } from 'src/middleware/auth/auth.guard';
import { Response } from 'express';
import { Public } from 'src/middleware/auth/public';

@Controller('payment-vnpay')
export class PaymentVnpayController {
  constructor(private readonly paymentVnpayService: PaymentVnpayService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPaymentVnpayDto: CreatePaymentVnpayDto, @Request() req) {
    return this.paymentVnpayService.create(createPaymentVnpayDto, req);
  }

  @Public()
  @Get('return/:idCustomer')
  success(
    @Request() req,
    @Res() res: Response,
    @Param('idCustomer') idCustomer: string,
  ) {
    return this.paymentVnpayService.vnpay_return(req, res, idCustomer);
  }
}
