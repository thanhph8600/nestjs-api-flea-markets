import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './controller/customer/customer.module';
import { ProductModule } from './controller/product/product.module';
import { AuthModule } from './middleware/auth/auth.module';
import { CategoryModule } from './controller/category/category.module';
import { DetailCategoryModule } from './controller/detail-category/detail-category.module';
import { SpecificationModule } from './controller/specification/specification.module';
import { ProvinceModule } from './controller/address/province/province.module';
import { DistrictModule } from './controller/address/district/district.module';
import { WardModule } from './controller/address/ward/ward.module';
import { UploadModule } from './middleware/upload/upload.module';
import { RoomChatModule } from './controller/chat/room-chat/room-chat.module';
import { MessengerModule } from './controller/chat/messenger/messenger.module';
import { WebSocketModule } from './web-socket/web-socket.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HistoryModule } from './controller/wallet/history/history.module';
import { WalletModule } from './controller/wallet/wallet/wallet.module';
import { NotificationModule } from './controller/notification/notification.module';
import { DeliveryAddressModule } from './controller/delivery-address/delivery-address.module';
import { OrderModule } from './controller/order/order.module';
import { PaymentVnpayModule } from './controller/payment-vnpay/payment-vnpay.module';
import { GoogleModule } from './middleware/login/google/google.module';
import { FacebookModule } from './middleware/login/facebook/facebook.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CustomerModule,
    ProductModule,
    AuthModule,
    CategoryModule,
    DetailCategoryModule,
    SpecificationModule,
    ProvinceModule,
    DistrictModule,
    WardModule,
    UploadModule,
    RoomChatModule,
    MessengerModule,
    WebSocketModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'dist', 'client'),
    }),
    HistoryModule,
    WalletModule,
    NotificationModule,
    DeliveryAddressModule,
    OrderModule,
    PaymentVnpayModule,
    GoogleModule,
    FacebookModule,
  ],
})
export class AppModule {}
