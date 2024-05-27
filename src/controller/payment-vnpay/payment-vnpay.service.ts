import { Injectable } from '@nestjs/common';
import { CreatePaymentVnpayDto } from './dto/create-payment-vnpay.dto';
import * as QueryString from 'qs';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentVNPay } from './schemas/payment-vnpay.schema';
import { WebSocketGateway } from 'src/web-socket/web-socket.gateway';

@Injectable()
export class PaymentVnpayService {
  constructor(
    @InjectModel('PaymentVNPay')
    private readonly paymentVNPayModel: Model<PaymentVNPay>,
    private readonly webSocketGateway: WebSocketGateway,
  ) {}
  create(createPaymentVnpayDto: CreatePaymentVnpayDto, req) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    const date = new Date();
    const createDate = this.formatDateYYYYMMDDHHmmss(date);

    const ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const tmnCode = process.env.vnp_TmnCode;
    const secretKey = process.env.vnp_HashSecret;
    let vnpUrl = process.env.vnp_Url;
    const returnUrl = process.env.vnp_ReturnUrl;
    const orderId = this.formatDateDDHHmmss(date);
    const amount = createPaymentVnpayDto.amount;
    const bankCode = 'NCB';

    const currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl + '/' + req.user.sub;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_BankCode'] = bankCode;

    vnp_Params = sortObject(vnp_Params);

    const signData = QueryString.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + QueryString.stringify(vnp_Params, { encode: false });
    console.log(createDate);
    this.paymentVNPayModel.create({
      id_customer: req.user.sub,
      txnRef: orderId,
    });
    return {
      vnpUrl,
      txnRef: orderId,
    };
  }

  vnpay_return(req, res, idCustomer: string) {
    let vnp_Params = req.query;

    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    const secretKey = process.env.vnp_HashSecret;

    const signData = QueryString.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

    const payment = {
      idCustomer: idCustomer,
    };
    this.webSocketGateway.payment(payment);

    if (secureHash === signed) {
      res.render('success', {
        code: vnp_Params['vnp_ResponseCode'],
      });
    }
  }

  formatDateDDHHmmss(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}${hours}${minutes}${seconds}`;
  }
  formatDateYYYYMMDDHHmmss(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}

function sortObject(obj) {
  const sorted = {};
  const str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}
